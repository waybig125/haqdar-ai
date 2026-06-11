"use client";

import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { FileWarning, Target, TrendingUp } from 'lucide-react';

const ICONS = {
  FileWarning,
  Target,
  TrendingUp,
};

export function StatCard({ 
  title, 
  value, 
  iconName, 
  trend, 
  trendLabel, 
  className 
}) {
  const Icon = iconName ? ICONS[iconName] : null;

  return (
    <Card className={cn("overflow-hidden border-2 border-accent/20 bg-card rounded-xl shadow-[0_8px_25px_rgba(0,0,0,0.15)] dark:shadow-[0_8px_25px_rgba(0,0,0,0.4)] relative", className)}>
      <div className="absolute left-0 top-0 h-full w-1.5 bg-gradient-to-b from-[#FAF4E5] via-[#C5A059] to-[#8A6635]" />
      <CardContent className="p-6">
        <div className="flex items-center justify-between gap-4 mb-4">
          <h3 className="font-bold text-muted-foreground text-[10px] tracking-widest uppercase font-inter">
            {title}
          </h3>
          {Icon && (
            <div className="w-10 h-10 rounded bg-[#3A231A]/10 dark:bg-accent/10 flex items-center justify-center text-accent">
              <Icon className="w-4.5 h-4.5" />
            </div>
          )}
        </div>
        
        <div className="flex items-baseline gap-3">
          <motion.h2 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl font-bold font-garamond tracking-tight text-foreground"
          >
            {value}
          </motion.h2>
          
          {trend && (
            <div className={cn(
              "flex items-center text-xs font-bold font-inter",
              trend === 'up' ? "text-red-600 dark:text-red-400" : trend === 'down' ? "text-emerald-700 dark:text-emerald-400" : "text-accent"
            )}>
              {trend === 'up' ? '↑' : trend === 'down' ? '↓' : '→'}
              <span className="ms-1 text-[10px] font-semibold text-muted-foreground uppercase tracking-widest">{trendLabel}</span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );


}
