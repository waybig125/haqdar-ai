"use client";

import React from 'react';
import { cn } from '@/lib/utils';

export function GeometricMedallion({ className, size = 120 }) {
  const id = React.useId().replace(/:/g, '');

  // Helper: point on circle
  const pt = (cx, cy, r, angleDeg) => {
    const rad = ((angleDeg - 90) * Math.PI) / 180;
    const x = cx + r * Math.cos(rad);
    const y = cy + r * Math.sin(rad);
    return [
      parseFloat(x.toFixed(4)),
      parseFloat(y.toFixed(4))
    ];
  };

  // Generate an N-pointed star polygon as SVG path
  const starPath = (cx, cy, outerR, innerR, points) => {
    const pts = [];
    for (let i = 0; i < points * 2; i++) {
      const r = i % 2 === 0 ? outerR : innerR;
      const angle = (i * 360) / (points * 2);
      const [x, y] = pt(cx, cy, r, angle);
      pts.push(`${x},${y}`);
    }
    return `M${pts.join('L')}Z`;
  };

  // Islamic-style interlocking hexagonal rosette petal
  const petalPath = (cx, cy, r, angleDeg) => {
    const a1 = angleDeg - 15;
    const a2 = angleDeg + 15;
    const [x1, y1] = pt(cx, cy, r * 0.45, a1);
    const [x2, y2] = pt(cx, cy, r, angleDeg);
    const [x3, y3] = pt(cx, cy, r * 0.45, a2);
    return `M${cx},${cy} Q${x1},${y1} ${x2},${y2} Q${x3},${y3} ${cx},${cy}`;
  };

  const g = `url(#gold-${id})`;

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
        {/* Rich multi-stop gold gradient */}
        <radialGradient id={`gold-${id}`} cx="50%" cy="50%" r="50%" fx="38%" fy="38%">
          <stop offset="0%" stopColor="#FFFBE6" />
          <stop offset="15%" stopColor="#F5D98C" />
          <stop offset="40%" stopColor="#D4AF37" />
          <stop offset="70%" stopColor="#B8922A" />
          <stop offset="90%" stopColor="#8A6B1D" />
          <stop offset="100%" stopColor="#634D14" />
        </radialGradient>

        {/* Dark mahogany background (theme-adapted via CSS variables) */}
        <radialGradient id={`bg-${id}`} cx="50%" cy="50%" r="55%">
          <stop offset="0%" stopColor="var(--medallion-bg-start)" />
          <stop offset="70%" stopColor="var(--medallion-bg-mid)" />
          <stop offset="100%" stopColor="var(--medallion-bg-end)" />
        </radialGradient>

        {/* Jade Green Gradient for Center Disc */}
        <radialGradient id={`jade-${id}`} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#22C55E" />
          <stop offset="65%" stopColor="#15803D" />
          <stop offset="100%" stopColor="#14532D" />
        </radialGradient>

        {/* Warm inner glow */}
        <radialGradient id={`innerglow-${id}`} cx="50%" cy="45%" r="40%">
          <stop offset="0%" stopColor="#D4AF37" stopOpacity="0.12" />
          <stop offset="100%" stopColor="#D4AF37" stopOpacity="0" />
        </radialGradient>

        {/* Edge bevel highlight */}
        <linearGradient id={`bevel-${id}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFF3D6" stopOpacity="0.6" />
          <stop offset="50%" stopColor="#C5A059" stopOpacity="0.2" />
          <stop offset="100%" stopColor="#634D14" stopOpacity="0.6" />
        </linearGradient>

        {/* Golden glow filter for the center icon */}
        <filter id={`glow-${id}`} x="-40%" y="-40%" width="180%" height="180%">
          <feGaussianBlur stdDeviation="2.5" result="blur" />
          <feFlood floodColor="#D4AF37" floodOpacity="0.4" result="color" />
          <feComposite in="color" in2="blur" operator="in" result="shadow" />
          <feComposite in="SourceGraphic" in2="shadow" operator="over" />
        </filter>

        {/* Emboss effect for the outer ring */}
        <filter id={`emboss-${id}`} x="-5%" y="-5%" width="110%" height="110%">
          <feGaussianBlur in="SourceAlpha" stdDeviation="1" result="blur" />
          <feOffset dx="1" dy="1" result="offsetBlur" />
          <feFlood floodColor="#000" floodOpacity="0.35" result="shadow" />
          <feComposite in="shadow" in2="offsetBlur" operator="in" result="darkShadow" />
          <feOffset in="SourceAlpha" dx="-0.5" dy="-0.5" result="highlightOffset" />
          <feGaussianBlur in="highlightOffset" stdDeviation="0.5" result="highlightBlur" />
          <feFlood floodColor="#FFF3D6" floodOpacity="0.2" result="highlight" />
          <feComposite in="highlight" in2="highlightBlur" operator="in" result="lightHighlight" />
          <feMerge>
            <feMergeNode in="darkShadow" />
            <feMergeNode in="SourceGraphic" />
            <feMergeNode in="lightHighlight" />
          </feMerge>
        </filter>
      </defs>

      {/* ====== LAYER 1: Base disc ====== */}
      <circle cx="100" cy="100" r="96" fill={`url(#bg-${id})`} />
      <circle cx="100" cy="100" r="96" fill={`url(#innerglow-${id})`} />

      {/* ====== LAYER 2: Outer bezel ring (thick, embossed) ====== */}
      <g filter={`url(#emboss-${id})`}>
        <circle cx="100" cy="100" r="96" stroke={g} strokeWidth="4.5" fill="none" />
        <circle cx="100" cy="100" r="89" stroke={g} strokeWidth="1.5" fill="none" opacity="0.6" />
      </g>

      {/* Knurled edge — tiny marks around outer rim */}
      {Array.from({ length: 60 }).map((_, i) => {
        const [x1, y1] = pt(100, 100, 93, i * 6);
        const [x2, y2] = pt(100, 100, 96, i * 6);
        return (
          <line
            key={`knurl-${i}`}
            x1={x1} y1={y1} x2={x2} y2={y2}
            stroke={g} strokeWidth="0.6" opacity="0.35"
          />
        );
      })}

      {/* ====== LAYER 3: Decorative band between outer and inner ====== */}
      {/* Geometric Islamic-inspired 12-petaled rosette */}
      <g opacity="0.5">
        {Array.from({ length: 12 }).map((_, i) => (
          <path
            key={`petal-${i}`}
            d={petalPath(100, 100, 87, i * 30)}
            stroke={g}
            strokeWidth="1"
            fill={g}
            fillOpacity="0.06"
          />
        ))}
      </g>

      {/* Mid-ring dashed circle */}
      <circle cx="100" cy="100" r="83" stroke={g} strokeWidth="0.7" strokeDasharray="2 3" opacity="0.35" />

      {/* 12-pointed star ring — the showpiece geometric pattern */}
      <path
        d={starPath(100, 100, 80, 68, 12)}
        stroke={g}
        strokeWidth="1.2"
        fill={g}
        fillOpacity="0.04"
        opacity="0.7"
      />

      {/* Inner decorative circle */}
      <circle cx="100" cy="100" r="64" stroke={g} strokeWidth="1.5" opacity="0.5" />
      <circle cx="100" cy="100" r="60" stroke={g} strokeWidth="0.7" strokeDasharray="4 3" opacity="0.3" />

      {/* Diamond studs at cardinal and ordinal points */}
      {Array.from({ length: 8 }).map((_, i) => {
        const [cx, cy] = pt(100, 100, 72, i * 45);
        const s = i % 2 === 0 ? 4 : 2.5;
        const rx = parseFloat((cx - s / 2).toFixed(4));
        const ry = parseFloat((cy - s / 2).toFixed(4));
        return (
          <rect
            key={`diamond-${i}`}
            x={rx} y={ry}
            width={s} height={s}
            fill={g}
            opacity={i % 2 === 0 ? 0.8 : 0.4}
            transform={`rotate(45 ${cx} ${cy})`}
          />
        );
      })}

      {/* ====== LAYER 4: Inner disc (jade field for icon) ====== */}
      <circle cx="100" cy="100" r="55" fill={`url(#jade-${id})`} />
      <circle cx="100" cy="100" r="55" fill={`url(#innerglow-${id})`} />
      <circle cx="100" cy="100" r="55" stroke={g} strokeWidth="2.5" fill="none" />
      <circle cx="100" cy="100" r="51" stroke={g} strokeWidth="0.5" fill="none" opacity="0.3" />

      {/* ====== LAYER 5: Crescent & Star (center emblem) ====== */}
      <g filter={`url(#glow-${id})`} transform="translate(100, 100) rotate(-20)">
        <g transform="translate(10, 0)">
          {/* Crescent */}
          <path
            d="M-4,-25 A28,28 0 1,0 -4,25 A22,22 0 1,1 -4,-25 Z"
            fill="#000000"
            fillOpacity="0.95"
          />
          {/* Star */}
          <path
            d={starPath(15, 2, 9, 3.5, 5)}
            fill="#000000"
            transform="rotate(18 15 2)"
          />
        </g>
      </g>

      {/* Subtle flourishes at cardinal points of inner ring */}
      {[0, 90, 180, 270].map((angle) => {
        const [x, y] = pt(100, 100, 55, angle);
        return (
          <g key={`flourish-${angle}`} opacity="0.6">
            <circle cx={x} cy={y} r="2.5" fill={g} />
            <circle cx={x} cy={y} r="1" fill="#14532D" />
          </g>
        );
      })}
    </svg>
  );
}
