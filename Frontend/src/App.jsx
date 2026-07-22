import { useState } from 'react'

import './App.css'
import { motion } from "motion/react"
import img from './assets/dd.png'
import Intro from './components/Intro'
import Home from './components/Home'
function App() {
  const [count, setCount] = useState(0)

  return (
    
      <>
      <Intro/>
      <Home/>
      </>
     
    
  )
}

export default App
