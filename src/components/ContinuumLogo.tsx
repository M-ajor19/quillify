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
        {/* Infinity symbol representing continuous flow */}
        <path
          d="M8 16C8 12 12 8 16 12C20 8 24 12 24 16C24 20 20 24 16 20C12 24 8 20 8 16Z"
          fill="url(#continuumGradient)"
          className="drop-shadow-sm"
        />
        
        {/* Central core representing memory/intelligence */}
        <circle
          cx="16"
          cy="16"
          r="3"
          fill="url(#coreGradient)"
          className="animate-pulse"
        />
        
        <defs>
          <linearGradient
            id="continuumGradient"
            x1="8"
            y1="8"
            x2="24"
            y2="24"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#3B82F6" />
            <stop offset="0.5" stopColor="#8B5CF6" />
            <stop offset="1" stopColor="#06B6D4" />
          </linearGradient>
          <radialGradient
            id="coreGradient"
            cx="16"
            cy="16"
            r="3"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#FFFFFF" />
            <stop offset="0.7" stopColor="#3B82F6" />
            <stop offset="1" stopColor="#1E40AF" />
          </radialGradient>
        </defs>
      </svg>
    </div>
  );
}