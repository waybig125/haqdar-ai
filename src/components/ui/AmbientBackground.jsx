import React from 'react';

export function AmbientBackground() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
      {/* Primary Emerald Gradient Blob */}
      <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] rounded-full bg-primary/20 blur-[120px] opacity-70 mix-blend-multiply dark:mix-blend-screen animate-pulse" style={{ animationDuration: '8s' }} />
      
      {/* Amber Gradient Blob */}
      <div className="absolute top-[20%] -right-[10%] w-[40%] h-[60%] rounded-full bg-accent/20 blur-[120px] opacity-50 mix-blend-multiply dark:mix-blend-screen animate-pulse" style={{ animationDuration: '12s', animationDelay: '2s' }} />
      
      {/* Bottom Center Soft Highlight */}
      <div className="absolute -bottom-[20%] left-[20%] w-[60%] h-[40%] rounded-full bg-primary/10 blur-[100px] opacity-60 mix-blend-multiply dark:mix-blend-screen" />
    </div>
  );
}
