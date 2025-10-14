"use client"

interface ContinuumLogoProps {
  size?: number
}

const ContinuumLogo = ({ size = 150 }: ContinuumLogoProps) => {
  return (
    <svg width={size} height={size} viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" aria-label="Continuum Logo">
      <defs>
        <linearGradient id="continuum-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{ stopColor: "#3b82f6" }} />
          <stop offset="50%" style={{ stopColor: "#8b5cf6" }} />
          <stop offset="100%" style={{ stopColor: "#06b6d4" }} />
        </linearGradient>
        <radialGradient id="continuum-core-gradient">
          <stop offset="0%" style={{ stopColor: "#ffffff" }} />
          <stop offset="70%" style={{ stopColor: "#3b82f6" }} />
          <stop offset="100%" style={{ stopColor: "#1e40af" }} />
        </radialGradient>
        <filter id="continuum-glow">
          <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
          <feMerge> 
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>

      <g filter="url(#continuum-glow)">
        {/* Infinity symbol representing continuous flow */}
        <path d="M60 100 C60 80, 80 60, 100 80 C120 60, 140 80, 140 100 C140 120, 120 140, 100 120 C80 140, 60 120, 60 100 Z" 
              fill="url(#continuum-gradient)" 
              opacity="0.8" />
        
        {/* Central core representing memory/intelligence */}
        <circle cx="100" cy="100" r="15" fill="url(#continuum-core-gradient)" />
        
        {/* Flowing data points */}
        <circle cx="75" cy="85" r="3" fill="#3b82f6" opacity="0.7">
          <animateTransform attributeName="transform" type="rotate" values="0 100 100;360 100 100" dur="8s" repeatCount="indefinite"/>
        </circle>
        <circle cx="125" cy="115" r="3" fill="#8b5cf6" opacity="0.7">
          <animateTransform attributeName="transform" type="rotate" values="0 100 100;-360 100 100" dur="6s" repeatCount="indefinite"/>
        </circle>
        <circle cx="85" cy="115" r="2" fill="#06b6d4" opacity="0.6">
          <animateTransform attributeName="transform" type="rotate" values="0 100 100;360 100 100" dur="10s" repeatCount="indefinite"/>
        </circle>
        <circle cx="115" cy="85" r="2" fill="#3b82f6" opacity="0.6">
          <animateTransform attributeName="transform" type="rotate" values="0 100 100;-360 100 100" dur="7s" repeatCount="indefinite"/>
        </circle>
      </g>
    </svg>
  )
}

export default ContinuumLogo
