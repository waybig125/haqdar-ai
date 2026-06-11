import React from 'react';
import { cn } from "@/lib/utils";

const SDG_DATA = {
  sdg16: {
    label: "SDG 16: Peace & Justice",
    colorClass: "bg-[#1F6FEB] text-white",
    short: "SDG 16"
  },
  sdg10: {
    label: "SDG 10: Reduced Inequalities",
    colorClass: "bg-[#DA3B8A] text-white",
    short: "SDG 10"
  }
};

export function SDGBadge({ variant = 'sdg16', className }) {
  if (variant === 'both') {
    return (
      <div className={cn("flex gap-2", className)}>
        <SDGBadge variant="sdg16" />
        <SDGBadge variant="sdg10" />
      </div>
    );
  }

  const data = SDG_DATA[variant];
  if (!data) return null;

  return (
    <div 
      className={cn(
        "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold shadow-sm transition-transform hover:scale-105 cursor-default",
        data.colorClass,
        className
      )}
      title={data.label}
    >
      {data.short}
    </div>
  );
}
