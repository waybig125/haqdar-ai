"use client";

import React, { useState, useEffect } from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  AreaChart, Area, PieChart, Pie, Cell, Legend
} from 'recharts';
import { THEME } from '@/lib/theme';
import { AnimatedContainer } from '@/components/ui/AnimatedContainer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { FileWarning, Languages, Milestone, PieChart as PieIcon, CheckCircle2 } from 'lucide-react';

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

  // Extra Mock Data for Added Dashboard Analytics
  const languageData = [
    { month: 'Jan', 'Urdu Voice': 580, 'English Voice/Text': 220 },
    { month: 'Feb', 'Urdu Voice': 710, 'English Voice/Text': 240 },
    { month: 'Mar', 'Urdu Voice': 790, 'English Voice/Text': 230 },
    { month: 'Apr', 'Urdu Voice': 850, 'English Voice/Text': 250 },
    { month: 'May', 'Urdu Voice': 920, 'English Voice/Text': 260 },
    { month: 'Jun', 'Urdu Voice': 997, 'English Voice/Text': 250 },
  ];

  const pipelineData = [
    { name: 'جمع شدہ (Filed)', count: 1247, color: '#C5A059' },
    { name: 'درجہ بندی (Categorized)', count: 1247, color: '#B45309' },
    { name: 'قانون میچ (Law Matched)', count: 1120, color: '#1F6FEB' },
    { name: 'مسودہ تیار (Drafted)', count: 1120, color: '#107C41' },
    { name: 'زیرِ کاروائی (In Review)', count: 340, color: '#DA3B8A' },
  ];

  const resolutionData = [
    { name: 'Resolved (حل شدہ)', value: 68 },
    { name: 'In Progress (جاری ہے)', value: 20 },
    { name: 'In Review (زیرِ غور)', value: 12 },
  ];

  const COLORS = [
    '#107C41',                    // Deep Emerald / Pakistan Green
    '#C5A059',                    // Gold
    '#1F6FEB',                    // Blue
    '#B45309',                    // Amber
    '#DA3B8A'                     // Crimson
  ];

  const categoryUrduMap = {
    'Police': 'پولیس (Police)',
    'Healthcare': 'صحت (Healthcare)',
    'Labour': 'مزدور (Labour)',
    'Education': 'تعلیم (Education)',
    'Utility': 'بلنگ (Utility)',
    'Women': 'خواتین (Women)',
    'Consumer': 'صارفین (Consumer)',
    'Traffic': 'ٹریفک (Traffic)',
    'General': 'عام (General)',
    'Other': 'دیگر (Other)'
  };

  const categoryData = data.category_breakdown.map(entry => ({
    name: categoryUrduMap[entry.category] || entry.category,
    value: entry.value
  }));

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full max-w-7xl mx-auto">
      
      {/* 6-Month Trend (Area Chart) */}
      <AnimatedContainer variant="fadeUp" delay={0.1} className="lg:col-span-2">
        <Card className="border border-accent/20 dark:border-[#523225] shadow-lg h-[400px] bg-card rounded-xl overflow-hidden relative">
          <div className="grunge-overlay" />
          <CardHeader className="pb-2 flex flex-row items-center gap-3 relative z-10">
            <div className="w-8 h-8 rounded bg-[#3A231A]/10 dark:bg-accent/10 flex items-center justify-center text-accent">
              <FileWarning className="w-4 h-4" />
            </div>
            <CardTitle className="font-urdu text-2xl font-bold text-foreground" dir="rtl">شکایات کا رجحان (6 ماہ) / Complaint Trend</CardTitle>
          </CardHeader>
          <CardContent className="w-full h-[300px] pt-4 min-w-0 min-h-0 z-10 relative">
            <ResponsiveContainer width="99%" height="100%" minWidth={0} minHeight={0}>
                <AreaChart data={data.monthly_trend} margin={{ top: 10, right: 20, left: -25, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorCount" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor={THEME.colors.accent.DEFAULT} stopOpacity={0.25}/>
                      <stop offset="95%" stopColor={THEME.colors.accent.DEFAULT} stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(197, 160, 89, 0.1)" />
                  <XAxis dataKey="month" stroke="#C5B69C" fontSize={11} tickLine={false} axisLine={false} className="font-inter font-semibold uppercase tracking-wider" />
                  <YAxis stroke="#C5B69C" fontSize={11} tickLine={false} axisLine={false} className="font-inter font-semibold" />
                  <Tooltip 
                    contentStyle={{ backgroundColor: 'hsl(var(--card))', borderColor: 'hsl(var(--accent))', borderRadius: '8px', borderWidth: '1.5px', boxShadow: '0 4px 12px rgba(0,0,0,0.15)' }}
                    labelStyle={{ color: 'hsl(var(--foreground))', fontFamily: 'var(--font-inter)', fontWeight: 'bold', fontSize: '12px' }}
                    itemStyle={{ color: 'hsl(var(--foreground))', fontFamily: 'var(--font-inter)', fontSize: '12px' }}
                    cursor={{ stroke: 'rgba(197, 160, 89, 0.3)', strokeWidth: 1 }}
                  />
                  <Area type="monotone" dataKey="count" stroke={THEME.colors.accent.DEFAULT} strokeWidth={2.5} fillOpacity={1} fill="url(#colorCount)" />
                </AreaChart>
              </ResponsiveContainer>
          </CardContent>
        </Card>
      </AnimatedContainer>

      {/* NEW CHART: Language Choice Comparison (Stacked Bar) */}
      <AnimatedContainer variant="fadeUp" delay={0.15}>
        <Card className="border border-accent/20 dark:border-[#523225] shadow-lg h-[400px] bg-card rounded-xl overflow-hidden relative">
          <div className="grunge-overlay" />
          <CardHeader className="pb-2 flex flex-row items-center gap-3 relative z-10">
            <div className="w-8 h-8 rounded bg-[#3A231A]/10 dark:bg-accent/10 flex items-center justify-center text-accent">
              <Languages className="w-4 h-4" />
            </div>
            <CardTitle className="font-urdu text-2xl font-bold text-foreground" dir="rtl">صوتی زبان کا تجزیہ / Input Language Distribution</CardTitle>
          </CardHeader>
          <CardContent className="w-full h-[300px] pt-4 min-w-0 min-h-0 z-10 relative">
            <ResponsiveContainer width="99%" height="100%" minWidth={0} minHeight={0}>
                <BarChart data={languageData} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(197, 160, 89, 0.1)" />
                  <XAxis dataKey="month" stroke="#C5B69C" fontSize={11} tickLine={false} axisLine={false} className="font-inter font-semibold" />
                  <YAxis stroke="#C5B69C" fontSize={11} tickLine={false} axisLine={false} className="font-inter font-semibold" />
                  <Tooltip 
                    contentStyle={{ backgroundColor: 'hsl(var(--card))', borderColor: 'hsl(var(--accent))', borderRadius: '8px', borderWidth: '1.5px' }}
                    itemStyle={{ color: 'hsl(var(--foreground))', fontFamily: 'var(--font-inter)', fontSize: '12px' }}
                    cursor={{ fill: 'rgba(197, 160, 89, 0.08)' }}
                  />
                  <Legend wrapperStyle={{ fontFamily: 'var(--font-inter)', fontSize: '10px', paddingTop: '15px' }} />
                  <Bar dataKey="Urdu Voice" stackId="a" fill="#107C41" radius={[0, 0, 0, 0]} />
                  <Bar dataKey="English Voice/Text" stackId="a" fill="#C5A059" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
          </CardContent>
        </Card>
      </AnimatedContainer>

      {/* NEW CHART: Resolution Pipeline (Horizontal Funnel Bar) */}
      <AnimatedContainer variant="fadeUp" delay={0.2}>
        <Card className="border border-accent/20 dark:border-[#523225] shadow-lg h-[400px] bg-card rounded-xl overflow-hidden relative">
          <div className="grunge-overlay" />
          <CardHeader className="pb-2 flex flex-row items-center gap-3 relative z-10">
            <div className="w-8 h-8 rounded bg-[#3A231A]/10 dark:bg-accent/10 flex items-center justify-center text-accent">
              <Milestone className="w-4 h-4" />
            </div>
            <CardTitle className="font-urdu text-2xl font-bold text-foreground" dir="rtl">پروسیسنگ پائپ لائن / Processing Funnel</CardTitle>
          </CardHeader>
          <CardContent className="w-full h-[300px] pt-4 min-w-0 min-h-0 z-10 relative">
            <ResponsiveContainer width="99%" height="100%" minWidth={0} minHeight={0}>
                <BarChart data={pipelineData} layout="vertical" margin={{ top: 15, right: 30, left: 10, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="rgba(197, 160, 89, 0.1)" />
                  <XAxis type="number" stroke="#C5B69C" fontSize={11} tickLine={false} axisLine={false} className="font-inter font-semibold" />
                  <YAxis dataKey="name" type="category" stroke="#C5B69C" fontSize={10} tickLine={false} axisLine={false} width={150} className="font-urdu font-semibold" />
                  <Tooltip 
                    contentStyle={{ backgroundColor: 'hsl(var(--card))', borderColor: 'hsl(var(--accent))', borderRadius: '8px', borderWidth: '1.5px' }}
                    itemStyle={{ color: 'hsl(var(--foreground))', fontFamily: 'var(--font-inter)', fontSize: '12px' }}
                    cursor={{ fill: 'rgba(197, 160, 89, 0.08)' }}
                  />
                  <Bar dataKey="count" fill="#C5A059" radius={[0, 4, 4, 0]}>
                    {pipelineData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
          </CardContent>
        </Card>
      </AnimatedContainer>

      {/* Category Breakdown (Donut) */}
      <AnimatedContainer variant="fadeUp" delay={0.25}>
        <Card className="border border-accent/20 dark:border-[#523225] shadow-lg h-[400px] bg-card rounded-xl overflow-hidden relative">
          <div className="grunge-overlay" />
          <CardHeader className="pb-2 flex flex-row items-center gap-3 relative z-10">
            <div className="w-8 h-8 rounded bg-[#3A231A]/10 dark:bg-accent/10 flex items-center justify-center text-accent">
              <PieIcon className="w-4 h-4" />
            </div>
            <CardTitle className="font-urdu text-2xl font-bold text-foreground" dir="rtl">شکایات کی اقسام / Categories</CardTitle>
          </CardHeader>
          <CardContent className="w-full h-[300px] pt-4 min-w-0 min-h-0 z-10 relative">
            <ResponsiveContainer width="99%" height="100%" minWidth={0} minHeight={0}>
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    innerRadius={80}
                    outerRadius={105}
                    paddingAngle={4}
                    dataKey="value"
                    stroke="none"
                  >
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ backgroundColor: 'hsl(var(--card))', borderColor: 'hsl(var(--accent))', borderRadius: '8px', borderWidth: '1.5px' }}
                    itemStyle={{ color: 'hsl(var(--foreground))', fontFamily: 'var(--font-inter)', fontSize: '12px' }}
                  />
                  <Legend wrapperStyle={{ fontFamily: 'var(--font-inter)', fontSize: '10px', paddingTop: '15px' }} />
                </PieChart>
              </ResponsiveContainer>
            
            {/* Center Legend Tag */}
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none select-none z-10 mt-[-10px]">
              <span className="text-[8px] font-bold text-muted-foreground uppercase tracking-widest font-inter">Live Share</span>
              <span className="font-inter text-sm font-bold text-accent">HaqDar AI</span>
            </div>
          </CardContent>
        </Card>
      </AnimatedContainer>

      {/* Resolution Rate Breakdown (Donut) */}
      <AnimatedContainer variant="fadeUp" delay={0.28}>
        <Card className="border border-accent/20 dark:border-[#523225] shadow-lg h-[400px] bg-card rounded-xl overflow-hidden relative">
          <div className="grunge-overlay" />
          <CardHeader className="pb-2 flex flex-row items-center gap-3 relative z-10">
            <div className="w-8 h-8 rounded bg-[#3A231A]/10 dark:bg-accent/10 flex items-center justify-center text-accent">
              <CheckCircle2 className="w-4 h-4" />
            </div>
            <CardTitle className="font-urdu text-2xl font-bold text-foreground" dir="rtl">شکایات کے حل کی شرح / Resolution Rate</CardTitle>
          </CardHeader>
          <CardContent className="w-full h-[300px] pt-4 min-w-0 min-h-0 z-10 relative">
            <ResponsiveContainer width="99%" height="100%" minWidth={0} minHeight={0}>
                <PieChart>
                  <Pie
                    data={resolutionData}
                    cx="50%"
                    cy="50%"
                    innerRadius={80}
                    outerRadius={105}
                    paddingAngle={4}
                    dataKey="value"
                    stroke="none"
                  >
                    {resolutionData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={['#107C41', '#C5A059', '#DA3B8A'][index % 3]} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ backgroundColor: 'hsl(var(--card))', borderColor: 'hsl(var(--accent))', borderRadius: '8px', borderWidth: '1.5px' }}
                    itemStyle={{ color: 'hsl(var(--foreground))', fontFamily: 'var(--font-inter)', fontSize: '12px' }}
                  />
                  <Legend wrapperStyle={{ fontFamily: 'var(--font-inter)', fontSize: '10px', paddingTop: '15px' }} />
                </PieChart>
              </ResponsiveContainer>
            
            {/* Center Legend Tag */}
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none select-none z-10 mt-[-10px]">
              <span className="text-[8px] font-bold text-muted-foreground uppercase tracking-widest font-inter">Resolved</span>
              <span className="font-inter text-lg font-bold text-emerald-600 dark:text-emerald-400">68%</span>
            </div>
          </CardContent>
        </Card>
      </AnimatedContainer>

      {/* Top Districts (Rankings) */}
      <AnimatedContainer variant="fadeUp" delay={0.3} className="lg:col-span-1">
        <Card className="border border-accent/20 dark:border-[#523225] shadow-lg bg-card rounded-xl overflow-hidden relative h-full">
          <div className="grunge-overlay" />
          <CardHeader className="pb-2 relative z-10">
            <CardTitle className="font-urdu text-2xl font-bold text-foreground" dir="rtl">متاثرہ اضلاع (Top Districts)</CardTitle>
          </CardHeader>
          <CardContent className="pt-6 relative z-10">
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

      {/* Institutional Response Rate Chart */}
      <AnimatedContainer variant="fadeUp" delay={0.32} className="lg:col-span-1">
        <Card className="border border-accent/20 dark:border-[#523225] shadow-lg bg-card rounded-xl overflow-hidden relative h-full">
          <div className="grunge-overlay" />
          <CardHeader className="pb-2 relative z-10 flex flex-row items-center gap-3">
            <div className="w-8 h-8 rounded bg-[#3A231A]/10 dark:bg-accent/10 flex items-center justify-center text-accent">
              <CheckCircle2 className="w-4 h-4" />
            </div>
            <CardTitle className="font-urdu text-2xl font-bold text-foreground" dir="rtl">اداروں کی کارکردگی / Dept Performance</CardTitle>
          </CardHeader>
          <CardContent className="w-full h-[300px] pt-4 min-w-0 min-h-0 z-10 relative">
            <ResponsiveContainer width="99%" height="100%" minWidth={0} minHeight={0}>
                <BarChart data={[
                  { name: 'تعلیم (Education)', rate: 85, fill: '#107C41' },
                  { name: 'بجلی (Electricity)', rate: 78, fill: '#C5A059' },
                  { name: 'گیس (Sui Gas)', rate: 74, fill: '#B45309' },
                  { name: 'پولیس (Police)', rate: 62, fill: '#1F6FEB' },
                  { name: 'بلدیہ (Municipal)', rate: 58, fill: '#DA3B8A' }
                ]} layout="vertical" margin={{ top: 10, right: 30, left: 10, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="rgba(197, 160, 89, 0.1)" />
                  <XAxis type="number" domain={[0, 100]} stroke="#C5B69C" fontSize={11} tickLine={false} axisLine={false} className="font-inter font-semibold" unit="%" />
                  <YAxis dataKey="name" type="category" stroke="#C5B69C" fontSize={10} tickLine={false} axisLine={false} width={120} className="font-urdu font-semibold" />
                  <Tooltip 
                    contentStyle={{ backgroundColor: 'hsl(var(--card))', borderColor: 'hsl(var(--accent))', borderRadius: '8px', borderWidth: '1.5px' }}
                    itemStyle={{ color: 'hsl(var(--foreground))', fontFamily: 'var(--font-inter)', fontSize: '12px' }}
                    cursor={{ fill: 'rgba(197, 160, 89, 0.08)' }}
                    formatter={(value) => [`${value}%`, 'Resolution Rate']}
                  />
                  <Bar dataKey="rate" radius={[0, 4, 4, 0]}>
                    {[
                      { fill: '#107C41' },
                      { fill: '#C5A059' },
                      { fill: '#B45309' },
                      { fill: '#1F6FEB' },
                      { fill: '#DA3B8A' }
                    ].map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
          </CardContent>
        </Card>
      </AnimatedContainer>

    </div>
  );
}
