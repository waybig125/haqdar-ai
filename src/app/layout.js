import { urduFont, interFont } from "@/lib/fonts";
import "@/styles/globals.scss";
import { Providers } from "./providers";

export const metadata = {
  title: "HaqDar AI | حق دار",
  description: "Pakistan's first AI legal rights assistant. Speak your complaint. Know your rights. Get your letter.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ur" dir="rtl" suppressHydrationWarning>
      <body
        className={`${urduFont.variable} ${interFont.variable} font-inter antialiased bg-background text-foreground`}
      >
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
