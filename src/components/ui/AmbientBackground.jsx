import React from 'react';

export function AmbientBackground() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10 bg-background">
      {/* Accent Gold Glow (Candlelight) */}
      <div className="absolute top-[20%] left-[10%] w-[50vw] h-[50vh] rounded-[100%] bg-accent/5 dark:bg-accent/8 blur-[130px] opacity-70" />
      
      {/* Green Dust Sprinkles */}
      <div className="absolute inset-0 opacity-[0.4] mix-blend-screen">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <filter id="dustGlow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="2" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>
          {Array.from({ length: 40 }).map((_, i) => {
            // Use deterministic pseudo-random values based on index to prevent hydration mismatch
            const pseudoRand1 = (Math.sin(i * 12.9898) * 43758.5453) % 1;
            const pseudoRand2 = (Math.cos(i * 4.1414) * 43758.5453) % 1;
            const pseudoRand3 = (Math.sin(i * 7.1234) * 43758.5453) % 1;
            
            const cx = `${Math.abs(pseudoRand1) * 100}%`;
            const cy = `${Math.abs(pseudoRand2) * 100}%`;
            const r = Math.abs(pseudoRand3) * 1.5 + 0.5;
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
                  opacity: Math.abs(pseudoRand1) * 0.5 + 0.2
                }}
              />
            );
          })}
        </svg>
      </div>
    </div>
  );
}

