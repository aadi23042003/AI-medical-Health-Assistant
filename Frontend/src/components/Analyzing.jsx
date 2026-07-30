
import { useState, useEffect } from "react";


function Analyzing({ setAnalysis, analysis }) {
  const text = "..........";

const [displayedText, setDisplayedText] = useState("");
const [index, setIndex] = useState(0);

useEffect(() => {
  if (index < text.length) {
    const timeout = setTimeout(() => {
      setDisplayedText((prev) => prev + text[index]);
      setIndex((prev) => prev + 1);
    }, 150);

    return () => clearTimeout(timeout);
  }
}, [index]);
useEffect(() => {
  if (!analysis) return;

  const timer = setTimeout(() => {
    setAnalysis(false);
  }, 5000);

  return () => clearTimeout(timer); // cancels stale timers
}, [analysis]);
useEffect(() => {
  if (analysis) {
    setDisplayedText("");
    setIndex(0);
  }
}, [analysis]);
  return (
    
      <>
      {analysis && (
  <div className="analyzing-container bg-neutral-900 flex md:absolute justify-center items-center z-50 min-h-screen w-screen p-6">
    
    <div className="analyzing-content flex flex-col md:flex-row justify-center items-center overflow-hidden">
      <h1 className="analyzing-title text-2xl md:text-4xl text-white">
        Analyzing your symptoms{displayedText}
      </h1>

      <div className="loader"></div>
    </div>

  </div>
)}
      </>
     
    
  )
}

export default Analyzing
