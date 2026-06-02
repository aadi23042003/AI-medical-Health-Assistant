import { useState } from "react"
import { motion } from "motion/react"

function Home() {
  const [count, setCount] = useState(0)

  return (
    
      <motion.div initial={{opacity:0}} animate={{opacity:1}} transition={{delay:5,duration:2}} className="bg-linear-to-r from-neutral-800 via-neutral-950 to-neutral-800 min-h-screen flex justify-center items-center">
        <input type="text" className="bg-white/50 p-3 border-2 border-pink-500 rounded-2xl w-[80vw] md:w-[50vw]" name="" id="" />
      </motion.div>
     
    
  )
}

export default Home