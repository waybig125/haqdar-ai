"use client";

import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { useTheme } from 'next-themes';
import { AnimatedContainer } from '@/components/ui/AnimatedContainer';
import { THEME } from '@/lib/theme';
import pakistanGeoJson from '../../../public/data/pakistan.json';
import { Badge } from '@/components/ui/badge';

// Dynamic import required for Leaflet to bypass SSR
const MapContainer = dynamic(
  () => import('react-leaflet').then((mod) => mod.MapContainer),
  { ssr: false }
);
const TileLayer = dynamic(
  () => import('react-leaflet').then((mod) => mod.TileLayer),
  { ssr: false }
);
const GeoJSON = dynamic(
  () => import('react-leaflet').then((mod) => mod.GeoJSON),
  { ssr: false }
);
const CircleMarker = dynamic(
  () => import('react-leaflet').then((mod) => mod.CircleMarker),
  { ssr: false }
);
const Popup = dynamic(
  () => import('react-leaflet').then((mod) => mod.Popup),
  { ssr: false }
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
    // Fix Leaflet icon issue
    import('leaflet/dist/leaflet.css');
  }, []);

  if (!mounted) return <div className="h-[500px] w-full bg-muted/20 animate-pulse rounded-2xl" />;

  const currentTheme = theme === 'system' ? systemTheme : theme;
  const isDark = currentTheme === 'dark';

  const tileUrl = isDark
    ? 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png'
    : 'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png';

  const geoJsonStyle = {
    fillColor: isDark ? '#1C1917' : '#F5F1EB',
    weight: 2,
    opacity: 1,
    color: isDark ? '#292524' : '#E7E5E4',
    fillOpacity: 0.7
  };

  return (
    <section className="py-16 md:py-24 bg-muted/10 relative overflow-hidden">
      <div className="container mx-auto px-4 max-w-5xl">
        
        <AnimatedContainer variant="fadeUp" className="text-center mb-10">
          <h2 className="font-urdu text-4xl font-bold text-foreground mb-4">کرپشن ہیٹ میپ</h2>
          <p className="text-muted-foreground text-lg">Live anonymous corruption mapping across Pakistan</p>
        </AnimatedContainer>

        <AnimatedContainer variant="fadeUp" delay={0.2} className="relative">
          
          <div className="h-[500px] md:h-[600px] w-full rounded-2xl overflow-hidden shadow-lg border border-border/50 relative z-10 bg-background">
            <MapContainer 
              center={[30.3753, 69.3451]} 
              zoom={5.5} 
              scrollWheelZoom={false}
              style={{ height: "100%", width: "100%", zIndex: 1 }}
              attributionControl={false}
            >
              <TileLayer url={tileUrl} />
              
              {/* Pakistan Border */}
              <GeoJSON data={pakistanGeoJson} style={geoJsonStyle} />

              {/* City Dots */}
              {MOCK_CITIES.map((city, idx) => (
                <CircleMarker
                  key={idx}
                  center={city.coords}
                  radius={Math.max(8, city.count / 15)}
                  pathOptions={{
                    fillColor: THEME.colors.accent.alt, // Red
                    color: THEME.colors.accent.alt,
                    weight: 1,
                    opacity: 0.8,
                    fillOpacity: 0.6
                  }}
                >
                  <Popup className="font-inter">
                    <div className="p-1 min-w-[120px] text-center" dir="ltr">
                      <h4 className="font-bold text-sm mb-1 text-black">{city.name}</h4>
                      <Badge variant="secondary" className="mb-2 text-[10px] bg-red-100 text-red-700 hover:bg-red-100">
                        {city.count} Reports
                      </Badge>
                      <p className="text-xs text-gray-600 m-0">Top Issue:</p>
                      <p className="text-xs font-semibold text-black m-0 truncate">{city.topIssue}</p>
                    </div>
                  </Popup>
                </CircleMarker>
              ))}
            </MapContainer>
          </div>

          <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 z-20">
            <div className="bg-background border shadow-xl rounded-full px-6 py-3 flex items-center gap-3 whitespace-nowrap">
              <span className="w-3 h-3 rounded-full bg-red-500" />
              <span className="font-bold text-lg font-inter tracking-tight">1,247</span>
              <span className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Reports this month</span>
            </div>
          </div>

        </AnimatedContainer>

      </div>
    </section>
  );
}
