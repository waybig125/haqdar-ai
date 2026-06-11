import React from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { StatCard } from '@/components/ui/StatCard';
import { CivicPulse } from '@/components/features/CivicPulse';
import { AnimatedContainer } from '@/components/ui/AnimatedContainer';
import { getStats } from '@/lib/api';

export const metadata = {
  title: "Civic Pulse | HaqDar AI",
  description: "Live dashboard tracking institutional corruption and complaints across Pakistan.",
};

export default async function DashboardPage() {
  // In App Router, we can fetch data directly in Server Components
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
                سول نبض <span className="gold-gradient-text font-garamond italic text-3xl font-bold ml-3">— Civic Pulse</span>
              </h1>
              <p className="text-sm md:text-base text-muted-foreground max-w-2xl leading-relaxed font-inter">
                Real-time open data tracking of institutional accountability and transparency across Pakistan. All reports are completely anonymous.
              </p>
            </AnimatedContainer>
          </div>
        </div>



        <div className="container mx-auto px-4 max-w-7xl py-12">
          
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
              className="md:border-primary/20 md:bg-primary/5"
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
