"use client";
import React, { useEffect, useMemo } from 'react';
import { MapContainer, TileLayer, GeoJSON, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet.heat';
import { Badge } from '@/components/ui/badge';

// --- Real heat layer (leaflet.heat) -----------------------------------------
// Renders the smooth radiant heatmap "blanket" (like weather radar) instead of
// hard dots. Intensity = report count, so busy districts bloom hot red and
// quiet ones stay a soft gold. This is added imperatively because leaflet.heat
// is not a react-leaflet component.
function HeatLayer({ cities, maxCount }) {
  const map = useMap();

  useEffect(() => {
    if (!cities || cities.length === 0) return;

    // [lat, lng, intensity 0..1]
    const points = cities.map((c) => [
      c.coords[0],
      c.coords[1],
      Math.max(0.25, (c.count || 0) / (maxCount || 1)),
    ]);

    const layer = L.heatLayer(points, {
      radius: 38,        // px radius of each point's heat
      blur: 32,          // smoothness of the blanket
      maxZoom: 9,
      minOpacity: 0.35,
      gradient: {        // gold -> orange -> red, matching the legend
        0.0: 'rgba(240,180,60,0.0)',
        0.3: '#F0B43C',
        0.55: '#F0902C',
        0.8: '#EC5A2A',
        1.0: '#E5382A',
      },
    });
    layer.addTo(map);
    return () => {
      map.removeLayer(layer);
    };
  }, [map, cities, maxCount]);

  return null;
}

// Tiny invisible hit-targets so the popups still work on top of the heat blanket
function makeHitIcon() {
  return L.divIcon({
    html: '<div style="width:26px;height:26px;border-radius:50%;"></div>',
    className: 'haqdar-heat-hit',
    iconSize: [26, 26],
    iconAnchor: [13, 13],
  });
}

export default function MapWrapper({
  tileUrl,
  geoJsonStyle,
  pakistanGeoJson,
  cities,
  accentColor, // kept for API compatibility
}) {
  const maxCount = useMemo(
    () => (cities && cities.length ? Math.max(...cities.map((c) => c.count || 0)) : 1),
    [cities]
  );

  return (
    <MapContainer
      center={[30.3753, 69.3451]}
      zoom={5.5}
      scrollWheelZoom={false}
      style={{ height: '100%', width: '100%', zIndex: 1 }}
      attributionControl={false}
    >
      <TileLayer url={tileUrl} />

      {pakistanGeoJson && <GeoJSON data={pakistanGeoJson} style={geoJsonStyle} />}

      {/* The smooth radiant heatmap */}
      <HeatLayer cities={cities} maxCount={maxCount} />

      {/* Invisible markers carry the popups */}
      {cities &&
        cities.map((city, idx) => (
          <Marker key={idx} position={city.coords} icon={makeHitIcon()} opacity={0}>
            <Popup className="font-inter">
              <div className="p-2 min-w-[140px] text-center" dir="ltr">
                <h4 className="font-garamond font-bold text-base mb-1 text-slate-900 dark:text-slate-900">
                  {city.name}
                </h4>
                <Badge
                  variant="secondary"
                  className="mb-2 text-[10px] bg-red-100 text-red-700 hover:bg-red-100 font-semibold border-none"
                >
                  {city.count} Reports
                </Badge>
                <p className="text-[10px] text-gray-500 m-0 uppercase tracking-wider font-semibold">
                  Top Issue
                </p>
                <p className="text-xs font-semibold text-slate-800 m-0 truncate mt-0.5">
                  {city.topIssue}
                </p>
              </div>
            </Popup>
          </Marker>
        ))}
    </MapContainer>
  );
}
