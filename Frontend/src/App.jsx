import './App.css';
import Sidebar from './components/SideBar/Sidebar.jsx';
import ChatWindow from './components/ChatWindow/ChatWindow.jsx';
import { MyContext } from './context/MyContext.jsx';

function App() {
  const providerValues = {}; // passing the value using contextAPI

  return (
    <>
      <div className='app'>
        <MyContext.Provider values={providerValues}>
          <Sidebar></Sidebar>
          <ChatWindow></ChatWindow>
        </MyContext.Provider>
      </div>

    </>
  )
}

export default App
