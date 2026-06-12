import React from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { StatCard } from '@/components/ui/StatCard';
import { CivicPulse } from '@/components/features/CivicPulse';
import { AnimatedContainer } from '@/components/ui/AnimatedContainer';
import { getStats } from '@/lib/api';
import { Scale, Users2, Landmark, HelpCircle } from 'lucide-react';

export const metadata = {
  title: "Civic Pulse | HaqDar AI",
  description: "Live dashboard tracking institutional corruption and complaints across Pakistan.",
};

export default async function DashboardPage() {
  const stats = await getStats();

  return (
    <div className="min-h-screen flex flex-col selection:bg-primary/20 selection:text-primary">
      <Header />
      
      <main className="flex-grow bg-background">
        
        {/* Dashboard Header */}
        <div className="border-b border-accent/20 dark:border-accent/10 pb-10 pt-16 bg-muted/20 relative">
          <div className="container mx-auto px-4 max-w-7xl">
            <AnimatedContainer variant="fadeUp">
              <h1 className="font-urdu text-4xl md:text-5xl font-bold text-foreground mb-3 leading-[1.3] flex flex-wrap items-center">
                سول نبض <span className="gold-gradient-text-light font-garamond italic text-3xl font-bold ml-3">— Civic Pulse</span>
              </h1>
              <p className="text-sm md:text-base text-muted-foreground max-w-2xl leading-relaxed font-inter">
                Real-time open data tracking of institutional accountability and transparency across Pakistan. All reports are completely anonymous.
              </p>
            </AnimatedContainer>
          </div>
        </div>

        <div className="container mx-auto px-4 max-w-7xl py-12">
          
          {/* SDG Impact Banner / Explainer Box (Dashboard Revamp Feature) */}
          <AnimatedContainer variant="fadeUp" className="mb-10">
            <div className="wood-console rounded-2xl p-6 md:p-8 border border-accent/20 shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-accent/2 rounded-full blur-3xl pointer-events-none" />
              
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
                
                {/* Left Side: General Info */}
                <div className="lg:col-span-4 space-y-3">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-accent/30 bg-[#3A231A]/30 text-accent font-semibold text-[10px] uppercase tracking-widest font-inter">
                    Dashboard Overview
                  </div>
                  <h2 className="font-garamond text-2xl md:text-3xl font-black text-[#E6DBC6] leading-tight">
                    How Civic Pulse Maps to Sustainable Goals (SDGs)
                  </h2>
                  <p className="font-inter text-xs text-muted-foreground leading-relaxed">
                    HaqDar AI translates local civic grievances into actionable data that supports international governance standards. Every report listed below impacts global human development targets.
                  </p>
                </div>

                {/* Right Side: Grid detailing goals */}
                <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-4">
                  
                  {/* Goal 16 Card */}
                  <div className="parchment-sheet rounded-xl p-5 border border-accent/20 flex gap-4">
                    <div className="w-10 h-10 rounded-full bg-[#1F6FEB]/10 flex items-center justify-center text-[#1F6FEB] shrink-0">
                      <Scale className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-urdu text-lg font-bold text-amber-950 dark:text-amber-100 leading-normal mb-1">
                        امن، انصاف اور مضبوط ادارے (SDG 16)
                      </h4>
                      <p className="font-inter text-[11px] text-amber-900/70 dark:text-amber-100/50 leading-relaxed">
                        Targets institutional corruption, abuse of authority, and promotes transparent, accountable legal systems for all citizens.
                      </p>
                    </div>
                  </div>

                  {/* Goal 10 Card */}
                  <div className="parchment-sheet rounded-xl p-5 border border-accent/20 flex gap-4">
                    <div className="w-10 h-10 rounded-full bg-[#DA3B8A]/10 flex items-center justify-center text-[#DA3B8A] shrink-0">
                      <Users2 className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-urdu text-lg font-bold text-amber-950 dark:text-amber-100 leading-normal mb-1">
                        نابرابری میں کمی (SDG 10)
                      </h4>
                      <p className="font-inter text-[11px] text-amber-900/70 dark:text-amber-100/50 leading-relaxed">
                        Bridges the representation gap for low-income and illiterate groups by allowing voice-driven legal aid and civic reports.
                      </p>
                    </div>
                  </div>

                </div>

              </div>
            </div>
          </AnimatedContainer>
          
          {/* Top Stat Cards */}
          <AnimatedContainer variant="staggerChildren" className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            
            <StatCard 
              title="Total Anonymous Reports" 
              value={stats.total_reports.toLocaleString()} 
              iconName="FileWarning"
              trend="up"
              trendLabel="12% this month"
            />
            
            <StatCard 
              title="SDG 16 Progress Metric" 
              value={`${stats.sdg16_progress}%`} 
              iconName="Target"
              trend="up"
              trendLabel="0.4% improvement"
            />

            <StatCard 
              title="Most Reported Issue" 
              value={stats.top_issues[0].name} 
              iconName="TrendingUp"
              className="border-accent bg-accent/5"
            />
            
          </AnimatedContainer>

          {/* Main Visualizations */}
          <CivicPulse data={stats} />

        </div>
      </main>

      <Footer />
    </div>
  );
}
