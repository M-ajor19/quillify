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
        {/* Infinity Symbol representing continuous flow */}
        <path
          d="M8 16C8 13.2386 10.2386 11 13 11C14.3807 11 15.6307 11.5346 16.5607 12.3928L16 13L15.4393 12.3928C14.6307 11.5346 13.3807 11 12 11C9.23858 11 7 13.2386 7 16C7 18.7614 9.23858 21 12 21C13.3807 21 14.6307 20.4654 15.4393 19.6072L16 19L16.5607 19.6072C17.3693 20.4654 18.6193 21 20 21C22.7614 21 25 18.7614 25 16C25 13.2386 22.7614 11 20 11C18.6193 11 17.3693 11.5346 16.5607 12.3928L16 13L16.5607 12.3928C17.3693 11.5346 18.6193 11 20 11C22.7614 11 25 13.2386 25 16C25 18.7614 22.7614 21 20 21C18.6193 21 17.3693 20.4654 16.5607 19.6072L16 19"
          stroke="url(#continuumGradient)"
          strokeWidth="2"
          strokeLinecap="round"
          className="drop-shadow-sm"
        />
        
        {/* Central Node */}
        <circle
          cx="16"
          cy="16"
          r="2"
          fill="#A855F7"
          className="animate-pulse"
        />
        
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
            <stop offset="1" stopColor="#7C3AED" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}