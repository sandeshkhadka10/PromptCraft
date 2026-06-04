import "./Sidebar.css";
import logo from "../../assets/Untitled.png";
import { useContext, useEffect } from "react";
import {MyContext} from "../../context/MyContext.jsx";
import {v1 as uuidv1} from "uuid";

function Sidebar() {
    const { allThreads, setAllThreads, currThreadId, setNewChat, setPrompt, setReply, setCurrThreadId, setPrevChats } = useContext(MyContext);

    // fetching the threads history
    const getAllThreads = async () => {
        try{
            const response = await fetch("http://localhost:8080/api/thread");
            const res = await response.json();
            // console.log(res);

            // taking out the threadId and title which is to be shown in sidebar
            const filteredData = res.map(thread=>({threadId: thread.threadId, title: thread.title}));
            // console.log(filteredData);
            setAllThreads(filteredData);
        }catch(err){
            console.log(err);
        }
    }

    // fetch all the history data of curr thread
    useEffect(()=>{
        getAllThreads();
    },[currThreadId]);

    // when we click the logo or icon then new chat section appears
    const createNewChat = () => {
        setNewChat(true);
        setPrompt("");
        setReply(null);
        setCurrThreadId(uuidv1);
        setPrevChats([]);
    };

    // when previous chat history is clicked, it changed the threadId accordingly
    const changeThread = async (newThreadId) =>{
        setCurrThreadId(newThreadId);

        try{
            const response = await fetch(`http://localhost:8080/api/thread/${newThreadId}`);
            const res = await response.json();
            // console.log(res);
            setPrevChats(res);
            setNewChat(false);
            setReply(null);
        }catch(err){
            console.log(err);
        }
    };

    return (
        <div>
            <section className="sidebar">
                {/* New Chat Button */}
                <button onClick={createNewChat}>
                    <img src={logo} className="logo" alt="logo" />
                    <span><i className="fa-solid fa-pen-to-square"></i></span>
                </button>

                {/* History */}
                <ul className="history">
                    {
                        allThreads?.map((thread,idx)=>(
                            <li key={idx} onClick={()=>changeThread(thread.threadId)}>{thread.title}</li>
                        ))
                    }
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
