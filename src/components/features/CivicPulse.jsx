"use client";

import React from 'react';
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
  if (!data) return null;

  const COLORS = [
    THEME.colors.primary.DEFAULT,
    THEME.colors.accent.DEFAULT,
    THEME.colors.accent.alt,
    '#3B82F6', // Blue
    '#8B5CF6'  // Purple
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full max-w-7xl mx-auto">
      
      {/* 6-Month Trend (Area Chart) */}
      <AnimatedContainer variant="fadeUp" delay={0.1} className="lg:col-span-2">
        <Card className="border-border/50 shadow-sm h-[400px]">
          <CardHeader>
            <CardTitle className="font-urdu text-2xl text-foreground">شکایات کا رجحان (6 ماہ)</CardTitle>
          </CardHeader>
          <CardContent className="h-[300px] min-w-0 min-h-0">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data.monthly_trend} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorCount" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={THEME.colors.primary.DEFAULT} stopOpacity={0.3}/>
                    <stop offset="95%" stopColor={THEME.colors.primary.DEFAULT} stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: 'hsl(var(--background))', borderColor: 'hsl(var(--border))', borderRadius: '8px' }}
                  itemStyle={{ color: 'hsl(var(--foreground))' }}
                />
                <Area type="monotone" dataKey="count" stroke={THEME.colors.primary.DEFAULT} strokeWidth={3} fillOpacity={1} fill="url(#colorCount)" />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </AnimatedContainer>

      {/* Category Breakdown (Donut) */}
      <AnimatedContainer variant="fadeUp" delay={0.2}>
        <Card className="border-border/50 shadow-sm h-[400px]">
          <CardHeader>
            <CardTitle className="font-urdu text-2xl text-foreground">اقسام (Categories)</CardTitle>
          </CardHeader>
          <CardContent className="h-[300px] flex items-center justify-center min-w-0 min-h-0">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data.category_breakdown}
                  cx="50%"
                  cy="50%"
                  innerRadius={80}
                  outerRadius={110}
                  paddingAngle={5}
                  dataKey="value"
                  stroke="none"
                >
                  {data.category_breakdown.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ backgroundColor: 'hsl(var(--background))', borderColor: 'hsl(var(--border))', borderRadius: '8px' }}
                  itemStyle={{ color: 'hsl(var(--foreground))' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </AnimatedContainer>

      {/* Top Districts (Rankings) */}
      <AnimatedContainer variant="fadeUp" delay={0.3}>
        <Card className="border-border/50 shadow-sm h-[400px]">
          <CardHeader>
            <CardTitle className="font-urdu text-2xl text-foreground">متاثرہ اضلاع (Top Districts)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-5">
              {data.district_rankings.map((dist, i) => (
                <div key={dist.district} className="flex items-center justify-between">
                  <div className="flex items-center gap-3 w-1/3">
                    <span className="text-muted-foreground font-mono text-sm w-4">{i + 1}.</span>
                    <span className="font-medium text-sm text-foreground">{dist.district}</span>
                  </div>
                  
                  <div className="flex-1 px-4">
                    <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-primary transition-all duration-1000"
                        style={{ width: `${(dist.count / data.district_rankings[0].count) * 100}%` }}
                      />
                    </div>
                  </div>
                  
                  <div className="w-16 text-right">
                    <Badge variant="outline">{dist.count}</Badge>
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
