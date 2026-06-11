"use client";

import React from 'react';
import { ShieldCheck, AlertTriangle, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

const SCORE_CONFIG = {
  high: {
    label: "HIGH CONFIDENCE",
    urduLabel: "اعلیٰ اعتماد",
    colorClass: "text-emerald-600 dark:text-emerald-500",
    bgClass: "bg-emerald-100 dark:bg-emerald-950/50",
    borderClass: "border-emerald-200 dark:border-emerald-900",
    Icon: ShieldCheck
  },
  medium: {
    label: "MEDIUM CONFIDENCE",
    urduLabel: "درمیانہ اعتماد",
    colorClass: "text-amber-600 dark:text-amber-500",
    bgClass: "bg-amber-100 dark:bg-amber-950/50",
    borderClass: "border-amber-200 dark:border-amber-900",
    Icon: AlertCircle
  },
  needs_verification: {
    label: "NEEDS VERIFICATION",
    urduLabel: "تصدیق درکار ہے",
    colorClass: "text-red-600 dark:text-red-500",
    bgClass: "bg-red-100 dark:bg-red-950/50",
    borderClass: "border-red-200 dark:border-red-900",
    Icon: AlertTriangle
  }
};

export function TrustScore({ score, reason, className }) {
  // Safe fallback if API returns unexpected score string
  const config = SCORE_CONFIG[score?.toLowerCase()] || SCORE_CONFIG.needs_verification;
  const { Icon } = config;

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className={cn("flex flex-col sm:flex-row items-start sm:items-center gap-3", className)}
    >
      <div className={cn(
        "flex items-center gap-2 px-3 py-1.5 rounded-full border shadow-sm font-semibold text-xs tracking-wider",
        config.bgClass,
        config.colorClass,
        config.borderClass
      )}>
        <Icon className="w-4 h-4" />
        <span>{config.label}</span>
      </div>
      
      {reason && (
        <p className="text-sm text-muted-foreground font-urdu m-0">
          {reason}
        </p>
      )}
    </motion.div>
  );
}
