import './App.css';
import Sidebar from './Sidebar';
import ChatWindow from './ChatWindow';
import { MyContext } from './MyContext.jsx';

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
