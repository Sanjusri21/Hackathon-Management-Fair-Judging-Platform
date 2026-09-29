import React from 'react';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  showTagline?: boolean;
}

export const Logo: React.FC<LogoProps> = ({ size = 'md', showTagline = false }) => {
  const iconSizes = {
    sm: 'w-7 h-7',
    md: 'w-9 h-9',
    lg: 'w-12 h-12',
  };

  const textSizes = {
    sm: 'text-base',
    md: 'text-xl',
    lg: 'text-2xl',
  };

  return (
    <div className="flex items-center gap-3 group select-none">
      {/* Geometric Logo Mark: Bowl + Code Glyph */}
      <div className={`relative flex items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500/20 via-violet-600/10 to-blue-500/20 border border-indigo-500/30 p-2 shadow-lg shadow-indigo-500/10 group-hover:border-indigo-400/60 transition-all ${iconSizes[size]}`}>
        <svg
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full text-indigo-400 group-hover:text-cyan-300 transition-colors"
        >
          {/* Bowl polygon */}
          <path
            d="M3 10C3 16 6.5 20 12 20C17.5 20 21 16 21 10H3Z"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinejoin="round"
          />
          {/* Code glyph inside: < / > styled as ears & chevron */}
          <path
            d="M8 6L5 9"
            stroke="#38bdf8"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="M16 6L19 9"
            stroke="#38bdf8"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="M10 14L8.5 15.5L10 17"
            stroke="#818cf8"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M14 14L15.5 15.5L14 17"
            stroke="#818cf8"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle cx="12" cy="15.5" r="1" fill="#06b6d4" />
        </svg>
      </div>

      <div className="flex flex-col">
        <div className="flex items-center gap-1.5 font-bold tracking-tight">
          <span className={`font-black text-transparent bg-clip-text bg-gradient-to-r from-slate-100 via-indigo-100 to-slate-200 tracking-wider ${textSizes[size]}`}>
            DOGFOOD
          </span>
          <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 uppercase tracking-widest">
            OSS
          </span>
        </div>
        {showTagline && (
          <span className="text-[11px] font-medium text-slate-400 tracking-wide">
            Build. Judge. Ship.
          </span>
        )}
      </div>
    </div>
  );
};
