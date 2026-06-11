import { Noto_Nastaliq_Urdu, Inter } from 'next/font/google';

export const urduFont = Noto_Nastaliq_Urdu({
  subsets: ['arabic'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-urdu',
  display: 'swap',
});

export const interFont = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});
