import './App.css';
import Sidebar from './components/SideBar/Sidebar.jsx';
import ChatWindow from './components/ChatWindow/ChatWindow.jsx';
import { MyContext } from './context/MyContext.jsx';
import {useState} from 'react';
import {v1 as uuidv1} from "uuid";

function App() {
  const [prompt,setPrompt] = useState("");
  const [reply,setReply] = useState(null);

  // when we pass new message through frontend it should
  // have threadId, so for that we are passing useState from here
  const [currThreadId,setCurrThreadId] = useState(uuidv1());
  
  // passing the value using contextAPI
  const providerValues = {
    prompt,
    setPrompt,
    reply,
    setReply,
    currThreadId,
    setCurrThreadId
  };

  return (
    <>
      <div className='app'>
        <MyContext.Provider value={providerValues}>
          <Sidebar></Sidebar>
          <ChatWindow></ChatWindow>
        </MyContext.Provider>
      </div>

    </>
  )
}

export default App
