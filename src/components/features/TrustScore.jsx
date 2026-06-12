"use client";

import React from 'react';
import { ShieldCheck, AlertTriangle, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

const SCORE_CONFIG = {
  high: {
    percentage: 92,
    label: "HIGH CONFIDENCE",
    urduLabel: "اعلیٰ اعتماد",
    colorClass: "text-primary dark:text-emerald-400",
    bgClass: "bg-primary/5 dark:bg-emerald-950/20",
    borderClass: "border-primary/20 dark:border-emerald-800/30",
    barColor: "bg-emerald-500",
    Icon: ShieldCheck
  },
  medium: {
    percentage: 68,
    label: "MEDIUM CONFIDENCE",
    urduLabel: "درمیانہ اعتماد",
    colorClass: "text-accent dark:text-amber-400",
    bgClass: "bg-accent/5 dark:bg-amber-950/20",
    borderClass: "border-accent/20 dark:border-amber-800/30",
    barColor: "bg-[#C5A059]",
    Icon: AlertCircle
  },
  needs_verification: {
    percentage: 42,
    label: "NEEDS VERIFICATION",
    urduLabel: "تصدیق درکار ہے",
    colorClass: "text-red-600 dark:text-red-400",
    bgClass: "bg-red-500/5 dark:bg-red-950/20",
    borderClass: "border-red-500/20 dark:border-red-800/30",
    barColor: "bg-red-500",
    Icon: AlertTriangle
  }
};

export function TrustScore({ score, reason, className }) {
  // Safe fallback if API returns unexpected score string
  const config = SCORE_CONFIG[score?.toLowerCase()] || SCORE_CONFIG.needs_verification;
  const { Icon, percentage } = config;

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
      className={cn("flex flex-col gap-2.5 w-full max-w-xl", className)}
    >
      <div className="flex flex-wrap items-center gap-3">
        {/* Confidence Badge */}
        <div className={cn(
          "flex items-center gap-2 px-3 py-1.5 rounded border shadow-sm font-bold text-[10px] tracking-widest font-inter shrink-0",
          config.bgClass,
          config.colorClass,
          config.borderClass
        )}>
          <Icon className="w-4 h-4" />
          <span>{config.label}</span>
        </div>

        {/* Progress Meter with fill animation */}
        <div className="flex items-center gap-2 flex-1 min-w-[150px]">
          <div className="h-2 w-28 bg-black/10 dark:bg-white/10 rounded-full overflow-hidden relative">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${percentage}%` }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              className={cn("h-full rounded-full", config.barColor)}
            />
          </div>
          <span className="text-[11px] font-bold font-inter text-muted-foreground">{percentage}%</span>
        </div>
      </div>
      
      {reason && (
        <p className="text-sm font-medium text-muted-foreground font-urdu m-0 leading-relaxed">
          {reason}
        </p>
      )}
    </motion.div>
  );
}
