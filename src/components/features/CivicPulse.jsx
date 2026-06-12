"use client";

import React, { useState, useEffect } from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  LineChart, Line, AreaChart, Area,
  PieChart, Pie, Cell
} from 'recharts';
import { THEME } from '@/lib/theme';
import { AnimatedContainer } from '@/components/ui/AnimatedContainer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export function CivicPulse({ data }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!data) return null;

  if (!mounted) {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full max-w-7xl mx-auto">
        <div className="lg:col-span-2 h-[400px] bg-muted/10 border border-accent/10 rounded-xl animate-pulse" />
        <div className="h-[400px] bg-muted/10 border border-accent/10 rounded-xl animate-pulse" />
        <div className="h-[400px] bg-muted/10 border border-accent/10 rounded-xl animate-pulse" />
      </div>
    );
  }


  const COLORS = [
    THEME.colors.primary.DEFAULT, // Deep teal / jade
    THEME.colors.accent.DEFAULT,  // Brass gold
    THEME.sdg.sdg16,              // Stamp blue
    '#B45309',                    // Amber
    THEME.colors.accent.alt       // Crimson
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full max-w-7xl mx-auto">
      
      {/* 6-Month Trend (Area Chart) */}
      <AnimatedContainer variant="fadeUp" delay={0.1} className="lg:col-span-2">
        <Card className="border border-accent/20 dark:border-accent/10 shadow-[0_15px_40px_-15px_rgba(27,56,42,0.04)] dark:shadow-[0_15px_40px_rgba(0,0,0,0.4)] h-[400px] bg-card rounded-xl">
          <CardHeader className="pb-2">
            <CardTitle className="font-urdu text-2xl font-bold text-foreground">شکایات کا رجحان (6 ماہ)</CardTitle>
          </CardHeader>
          <CardContent className="w-full h-[300px] relative pt-0 min-w-0 min-h-0">
            <div className="absolute inset-0 w-full h-full p-4">
              <ResponsiveContainer width="99%" height="100%">
                <AreaChart data={data.monthly_trend} margin={{ top: 10, right: 30, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorCount" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor={THEME.colors.accent.DEFAULT} stopOpacity={0.25}/>
                      <stop offset="95%" stopColor={THEME.colors.accent.DEFAULT} stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(197, 160, 89, 0.15)" />
                  <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" fontSize={11} tickLine={false} axisLine={false} className="font-inter font-semibold uppercase tracking-wider" />
                  <YAxis stroke="hsl(var(--muted-foreground))" fontSize={11} tickLine={false} axisLine={false} className="font-inter font-semibold" />
                  <Tooltip 
                    contentStyle={{ backgroundColor: 'var(--color-card)', borderColor: 'var(--color-accent)', borderRadius: '6px', borderWidth: '1px' }}
                    labelStyle={{ color: 'var(--color-foreground)', fontFamily: 'var(--font-inter)', fontWeight: 'bold', fontSize: '12px' }}
                    itemStyle={{ color: 'var(--color-foreground)', fontFamily: 'var(--font-inter)', fontSize: '12px' }}
                  />
                  <Area type="monotone" dataKey="count" stroke={THEME.colors.accent.DEFAULT} strokeWidth={2.5} fillOpacity={1} fill="url(#colorCount)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </AnimatedContainer>

      {/* Category Breakdown (Donut) */}
      <AnimatedContainer variant="fadeUp" delay={0.2}>
        <Card className="border border-accent/20 dark:border-accent/10 shadow-[0_15px_40px_-15px_rgba(27,56,42,0.04)] dark:shadow-[0_15px_40px_rgba(0,0,0,0.4)] h-[400px] bg-card rounded-xl">
          <CardHeader className="pb-2">
            <CardTitle className="font-urdu text-2xl font-bold text-foreground">اقسام (Categories)</CardTitle>
          </CardHeader>
          <CardContent className="w-full h-[300px] relative min-w-0 min-h-0">
            <div className="absolute inset-0 w-full h-full p-4">
              <ResponsiveContainer width="99%" height="100%">
                <PieChart>
                  <Pie
                    data={data.category_breakdown}
                    cx="50%"
                    cy="50%"
                    innerRadius={75}
                    outerRadius={105}
                    paddingAngle={4}
                    dataKey="value"
                    stroke="none"
                  >
                    {data.category_breakdown.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ backgroundColor: 'var(--color-card)', borderColor: 'var(--color-accent)', borderRadius: '6px', borderWidth: '1px' }}
                    itemStyle={{ color: 'var(--color-foreground)', fontFamily: 'var(--font-inter)', fontSize: '12px' }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            
            {/* Center Legend Tag */}
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none select-none z-10">
              <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest font-inter">Live Share</span>
              <span className="font-garamond italic text-2xl font-bold text-accent">HaqDar AI</span>
            </div>
          </CardContent>
        </Card>
      </AnimatedContainer>

      {/* Top Districts (Rankings) */}
      <AnimatedContainer variant="fadeUp" delay={0.3}>
        <Card className="border border-accent/20 dark:border-accent/10 shadow-[0_15px_40px_-15px_rgba(27,56,42,0.04)] dark:shadow-[0_15px_40px_rgba(0,0,0,0.4)] h-[400px] bg-card rounded-xl">
          <CardHeader className="pb-2">
            <CardTitle className="font-urdu text-2xl font-bold text-foreground">متاثرہ اضلاع (Top Districts)</CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="flex flex-col gap-6">
              {data.district_rankings.map((dist, i) => (
                <div key={dist.district} className="flex items-center justify-between">
                  <div className="flex items-center gap-3 w-1/3">
                    <span className="text-accent font-garamond italic text-base font-bold w-4">{i + 1}.</span>
                    <span className="font-urdu text-base font-semibold text-foreground">{dist.district}</span>
                  </div>
                  
                  <div className="flex-1 px-4">
                    <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-accent/70 rounded-full transition-all duration-1000"
                        style={{ width: `${(dist.count / data.district_rankings[0].count) * 100}%` }}
                      />
                    </div>
                  </div>
                  
                  <div className="w-16 text-right">
                    <Badge variant="outline" className="border-accent/30 bg-accent/5 font-garamond text-xs font-bold text-accent">{dist.count}</Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </AnimatedContainer>

    </div>
  );

}
