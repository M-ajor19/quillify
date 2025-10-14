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
        aria-label="Continuum Logo"
      >
        {/* Continuum mark */}
        <path
          d="M28 4C28 4 20 8 16 16C12 8 4 4 4 4C4 4 8 12 16 16C8 20 4 28 4 28C4 28 12 24 16 16C20 24 28 28 28 28C28 28 24 20 16 16C24 12 28 4 28 4Z"
          fill="url(#continuumGradient)"
          className="drop-shadow-sm"
        />

        {/* Pulse dot */}
        <circle cx="16" cy="24" r="2" fill="#A855F7" className="animate-pulse" />

        <defs>
          <linearGradient id="continuumGradient" x1="4" y1="4" x2="28" y2="28" gradientUnits="userSpaceOnUse">
            <stop stopColor="#A855F7" />
            <stop offset="1" stopColor="#9333EA" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}
