import { useState } from "react"
import { motion } from "motion/react"

function Home() {
  const [count, setCount] = useState(0)
  let [text,setText]=useState('')
   const startVoice = () => {
    const recognition = new window.webkitSpeechRecognition();

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setText(transcript); //update state
    };

    recognition.start();
  };

  return (
    
      <motion.div initial={{opacity:0}} animate={{opacity:1}} transition={{delay:5,duration:2}} className="bg-linear-to-r from-neutral-900 via-orange-500/50 to-neutral-900 min-h-screen gap-5 flex flex-col justify-center items-center">
        <h1 className="text-4xl font-semibold fixed top-20">🧠 AI Medical Health Assistant</h1>
        <textarea value={text} onChange={(e) => setText(e.target.value)} id='symptoms' type="text" className="bg-white/50 p-2 border-4 border-purple-500 rounded-2xl w-[80vw] h-[30vh] md:h-[20vh] md:w-[50vw]" name="" id="" placeholder="Enter the symptoms of the problems associated with the health . . . . . . . . . . . . . . . .  . . . .. .. ."/>
        <div className="flex gap-5">
          <button className="p-2 rounded-lg font-semibold cursor-pointer bg-neutral-900 text-cyan-100">Predict</button>
            <button className="p-2 rounded-lg font-semibold cursor-pointer bg-orange-700" onClick={startVoice}>🎤 Speak</button>
        </div>
      </motion.div>
     
    
  )
}

export default Home