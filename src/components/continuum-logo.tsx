"use client"

interface ContinuumLogoProps {
  size?: number
}

const ContinuumLogo = ({ size = 150 }: ContinuumLogoProps) => {
  return (
    <svg width={size} height={size} viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" aria-label="Continuum Logo">
      <defs>
        <linearGradient id="continuum-purple-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{ stopColor: "#c084fc" }} />
          <stop offset="100%" style={{ stopColor: "#9333ea" }} />
        </linearGradient>
        <radialGradient id="continuum-dot-gradient">
          <stop offset="10%" style={{ stopColor: "#e9d5ff" }} />
          <stop offset="95%" style={{ stopColor: "#a855f7" }} />
        </radialGradient>
        <filter id="continuum-shadow">
          <feDropShadow dx="3" dy="5" stdDeviation="3" floodColor="#000000" floodOpacity="0.25" />
        </filter>
      </defs>

      <g filter="url(#continuum-shadow)">
        {/* Continuous wave pattern representing flow and evolution */}
        <path d="M30 100 Q60 60, 100 80 T170 100 Q140 140, 100 120 T30 100 Z" fill="url(#continuum-purple-gradient)" opacity="0.8" />
        <path d="M40 100 Q70 70, 100 90 T160 100" stroke="#f9fafb" strokeWidth="3" fill="none" strokeLinecap="round" />
        
        {/* Connected dots representing adaptive memory */}
        <circle cx="50" cy="90" r="6" fill="url(#continuum-dot-gradient)" />
        <circle cx="100" cy="85" r="6" fill="url(#continuum-dot-gradient)" />
        <circle cx="150" cy="95" r="6" fill="url(#continuum-dot-gradient)" />
        
        {/* Connecting lines showing continuity */}
        <path d="M50 90 L100 85 L150 95" stroke="#a855f7" strokeWidth="2" strokeDasharray="4 2" opacity="0.6" />
      </g>
    </svg>
  )
}

export default ContinuumLogo
