import { MyContext } from "../../context/MyContext";
import "./Chat.css";
import { useContext, useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css";

function Chat() {
    const { newChat, prevChats, reply } = useContext(MyContext);

    // here we are saving out latest reply to these state for adding typing effect
    const [latestReply, setLatestReply] = useState(null);

    // here we seperate the latest reply so that we can add typing effect in it
    useEffect(() => {
        // this is for displaying the old message when user click the old message
        // i.e if user click old message then display it instantly without any typing effect
        if (reply == null) {
            const resetTimer = setTimeout(() => {
                setLatestReply(null);
            }, 0);

            return () => clearTimeout(resetTimer);
        }

        // first check whether there is prev chats or not
        if (!prevChats?.length) {
            return;
        }
        const content = reply.split(" "); // individual words are stored here
        let idx = 0;
        const interval = setInterval(() => {
            setLatestReply(content.slice(0, idx + 1).join(" "));
            idx++;
            if (idx >= content.length) {
                clearInterval(interval);
            }
        }, 40);
        return () => clearInterval(interval); // stops the interval created by setInterval
    }, [prevChats, reply]);

    return (
        <>
            {/* whenever app starts new chat is shown */}
            {newChat && <h1>Start New Chat</h1>}

            <div className="chats">
                {
                    prevChats?.slice(0, -1).map((chat, idx) =>
                        // Basically if the role is user then go for userDiv otherwise go for gptDiv
                        <div className={chat.role === "user" ? "userDiv" : "gptDiv"} key={idx}>
                            {
                                // if the role is user then go for userMessage paragraph otherwise go for gptMessage paragraph
                                chat.role === "user" ?
                                    <p className="userMessage">{chat.content}</p> :
                                    // <p className="gptMessage">{chat.content}</p>
                                    <ReactMarkdown rehypePlugins={rehypeHighlight}>{chat.content}</ReactMarkdown>
                            }
                        </div>
                    )
                }

                {/* Combining both i.e how to show the message for new chat and history message  */}
                {
                    prevChats.length > 0 && (
                        <>
                            {
                                latestReply === null ? (
                                    <div className="gptDiv" key={"non-typing"}>
                                        <ReactMarkdown rehypePlugins={rehypeHighlight}>{prevChats[prevChats.length - 1].content}</ReactMarkdown>
                                    </div>
                                ) : (
                                    <div className="gptDiv" key={"typing"}>
                                        <ReactMarkdown rehypePlugins={rehypeHighlight}>{latestReply}</ReactMarkdown>
                                    </div>
                                )
                            }
                        </>
                    )
                }
                
                {/* These is done to add the typing effect for the new chat */}
                {/* {
                    prevChats.length > 0 && latestReply !== null &&
                    <div className="gptDiv" key={"typing"}>
                        <ReactMarkdown rehypePlugins={rehypeHighlight}>{latestReply}</ReactMarkdown>
                    </div>
                } */}

                {/* These is done to load the message when user click the history */}
                {/* {
                    prevChats.length > 0 && latestReply === null &&
                    <div className="gptDiv" key={"non-typing"}>
                        <ReactMarkdown rehypePlugins={rehypeHighlight}>{prevChats[prevChats.length - 1].content}</ReactMarkdown>
                    </div>
                } */}

                {/* This is Static Data that is done to show how can we display the user prompt and reply of the model*/}
                {/* user message */}
                {/* <div className="userdiv">
                    <p className="userMessage">User Message</p>
                </div> */}

                {/* gpt message */}
                {/* <div className="gptDiv">
                    <p className="gptMessage">GPT Generated Message</p>
                </div> */}
            </div >
        </>
    )
}

export default Chat;