import { urduFont, interFont, ebGaramondFont } from "@/lib/fonts";
import "@/styles/globals.css";
import { Providers } from "./providers";
import { AmbientBackground } from "@/components/ui/AmbientBackground";
import { Toaster } from "@/components/ui/sonner";

export const metadata = {
  title: "HaqDar AI | حق دار",
  description: "Pakistan's first AI legal rights assistant. Speak your complaint. Know your rights. Get your letter.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" dir="ltr" suppressHydrationWarning data-scroll-behavior="smooth">
      <body
        className={`${urduFont.variable} ${interFont.variable} ${ebGaramondFont.variable} font-inter antialiased bg-background text-foreground relative min-h-screen`}
      >
        <AmbientBackground />
        <Providers>
          <div className="relative z-10 flex flex-col min-h-screen">
            {children}
          </div>
          <Toaster richColors position="bottom-right" />
        </Providers>
      </body>
    </html>
  );
}

