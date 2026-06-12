"use client";

import React from 'react';
import { cn } from '@/lib/utils';

export function GeometricMedallion({ className, size = 120 }) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 200 200" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={cn("drop-shadow-[0_8px_25px_rgba(197,160,89,0.3)] select-none pointer-events-none animate-[pulse_4s_ease-in-out_infinite]", className)}
    >
      <defs>
        <radialGradient id="premiumGold" cx="50%" cy="50%" r="50%" fx="30%" fy="30%">
          <stop offset="0%" stopColor="#FFF7D6" />
          <stop offset="20%" stopColor="#F5D08B" />
          <stop offset="50%" stopColor="#D4AF37" />
          <stop offset="85%" stopColor="#AA7C11" />
          <stop offset="100%" stopColor="#5A4208" />
        </radialGradient>
        <radialGradient id="emeraldGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#10B981" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#047857" stopOpacity="0" />
        </radialGradient>
        <filter id="glowEffect" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="0" stdDeviation="8" floodColor="#D4AF37" floodOpacity="0.5" />
        </filter>
        <filter id="innerShadow">
          <feOffset dx="0" dy="2"/>
          <feGaussianBlur stdDeviation="3" result="offset-blur"/>
          <feComposite operator="out" in="SourceGraphic" in2="offset-blur" result="inverse"/>
          <feFlood floodColor="black" floodOpacity="0.7" result="color"/>
          <feComposite operator="in" in="color" in2="inverse" result="shadow"/>
          <feComposite operator="over" in="shadow" in2="SourceGraphic"/>
        </filter>
      </defs>

      {/* Subtle background glow */}
      <circle cx="100" cy="100" r="95" fill="url(#emeraldGlow)" />

      {/* Outer intricate border rings */}
      <circle cx="100" cy="100" r="92" stroke="url(#premiumGold)" strokeWidth="1.5" opacity="0.6" />
      <circle cx="100" cy="100" r="88" stroke="url(#premiumGold)" strokeWidth="4" filter="url(#glowEffect)" />
      <circle cx="100" cy="100" r="82" stroke="url(#premiumGold)" strokeWidth="1" strokeDasharray="2 4" opacity="0.8" />
      <circle cx="100" cy="100" r="76" stroke="url(#premiumGold)" strokeWidth="2" />

      {/* Geometric 8-pointed star base */}
      <g stroke="url(#premiumGold)" strokeWidth="2" fill="#1A110A" fillOpacity="0.6">
        <path d="M100 24 L115 76 L176 76 L127 106 L145 158 L100 125 L55 158 L73 106 L24 76 L85 76 Z" />
        <path d="M100 176 L85 124 L24 124 L73 94 L55 42 L100 75 L145 42 L127 94 L176 124 L115 124 Z" />
      </g>

      {/* Inner circular crest */}
      <circle cx="100" cy="100" r="48" fill="#2C1B11" stroke="url(#premiumGold)" strokeWidth="3" filter="url(#innerShadow)" />
      <circle cx="100" cy="100" r="42" stroke="url(#premiumGold)" strokeWidth="1" strokeDasharray="4 2" opacity="0.5" />

      {/* Center scales of justice icon, highly refined */}
      <g filter="url(#glowEffect)">
        {/* Base and stand */}
        <path d="M100 75 L100 120" stroke="url(#premiumGold)" strokeWidth="3.5" strokeLinecap="round" />
        <path d="M90 120 L110 120" stroke="url(#premiumGold)" strokeWidth="4.5" strokeLinecap="round" />
        <circle cx="100" cy="73" r="4" fill="url(#premiumGold)" />
        
        {/* Crossbeam */}
        <path d="M78 82 Q100 76 122 82" stroke="url(#premiumGold)" strokeWidth="3" strokeLinecap="round" />
        
        {/* Left Pan */}
        <path d="M78 82 L70 102" stroke="url(#premiumGold)" strokeWidth="1" opacity="0.7" />
        <path d="M78 82 L86 102" stroke="url(#premiumGold)" strokeWidth="1" opacity="0.7" />
        <path d="M66 102 Q78 108 90 102 Z" fill="url(#premiumGold)" />
        
        {/* Right Pan */}
        <path d="M122 82 L114 102" stroke="url(#premiumGold)" strokeWidth="1" opacity="0.7" />
        <path d="M122 82 L130 102" stroke="url(#premiumGold)" strokeWidth="1" opacity="0.7" />
        <path d="M110 102 Q122 108 134 102 Z" fill="url(#premiumGold)" />
      </g>

      {/* Decorative corner studs inside the rings */}
      {Array.from({ length: 16 }).map((_, i) => {
        const angle = (i * 360) / 16;
        const rad = (angle * Math.PI) / 180;
        const x = 100 + 62 * Math.cos(rad);
        const y = 100 + 62 * Math.sin(rad);
        return (
          <circle 
            key={`stud-${i}`} 
            cx={x} 
            cy={y} 
            r={i % 2 === 0 ? "2.5" : "1.5"} 
            fill="url(#premiumGold)" 
            opacity={i % 2 === 0 ? "1" : "0.5"}
          />
        );
      })}
    </svg>
  );
}
