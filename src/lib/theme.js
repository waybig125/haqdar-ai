/**
 * HaqDar AI - Theme Constants
 * Mirrors the CSS variables in globals.scss for programmatic access
 * (e.g., in Recharts, Leaflet markers, or Framer Motion)
 */

export const THEME = {
  colors: {
    primary: {
      DEFAULT: '#10B981', // Emerald 500
      dark: '#059669',    // Emerald 600
    },
    accent: {
      DEFAULT: '#F59E0B', // Amber 500
      alt: '#EF4444',     // Red 500 (Needs Verification)
    },
    light: {
      background: '#FAFAF8',
      surface: '#FFFFFF',
      surfaceAlt: '#F5F1EB',
      text: '#1C1917',
      textMuted: '#78716C',
    },
    dark: {
      background: '#0C0A09',
      surface: '#1C1917',
      surfaceAlt: '#292524',
      text: '#FAFAF9',
      textMuted: '#A8A29E',
    }
  },
  confidence: {
    high: '#10B981',
    medium: '#F59E0B',
    needs_verification: '#EF4444'
  },
  sdg: {
    sdg16: '#1F6FEB', // Peace & Justice
    sdg10: '#DA3B8A'  // Reduced Inequalities
  }
};
