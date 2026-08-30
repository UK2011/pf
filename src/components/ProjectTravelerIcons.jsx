import React from 'react';


export const TennisBallSVG = ({ size = 48, ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="-25 -25 50 50"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    style={{ overflow: 'visible', filter: 'drop-shadow(0 4px 10px rgba(190, 242, 100, 0.4))' }}
    {...props}
  >
    <defs>
      <radialGradient id="tennisGradient" cx="-30%" cy="-30%" r="90%">
        <stop offset="0%" stopColor="#facc15" />
        <stop offset="60%" stopColor="#bef264" />
        <stop offset="100%" stopColor="#84cc16" />
      </radialGradient>
      <filter id="feltTexture" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="0" dy="2" stdDeviation="2" floodColor="#4d7c0f" floodOpacity="0.3" />
      </filter>
    </defs>


    <circle cx="0" cy="0" r="22" fill="url(#tennisGradient)" filter="url(#feltTexture)" />


    <path
      d="M -16 -15 C -4 -7 -4 7 -16 15"
      stroke="#ffffff"
      strokeWidth="2.4"
      strokeLinecap="round"
      fill="none"
      opacity="0.9"
    />
    <path
      d="M 16 -15 C 4 -7 4 7 16 15"
      stroke="#ffffff"
      strokeWidth="2.4"
      strokeLinecap="round"
      fill="none"
      opacity="0.9"
    />

    <ellipse cx="-7" cy="-7" rx="5" ry="3" fill="#ffffff" opacity="0.35" transform="rotate(-30 -7 -7)" />
  </svg>
);

export const FootballSVG = ({ size = 52, ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="-26 -26 52 52"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    style={{ overflow: 'visible', filter: 'drop-shadow(0 6px 12px rgba(0,0,0,0.5))' }}
    {...props}
  >
    <defs>
      <radialGradient id="footballShade" cx="-20%" cy="-20%" r="90%">
        <stop offset="0%" stopColor="#ffffff" />
        <stop offset="70%" stopColor="#e2e8f0" />
        <stop offset="100%" stopColor="#94a3b8" />
      </radialGradient>
      <linearGradient id="patchGrad" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#1e293b" />
        <stop offset="100%" stopColor="#0f172a" />
      </linearGradient>
    </defs>

    <circle cx="0" cy="0" r="22" fill="url(#footballShade)" stroke="#334155" strokeWidth="1.2" />


    <polygon
      points="0,-8 7.6,-2.5 4.7,6.5 -4.7,6.5 -7.6,-2.5"
      fill="url(#patchGrad)"
      stroke="#0f172a"
      strokeWidth="0.8"
    />


    <line x1="0" y1="-8" x2="0" y2="-18" stroke="#334155" strokeWidth="1.5" />
    <line x1="7.6" y1="-2.5" x2="17" y2="-7" stroke="#334155" strokeWidth="1.5" />
    <line x1="4.7" y1="6.5" x2="12" y2="17" stroke="#334155" strokeWidth="1.5" />
    <line x1="-4.7" y1="6.5" x2="-12" y2="17" stroke="#334155" strokeWidth="1.5" />
    <line x1="-7.6" y1="-2.5" x2="-17" y2="-7" stroke="#334155" strokeWidth="1.5" />

    <polygon points="0,-18 5,-21 -5,-21" fill="url(#patchGrad)" />
    <polygon points="17,-7 21,-3 20,-12" fill="url(#patchGrad)" />
    <polygon points="12,17 19,13 14,21" fill="url(#patchGrad)" />
    <polygon points="-12,17 -19,13 -14,21" fill="url(#patchGrad)" />
    <polygon points="-17,-7 -21,-3 -20,-12" fill="url(#patchGrad)" />
  </svg>
);

export const F1CarSVG = ({ size = 70, ...props }) => (
  <svg
    width={size}
    height={size * 0.55}
    viewBox="-40 -22 80 44"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    style={{ overflow: 'visible', filter: 'drop-shadow(0 6px 15px rgba(239, 68, 68, 0.45))' }}
    {...props}
  >
    <defs>
      {/* Race Red Body Gradient */}
      <linearGradient id="f1BodyGrad" x1="-30" y1="0" x2="35" y2="0" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#b91c1c" />
        <stop offset="40%" stopColor="#ef4444" />
        <stop offset="85%" stopColor="#dc2626" />
        <stop offset="100%" stopColor="#991b1b" />
      </linearGradient>
      {/* Carbon Fiber Dark Gradient */}
      <linearGradient id="carbonGrad" x1="0" y1="-15" x2="0" y2="15">
        <stop offset="0%" stopColor="#18181b" />
        <stop offset="100%" stopColor="#09090b" />
      </linearGradient>
      {/* Jet Flame Exhaust Glow */}
      <radialGradient id="exhaustFlame" cx="0%" cy="50%" r="100%">
        <stop offset="0%" stopColor="#38bdf8" />
        <stop offset="40%" stopColor="#6366f1" />
        <stop offset="100%" stopColor="transparent" />
      </radialGradient>
    </defs>


    <ellipse cx="-35" cy="0" rx="8" ry="4" fill="url(#exhaustFlame)" opacity="0.85" />

    {/* Front Tires */}
    <rect x="16" y="-19" width="10" height="6" rx="2" fill="#18181b" stroke="#3f3f46" strokeWidth="0.8" />
    <rect x="16" y="13" width="10" height="6" rx="2" fill="#18181b" stroke="#3f3f46" strokeWidth="0.8" />
    {/* Rear Tires (Wider) */}
    <rect x="-24" y="-20" width="12" height="7" rx="2.5" fill="#18181b" stroke="#3f3f46" strokeWidth="0.8" />
    <rect x="-24" y="13" width="12" height="7" rx="2.5" fill="#18181b" stroke="#3f3f46" strokeWidth="0.8" />

    {/* Front Wing Assembly */}
    <path d="M 24 -16 L 36 -12 L 36 12 L 24 16 L 26 0 Z" fill="url(#carbonGrad)" stroke="#ef4444" strokeWidth="0.8" />

    {/* Main Chassis / Aerodynamic Bodywork */}
    <path
      d="M -28 -7 
         L -12 -7 
         L -2 -11 
         L 18 -5 
         L 33 -2 
         C 35 -1 35 1 33 2 
         L 18 5 
         L -2 11 
         L -12 7 
         L -28 7 
         Z"
      fill="url(#f1BodyGrad)"
    />

    {/* Cockpit & Driver Helmet */}
    <ellipse cx="2" cy="0" rx="6" ry="3.5" fill="#09090b" />
    <circle cx="2" cy="0" r="2.2" fill="#fbbf24" stroke="#d97706" strokeWidth="0.5" />

    {/* Engine Intake & Halo */}
    <path d="M -5 -3 L 1 -3 L 0 3 L -5 3 Z" fill="#27272a" />
    <line x1="2" y1="-4" x2="8" y2="0" stroke="#d4d4d8" strokeWidth="1" strokeLinecap="round" />
    <line x1="2" y1="4" x2="8" y2="0" stroke="#d4d4d8" strokeWidth="1" strokeLinecap="round" />

    {/* Rear Wing Endplates & Main Aerofoil */}
    <rect x="-30" y="-14" width="5" height="28" rx="1.5" fill="url(#carbonGrad)" stroke="#dc2626" strokeWidth="0.8" />
    <rect x="-28" y="-12" width="2" height="24" fill="#ef4444" />
  </svg>
);
