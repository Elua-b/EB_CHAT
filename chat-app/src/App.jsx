import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import Register from './pages/Register'
import './styles.css';
import Login from './pages/Login';
import Home from './pages/Home';

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      {/* <Login/> */}
      {/* <Register/> */}
      <Home/>
    </div>
  )
}

export default App
