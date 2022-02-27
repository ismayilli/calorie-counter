import calorie from "../assets/images/icons/calories.png"
import sugar from "../assets/images/icons/sugar.png"
import fiber from "../assets/images/icons/fiber.png"
import potassium from "../assets/images/icons/potassium.png"
import sodium from "../assets/images/icons/sodium.png"
import fat from "../assets/images/icons/trans-fat.png"
import protein from "../assets/images/icons/protein.png"
import carbohydrates from "../assets/images/icons/carbohydrates.png"
import cholesterol from "../assets/images/icons/cholesterol.png"
import running from "../assets/images/icons/running.png"
import swimming from "../assets/images/icons/swimming.png"
import walking from "../assets/images/icons/walking.png"
import cycling from "../assets/images/icons/cycling.png"
import { useEffect, useState } from "react"

const Result = (props) => {
    const {food} = props
    const [modifiedSize, setModifiedSize] = useState(food.serving_size_g)
    const [foodData, setFoodData] = useState({})
    
    const foodDataUpdate = () => {
        let proportion = modifiedSize/food.serving_size_g
        const tempData = {
            calories: food.calories,
            fiber: food.fiber_g,
            sodium: food.sodium_mg,
            sugar: food.sugar_g,
            potassium: food.potassium_mg,
            protein: food.protein_g,
            fat: food.fat_total_g,
            cholesterol: food.cholesterol_mg,
            carbohydrates: food.carbohydrates_total_g
        }
        for(var key in tempData) {
            const tempValue = (Math.round(tempData[key]*proportion*10)/10)
            tempData[key] = tempValue
        }
        setFoodData(tempData)
    }
    useEffect(()=>{
        foodDataUpdate()
        
    },[modifiedSize])

    const timeFormat = (time) => {
        return Math.round(time)
    }
    let activities = {
        walking: timeFormat(foodData.calories*22/100),
        running: timeFormat(foodData.calories*10/100),
        cycling: timeFormat(foodData.calories*13/100),
        swimming: timeFormat(foodData.calories*13/100)
    }
    const onSizeChange = (e) => {
        setModifiedSize(e.target.value)
    }
    return (
        <div className="food-data-section">
            <div className="food-data-header">
                <h3 className="food-title">{food.name}</h3>
                <div className="food-serving-input">
                    <input type="text" value={modifiedSize} onChange={onSizeChange}/>
                    <span>gram</span>
                </div>
            </div>
            <div className="food-data-calorie">
                <div className="food-calorie">
                    <img className="calorie-icon" src={calorie} />
                    <h4 className="calorie-title"><span>{Math.round(foodData.calories)}</span><small>calories</small></h4>
                </div>
                <div className="food-calorie-activities">
                    <div className="row">
                        <div className="activity-item col-md-3 col-xs-6">
                            <img src={walking} />
                            <h5>{activities.walking} min</h5>
                        </div>
                        <div className="activity-item col-md-3 col-xs-6">
                            <img src={running} />
                            <h5>{activities.running} min</h5>
                        </div>
                        <div className="activity-item col-md-3 col-xs-6">
                            <img src={cycling} />
                            <h5>{activities.cycling} min</h5>
                        </div>
                        <div className="activity-item col-md-3 col-xs-6">
                            <img src={swimming} />
                            <h5>{activities.swimming} min</h5>
                        </div>
                    </div>
                </div>
            </div>
            <div className="food-data-nutritions">
                <table className="table table-bordered">
                    <tbody>
                        <div className="row">
                            <div className="col-md-6">
                                <tr>
                                    <th>
                                        <img src={sugar} />
                                        <h5>Sugar (g)</h5>
                                    </th>
                                    <td>{foodData.sugar} g</td>
                                </tr>
                                <tr>
                                    <th>
                                        <img src={fiber} />
                                        <h5>Fiber (g)</h5>
                                    </th>
                                    <td>{foodData.fiber} g</td>
                                </tr>
                                <tr>
                                    <th>
                                        <img src={sodium} />
                                        <h5>Sodium (mg)</h5>
                                    </th>
                                    <td>{foodData.sodium} mg</td>
                                </tr>
                                <tr>
                                    <th>
                                        <img src={potassium} />
                                        <h5>Potassium (mg)</h5>
                                    </th>
                                    <td>{foodData.potassium} mg</td>
                                </tr>
                            </div>
                            <div className="col-md-6">
                                <tr>
                                    <th>
                                        <img src={fat} />
                                        <h5>Fat (g)</h5>
                                    </th>
                                    <td>{foodData.fat} g</td>
                                </tr>
                                <tr>
                                    <th>
                                        <img src={protein} />
                                        <h5>Protein (g)</h5>
                                    </th>
                                    <td>{foodData.protein} g</td>
                                </tr>
                                <tr>
                                    <th>
                                        <img src={cholesterol} />
                                        <h5>Cholesterol (mg)</h5>
                                    </th>
                                    <td>{foodData.cholesterol} mg</td>
                                </tr>
                                <tr>
                                    <th>
                                        <img src={carbohydrates} />
                                        <h5>Carbohydrates (g)</h5>
                                    </th>
                                    <td>{foodData.carbohydrates} g</td>
                                </tr>
                            </div>
                        </div>
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Result