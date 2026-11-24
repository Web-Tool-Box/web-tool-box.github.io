import React from 'react';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
  className?: string;
}

export function Logo({ size = 'md', showText = true, className = '' }: LogoProps) {
  const iconSizes = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-12 h-12',
  };

  const textSizes = {
    sm: 'text-lg',
    md: 'text-xl',
    lg: 'text-2xl',
  };

  return (
    <div className={`flex items-center gap-2.5 group select-none ${className}`}>
      {/* Modern High-End Brandmark Icon */}
      <div
        className={`${iconSizes[size]} relative flex items-center justify-center rounded-2xl bg-gradient-to-tr from-indigo-600 via-violet-600 to-fuchsia-500 p-[1.5px] shadow-lg shadow-indigo-500/25 group-hover:shadow-indigo-500/40 group-hover:scale-105 transition-all duration-300`}
      >
        <div className="w-full h-full bg-gradient-to-br from-indigo-600 via-indigo-700 to-purple-800 rounded-[14px] flex items-center justify-center p-2 relative overflow-hidden">
          {/* Subtle glossy top-light reflection */}
          <div className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white/20 to-transparent pointer-events-none" />

          {/* Precision SVG Brandmark: Modern Tech Toolkit */}
          <svg
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-full text-white relative z-10 drop-shadow-[0_1px_2px_rgba(0,0,0,0.3)]"
          >
            {/* Toolbox Handle */}
            <path
              d="M9 5.5C9 4.67 9.67 4 10.5 4H13.5C14.33 4 15 4.67 15 5.5V7H9V5.5Z"
              stroke="white"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            {/* Main Toolbox Shell */}
            <rect
              x="3"
              y="7"
              width="18"
              height="13"
              rx="2.5"
              fill="white"
              fillOpacity="0.12"
              stroke="white"
              strokeWidth="1.5"
            />
            {/* Horizontal Separation Seam */}
            <path
              d="M3 12H21"
              stroke="white"
              strokeWidth="1.2"
              strokeOpacity="0.5"
            />
            {/* Precision Gold Latch / Center Emblem */}
            <rect
              x="10.25"
              y="10.5"
              width="3.5"
              height="3"
              rx="0.75"
              fill="#FBBF24"
              stroke="#D97706"
              strokeWidth="0.5"
            />
            {/* Developer Tool Accent: Spark / Code Line */}
            <path
              d="M7 16H10M14 16H17"
              stroke="white"
              strokeWidth="1.2"
              strokeLinecap="round"
              strokeOpacity="0.75"
            />
          </svg>
        </div>
      </div>

      {/* Typography with Refined Gradient & Weighting */}
      {showText && (
        <span
          className={`font-black tracking-tight ${textSizes[size]} text-slate-900 dark:text-white flex items-center leading-none`}
        >
          <span className="group-hover:text-slate-800 dark:group-hover:text-slate-100 transition-colors">
            Web
          </span>
          <span className="bg-gradient-to-r from-indigo-600 via-violet-600 to-fuchsia-600 dark:from-indigo-400 dark:via-violet-400 dark:to-fuchsia-300 bg-clip-text text-transparent ml-0.5 group-hover:brightness-110 transition-all">
            ToolBox
          </span>
        </span>
      )}
    </div>
  );
}
