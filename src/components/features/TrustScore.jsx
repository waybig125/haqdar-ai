"use client";

import React from 'react';
import { ShieldCheck, AlertTriangle, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

const SCORE_CONFIG = {
  high: {
    label: "HIGH CONFIDENCE",
    urduLabel: "اعلیٰ اعتماد",
    colorClass: "text-primary dark:text-emerald-400",
    bgClass: "bg-primary/5 dark:bg-emerald-950/20",
    borderClass: "border-primary/20 dark:border-emerald-800/30",
    Icon: ShieldCheck
  },
  medium: {
    label: "MEDIUM CONFIDENCE",
    urduLabel: "درمیانہ اعتماد",
    colorClass: "text-accent dark:text-amber-400",
    bgClass: "bg-accent/5 dark:bg-amber-950/20",
    borderClass: "border-accent/20 dark:border-amber-800/30",
    Icon: AlertCircle
  },
  needs_verification: {
    label: "NEEDS VERIFICATION",
    urduLabel: "تصدیق درکار ہے",
    colorClass: "text-red-600 dark:text-red-400",
    bgClass: "bg-red-500/5 dark:bg-red-950/20",
    borderClass: "border-red-500/20 dark:border-red-800/30",
    Icon: AlertTriangle
  }
};

export function TrustScore({ score, reason, className }) {
  // Safe fallback if API returns unexpected score string
  const config = SCORE_CONFIG[score?.toLowerCase()] || SCORE_CONFIG.needs_verification;
  const { Icon } = config;

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      className={cn("flex flex-col sm:flex-row items-start sm:items-center gap-3", className)}
    >
      <div className={cn(
        "flex items-center gap-2 px-3 py-1.5 rounded border shadow-sm font-bold text-[10px] tracking-widest font-inter",
        config.bgClass,
        config.colorClass,
        config.borderClass
      )}>
        <Icon className="w-4 h-4" />
        <span>{config.label}</span>
      </div>
      
      {reason && (
        <p className="text-sm font-medium text-muted-foreground font-urdu m-0">
          {reason}
        </p>
      )}
    </motion.div>
  );
}

