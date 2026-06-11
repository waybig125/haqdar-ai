import { urduFont, interFont, ebGaramondFont } from "@/lib/fonts";
import "@/styles/globals.css";
import { Providers } from "./providers";
import { AmbientBackground } from "@/components/ui/AmbientBackground";

export const metadata = {
  title: "HaqDar AI | حق دار",
  description: "Pakistan's first AI legal rights assistant. Speak your complaint. Know your rights. Get your letter.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ur" dir="rtl" suppressHydrationWarning style={{ scrollBehavior: 'smooth' }}>
      <body
        className={`${urduFont.variable} ${interFont.variable} ${ebGaramondFont.variable} font-inter antialiased bg-background text-foreground relative min-h-screen`}
      >
        <AmbientBackground />
        <Providers>
          <div className="relative z-10 flex flex-col min-h-screen">
            {children}
          </div>
        </Providers>
      </body>
    </html>
  );
}

