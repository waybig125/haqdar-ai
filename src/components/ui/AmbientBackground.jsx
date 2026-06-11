import React from 'react';

export function AmbientBackground() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10 bg-background">
      {/* Central Deep Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vh] rounded-[100%] bg-primary/10 dark:bg-primary/20 blur-[150px] opacity-80" />
      
      {/* Accent Glow */}
      <div className="absolute -top-[20%] right-[10%] w-[40vw] h-[40vh] rounded-[100%] bg-accent/10 dark:bg-accent/15 blur-[120px] opacity-60" />
    </div>
  );
}
