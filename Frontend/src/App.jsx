import './App.css';
import Sidebar from './components/SideBar/Sidebar.jsx';
import ChatWindow from './components/ChatWindow/ChatWindow.jsx';
import { MyContext } from './context/MyContext.jsx';
import {useEffect, useState} from 'react';
import {v1 as uuidv1} from "uuid";

const getInitialTheme = () => {
  if (typeof window === 'undefined') {
    return 'dark';
  }

  const savedTheme = window.localStorage.getItem('promptcraft-theme');
  if (savedTheme === 'light' || savedTheme === 'dark') {
    return savedTheme;
  }

  return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
};

function App() {
  const [prompt,setPrompt] = useState("");
  const [reply,setReply] = useState(null);
  const [theme, setTheme] = useState(getInitialTheme);
  const [isSidebarOpen, setIsSidebarOpen] = useState(() => {
    if (typeof window === 'undefined') {
      return true;
    }

    return window.matchMedia('(min-width: 901px)').matches;
  });

  // when we pass new message through frontend it should
  // have threadId, so for that we are passing useState from here
  const [currThreadId,setCurrThreadId] = useState(uuidv1());

  // here we are storing our previous chat in array format i.e previous chat of current threads
  const [prevChats, setPrevChats] = useState([]);

  // it tracks whether new chat is being created or not
  const [newChat,setNewChat] = useState(true); // here true means when we start our app we always start with the new one

  // it is used to show the individual thread history
  const [allThreads, setAllThreads] = useState([])

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    document.body.setAttribute('data-theme', theme);
    window.localStorage.setItem('promptcraft-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'dark' ? 'light' : 'dark');
  };
  
  // passing the value using contextAPI
  const providerValues = {
    prompt,
    setPrompt,
    reply,
    setReply,
    currThreadId,
    setCurrThreadId,
    prevChats,
    setPrevChats,
    newChat,
    setNewChat,
    allThreads,
    setAllThreads,
    theme,
    toggleTheme,
    isSidebarOpen,
    setIsSidebarOpen
  };

  return (
    <>
      <div className={`app ${isSidebarOpen ? 'sidebar-visible' : ''}`}>
        {isSidebarOpen && <button className="appBackdrop" aria-label="Close sidebar" onClick={() => setIsSidebarOpen(false)} />}
        <MyContext.Provider value={providerValues}>
          <Sidebar/>
          <ChatWindow/>
        </MyContext.Provider>
      </div>

    </>
  )
}

export default App
