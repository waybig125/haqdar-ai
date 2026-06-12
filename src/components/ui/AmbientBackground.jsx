import React from 'react';

export function AmbientBackground() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10 bg-background">
      {/* Green Dust Sprinkles (10x particles in collision-free grid layout) */}
      <div className="absolute inset-0 opacity-[0.4] mix-blend-screen">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <filter id="dustGlow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="2" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>
          {Array.from({ length: 400 }).map((_, i) => {
            const col = i % 20;
            const row = Math.floor(i / 20);

            // Deterministic pseudo-random offsets based on grid cell to prevent hydration mismatch and overlaps
            const pseudoRand1 = (Math.sin(col * 12.9898 + row * 78.233) * 43758.5453) % 1;
            const pseudoRand2 = (Math.cos(col * 4.1414 + row * 37.193) * 43758.5453) % 1;
            const pseudoRand3 = (Math.sin(col * 7.1234 + row * 93.472) * 43758.5453) % 1;

            const xOffset = pseudoRand1 * 1.5; // offset within cell [-1.5%, 1.5%]
            const yOffset = pseudoRand2 * 1.5; // offset within cell [-1.5%, 1.5%]

            const cx = `${col * 5 + 2.5 + xOffset}%`;
            const cy = `${row * 5 + 2.5 + yOffset}%`;
            const r = Math.abs(pseudoRand3) * 1.2 + 0.3; // radius [0.3px, 1.5px]
            const delay = Math.abs(pseudoRand1) * 5;
            const duration = Math.abs(pseudoRand2) * 5 + 5;
            const isGreen = Math.abs(pseudoRand3) > 0.3; // 70% green dust, 30% gold dust

            return (
              <circle
                key={`dust-${i}`}
                cx={cx}
                cy={cy}
                r={r}
                fill={isGreen ? "#10B981" : "#D4AF37"}
                filter="url(#dustGlow)"
                className="animate-[pulse_ease-in-out_infinite]"
                style={{
                  animationDuration: `${duration}s`,
                  animationDelay: `${delay}s`,
                  opacity: Math.abs(pseudoRand1) * 0.5 + 0.15
                }}
              />
            );
          })}
        </svg>
      </div>
    </div>
  );
}
