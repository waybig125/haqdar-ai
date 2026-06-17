/**
 * HaqDar AI - Theme Constants
 * Mirrors the CSS variables in globals.scss for programmatic access
 * (e.g., in Recharts, Leaflet markers, or Framer Motion)
 */

export const THEME = {
  colors: {
    primary: {
      DEFAULT: '#11382A', // Stamp-paper deep green
      dark: '#10B981',    // Emerald green for dark mode
    },
    accent: {
      DEFAULT: '#C5A059', // Burnished Brass Gold
      alt: '#DC2626',     // Destructive red
    },
    light: {
      background: '#FAF7F2',
      surface: '#FFFFFF',
      surfaceAlt: '#EDE7DC',
      text: '#0F1412',
      textMuted: '#6F6960',
    },
    dark: {
      background: '#090D0B',
      surface: '#0E1411',
      surfaceAlt: '#1A231F',
      text: '#ECE6DB',
      textMuted: '#A09A8F',
    }
  },
  confidence: {
    high: '#11382A',
    medium: '#C5A059',
    needs_verification: '#DC2626'
  },
  sdg: {
    sdg16: '#2A3E5D', // Navy / stamp-ink blue
    sdg10: '#C5A059'  // Wax Gold
  }
};

