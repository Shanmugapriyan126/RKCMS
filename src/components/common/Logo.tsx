import React from 'react';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
}

export const Logo: React.FC<LogoProps> = ({ className = '', size = 'md', showText = true }) => {
  const sizeMap = {
    sm: 'w-6 h-6',
    md: 'w-8 h-8',
    lg: 'w-12 h-12'
  };

  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      {/* Precision Shield with Lab Flask & Hexagon Chemical Molecule (from Image 1, 4, 5) */}
      <div className={`relative flex items-center justify-center shrink-0 ${sizeMap[size]}`}>
        <svg viewBox="0 0 100 115" className="w-full h-full drop-shadow-sm" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="shieldGrad" x1="50" y1="0" x2="50" y2="115" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#1E3A8A" />
              <stop offset="50%" stopColor="#1D4ED8" />
              <stop offset="100%" stopColor="#172554" />
            </linearGradient>
            <linearGradient id="shieldRightGrad" x1="50" y1="0" x2="100" y2="115" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#2563EB" />
              <stop offset="100%" stopColor="#1E40AF" />
            </linearGradient>
            <linearGradient id="liquidGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#38BDF8" />
              <stop offset="100%" stopColor="#0284C7" />
            </linearGradient>
          </defs>

          {/* Outer Shield Path */}
          <path
            d="M50 4 L14 18 C14 62 27 92 50 111 C73 92 86 62 86 18 L50 4 Z"
            fill="url(#shieldGrad)"
          />
          {/* Subtle Right Half Shadow / Dual Tone */}
          <path
            d="M50 4 L86 18 C86 62 73 92 50 111 Z"
            fill="url(#shieldRightGrad)"
            opacity="0.85"
          />

          {/* Inner Shield Border Inset */}
          <path
            d="M50 10 L20 22 C20 59 31 85 50 102 C69 85 80 59 80 22 L50 10 Z"
            stroke="#93C5FD"
            strokeWidth="2.5"
            strokeLinejoin="round"
            fill="none"
            opacity="0.9"
          />

          {/* Center Dividing Line */}
          <line x1="50" y1="10" x2="50" y2="102" stroke="#60A5FA" strokeWidth="1.5" strokeOpacity="0.4" />

          {/* Erlenmeyer Flask */}
          {/* Neck */}
          <rect x="44" y="27" width="12" height="4" rx="2" fill="#FFFFFF" />
          <path
            d="M46 31 L46 44 L32 75 C30 79 33 83 38 83 L62 83 C67 83 70 79 68 75 L54 44 L54 31 Z"
            stroke="#FFFFFF"
            strokeWidth="3.2"
            strokeLinejoin="round"
            fill="#0F172A"
            fillOpacity="0.4"
          />

          {/* Liquid in Flask */}
          <path
            d="M34 76 Q50 71 66 76 C65 80 62 82 58 82 L42 82 C38 82 35 80 34 76 Z"
            fill="url(#liquidGrad)"
          />

          {/* Molecule Hexagon Ring */}
          <polygon
            points="50,53 58,58 58,68 50,73 42,68 42,58"
            stroke="#FFFFFF"
            strokeWidth="2.5"
            fill="#1E293B"
            fillOpacity="0.95"
          />
          {/* Inner atom & bonds */}
          <circle cx="50" cy="63" r="3" fill="#38BDF8" />
          {/* Node dots */}
          <circle cx="50" cy="53" r="1.5" fill="#FFFFFF" />
          <circle cx="58" cy="58" r="1.5" fill="#FFFFFF" />
          <circle cx="58" cy="68" r="1.5" fill="#FFFFFF" />
          <circle cx="50" cy="73" r="1.5" fill="#FFFFFF" />
          <circle cx="42" cy="68" r="1.5" fill="#FFFFFF" />
          <circle cx="42" cy="58" r="1.5" fill="#FFFFFF" />
        </svg>
      </div>

      {showText && (
        <div className="flex flex-col leading-tight">
          <div className="flex items-center gap-1.5">
            <span className="font-extrabold text-[15px] tracking-tight text-slate-900 uppercase">
              CHEMSAFE CMS
            </span>
          </div>
          <span className="text-[11px] font-medium text-slate-500 tracking-normal">
            Plant Operations Core
          </span>
        </div>
      )}
    </div>
  );
};
