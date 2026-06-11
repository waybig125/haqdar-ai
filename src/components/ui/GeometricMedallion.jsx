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
      <circle cx="100" cy="100" r="92" stroke="url(#bronzeGold)" strokeWidth="2.5" opacity="0.8" />
      <circle cx="100" cy="100" r="86" stroke="url(#bronzeGold)" strokeWidth="0.75" strokeDasharray="4 3" opacity="0.5" />

      {/* Concentric detail rings */}
      <circle cx="100" cy="100" r="76" stroke="url(#bronzeGold)" strokeWidth="1" opacity="0.6" />

      {/* Multi-layered interlocking rosette rings */}
      <g filter="url(#medallionShadow)">
        {/* Core center loop */}
        <circle cx="100" cy="100" r="32" stroke="url(#bronzeGold)" strokeWidth="3" />
        
        {/* 6 primary interlocking rings */}
        {[0, 60, 120, 180, 240, 300].map((angle, idx) => {
          const rad = (angle * Math.PI) / 180;
          const cx = 100 + 32 * Math.cos(rad);
          const cy = 100 + 32 * Math.sin(rad);
          return (
            <circle 
              key={`ring-1-${idx}`} 
              cx={cx} 
              cy={cy} 
              r="32" 
              stroke="url(#bronzeGold)" 
              strokeWidth="2.5" 
              opacity="0.9" 
            />
          );
        })}

        {/* 6 secondary interlocking outer rings */}
        {[30, 90, 150, 210, 270, 330].map((angle, idx) => {
          const rad = (angle * Math.PI) / 180;
          const cx = 100 + 55 * Math.cos(rad);
          const cy = 100 + 55 * Math.sin(rad);
          return (
            <circle 
              key={`ring-2-${idx}`} 
              cx={cx} 
              cy={cy} 
              r="32" 
              stroke="url(#bronzeGold)" 
              strokeWidth="1.5" 
              opacity="0.7" 
            />
          );
        })}
      </g>

      {/* Center core seal */}
      <circle cx="100" cy="100" r="14" fill="url(#bronzeGold)" />
      <circle cx="100" cy="100" r="16" stroke="url(#bronzeGold)" strokeWidth="1" opacity="0.8" />
      <path 
        d="M100 93 L102 99 L109 99 L104 102 L106 108 L100 104 L94 108 L96 102 L91 99 L98 99 Z" 
        fill="#3A231A" 
      />

      {/* Outer clock ticks / gold studs */}
      {Array.from({ length: 16 }).map((_, i) => {
        const angle = (i * 360) / 16;
        const rad = (angle * Math.PI) / 180;
        const x = 100 + 82 * Math.cos(rad);
        const y = 100 + 82 * Math.sin(rad);
        return (
          <circle 
            key={`stud-${i}`} 
            cx={x} 
            cy={y} 
            r="3" 
            fill="url(#bronzeGold)" 
          />
        );
      })}

      {/* Concentric thin innermost details */}
      <circle cx="100" cy="100" r="6" stroke="url(#bronzeGold)" strokeWidth="0.5" opacity="0.4" />
    </svg>
  );
}
