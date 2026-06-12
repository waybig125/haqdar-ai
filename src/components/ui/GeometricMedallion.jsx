"use client";

import React from 'react';
import { cn } from '@/lib/utils';

export function GeometricMedallion({ className, size = 120 }) {
  const id = React.useId().replace(/:/g, '');
  
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 200 200" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={cn("select-none pointer-events-none", className)}
    >
      <defs>
        <radialGradient id={`gold-${id}`} cx="50%" cy="50%" r="50%" fx="35%" fy="35%">
          <stop offset="0%" stopColor="#FFF3D6" />
          <stop offset="30%" stopColor="#E5C180" />
          <stop offset="65%" stopColor="#C5A059" />
          <stop offset="90%" stopColor="#8A6635" />
          <stop offset="100%" stopColor="#5A3D1A" />
        </radialGradient>
        <radialGradient id={`bg-${id}`} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#2C1B11" />
          <stop offset="100%" stopColor="#1A100A" />
        </radialGradient>
        <filter id={`glow-${id}`} x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="4" result="blur" />
          <feFlood floodColor="#D4AF37" floodOpacity="0.35" result="color" />
          <feComposite in="color" in2="blur" operator="in" result="shadow" />
          <feComposite in="SourceGraphic" in2="shadow" operator="over" />
        </filter>
      </defs>

      {/* Dark background circle */}
      <circle cx="100" cy="100" r="94" fill={`url(#bg-${id})`} />

      {/* Outer rings */}
      <circle cx="100" cy="100" r="94" stroke={`url(#gold-${id})`} strokeWidth="3" />
      <circle cx="100" cy="100" r="86" stroke={`url(#gold-${id})`} strokeWidth="1" strokeDasharray="3 5" opacity="0.5" />
      <circle cx="100" cy="100" r="80" stroke={`url(#gold-${id})`} strokeWidth="1.5" opacity="0.7" />

      {/* Inner circle border */}
      <circle cx="100" cy="100" r="56" stroke={`url(#gold-${id})`} strokeWidth="2" opacity="0.6" />
      <circle cx="100" cy="100" r="52" fill="#1A100A" stroke={`url(#gold-${id})`} strokeWidth="2.5" />

      {/* Radial lines between inner and outer ring (like a compass) */}
      {Array.from({ length: 8 }).map((_, i) => {
        const angle = (i * 360) / 8 - 90;
        const rad = (angle * Math.PI) / 180;
        const x1 = 100 + 56 * Math.cos(rad);
        const y1 = 100 + 56 * Math.sin(rad);
        const x2 = 100 + 80 * Math.cos(rad);
        const y2 = 100 + 80 * Math.sin(rad);
        return (
          <line
            key={`ray-${i}`}
            x1={x1} y1={y1} x2={x2} y2={y2}
            stroke={`url(#gold-${id})`}
            strokeWidth={i % 2 === 0 ? "2" : "1"}
            opacity={i % 2 === 0 ? "0.8" : "0.4"}
          />
        );
      })}

      {/* Small studs on the outer ring */}
      {Array.from({ length: 16 }).map((_, i) => {
        const angle = (i * 360) / 16;
        const rad = (angle * Math.PI) / 180;
        const x = 100 + 83 * Math.cos(rad);
        const y = 100 + 83 * Math.sin(rad);
        return (
          <circle
            key={`stud-${i}`}
            cx={x} cy={y}
            r={i % 2 === 0 ? "2" : "1.2"}
            fill={`url(#gold-${id})`}
            opacity={i % 2 === 0 ? "0.9" : "0.4"}
          />
        );
      })}

      {/* Scales of Justice — centered and clean */}
      <g filter={`url(#glow-${id})`}>
        {/* Stand */}
        <line x1="100" y1="72" x2="100" y2="125" stroke={`url(#gold-${id})`} strokeWidth="3" strokeLinecap="round" />
        {/* Base */}
        <line x1="88" y1="125" x2="112" y2="125" stroke={`url(#gold-${id})`} strokeWidth="4" strokeLinecap="round" />
        {/* Top circle */}
        <circle cx="100" cy="70" r="4.5" fill={`url(#gold-${id})`} />

        {/* Crossbeam */}
        <line x1="74" y1="80" x2="126" y2="80" stroke={`url(#gold-${id})`} strokeWidth="2.5" strokeLinecap="round" />

        {/* Left pan strings */}
        <line x1="74" y1="80" x2="66" y2="104" stroke={`url(#gold-${id})`} strokeWidth="1" opacity="0.7" />
        <line x1="74" y1="80" x2="82" y2="104" stroke={`url(#gold-${id})`} strokeWidth="1" opacity="0.7" />
        {/* Left pan bowl */}
        <path d="M62 104 Q74 112 86 104" stroke={`url(#gold-${id})`} strokeWidth="1.5" fill="none" />

        {/* Right pan strings */}
        <line x1="126" y1="80" x2="118" y2="104" stroke={`url(#gold-${id})`} strokeWidth="1" opacity="0.7" />
        <line x1="126" y1="80" x2="134" y2="104" stroke={`url(#gold-${id})`} strokeWidth="1" opacity="0.7" />
        {/* Right pan bowl */}
        <path d="M114 104 Q126 112 138 104" stroke={`url(#gold-${id})`} strokeWidth="1.5" fill="none" />
      </g>
    </svg>
  );
}
