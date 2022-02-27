import { useEffect, useRef, useState } from 'react';
import './../assets/styles/App.css';
import Header from './Header';
import Footer from './Footer';
import Search from './Search';
import Result from './Result';

function App() {
  const resultRef = useRef()
  const [result, setResult] = useState({})
  const scrollToResult = () => {
    resultRef.current.scrollIntoView({behavior: "smooth"})
  }
  useEffect(() => {
    if(result.name != undefined) scrollToResult();
  },[result])

  return (
    <div className="main-app">
      <header className="app-header">
        <div className="container">
          <Header />
        </div>
      </header>
      <div className="app-content">
        <div className="container">
          <Search result={setResult} scrollToResult={scrollToResult}/>
          {(result.name != undefined) && 
            <div>
              <div className="component-seperator"></div>
              <p style={{marginBottom: "50px"}} ref={resultRef}></p>
              <Result food={result}/>
            </div>
          }
        </div>
      </div>
      <div className="component-seperator"></div>
      <hr/>
      <footer className="app-footer">
        <div className="container">
          <Footer />
        </div>
      </footer>
    </div>
  );
}

export default App;
