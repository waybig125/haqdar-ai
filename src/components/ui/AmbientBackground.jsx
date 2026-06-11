import React from 'react';

export function AmbientBackground() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
      {/* Primary Emerald Gradient Blob */}
      <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] rounded-full bg-primary/15 blur-[120px] opacity-60" />
      
      {/* Amber Gradient Blob */}
      <div className="absolute top-[20%] -right-[10%] w-[40%] h-[60%] rounded-full bg-accent/15 blur-[120px] opacity-40" />
      
      {/* Bottom Center Soft Highlight */}
      <div className="absolute -bottom-[20%] left-[20%] w-[60%] h-[40%] rounded-full bg-primary/10 blur-[100px] opacity-50" />
    </div>
  );
}
