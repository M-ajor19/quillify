import React from 'react';

interface ContinuumLogoProps {
  className?: string;
}

export function ContinuumLogo({ className = "w-8 h-8" }: ContinuumLogoProps) {
  return (
    <div className={`${className} relative`}>
      <svg
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
      >
        {/* Continuous flow pattern */}
        <path
          d="M4 16C4 16 8 10 16 12C24 14 28 8 28 8M28 16C28 16 24 22 16 20C8 18 4 24 4 24"
          stroke="url(#continuumGradient)"
          strokeWidth="2.5"
          strokeLinecap="round"
          className="drop-shadow-sm"
        />
        
        {/* Connected nodes representing adaptive memory */}
        <circle cx="10" cy="13" r="2.5" fill="#A855F7" className="animate-pulse" />
        <circle cx="16" cy="16" r="2.5" fill="#9333EA" />
        <circle cx="22" cy="19" r="2.5" fill="#A855F7" className="animate-pulse" style={{ animationDelay: '0.5s' }} />
        
        <defs>
          <linearGradient
            id="continuumGradient"
            x1="4"
            y1="8"
            x2="28"
            y2="24"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#A855F7" />
            <stop offset="1" stopColor="#9333EA" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}
