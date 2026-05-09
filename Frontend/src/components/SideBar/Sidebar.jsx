import "./Sidebar.css";
import logo from "../../assets/blacklogo.png"; 

function Sidebar() {
    return (
        <div>
            <section>
                {/* New Chat Button */}
                <button>
                    <img src={logo} alt="logo" />
                    <i className="fa-solid fa-pen-to-square"></i>
                </button>

                {/* History */}
                <ul className="history">
                    <li>History1</li>
                    <li>History2</li>
                    <li>History3</li>
                </ul>

                {/* Sign */}
                <div>
                    <p>By PromptCraft</p>
                </div>
            </section>
        </div>
    );
}

export default Sidebar;
