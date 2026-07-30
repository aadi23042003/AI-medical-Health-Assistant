import React, { useEffect, useState, useRef } from "react";
import { Activity, ShieldPlus, NotebookText, ArrowLeft, Stethoscope } from "lucide-react";

import { motion } from "motion/react";

const DEFAULT_RESULT = {
  disease: "Seasonal Allergic Rhinitis",
  confidence: 87,
  description:
    "A common inflammatory reaction of the nasal passages triggered by airborne allergens such as pollen, dust mites, or pet dander. It typically produces sneezing, a runny or blocked nose, and itchy, watery eyes, and tends to flare up at the same time each year.",
  precautions: [
    "Keep windows closed during high-pollen hours, usually early morning.",
    "Rinse your sinuses with a saline spray after being outdoors.",
    "Avoid known triggers and wash bedding weekly in hot water.",
    "See a doctor if symptoms persist beyond two weeks or worsen.",
  ],
};

function useCountUp(target, durationMs = 1200) {
  const [value, setValue] = useState(0);
  const rafRef = useRef(null);

  useEffect(() => {
    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReduced) {
      setValue(target);
      return;
    }

    const start = performance.now();

    const tick = (now) => {
      const progress = Math.min((now - start) / durationMs, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // ease-out-cubic
      setValue(Math.round(target * eased));
      if (progress < 1) {
        rafRef.current = requestAnimationFrame(tick);
      }
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => rafRef.current && cancelAnimationFrame(rafRef.current);
  }, [target, durationMs]);

  return value;
}

function tierFor(confidence) {
  if (confidence >= 75) return { label: "High confidence", tone: "high" };
  if (confidence >= 45) return { label: "Moderate confidence", tone: "mid" };
  return { label: "Low confidence", tone: "low" };
}

const TIER_CLASSES = {
  high: "bg-emerald-400 text-neutral-950",
  mid: "bg-amber-500/15 text-amber-400",
  low: "bg-rose-500/15 text-rose-400",
};

export default function Result({ result = DEFAULT_RESULT, onBack,resultState }) {
  const { disease, confidence, description, precautions } = {
    ...DEFAULT_RESULT,
    ...result,
  };

  const shownConfidence = useCountUp(confidence);
  const tier = tierFor(confidence);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 30);
    return () => clearTimeout(t);
  }, []);

  return (
    <>
    {resultState && (<motion.div initial={{ opacity: 0}} animate={{ opacity: 1}} transition={{duration:1}} className="min-h-full w-full bg-neutral-900/60 text-white flex justify-center px-4 py-10 sm:py-16 font-sans">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,400;0,9..144,500;0,9..144,600;1,9..144,500&family=IBM+Plex+Mono:wght@500;600&display=swap');

        .hrp-serif { font-family: 'Fraunces', Georgia, serif; }
        .hrp-mono { font-family: 'IBM Plex Mono', ui-monospace, monospace; }

        .hrp-ecg-path {
          stroke-dasharray: 340;
          stroke-dashoffset: 340;
          animation: hrp-draw 1.6s 0.15s cubic-bezier(0.65, 0, 0.35, 1) forwards;
        }
        @keyframes hrp-draw {
          to { stroke-dashoffset: 0; }
        }
        @media (prefers-reduced-motion: reduce) {
          .hrp-ecg-path { animation: none; stroke-dashoffset: 0; }
        }
      `}</style>

      <div
        className={`w-full max-w-xl bg-neutral-800 border border-neutral-800 rounded-2xl p-6 sm:p-10 shadow-2xl shadow-black/60 transition-all duration-700 ease-out ${
          mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
        }`}
      >
        {onBack && (
          <button
            type="button"
            onClick={onBack}
            className="inline-flex items-center gap-1.5 text-neutral-400 hover:text-white text-sm font-medium pb-5 bg-transparent border-0 cursor-pointer transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Check another symptom
          </button>
        )}

        <div className="hrp-mono flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-emerald-400 mb-3">
          <Stethoscope className="w-3.5 h-3.5" /> Assessment result
        </div>

        <h1 className="hrp-serif text-3xl sm:text-4xl font-medium leading-tight tracking-tight mb-1">
          {result.disease ? result.disease : "Unknown condition"}
        </h1>
        <p className="text-sm text-neutral-400 mb-7">
          Based on the symptoms you described
        </p>

        {/* Confidence / vitals */}
        <div className="rounded-xl border border-neutral-800 bg-emerald-500/5 p-5 mb-7">
          <div className="flex items-end justify-between gap-3 mb-2.5">
            <div>
              <div className="hrp-mono text-xs font-semibold tracking-widest uppercase text-neutral-400 mb-1.5">
                Confidence
              </div>
              <div className="hrp-mono text-4xl sm:text-5xl font-semibold text-emerald-400 flex items-baseline gap-0.5 leading-none">
                {result.confidence !== undefined ? shownConfidence : "--"}
                <span className="text-base font-medium text-emerald-400/70">%</span>
              </div>
            </div>
            <span
              className={`text-xs font-semibold px-2.5 py-1 rounded-full whitespace-nowrap ${TIER_CLASSES[tier.tone]}`}
            >
              {tier.label}
            </span>
          </div>
          <svg className="w-full h-10 block overflow-visible" viewBox="0 0 300 40" preserveAspectRatio="none">
            <path
              className="hrp-ecg-path"
              d="M0,20 L60,20 L72,6 L84,34 L96,20 L150,20 L162,6 L174,34 L186,20 L300,20"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-emerald-400"
            />
          </svg>
        </div>

        {/* Description */}
        <div className="mb-6">
          <div className="hrp-mono flex items-center gap-1.5 text-xs font-semibold tracking-widest uppercase text-neutral-400 mb-3">
            <NotebookText className="w-3.5 h-3.5" /> About this condition
          </div>
          <p className="text-base leading-relaxed text-neutral-200">{result.description ? result.description : "No description available."}</p>
        </div>

        {/* Precautions */}
        <div className="pt-6 border-t border-neutral-800">
          <div className="hrp-mono flex items-center gap-1.5 text-xs font-semibold tracking-widest uppercase text-neutral-400 mb-3">
            <ShieldPlus className="w-3.5 h-3.5" /> What To Do Next
          </div>
          <ul className="space-y-3 list-none p-0 m-0">
            {result.precaution ? result.precaution : "No Available Data..."}
          </ul>
        </div>

        <div className="mt-7 pt-4 border-t border-dashed border-neutral-800 text-xs leading-relaxed text-neutral-500">
          <Activity className="w-3 h-3 inline-block mr-1 align-[-1px]" />
          <strong className="text-neutral-200 font-semibold">
            This is an AI-generated estimate, not a medical diagnosis.
          </strong>{" "}
          Please consult a licensed doctor for confirmation and treatment.
        </div>
      </div>
    </motion.div>)}
    </>
  );
}
