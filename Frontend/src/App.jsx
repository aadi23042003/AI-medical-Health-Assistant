import { useState } from 'react'

import './App.css'
import { motion } from "motion/react"
import img from './assets/dd.png'
import Intro from './components/Intro'
import Home from './components/Home'
import {useEffect} from 'react'
import Analyzing from './components/Analyzing'
import Result from './components/Result'
function App() {
  const [count, setCount] = useState(0)
  const [result, setResult] = useState({})
  const [resultState, setResultState] = useState(false)
  const [analysis, setAnalysis] = useState(false)
  const [st,setSt]=useState(false);
  return (
      <><Analyzing setAnalysis={setAnalysis} analysis={analysis}/>
      <Result result={result} onBack={() => {setSt(true)
        setResultState(false)}} resultState={resultState}/>
      <Intro/>
      <Home st={st} setSt={setSt} setResult={setResult} setAnalysis={setAnalysis} setResultState={setResultState}/>
      </>
  )
}

export default App
