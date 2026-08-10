import { useState } from "react";
import { motion } from "motion/react"
import { useEffect } from "react";
const QUICK_SYMPTOMS = ["Headache", "High Fever", "Fatigue", "Chest pain", "Nausea", "Dizziness","Mild Fever","Cough","Sore Throat","Shortness of Breath","Abdominal Pain","Back Pain","Joint Pain","Muscle Pain","Rash","Vomiting","Diarrhoea","Constipation","Loss of Appetite","Weight Loss","Weight Gain","Anxiety","Depression"];

const FEATURES = [
  {
    icon: "🔍",
    color: "bg-emerald-500/10",
    title: "Symptom analysis",
    desc: "Maps your symptoms to likely conditions using clinical datasets.",
  },
  {
    icon: "📋",
    color: "bg-blue-500/10",
    title: "Care recommendations",
    desc: "Tells you whether to rest, visit a clinic, or seek urgent care.",
  },
  {
    icon: "🛡️",
    color: "bg-pink-500/10",
    title: "Private & secure",
    desc: "Your health data is never stored or shared with third parties.",
  },
];

const TRUST = [
  "Evidence-based",
  "140+ conditions covered",
  "No account required",
  "Voice input supported",
];

export default function HealthAssistantHome({setResult, setAnalysis, setResultState ,st,setSt}) {
  const [stat,setStat]=useState(false);
  
  const [symptoms, setSymptoms] = useState("");
  const [listening, setListening] = useState(false);

  const appendSymptom = (s) => {
    setSymptoms((prev) => (prev ? `${prev}, ${s}` : s));
  };

  const handleSpeak = () => {
    if (!("webkitSpeechRecognition" in window || "SpeechRecognition" in window)) {
      alert("Speech recognition is not supported in your browser.");
      return;
    }
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SR();
    recognition.lang = "en-US";
    recognition.interimResults = false;
    setListening(true);
    recognition.onresult = (e) => {
      const transcript = e.results[0][0].transcript;
      setSymptoms((prev) => (prev ? `${prev} ${transcript}` : transcript));
      setListening(false);
    };
    recognition.onerror = () => setListening(false);
    recognition.onend = () => setListening(false);
    recognition.start();
  };

  const handleAnalyze =async () => {
    if (!symptoms.trim()) return;
    const symptomsArray = symptoms.split(",").map(s => s.trim());
    await fetch("http://localhost:8000/api/analytics/", {
    method: "POST",
    headers: {
       "Content-Type": "application/json"
    },
    body: JSON.stringify({
       "symptoms": symptomsArray
    })
  }).then(response => response.json())
  .then(data => {
    
    setResult(data.result);
    setAnalysis(true);
    setSt(false)
    setTimeout(() => {
      
      
    setResultState(true);
    }, 5000); // 5 seconds delay
    
  })
  .catch((error) => {
    console.error("Error:", error);
  });
    
  };
  
  
  useEffect(() => {
  const timer = setTimeout(() => {
    setSt(true);
  }, 8000);

  return () => clearTimeout(timer); // cleanup
}, []);
  return (
    (st && <motion.div initial={{opacity:0}} animate={{opacity:1}} transition={{duration:2}}
      className="min-h-screen bg-[#0a0f1a] text-[#e8edf7] font-['DM_Sans',sans-serif] relative overflow-hidden"
      style={{ fontFamily: "'DM Sans', sans-serif" }}
    >
      {/* Google Fonts */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;600;700&family=DM+Sans:ital,wght@0,300;0,400;0,500;1,300&display=swap');
        @keyframes pulse-dot { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:.5;transform:scale(.75)} }
        .badge-dot { animation: pulse-dot 2s ease-in-out infinite; }
        textarea::placeholder { color: rgba(232,237,247,0.25); }
        textarea:focus { outline: none; }
      `}</style>

      {/* Background orbs */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-24 -left-20 w-[420px] h-[420px] rounded-full bg-pink-400/50 opacity-30 animate-pulse"
          style={{ filter: "blur(90px)" }} />
        <div className="absolute top-24 -right-16 w-[300px] h-[300px] rounded-full bg-blue-600/50 opacity-25 animate-pulse"
          style={{ filter: "blur(80px)" }} />
        <div className="absolute bottom-0 left-[40%] w-[220px] h-[220px] rounded-full bg-[#3a1a6b] opacity-20 animate-pulse"
          style={{ filter: "blur(70px)" }} />
      </div>

      {/* Navbar */}
      <nav className="relative z-10 flex items-center justify-between px-8 py-4 border-b border-white/20">
        <div className="flex items-center gap-2.5" style={{ fontFamily: "'Sora', sans-serif" }}>
          <div className="w-8 h-8 rounded-lg flex items-center justify-center text-base"
            style={{ background: "linear-gradient(135deg, #1dbd97, #1d6bbd)" }}>
            🧬
          </div>
          <span className="font-semibold text-sm tracking-tight text-[#e8edf7]">Health Assistant</span>
        </div>

        

        
      </nav>

      {/* Hero */}
      <section className="relative z-10 text-center px-6 pt-14 pb-10">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 bg-[rgba(29,189,151,0.1)] border border-[rgba(29,189,151,0.22)] rounded-full px-3.5 py-1.5 mb-5">
          <span className="badge-dot w-1.5 h-1.5 rounded-full bg-[#1dbd97]" />
          <span className="text-[10.5px] font-medium tracking-widest uppercase text-[#1dbd97]">
            AI-powered health insights
          </span>
        </div>

        {/* Headline */}
        <h1
          className="text-4xl md:text-5xl font-bold leading-tight tracking-tight text-[#f0f4fc] mb-3"
          style={{ fontFamily: "'Sora', sans-serif", letterSpacing: "-1.5px" }}
        >
          Understand your symptoms.<br />
          <span className="text-[#1dbd97]">Get answers instantly.</span>
        </h1>

        <p className="text-sm md:text-base text-[rgba(232,237,247,0.5)] leading-relaxed max-w-md mx-auto mb-9 font-light">
          Describe what you're experiencing and our AI assistant analyzes patterns,
          suggests possible conditions, and guides you toward the right care.
        </p>

        {/* Input card */}
        <div className="max-w-xl mx-auto bg-white/[0.04] border border-white/[0.1] rounded-2xl p-5 focus-within:border-[rgba(29,189,151,0.45)] focus-within:bg-[rgba(29,189,151,0.02)] transition-all duration-200">
          <label className="flex items-center gap-1.5 text-[10px] font-medium uppercase tracking-widest text-[rgba(232,237,247,0.3)] mb-2.5">
            <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M12 2a3 3 0 0 1 3 3v7a3 3 0 0 1-6 0V5a3 3 0 0 1 3-3z" />
              <path d="M19 10v2a7 7 0 0 1-14 0v-2M12 19v3M8 22h8" />
            </svg>
            Describe your symptoms
          </label>

          <textarea
            className="w-full min-h-[88px] bg-transparent border-none resize-none text-[#e8edf7] text-sm leading-relaxed caret-[#1dbd97]"
            placeholder="e.g. I have a persistent headache for 3 days, mild fever, and neck stiffness..."
            value={symptoms}
            onChange={(e) => setSymptoms(e.target.value)}
          />

          {/* Footer row */}
          <div className="flex items-center justify-between mt-3 pt-3 border-t border-white/[0.06] flex-wrap gap-2">
            {/* Quick chips */}
            <div className="flex flex-wrap gap-1.5">
              {QUICK_SYMPTOMS.map((s) => (
                <button
                  key={s}
                  onClick={() => appendSymptom(s)}
                  className="text-[10.5px] text-[rgba(232,237,247,0.38)] bg-white/[0.05] border border-white/[0.07] rounded-md px-2.5 py-1 hover:bg-[rgba(29,189,151,0.12)] hover:text-[#1dbd97] hover:border-[rgba(29,189,151,0.3)] transition-all"
                >
                  {s}
                </button>
              ))}
            </div>

            {/* Buttons */}
            <div className="flex gap-2">
              <button
                onClick={handleSpeak}
                className={`flex items-center gap-1.5 text-xs px-4 py-2 rounded-lg border transition-all ${
                  listening
                    ? "bg-[rgba(29,189,151,0.15)] text-[#1dbd97] border-[rgba(29,189,151,0.4)]"
                    : "bg-white/[0.05] text-[rgba(232,237,247,0.55)] border-white/[0.1] hover:bg-white/10 hover:text-[#e8edf7]"
                }`}
              >
                <svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M12 2a3 3 0 0 1 3 3v7a3 3 0 0 1-6 0V5a3 3 0 0 1 3-3z" />
                  <path d="M19 10v2a7 7 0 0 1-14 0v-2M12 19v3M8 22h8" />
                </svg>
                {listening ? "Listening…" : "Speak"}
              </button>

              <button
                onClick={handleAnalyze}
                disabled={!symptoms.trim()}
                className="flex items-center gap-1.5 text-xs font-semibold px-5 py-2 rounded-lg bg-[#1dbd97] text-[#0a0f1a] hover:bg-[#22d4ac] active:scale-95 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
                  <path d="M12 3l1.5 4.5H18l-3.75 2.73 1.43 4.4L12 12.1l-3.68 2.53 1.43-4.4L6 7.5h4.5L12 3z" />
                </svg>
                Analyze
              </button>
            </div>
          </div>
        </div>

        <p className="text-[10.5px] text-[rgba(232,237,247,0.22)] mt-3">
          Not a substitute for professional medical advice. Always consult a doctor.
        </p>
      </section>

      {/* Feature cards */}
      <section className="relative z-10 px-6 pb-8">
        <p className="text-center text-[20px] uppercase tracking-widest text-white/80 font-semibold mb-4">
          What you get
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-2xl mx-auto">
          {FEATURES.map((f) => (
            <div
              key={f.title}
              className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-4 hover:bg-[rgba(29,189,151,0.05)] hover:border-[rgba(29,189,151,0.18)] hover:scale-105 transition-all cursor-default"
            >
              <div className={`w-9 h-9 ${f.color} rounded-lg flex items-center justify-center text-base mb-3`}>
                {f.icon}
              </div>
              <p className="text-sm font-medium text-[#e8edf7] mb-1">{f.title}</p>
              <p className="text-[11.5px] text-[rgba(232,237,247,0.37)] leading-snug">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Trust bar */}
      <div className="relative z-10 flex flex-wrap items-center justify-center gap-5 px-6 py-4 border-t border-white/[0.05]">
        {TRUST.map((item) => (
          <div key={item} className="flex items-center gap-1.5 text-[11px] text-[rgba(232,237,247,0.28)]">
            <svg width="12" height="12" fill="none" stroke="#1dbd97" strokeWidth="2.5" viewBox="0 0 24 24" opacity="0.6">
              <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            {item}
          </div>
        ))}
      </div>
    </motion.div>)
  );
}

