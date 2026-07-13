import { useState } from 'react'

import './App.css'
import { useEffect } from 'react'

const API_BASE_URL = import.meta.env.VITE_API_URL || ''

function App() {
  const [message, setmessage] = useState(0)


  useEffect(()=>{
     fetch(`${API_BASE_URL}/api/message`)
     .then((res)=>res.json())
     .then((data)=>setmessage(data.message))
     .catch((err)=>{
      console.log("Error fetching message", err);
     })
  },[])

  return (
    <>

    <h1>Welcome to Sanufrontend </h1>

    <h2>Data {message}</h2>

      
    </>
  )
}

export default App
