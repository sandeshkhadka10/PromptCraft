import "./Sidebar.css";
import logo from "../../assets/Untitled.png";

function Sidebar() {
    return (
        <div>
            <section className="sidebar">
                {/* New Chat Button */}
                <button>
                    <img src={logo} className="logo" alt="logo" />
                    <span><i className="fa-solid fa-pen-to-square"></i></span>
                </button>

                {/* History */}
                <ul className="history">
                    <li>History1</li>
                    <li>History2</li>
                    <li>History3</li>
                </ul>

                {/* Sign */}
                <div className="sign">
                    <p>By PromptCraft</p>
                </div>
            </section>
        </div>
    );
}

export default Sidebar;
