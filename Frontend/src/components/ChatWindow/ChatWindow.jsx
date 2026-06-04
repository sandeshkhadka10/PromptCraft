import Chat from "../Chat/Chat.jsx";
import "./ChatWindow.css";
import { MyContext } from "../../context/MyContext.jsx";
import { useContext, useState, useEffect } from "react";
import { ScaleLoader } from "react-spinners";

function ChatWindow() {
    // since we pass our message and get reply here, that's why we are passing it here
    const { prompt, setPrompt, reply, setReply, currThreadId, setCurrThreadId, prevChats, setPrevChats, newChat, setNewChat } = useContext(MyContext);

    // using it for loading spinner and until submit is not done it is not triggered
    const [loading,setLoading] = useState(false);

    const getReply = async () => {
        setLoading(true); // when submit button is pressed the loader is triggered
        setNewChat(false); // when new chat start and we give prompt then "Start a New Chat" disappear
        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                message: prompt,
                threadId: currThreadId
            })
        };

        try {
            // here the api is hitting the POST of the backend
            const response = await fetch("http://localhost:8080/api/chat", options);
            const res = await response.json();
            // console.log(res);
            setReply(res.reply);
        } catch (err) {
            console.log(err);
        }
        setLoading(false); // after the reply is sent by the model the loader is not triggered
    }

    // Append new chat to prevChats
    useEffect(()=>{
        if(prompt && reply){
            setPrevChats(prevChats => (
                [...prevChats, {
                    role: "user",
                    content: prompt
                },{
                    role: "assistant",
                    content: reply
                }
            ]
            ));
        }
        setPrompt("");
    },[reply]);

    return (
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
            <ScaleLoader color="#fff" loading={loading}/>
            <div className="chatInput">
                <div className="inputBox">
                    <input placeholder="Ask anything" value={prompt} onChange={(e) => setPrompt(e.target.value)} onKeyDown={(e) => e.key === 'Enter' ? getReply() : ''}>
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