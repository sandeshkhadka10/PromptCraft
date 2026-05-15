import Chat from "../Chat/Chat.jsx";
import "./ChatWindow.css";
import {MyContext} from "../../context/MyContext.jsx";
import {useContext} from "react";

function ChatWindow(){
    // since we pass our message and get reply here, that's why we are passing it here
    const {prompt, setPrompt, reply, setReply, currThreadId, setCurrThreadId} = useContext(MyContext);

    const getReply = async()=>{
        const options = {
            method: "POST",
            headers: {
                "Content-Type" : "application/json"
            },
            body:JSON.stringify({
                message: prompt,
                threadId: currThreadId
            })
        };

        try{
            // here the api is hitting the POST of the backend
            const response = await fetch("http://localhost:8080/api/chat", options);
            const res = await response.json();
            console.log(res);
            setReply(res.reply);
        }catch(err){
            console.log(err);
        }
    }

    return(
        <div className="chatWindow">
            {/* Navbar */}
            <div className="navbar">
                <span>PromptCraft<i className="fa-solid fa-chevron-down"></i></span>
                <div className="userIconDiv">
                    <span className="userIcon"><i className="fa-solid fa-user"></i></span>
                </div>
            </div>

            {/* Chat */}
            <Chat/>

            {/* ChatInput */}
            <div className="chatInput">
                <div className="inputBox">
                    <input placeholder="Ask anything" value={prompt} onChange={(e)=>setPrompt(e.target.value)} onKeyDown={(e)=>e.key === 'Enter'?getReply(): ''}>
                    </input>
                    <div id="submit" onClick={getReply}>
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