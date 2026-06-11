"use client";

import React from 'react';
import { MapContainer, TileLayer, GeoJSON, CircleMarker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Badge } from '@/components/ui/badge';

export default function MapWrapper({ 
  tileUrl, 
  geoJsonStyle, 
  pakistanGeoJson, 
  cities, 
  accentColor 
}) {
  return (
    <MapContainer 
      center={[30.3753, 69.3451]} 
      zoom={5.5} 
      scrollWheelZoom={false}
      style={{ height: "100%", width: "100%", zIndex: 1 }}
      attributionControl={false}
    >
      <TileLayer url={tileUrl} />
      
      {/* Pakistan Border */}
      {pakistanGeoJson && <GeoJSON data={pakistanGeoJson} style={geoJsonStyle} />}

      {/* City Markers */}
      {cities && cities.map((city, idx) => (
        <CircleMarker
          key={idx}
          center={city.coords}
          radius={Math.max(8, city.count / 15)}
          pathOptions={{
            fillColor: accentColor,
            color: accentColor,
            weight: 1.5,
            opacity: 0.9,
            fillOpacity: 0.65
          }}
        >
          <Popup className="font-inter">
            <div className="p-2 min-w-[140px] text-center" dir="ltr">
              <h4 className="font-garamond font-bold text-base mb-1 text-slate-900 dark:text-slate-900">{city.name}</h4>
              <Badge variant="secondary" className="mb-2 text-[10px] bg-red-100 text-red-700 hover:bg-red-100 font-semibold border-none">
                {city.count} Reports
              </Badge>
              <p className="text-[10px] text-gray-500 m-0 uppercase tracking-wider font-semibold">Top Issue</p>
              <p className="text-xs font-semibold text-slate-800 m-0 truncate mt-0.5">{city.topIssue}</p>
            </div>
          </Popup>
        </CircleMarker>
      ))}
    </MapContainer>
  );
}
