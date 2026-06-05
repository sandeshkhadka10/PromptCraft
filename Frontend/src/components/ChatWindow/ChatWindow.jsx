import Chat from "../Chat/Chat.jsx";
import "./ChatWindow.css";
import { MyContext } from "../../context/MyContext.jsx";
import { useContext, useState, useEffect } from "react";
import { ScaleLoader } from "react-spinners";

function ChatWindow() {
    // since we pass our message and get reply here, that's why we are passing it here
    const { prompt, setPrompt, reply, setReply, currThreadId, setPrevChats, setNewChat, theme, toggleTheme, isSidebarOpen, setIsSidebarOpen } = useContext(MyContext);

    // using it for loading spinner and until submit is not done it is not triggered
    const [loading,setLoading] = useState(false);

    // for creating dropdown of profile
    const [isOpen, setIsOpen] = useState(false);

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

    // Append new chat to prevChats only after the reply arrives
    useEffect(() => {
        if (prompt && reply) {
            setPrevChats(prevChats => ([
                ...prevChats,
                {
                    role: "user",
                    content: prompt
                },
                {
                    role: "assistant",
                    content: reply
                }
            ]));
            setPrompt("");
        }
    }, [reply, prompt, setPrevChats, setPrompt]);

    const handleProfileClick = () =>{
        setIsOpen(!isOpen);
    }

    const handleSidebarToggle = () => {
        setIsSidebarOpen(prevState => !prevState);
    };

    return (
        <div className="chatWindow">
            {/* Navbar */}
            <div className="navbar">
                <div className="navbarLeft">
                    <button type="button" className="iconButton menuButton" onClick={handleSidebarToggle} aria-label={isSidebarOpen ? 'Close sidebar' : 'Open sidebar'}>
                        <i className="fa-solid fa-bars"></i>
                    </button>
                    <span className="brand">PromptCraft</span>
                </div>
                <div className="navbarActions">
                    <button type="button" className="iconButton themeButton" onClick={toggleTheme} aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}>
                        <i className={`fa-solid ${theme === 'dark' ? 'fa-sun' : 'fa-moon'}`}></i>
                    </button>
                    <button type="button" className="iconButton userIconDiv" onClick={handleProfileClick} aria-label="Open profile menu">
                        <span className="userIcon"><i className="fa-solid fa-user"></i></span>
                    </button>
                </div>
            </div>

            {/* For creating Profile Dropdown */}
            {
                isOpen && 
                <div className="dropDown">
                    <div className="dropDownItem">Signup/Login</div>
                    <div className="dropDownItem">Log out</div>
                </div>
            }

            {/* Chat */}
            <Chat/>

            {loading && (
                <div className="loadingOverlay" aria-live="polite" aria-busy="true">
                    <ScaleLoader color="var(--accent)" loading={loading} />
                </div>
            )}

            {/* ChatInput */}
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