import React from 'react';

interface ContinuumLogoProps {
  className?: string;
  size?: number;
}

export function ContinuumLogo({ className = "w-8 h-8", size }: ContinuumLogoProps) {
  return (
    <div className={`${className} relative`}>
      <svg
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
        style={size ? { width: size, height: size } : undefined}
      >
        {/* Continuum Loop - Geometric C that doesn't fully close */}
        <path
          d="M 24 6 A 10 10 0 0 1 24 26"
          stroke="rgba(255, 255, 255, 0.9)"
          strokeWidth="2"
          strokeLinecap="square"
          fill="none"
          className="transition-opacity duration-300"
        />
        
        {/* Inner architectural line for depth */}
        <path
          d="M 21 9 A 7 7 0 0 1 21 23"
          stroke="rgba(255, 255, 255, 0.4)"
          strokeWidth="1"
          strokeLinecap="square"
          fill="none"
        />
        
        {/* Precision dot at the loop's open end - represents content being perfected */}
        <circle
          cx="8"
          cy="16"
          r="2"
          fill="#FFFFFF"
          className="transition-all duration-300"
        />
        
        {/* Subtle connecting line from dot to loop */}
        <line
          x1="10"
          y1="16"
          x2="14"
          y2="16"
          stroke="rgba(255, 255, 255, 0.3)"
          strokeWidth="1"
          strokeLinecap="square"
        />
      </svg>
    </div>
  );
}
