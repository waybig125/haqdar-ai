import React from 'react';
import { cn } from "@/lib/utils";

const SDG_DATA = {
  sdg16: {
    label: "UN SDG 16: Peace, Justice, & Strong Institutions. Focuses on reducing corruption, ensuring equal access to justice, and promoting transparent institutions.",
    colorClass: "bg-emerald-800/10 dark:bg-emerald-500/10 border border-emerald-600/30 dark:border-emerald-400/20 text-emerald-800 dark:text-emerald-400",
    short: "SDG 16"
  },
  sdg10: {
    label: "UN SDG 10: Reduced Inequalities. Aims to empower all citizens equally, eliminating language and literacy barriers in public legal access.",
    colorClass: "bg-accent/10 dark:bg-accent/10 border border-accent/30 dark:border-accent/20 text-[#8A6635] dark:text-[#DFBA73]",
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
