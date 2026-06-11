import React from 'react';

export function AmbientBackground() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10 bg-background">
      {/* Accent Gold Glow (Candlelight) */}
      <div className="absolute top-[20%] left-[10%] w-[50vw] h-[50vh] rounded-[100%] bg-accent/5 dark:bg-accent/8 blur-[130px] opacity-70" />
      
      {/* Deep Archivist Emerald Green Glow */}
      <div className="absolute bottom-[10%] right-[15%] w-[60vw] h-[60vh] rounded-[100%] bg-primary/4 dark:bg-primary/10 blur-[160px] opacity-60" />
    </div>
  );
}

