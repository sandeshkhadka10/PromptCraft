import { MyContext } from "../../context/MyContext";
import "./Chat.css";
import { useContext } from "react";

function Chat() {
    const { newChat, prevChats } = useContext(MyContext);
    return (
        <>
            {/* whenever app starts new chat is shown */}
            {newChat && <h1>Start New Chat</h1>}

            <div className="chats">
                {
                    prevChats?.map((chat, idx) =>
                        // Basically if the role is user then go for userDiv otherwise go for gptDiv
                        <div className={chat.role === "user" ? "userDiv" : "gptDiv"} key={idx}>
                            {
                                // if the role is user then go for userMessage paragraph otherwise go for gptMessage paragraph
                                chat.role === "user" ?
                                    <p className="userMessage">{chat.content}</p> : 
                                    <p className="gptMessage">{chat.content}</p>
                            }
                        </div>
                    )
                }

                {/* This is Static Data that is done to show how can we display the user prompt and reply of the model*/}
                {/* user message */}
                {/* <div className="userdiv">
                    <p className="userMessage">User Message</p>
                </div> */}

                {/* gpt message */}
                {/* <div className="gptDiv">
                    <p className="gptMessage">GPT Generated Message</p>
                </div> */}
            </div>
        </>
    )
}

export default Chat;