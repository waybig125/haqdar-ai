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
      className={cn("drop-shadow-[0_8px_25px_rgba(0,0,0,0.3)] select-none pointer-events-none", className)}
    >
      <defs>
        <radialGradient id="bronzeGold" cx="50%" cy="50%" r="50%" fx="35%" fy="35%">
          <stop offset="0%" stopColor="#FFF3D6" />
          <stop offset="25%" stopColor="#E5C180" />
          <stop offset="60%" stopColor="#C5A059" />
          <stop offset="85%" stopColor="#8A6635" />
          <stop offset="100%" stopColor="#4A331A" />
        </radialGradient>
        <filter id="medallionShadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="5" stdDeviation="6" floodColor="#000000" floodOpacity="0.45" />
        </filter>
      </defs>

      {/* Decorative Outer Bezel ring */}
      <circle cx="100" cy="100" r="92" stroke="url(#bronzeGold)" strokeWidth="3" opacity="0.85" />
      <circle cx="100" cy="100" r="84" stroke="url(#bronzeGold)" strokeWidth="1" strokeDasharray="5 3" opacity="0.6" />
      <circle cx="100" cy="100" r="76" stroke="url(#bronzeGold)" strokeWidth="1.5" opacity="0.75" />

      {/* Decorative Outer studs */}
      {Array.from({ length: 12 }).map((_, i) => {
        const angle = (i * 360) / 12;
        const rad = (angle * Math.PI) / 180;
        const x = 100 + 84 * Math.cos(rad);
        const y = 100 + 84 * Math.sin(rad);
        return (
          <circle 
            key={`stud-${i}`} 
            cx={x} 
            cy={y} 
            r="3.5" 
            fill="url(#bronzeGold)" 
          />
        );
      })}

      {/* Center Shield Container */}
      <g filter="url(#medallionShadow)">
        {/* Shield Backing */}
        <path 
          d="M100 45 C125 45 150 40 150 70 C150 115 100 148 100 158 C100 148 50 115 50 70 C50 40 75 45 100 45 Z" 
          stroke="url(#bronzeGold)" 
          strokeWidth="3.5"
          fill="#3A231A"
          fillOpacity="0.4"
        />
        
        {/* Scale of Justice Path */}
        {/* Central Stand */}
        <path d="M100 65 L100 130" stroke="url(#bronzeGold)" strokeWidth="3" strokeLinecap="round" />
        <path d="M88 130 L112 130" stroke="url(#bronzeGold)" strokeWidth="4" strokeLinecap="round" />
        <circle cx="100" cy="62" r="5" fill="url(#bronzeGold)" />
        
        {/* Crossbeam */}
        <path d="M72 76 Q100 68 128 76" stroke="url(#bronzeGold)" strokeWidth="3.5" strokeLinecap="round" />
        
        {/* Left Pan */}
        <path d="M72 76 L62 108" stroke="url(#bronzeGold)" strokeWidth="1" opacity="0.8" />
        <path d="M72 76 L82 108" stroke="url(#bronzeGold)" strokeWidth="1" opacity="0.8" />
        <path d="M58 108 Q72 116 86 108 Z" fill="url(#bronzeGold)" stroke="url(#bronzeGold)" strokeWidth="1" />
        
        {/* Right Pan */}
        <path d="M128 76 L118 108" stroke="url(#bronzeGold)" strokeWidth="1" opacity="0.8" />
        <path d="M128 76 L138 108" stroke="url(#bronzeGold)" strokeWidth="1" opacity="0.8" />
        <path d="M114 108 Q128 116 142 108 Z" fill="url(#bronzeGold)" stroke="url(#bronzeGold)" strokeWidth="1" />
      </g>

      {/* Decorative center small star */}
      <path 
        d="M100 138 L102 142 L106 142 L103 144 L104 148 L100 145 L96 148 L97 144 L94 142 L98 142 Z" 
        fill="url(#bronzeGold)" 
      />
    </svg>
  );
}
