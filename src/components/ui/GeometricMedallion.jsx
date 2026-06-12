"use client";

import React from 'react';
import { cn } from '@/lib/utils';

export function GeometricMedallion({ className, size = 120 }) {
  const id = React.useId().replace(/:/g, '');

  // Helper: point on circle
  const pt = (cx, cy, r, angleDeg) => {
    const rad = ((angleDeg - 90) * Math.PI) / 180;
    return [cx + r * Math.cos(rad), cy + r * Math.sin(rad)];
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

        {/* Dark mahogany background */}
        <radialGradient id={`bg-${id}`} cx="50%" cy="50%" r="55%">
          <stop offset="0%" stopColor="#2E1E14" />
          <stop offset="70%" stopColor="#1C110A" />
          <stop offset="100%" stopColor="#0D0804" />
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
        return (
          <rect
            key={`diamond-${i}`}
            x={cx - s / 2} y={cy - s / 2}
            width={s} height={s}
            fill={g}
            opacity={i % 2 === 0 ? 0.8 : 0.4}
            transform={`rotate(45 ${cx} ${cy})`}
          />
        );
      })}

      {/* ====== LAYER 4: Inner disc (dark field for icon) ====== */}
      <circle cx="100" cy="100" r="55" fill="#1A100A" />
      <circle cx="100" cy="100" r="55" fill={`url(#innerglow-${id})`} />
      <circle cx="100" cy="100" r="55" stroke={g} strokeWidth="2.5" fill="none" />
      <circle cx="100" cy="100" r="51" stroke={g} strokeWidth="0.5" fill="none" opacity="0.3" />

      {/* ====== LAYER 5: Scales of Justice (center emblem) ====== */}
      <g filter={`url(#glow-${id})`}>
        {/* Central pillar */}
        <line x1="100" y1="68" x2="100" y2="128" stroke={g} strokeWidth="3" strokeLinecap="round" />

        {/* Base platform — wider, with a decorative serif */}
        <path d="M85 128 L115 128" stroke={g} strokeWidth="3.5" strokeLinecap="round" />
        <path d="M90 131 L110 131" stroke={g} strokeWidth="1.5" strokeLinecap="round" opacity="0.5" />

        {/* Top finial — ornate circle with small point */}
        <circle cx="100" cy="66" r="5" fill={g} />
        <circle cx="100" cy="66" r="3" fill="#1A100A" />
        <circle cx="100" cy="66" r="1.5" fill={g} />

        {/* Crossbeam — slightly curved for elegance */}
        <path d="M72 79 Q100 74 128 79" stroke={g} strokeWidth="2.5" strokeLinecap="round" fill="none" />

        {/* Left chain and pan */}
        <line x1="72" y1="79" x2="64" y2="105" stroke={g} strokeWidth="0.8" opacity="0.65" />
        <line x1="72" y1="79" x2="80" y2="105" stroke={g} strokeWidth="0.8" opacity="0.65" />
        <path d="M60 105 Q72 114 84 105" stroke={g} strokeWidth="1.8" fill="none" />
        {/* Pan rim detail */}
        <path d="M63 105 Q72 108 81 105" stroke={g} strokeWidth="0.5" fill="none" opacity="0.4" />

        {/* Right chain and pan */}
        <line x1="128" y1="79" x2="120" y2="105" stroke={g} strokeWidth="0.8" opacity="0.65" />
        <line x1="128" y1="79" x2="136" y2="105" stroke={g} strokeWidth="0.8" opacity="0.65" />
        <path d="M116 105 Q128 114 140 105" stroke={g} strokeWidth="1.8" fill="none" />
        {/* Pan rim detail */}
        <path d="M119 105 Q128 108 137 105" stroke={g} strokeWidth="0.5" fill="none" opacity="0.4" />
      </g>

      {/* ====== LAYER 6: Small Urdu-style crescent accent at top ====== */}
      <path
        d={`M${pt(100, 100, 55, 0).join(',')} A5,5 0 1,1 ${pt(100, 100, 55, 0)[0] - 0.01},${pt(100, 100, 55, 0)[1]}`}
        fill="none"
        stroke={g}
        strokeWidth="0"
      />

      {/* Subtle corner flourishes — tiny arcs at 4 corners of the inner ring */}
      {[0, 90, 180, 270].map((angle) => {
        const [x, y] = pt(100, 100, 55, angle);
        return (
          <g key={`flourish-${angle}`} opacity="0.6">
            <circle cx={x} cy={y} r="2.5" fill={g} />
            <circle cx={x} cy={y} r="1" fill="#1A100A" />
          </g>
        );
      })}
    </svg>
  );
}
