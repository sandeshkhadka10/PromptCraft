import Chat from "../Chat/Chat.jsx";
import "./ChatWindow.css";

function ChatWindow(){
    return(
        <div className="chatWindow">
            {/* Navbar */}
            <div className="navbar">
                <span>PromptCraft<i className="fa-solid fa-chevron-down"></i></span>
                <div className="userIconDiv">
                    <span><i className="fa-solid fa-user"></i></span>
                </div>
            </div>

            {/* Chat */}
            <Chat/>

            {/* ChatInput */}
            <div className="chatInput">
                <div className="userInput">
                    <input placeholder="Ask anything">
                    </input>
                    <div id="submit">
                        <i className="fa-solid fa-paper-plane"></i>
                    </div>
                </div>
                <p className="info">
                    PromptCraft can make mistake. Check important info. See Cookie Preferences.
                </p>
            </div>
        </div>
    )
}

export default ChatWindow;