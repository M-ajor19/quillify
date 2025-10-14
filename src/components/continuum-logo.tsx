"use client"

interface ContinuumLogoProps {
  size?: number
}

const ContinuumLogo = ({ size = 150 }: ContinuumLogoProps) => {
  return (
    <svg width={size} height={size} viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" aria-label="Continuum Logo">
      <defs>
        <linearGradient id="continuum-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{ stopColor: "#c084fc" }} />
          <stop offset="50%" style={{ stopColor: "#9333ea" }} />
          <stop offset="100%" style={{ stopColor: "#7c3aed" }} />
        </linearGradient>
        <radialGradient id="continuum-center-gradient">
          <stop offset="10%" style={{ stopColor: "#e9d5ff" }} />
          <stop offset="95%" style={{ stopColor: "#a855f7" }} />
        </radialGradient>
        <filter id="continuum-shadow">
          <feDropShadow dx="3" dy="5" stdDeviation="3" floodColor="#000000" floodOpacity="0.25" />
        </filter>
      </defs>

      <g filter="url(#continuum-shadow)">
        {/* Infinity Symbol representing continuous flow */}
        <path 
          d="M50 100 C50 70, 70 50, 100 50 C130 50, 150 70, 150 100 C150 130, 130 150, 100 150 C70 150, 50 130, 50 100 Z M150 100 C150 70, 170 50, 200 50" 
          fill="none" 
          stroke="url(#continuum-gradient)" 
          strokeWidth="20" 
          strokeLinecap="round"
          opacity="0.9"
        />
        
        {/* Central Node representing memory core */}
        <circle cx="100" cy="100" r="15" fill="url(#continuum-center-gradient)" />
        
        {/* Orbital dots representing connected knowledge */}
        <circle cx="60" cy="100" r="5" fill="#c084fc" className="animate-pulse" />
        <circle cx="140" cy="100" r="5" fill="#9333ea" className="animate-pulse" style={{ animationDelay: "0.5s" }} />
        <circle cx="100" cy="60" r="5" fill="#7c3aed" className="animate-pulse" style={{ animationDelay: "1s" }} />
        <circle cx="100" cy="140" r="5" fill="#a855f7" className="animate-pulse" style={{ animationDelay: "1.5s" }} />
      </g>
    </svg>
  )
}

export default ContinuumLogo