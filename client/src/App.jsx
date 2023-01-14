import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'

function App() {
  const [message, setMessage] = useState('')
  const [res, setRes] = useState({})

  const handleSubmit = async (e) => {
    e.preventDefault()
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message})
    };
    try {
      const result = await fetch("http://localhost:3000", requestOptions)
      const data = await result.json()
      setRes(data)
    } catch (e) { 
    }
  }
  return (
    <div className="App">
      <form action="" onSubmit={handleSubmit}>
        <input type="text" value={message} id="" onChange={(e) => setMessage(e.target.value)}/>
        <button type="submit">Submit</button>
      </form>
      <p>
        {res.result}
      </p>
    </div>
  )
}

export default App
