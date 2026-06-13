"use client";

import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { useTheme } from 'next-themes';
import { AnimatedContainer } from '@/components/ui/AnimatedContainer';
import { THEME } from '@/lib/theme';
import pakistanGeoJson from '../../../public/data/pakistan.json';

// Single dynamic import for the client-only map component
const MapWrapper = dynamic(
  () => import('./MapWrapper'),
  {
    ssr: false,
    loading: () => (
      <div className="h-full w-full bg-muted/10 animate-pulse rounded-2xl flex items-center justify-center text-muted-foreground/60 font-garamond text-lg italic">
        Loading Historical Archives & Map...
      </div>
    )
  }
);

const MOCK_CITIES = [
  { name: 'Lahore', coords: [31.5204, 74.3587], count: 142, topIssue: 'Police Extortion' },
  { name: 'Karachi', coords: [24.8607, 67.0011], count: 287, topIssue: 'Utility Overcharging' },
  { name: 'Islamabad', coords: [33.6844, 73.0479], count: 98, topIssue: 'Education Fees' },
  { name: 'Rawalpindi', coords: [33.5909, 73.0535], count: 76, topIssue: 'Police Extortion' },
  { name: 'Faisalabad', coords: [31.4181, 73.0776], count: 63, topIssue: 'Labour Exploitation' },
  { name: 'Peshawar', coords: [34.0151, 71.5249], count: 52, topIssue: 'Healthcare' },
  { name: 'Multan', coords: [30.1978, 71.4697], count: 41, topIssue: 'Utilities' },
  { name: 'Quetta', coords: [30.1798, 66.9750], count: 34, topIssue: 'Healthcare' },
];

export function HeatmapSection() {
  const { theme, systemTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <div className="h-[500px] w-full bg-muted/20 animate-pulse rounded-2xl" />;

  const currentTheme = theme === 'system' ? systemTheme : theme;
  const isDark = currentTheme === 'dark';

  const tileUrl = isDark
    ? 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png'
    : 'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png';

  const geoJsonStyle = {
    fillColor: '#C5A059',
    weight: 1.5,
    opacity: isDark ? 0.6 : 0.8,
    color: '#C5A059',
    fillOpacity: isDark ? 0.08 : 0.12
  };

  return (
    <section className="py-16 md:py-24 bg-transparent relative overflow-hidden border-t border-border/40">
      <div className="container mx-auto px-4 max-w-6xl">

        <AnimatedContainer variant="fadeUp" className="text-center mb-12">
          <h2 className="font-urdu text-4xl md:text-5xl font-bold text-foreground mb-8" dir="rtl">کرپشن ہیٹ میپ</h2>
          <p className="text-muted-foreground text-base max-w-lg mx-auto font-inter">
            Live anonymous corruption mapping and reporting hotspots across Pakistan.
          </p>
        </AnimatedContainer>

        <AnimatedContainer variant="fadeUp" delay={0.2} className="relative">

          <div className="h-[500px] md:h-[600px] w-full rounded-2xl overflow-hidden shadow-2xl border border-[#C5B69C] dark:border-[#523225] relative z-10 bg-[#FAF6EE] dark:bg-[#120A07]">
            <MapWrapper
              tileUrl={tileUrl}
              geoJsonStyle={geoJsonStyle}
              pakistanGeoJson={pakistanGeoJson}
              cities={MOCK_CITIES}
              accentColor={THEME.colors.accent.alt}
            />
          </div>

          <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 z-20">
            <div className="bg-background border border-border/80 shadow-2xl rounded-full px-6 py-3 flex items-center gap-3 whitespace-nowrap">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-ping" />
              <span className="font-bold text-lg font-garamond tracking-tight">{1247}</span>
              <span className="text-xs font-semibold text-muted-foreground uppercase tracking-widest font-inter">Anonymous reports this month</span>
            </div>
          </div>

        </AnimatedContainer>

      </div>
    </section>
  );
}

