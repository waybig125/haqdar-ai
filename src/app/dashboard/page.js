import React from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { StatCard } from '@/components/ui/StatCard';
import { CivicPulse } from '@/components/features/CivicPulse';
import { AnimatedContainer } from '@/components/ui/AnimatedContainer';
import { getStats } from '@/lib/api';
import { Scale, Users2, Landmark, Clock, CheckCircle2, ShieldCheck, BadgeInfo } from 'lucide-react';

export const metadata = {
  title: "Civic Pulse | HaqDar AI",
  description: "Live dashboard tracking institutional corruption and complaints across Pakistan.",
};

const RECENT_REPORTS = [
  { id: "REP-9831", timestamp: "Today, 05:12 PM", category: "Police Extortion", district: "Karachi", status: "In Review", statusColor: "text-amber-500" },
  { id: "REP-9828", timestamp: "Today, 03:45 PM", category: "Utility Overcharge", district: "Rawalpindi", status: "Draft Crafted", statusColor: "text-emerald-500" },
  { id: "REP-9825", timestamp: "Yesterday, 06:12 PM", category: "Healthcare Denial", district: "Lahore", status: "Resolved", statusColor: "text-blue-500" },
  { id: "REP-9821", timestamp: "Yesterday, 11:20 AM", category: "Labour Exploitation", district: "Faisalabad", status: "Draft Crafted", statusColor: "text-emerald-500" },
  { id: "REP-9819", timestamp: "10 Jun 2026, 04:30 PM", category: "Education Fees Dispute", district: "Islamabad", status: "In Review", statusColor: "text-amber-500" }
];

const SDG_TARGETS = [
  {
    target: "16.3",
    title: "Access to Justice",
    descUrdu: "تمام لوگوں کے لیے مساوی انصاف کی فراہمی کو یقینی بنانا اور قانون کی بالادستی کو فروغ دینا۔",
    descEnglish: "Promote the rule of law at the national and international levels and ensure equal access to justice for all."
  },
  {
    target: "16.5",
    title: "Reduce Corruption",
    descUrdu: "رشوت ستانی اور ہر قسم کی کرپشن کو کافی حد تک کم کرنا اور شفافیت لانا۔",
    descEnglish: "Substantially reduce corruption and bribery in all their forms across civic institutions."
  },
  {
    target: "10.2",
    title: "Promote Inclusion",
    descUrdu: "خواندگی، صنف، یا آمدن سے بالاتر ہو کر تمام شہریوں کی سماجی اور قانونی شمولیت کو فروغ دینا۔",
    descEnglish: "Empower and promote the social, economic and political inclusion of all, irrespective of age, sex, disability, race, ethnicity, origin, religion or economic status."
  }
];

export default async function DashboardPage() {
  const stats = await getStats();

  return (
    <div className="min-h-screen flex flex-col selection:bg-primary/20 selection:text-primary">
      <Header />
      
      <main className="flex-grow">
        
        {/* Dashboard Header */}
        <div className="border-b border-accent/20 dark:border-accent/10 pb-10 pt-16 bg-muted/20 relative">
          <div className="container mx-auto px-4 max-w-7xl">
            <AnimatedContainer variant="fadeUp">
              <h1 className="font-urdu text-4xl md:text-5xl font-bold text-foreground mb-3 leading-[1.3] flex flex-wrap items-center" dir="rtl">
                سول نبض <span className="gold-gradient-text-light font-garamond italic text-3xl font-bold ml-3">— Civic Pulse</span>
              </h1>
              <p className="text-sm md:text-base text-muted-foreground max-w-2xl leading-relaxed font-inter">
                Real-time open data tracking of institutional accountability and transparency across Pakistan. All reports are completely anonymous.
              </p>
            </AnimatedContainer>
          </div>
        </div>

        <div className="container mx-auto px-4 max-w-7xl py-12">
          
          {/* SDG Impact Banner / Explainer Box */}
          <AnimatedContainer variant="fadeUp" className="mb-10">
            <div className="wood-console rounded-2xl p-6 md:p-8 border border-accent/20 shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-accent/2 rounded-full blur-3xl pointer-events-none" />
              
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
                
                {/* Left Side: General Info */}
                <div className="lg:col-span-4 space-y-3">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-accent/30 bg-[#3A231A]/30 text-accent font-semibold text-[10px] uppercase tracking-widest font-inter">
                    Dashboard Overview
                  </div>
                  <h2 className="font-garamond text-2xl md:text-3xl font-black text-primary dark:text-[#E6DBC6] leading-tight">
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
                      <h4 className="font-urdu text-lg font-bold text-amber-950 dark:text-amber-100 leading-normal mb-1" dir="rtl">
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
                      <h4 className="font-urdu text-lg font-bold text-amber-950 dark:text-amber-100 leading-normal mb-1" dir="rtl">
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
          
          {/* Today's Pulse Live Banner */}
          <AnimatedContainer variant="fadeUp" className="mb-10 no-print">
            <div className="bg-[#C5A059]/10 border border-[#C5A059]/30 rounded-2xl p-4 md:p-6 flex flex-col md:flex-row items-center justify-between gap-4 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-accent/5 rounded-full blur-2xl pointer-events-none" />
              <div className="flex items-center gap-3">
                <span className="flex h-3 w-3 relative shrink-0">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                </span>
                <div className="text-left">
                  <h4 className="font-urdu text-xl font-bold text-accent mb-0.5" dir="rtl">آج کی سرگرمی / Today's Pulse</h4>
                  <p className="text-xs text-muted-foreground font-inter leading-none">Real-time status updates from across Pakistan's districts.</p>
                </div>
              </div>
              <div className="flex flex-wrap items-center gap-3 md:gap-6 text-xs font-semibold font-inter">
                <div className="px-4 py-2 bg-[#3A231A]/20 dark:bg-black/20 rounded-lg border border-accent/10">
                  <span className="text-[10px] text-muted-foreground uppercase block mb-0.5">Today's Reports</span>
                  <span className="text-accent text-sm font-bold">۲۴ شکایات / 24 Reports</span>
                </div>
                <div className="px-4 py-2 bg-[#3A231A]/20 dark:bg-black/20 rounded-lg border border-accent/10">
                  <span className="text-[10px] text-muted-foreground uppercase block mb-0.5">Active City</span>
                  <span className="text-accent text-sm font-bold">Karachi / کراچی</span>
                </div>
                <div className="px-4 py-2 bg-[#3A231A]/20 dark:bg-black/20 rounded-lg border border-accent/10">
                  <span className="text-[10px] text-muted-foreground uppercase block mb-0.5">Primary Issue</span>
                  <span className="text-accent text-sm font-bold">Utility Billing / یوٹیلیٹی بلنگ</span>
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
              sparklineData={[35, 45, 40, 55, 60, 75, 90]}
            />
            
            <StatCard 
              title="SDG 16 Progress Metric" 
              value={`${stats.sdg16_progress}%`} 
              iconName="Target"
              trend="up"
              trendLabel="0.4% improvement"
              sparklineData={[80, 81, 82, 82.5, 83, 83.5, 84]}
            />

            <StatCard 
              title="Most Reported Issue" 
              value={stats.top_issues[0].name} 
              iconName="TrendingUp"
              className="border-accent bg-accent/5"
              sparklineData={[20, 35, 45, 30, 60, 70, 85]}
            />
            
          </AnimatedContainer>

          {/* Main Visualizations */}
          <CivicPulse data={stats} />

          {/* NEW DASHBOARD SECTIONS */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-12">
            
            {/* Left side: Recent Reports registry log (Ledger Style) */}
            <AnimatedContainer variant="fadeUp" className="lg:col-span-7">
              <div className="wood-console rounded-2xl p-6 border border-accent/20 shadow-xl relative overflow-hidden h-full">
                <div className="grunge-overlay" />
                <div className="flex items-center gap-3 mb-6 relative z-10">
                  <Clock className="w-5 h-5 text-accent" />
                  <h3 className="font-urdu text-2xl font-bold text-primary dark:text-[#E6DBC6] m-0" dir="rtl">حالیہ شکایات لاگ / Activity Ledger</h3>
                </div>
                
                <div className="parchment-sheet rounded-xl overflow-hidden border border-accent/20 relative z-10">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="border-b border-accent/20 bg-[#3A231A]/10 text-amber-950 dark:text-accent font-garamond text-xs font-bold uppercase tracking-wider">
                          <th className="p-4">Report ID</th>
                          <th className="p-4">Timestamp</th>
                          <th className="p-4">Category</th>
                          <th className="p-4">District</th>
                          <th className="p-4 text-right">Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {RECENT_REPORTS.map((rep) => (
                          <tr key={rep.id} className="border-b border-accent/10 hover:bg-[#3A231A]/5 transition-colors font-inter text-xs text-amber-950 dark:text-amber-100/90">
                            <td className="p-4 font-bold">{rep.id}</td>
                            <td className="p-4 text-amber-900/60 dark:text-amber-100/40">{rep.timestamp}</td>
                            <td className="p-4 font-semibold">{rep.category}</td>
                            <td className="p-4">{rep.district}</td>
                            <td className={`p-4 text-right font-bold ${rep.statusColor}`}>{rep.status}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </AnimatedContainer>

            {/* Right side: SDG Target Blueprint */}
            <AnimatedContainer variant="fadeUp" className="lg:col-span-5">
              <div className="wood-console rounded-2xl p-6 border border-accent/20 shadow-xl relative overflow-hidden h-full">
                <div className="grunge-overlay" />
                <div className="flex items-center gap-3 mb-6 relative z-10">
                  <ShieldCheck className="w-5 h-5 text-accent" />
                  <h3 className="font-urdu text-2xl font-bold text-primary dark:text-[#E6DBC6] m-0" dir="rtl">گلوبل ٹارگٹ بلیو پرنٹ / SDG Targets</h3>
                </div>

                <div className="flex flex-col gap-4 relative z-10">
                  {SDG_TARGETS.map((target, idx) => (
                    <div key={idx} className="parchment-sheet rounded-xl p-4 border border-accent/20 flex gap-3.5">
                      <div className="w-10 h-10 rounded-full bg-accent/15 border border-accent/35 flex items-center justify-center font-garamond font-black text-sm text-accent shrink-0">
                        {target.target}
                      </div>
                      <div className="space-y-1">
                        <span className="text-[10px] font-bold text-amber-900/50 dark:text-accent/60 uppercase tracking-widest block font-inter">
                          {target.title}
                        </span>
                        <p className="font-urdu text-[13px] leading-relaxed text-amber-950 dark:text-amber-100" dir="rtl">
                          {target.descUrdu}
                        </p>
                        <p className="font-inter text-[10px] text-amber-900/60 dark:text-amber-100/40 leading-normal pt-1">
                          {target.descEnglish}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </AnimatedContainer>

          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
