"use client"

interface QuillifyLogoProps {
  size?: number
}

const QuillifyLogo = ({ size = 150 }: QuillifyLogoProps) => {
  return (
    <svg width={size} height={size} viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" aria-label="Continuum Logo">
      <defs>
        <linearGradient id="quillify-purple-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{ stopColor: "#c084fc" }} />
          <stop offset="100%" style={{ stopColor: "#9333ea" }} />
        </linearGradient>
        <radialGradient id="quillify-dot-gradient">
          <stop offset="10%" style={{ stopColor: "#e9d5ff" }} />
          <stop offset="95%" style={{ stopColor: "#a855f7" }} />
        </radialGradient>
        <filter id="quillify-shadow">
          <feDropShadow dx="3" dy="5" stdDeviation="3" floodColor="#000000" floodOpacity="0.25" />
        </filter>
      </defs>

      <g filter="url(#quillify-shadow)">
        {/* Main white feather body */}
        <path d="M85 180 C60 140, 90 80, 145 20 C130 90, 115 130, 85 180 Z" fill="#f9fafb" />
        {/* Purple curved overlay */}
        <path d="M85 180 C75 150, 85 110, 100 45 C95 110, 90 140, 85 180 Z" fill="url(#quillify-purple-gradient)" />
        {/* Quill tip - layered for detail */}
        <path d="M85 180 L82 177 L92 187 L85 180 Z" fill="#e5e7eb" />
        <path d="M85 180 L83 178 L88 183 L85 180 Z" fill="#4b5563" />

        {/* Subtle cut lines */}
        <path d="M115 90 L135 105" stroke="#d1d5db" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M110 115 L125 125" stroke="#d1d5db" strokeWidth="1.5" strokeLinecap="round" />

        {/* Purple dot with gradient for 3D effect */}
        <circle cx="150" cy="40" r="7" fill="url(#quillify-dot-gradient)" />
      </g>
    </svg>
  )
}

export default QuillifyLogo
