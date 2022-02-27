import logo from "../assets/images/logo_temp.png"
import githubLogo from "../assets/images/github_logo.png"

const Header = () => {
    return (
        <div className="header-content">
            <div className="header-image">
                <h3 id="app-title">CalorieCounter</h3>
            </div>
            <div className="header-link">
                <a target="_blank" href="https://github.com/ismayilli/calorie-counter">
                    <img id="github-logo" src={githubLogo} />
                </a>
            </div>
        </div>
    )
}

export default Header