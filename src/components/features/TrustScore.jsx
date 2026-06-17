"use client";

import React from 'react';
import { ShieldCheck, AlertTriangle, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

const SCORE_CONFIG = {
  high: {
    percentage: 92,
    colorClass: "text-primary dark:text-emerald-400",
    bgClass: "bg-primary/5 dark:bg-emerald-950/20",
    borderClass: "border-primary/20 dark:border-emerald-800/30",
    barColor: "bg-emerald-500",
    Icon: ShieldCheck
  },
  medium: {
    percentage: 68,
    colorClass: "text-accent dark:text-amber-400",
    bgClass: "bg-accent/5 dark:bg-amber-950/20",
    borderClass: "border-accent/20 dark:border-amber-800/30",
    barColor: "bg-[#C5A059]",
    Icon: AlertCircle
  },
  needs_verification: {
    percentage: 42,
    colorClass: "text-red-600 dark:text-red-400",
    bgClass: "bg-red-500/5 dark:bg-red-950/20",
    borderClass: "border-red-500/20 dark:border-red-800/30",
    barColor: "bg-red-500",
    Icon: AlertTriangle
  }
};

const LABELS = {
  Urdu: {
    high: "اعلیٰ اعتماد",
    medium: "درمیانہ اعتماد",
    needs_verification: "تصدیق درکار ہے"
  },
  English: {
    high: "HIGH CONFIDENCE",
    medium: "MEDIUM CONFIDENCE",
    needs_verification: "NEEDS VERIFICATION"
  },
  "Roman (Urdu/Regional)": {
    high: "Aala Ehtamad",
    medium: "Darmiyana Ehtamad",
    needs_verification: "Tasdeeq Darkar Hai"
  },
  Sindhi: {
    high: "اعليٰ اعتماد",
    medium: "درميانو اعتماد",
    needs_verification: "تصديق گهربل آهي"
  },
  Pashto: {
    high: "لوړ باور",
    medium: "منځنی باور",
    needs_verification: "تصدیق ته اړتیا ده"
  },
  Punjabi: {
    high: "اعلیٰ اعتماد",
    medium: "درمیانہ اعتماد",
    needs_verification: "تصدیق دی لوڑ اے"
  }
};

export function TrustScore({ score, reason, className, language = 'Urdu' }) {
  // Safe fallback if API returns unexpected score string
  const config = SCORE_CONFIG[score?.toLowerCase()] || SCORE_CONFIG.needs_verification;
  const { Icon, percentage } = config;

  const scoreKey = score?.toLowerCase() === 'high' ? 'high' : (score?.toLowerCase() === 'medium' ? 'medium' : 'needs_verification');
  const labelLang = LABELS[language] || LABELS.Urdu;
  const displayedLabel = labelLang[scoreKey];

  const isReasonEnglish = language === 'English' || language === 'Roman (Urdu/Regional)' || (reason && (reason.match(/[a-zA-Z]/g) || []).length / reason.replace(/\s+/g, '').length > 0.5);

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
          <span>{displayedLabel}</span>
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
        <p 
          className={cn(
            "text-sm font-medium text-muted-foreground m-0 leading-relaxed",
            isReasonEnglish ? "font-inter text-left" : "font-urdu text-right"
          )}
          dir={isReasonEnglish ? "ltr" : "rtl"}
        >
          {reason}
        </p>
      )}
    </motion.div>
  );
}
