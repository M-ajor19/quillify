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
        {/* Continuum Wave */}
        <path
          d="M4 16C8 8 12 24 16 16C20 8 24 24 28 16"
          stroke="url(#continuumGradient)"
          strokeWidth="3"
          fill="none"
          className="animate-pulse"
        />
        
        {/* Neural Network Nodes */}
        <circle cx="8" cy="12" r="2" fill="#A855F7" className="animate-pulse" />
        <circle cx="16" cy="16" r="2.5" fill="#A855F7" className="animate-pulse" />
        <circle cx="24" cy="12" r="2" fill="#A855F7" className="animate-pulse" />
        <circle cx="8" cy="20" r="2" fill="#9333EA" className="animate-pulse" />
        <circle cx="24" cy="20" r="2" fill="#9333EA" className="animate-pulse" />
        
        <defs>
          <linearGradient
            id="continuumGradient"
            x1="4"
            y1="16"
            x2="28"
            y2="16"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#A855F7" />
            <stop offset="0.5" stopColor="#9333EA" />
            <stop offset="1" stopColor="#A855F7" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}