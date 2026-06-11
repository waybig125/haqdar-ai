"use client";

import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

export function StatCard({ 
  title, 
  value, 
  icon: Icon, 
  trend, 
  trendLabel, 
  className 
}) {
  return (
    <Card className={cn("overflow-hidden border-border/50 shadow-sm", className)}>
      <CardContent className="p-6">
        <div className="flex items-center justify-between gap-4 mb-4">
          <h3 className="font-medium text-muted-foreground text-sm tracking-tight uppercase">
            {title}
          </h3>
          {Icon && (
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
              <Icon className="w-5 h-5" />
            </div>
          )}
        </div>
        
        <div className="flex items-baseline gap-2">
          <motion.h2 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl font-bold font-inter tracking-tight text-foreground"
          >
            {value}
          </motion.h2>
          
          {trend && (
            <div className={cn(
              "flex items-center text-sm font-semibold",
              trend === 'up' ? "text-red-500" : trend === 'down' ? "text-emerald-500" : "text-amber-500"
            )}>
              {trend === 'up' ? '↑' : trend === 'down' ? '↓' : '→'}
              <span className="ms-1 text-muted-foreground font-normal">{trendLabel}</span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
