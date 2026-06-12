import React from 'react';

export function AmbientBackground() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10 bg-background">
      {/* Subtle Grunge Texture Specks (800 particles in collision-free grid layout) */}
      <div className="absolute inset-0 opacity-[0.6] dark:opacity-[0.4] mix-blend-multiply dark:mix-blend-screen">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          {Array.from({ length: 800 }).map((_, i) => {
            const col = i % 40;
            const row = Math.floor(i / 40);

            // Deterministic pseudo-random offsets based on grid cell to prevent hydration mismatch and overlaps
            const pseudoRand1 = (Math.sin(col * 12.9898 + row * 78.233) * 43758.5453) % 1;
            const pseudoRand2 = (Math.cos(col * 4.1414 + row * 37.193) * 43758.5453) % 1;
            const pseudoRand3 = (Math.sin(col * 7.1234 + row * 93.472) * 43758.5453) % 1;

            const xOffset = pseudoRand1 * 0.8; // offset within cell [-0.8%, 0.8%]
            const yOffset = pseudoRand2 * 1.5; // offset within cell [-1.5%, 1.5%]

            const cx = `${parseFloat((col * 2.5 + 1.25 + xOffset).toFixed(4))}%`;
            const cy = `${parseFloat((row * 5 + 2.5 + yOffset).toFixed(4))}%`;
            const r = parseFloat((Math.abs(pseudoRand3) * 0.7 + 0.4).toFixed(4)); // radius [0.4px, 1.1px]

            const isType1 = Math.abs(pseudoRand3) > 0.4;

            return (
              <circle
                key={`grunge-${i}`}
                cx={cx}
                cy={cy}
                r={r}
                fill={isType1 ? "var(--grunge-color-1)" : "var(--grunge-color-2)"}
                style={{
                  opacity: Math.abs(pseudoRand1) * 0.6 + 0.2
                }}
              />
            );
          })}
        </svg>
      </div>
    </div>
  );
}

