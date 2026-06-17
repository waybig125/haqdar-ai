import { Noto_Nastaliq_Urdu, Inter, EB_Garamond } from 'next/font/google';

export const urduFont = Noto_Nastaliq_Urdu({
  subsets: ['arabic'],
  weight: ['400', '700'],
  variable: '--font-urdu',
  display: 'swap',
});

export const interFont = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const ebGaramondFont = EB_Garamond({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-garamond',
  display: 'swap',
});

