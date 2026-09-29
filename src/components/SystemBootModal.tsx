import React, { useState, useEffect } from 'react';
import { Logo } from './Logo';
import { CheckCircle2, Cpu } from 'lucide-react';

export const SystemBootModal: React.FC<{ isOpen: boolean; onComplete: () => void }> = ({
  isOpen,
  onComplete,
}) => {
  const [step, setStep] = useState<number>(0);

  const checks = [
    { label: 'DATABASE RELATIONAL POOL', time: 350 },
    { label: 'AUTH MESH & CREDENTIAL GATE', time: 700 },
    { label: 'GAUSSIAN JUDGING ENGINE', time: 1050 },
    { label: 'CRYPTOGRAPHIC SUBMISSION VAULT', time: 1400 },
  ];

  useEffect(() => {
    if (!isOpen) {
      setStep(0);
      return;
    }

    const t1 = setTimeout(() => setStep(1), 350);
    const t2 = setTimeout(() => setStep(2), 700);
    const t3 = setTimeout(() => setStep(3), 1050);
    const t4 = setTimeout(() => setStep(4), 1400);
    const t5 = setTimeout(() => setStep(5), 1800);
    const tEnd = setTimeout(() => onComplete(), 2400);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
      clearTimeout(t5);
      clearTimeout(tEnd);
    };
  }, [isOpen, onComplete]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#06090e]/95 backdrop-blur-xl animate-in fade-in">
      <div className="max-w-md w-full p-8 text-center space-y-6">
        <div className="inline-block scale-110">
          <Logo size="lg" showTagline />
        </div>

        <div className="text-xs font-mono uppercase tracking-widest text-indigo-400 flex items-center justify-center gap-2">
          <Cpu className="w-4 h-4 animate-spin text-cyan-400" />
          <span>INITIALIZING EVENT INFRASTRUCTURE...</span>
        </div>

        {/* Step by Step Terminal Checks */}
        <div className="p-4 rounded-2xl bg-black/60 border border-white/10 text-left font-mono text-xs space-y-2 text-slate-300">
          {checks.map((chk, idx) => {
            const isDone = step > idx;
            const isCurrent = step === idx;
            return (
              <div key={chk.label} className="flex items-center justify-between">
                <span className={isDone ? 'text-slate-200' : isCurrent ? 'text-indigo-300' : 'text-slate-600'}>
                  {chk.label}
                </span>
                <span className="font-bold">
                  {isDone ? (
                    <span className="text-emerald-400">✓ OK</span>
                  ) : isCurrent ? (
                    <span className="text-cyan-400 animate-pulse">...</span>
                  ) : (
                    <span className="text-slate-700">WAIT</span>
                  )}
                </span>
              </div>
            );
          })}
        </div>

        {step >= 5 && (
          <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 font-mono text-xs font-bold animate-in fade-in flex items-center justify-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>SYSTEM READY • TRANSITIONING TO WORKSPACE</span>
          </div>
        )}
      </div>
    </div>
  );
};
