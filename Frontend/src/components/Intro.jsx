import { useEffect, useState } from 'react'

import { motion } from "motion/react"
import img from '../assets/dd.png'
function Intro() {
  const [count, setCount] = useState(true)
  useEffect(() => {
  const timer = setTimeout(() => {
    setCount(false);
  }, 8000); // 6 seconds

  return () => clearTimeout(timer); // cleanup
}, [count]);

  return (
    
      (count && <motion.div initial={{opacity:0}} animate={{opacity:1}} transition={{duration:3,delay:0.5}} className='bg-neutral-900 z-10 min-h-screen w-screen p-6 flex absolute justify-center items-center overflow-hidden'>
        <div className='bg-pink-400 blur-[150px] md:blur-[300px] animate-pulse absolute h-60 w-[80vw] top-[30vh]'></div>
        <div className='flex gap-6'>
          <h1 className='text-2xl md:text-4xl text-white font-semibold flex flex-col my-auto'>Hello! Welcome to your <motion.p initial={{opacity:0,scale:0.2}} animate={{opacity:1,scale:1}} transition={{delay:3,duration:2}} className='text-4xl md:text-6xl text-transparent bg-linear-to-r from-purple-700 via-pink-700 to-red-700 bg-clip-text'> AI Health Assistant </motion.p></h1>
          <img src={img} className='hidden md:block h-[50vh] w-[25vw] rounded-full' />
        </div>
      </motion.div>)
     
    
  )
}

export default Intro
