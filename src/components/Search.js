import { useCallback, useState } from "react"
import { useDebouncedCallback } from "use-debounce"

const Search = (props) => {
    const [foodData, setFoodData] = useState({items: []})
    const [foodFound, setFoodFound] = useState(false)
    const [foodName, setFoodName] = useState("")
    const [amount, setAmount] = useState(100)
    const [amountType, setAmountType] = useState("gram")
    const [typing, setTyping] = useState(false)

    let query = {
        amount, amountType, foodName
    }

    const onInputFocus = () => {
        
    }
    const onNameFocus = () => {
        setTyping(true)
    }
    const onNameBlur = () => {
        setTyping(false)
    }
    const onNameChange = (e) => {
        setFoodFound(false)
        const name = e.target.value
        setFoodName(name)
        query.foodName = name
        if(name.length>2) {
            debouncedSearch(buildQuery())
        }
    }
    const onAmountChange = (e) => {
        const value = e.target.value
        setAmount(value)
        query.amount = value
        if(foodFound) {
            debouncedSearch(buildQuery())
        }
    }
    const onAmountTypeChange = (e) => {
        const type = e.target.value
        setAmountType(type)
        query.amountType = type
        if(foodFound) {
            debouncedSearch(buildQuery())
        }
    }
    const fetchFood = (query) => {
        setFoodFound(false)
        fetch("https://api.calorieninjas.com/v1/nutrition?query="+query,{
            method: 'GET',
            headers: { 'X-Api-Key': 'AnDFKbnQntK9ZSKjsTX5vA==fYhNX3zVgr7f1Fve'},
            contentType: 'application/json',
        }).then(res => res.json())
        .then(data => {
            setFoodData(data);
            if(data.items.length>0) {
                setFoodFound(true)
            }
        })
    }
    const debouncedSearch = useDebouncedCallback((queryBuilt)=> {
        fetchFood(queryBuilt)
    },2000)
    
    const onClick = (e) => {
        e.preventDefault();
        if(foodFound) {
            props.result(foodData.items[0])
            props.scrollToResult()
        }
    }
    const buildQuery = () => {
        let queryBuilt = query.amount+query.amountType+" "+query.foodName
        return queryBuilt
    }

    return (
        <div className="search-section">
            <div className="row flex-column-reverse flex-md-row">
                <div className="col-md-6">
                    <div className="search-forms-section">
                        <h1 id="search-title">Search any food you want</h1>
                        <div className="search-form">
                            <form className="search-form">
                                <div className="form-input-field name-input">
                                    <input onFocus={onInputFocus, onNameFocus} onBlur={onNameBlur} onChange={onNameChange} type="text" placeholder="Potato..." value={foodName} />
                                    <div className="name-check-icon">
                                        <div className={"check-icon "+((typing && !foodFound) && "rotating ")+(foodFound && " green ")}>
                                            <i className="fa fa-solid fa-circle-check"></i>
                                        </div>
                                    </div>
                                </div>
                                <div className="form-input-field amount-input">
                                    <input onFocus={onInputFocus} onChange={onAmountChange} type="text" placeholder="100" value={amount}/>
                                    <select onChange={onAmountTypeChange} value={amountType}>
                                        <option value="gram">gram</option>
                                        <option value="oz">oz</option>
                                        <option value="">piece</option>
                                    </select>
                                </div>
                                <button onClick={onClick} disabled={!foodFound} id="search-button">Show Data</button>
                            </form>
                        </div>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="search-result">
                        {(foodName == "" && !foodFound) &&
                        <div className="no-input-flash search-result-flash">
                            <div className="wizard-symbol">
                                <i className="fa fa-solid fa-hand-sparkles"></i>
                            </div>
                            <h3>Start typing food name to see the magic</h3>
                        </div>
                        }
                        {(foodName.length>0 && typing && !foodFound) &&
                        <div className="searching-flash search-result-flash">
                            <div className="search-symbol">
                                <i className="fa fa-solid fa-magnifying-glass"></i>
                            </div>
                            <h3>We are looking for your data everywhere...</h3>
                        </div>
                        }
                        {(foodData.items.length>0 && foodFound) && 
                        <div className="data-flash">
                            <h2>We've found something</h2>
                            <h4 className="title">{foodData.items[0].name}</h4>
                            <p className="desc">( {Math.round(foodData.items[0].serving_size_g)+" gram"} )</p>
                        </div>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Search