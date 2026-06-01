import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import { motion } from "motion/react"
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <motion.div initial={{opacity:0}} animate={{opacity:1}} transition={{duration:3,delay:0.5}} className='bg-neutral-900 h-screen'>

      </motion.div>
     
    </>
  )
}

export default App
