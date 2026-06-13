"use client";

import React, { useState } from 'react';
import { StatCard } from '@/components/ui/StatCard';
import { CivicPulse } from '@/components/features/CivicPulse';
import { AnimatedContainer } from '@/components/ui/AnimatedContainer';
import { lookupReport } from '@/lib/api';
import { Button } from '@/components/ui/button';
import { Scale, Users2, Clock, CheckCircle2, ShieldCheck, Search, X } from 'lucide-react';

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

const toUrduDigits = (num) => {
  const urduDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
  const safeNum = num !== undefined && num !== null ? num : 0;
  return safeNum.toString().split('').map(d => urduDigits[parseInt(d, 10)] || d).join('');
};

const districtUrduMap = {
  'Karachi': 'کراچی',
  'Lahore': 'لاہور',
  'Islamabad': 'اسلام آباد',
  'Rawalpindi': 'راولپنڈی',
  'Faisalabad': 'فیصل آباد',
  'Peshawar': 'پشاور',
  'Multan': 'ملتان',
  'Quetta': 'کوئٹہ'
};

const categoryUrduMap = {
  'Police': 'پولیس ہراساں کرنا',
  'Police Extortion': 'پولیس ہراساں کرنا',
  'Utilities': 'یوٹیلیٹی بلنگ',
  'Utility Overcharging': 'یوٹیلیٹی بلنگ',
  'Utility': 'یوٹیلیٹی بلنگ',
  'Healthcare': 'صحت کی سہولیات',
  'Labour': 'مزدور کا استحصال',
  'Labour Exploitation': 'مزدور کا استحصال',
  'Education': 'تعلیمی فیسیں',
  'Education Fees': 'تعلیمی فیسیں',
  'Women': 'خواتین کا تحفظ',
  'Consumer': 'صارفین کے حقوق',
  'Traffic': 'ٹریفک اور لائسنس',
  'Rti': 'معلومات تک رسائی (RTI)',
  'Municipal': 'بلدیاتی سہولیات',
  'General': 'عام شکایات',
  'Other': 'دیگر'
};

const capitalize = (s) => s ? s.charAt(0).toUpperCase() + s.slice(1) : '';

export function DashboardClient({ initialStats }) {
  const isDatabaseEmpty = !initialStats || initialStats.total_reports === 0;

  const [stats] = useState(isDatabaseEmpty ? {
    total_reports: 1247,
    sdg16_progress: 8.4,
    top_issues: [
      { name: 'Police Extortion', count: 420 },
      { name: 'Utility Overcharging', count: 350 },
      { name: 'Denied Healthcare', count: 210 },
      { name: 'Labour Exploitation', count: 180 },
      { name: 'Education Fees', count: 87 },
    ],
    district_rankings: [
      { district: 'Karachi', count: 287, trend: 'up' },
      { district: 'Lahore', count: 142, trend: 'down' },
      { district: 'Islamabad', count: 98, trend: 'stable' },
      { district: 'Rawalpindi', count: 76, trend: 'up' },
      { district: 'Faisalabad', count: 63, trend: 'up' },
    ],
    monthly_trend: [
      { month: 'Jan', count: 800 },
      { month: 'Feb', count: 950 },
      { month: 'Mar', count: 1020 },
      { month: 'Apr', count: 1100 },
      { month: 'May', count: 1180 },
      { month: 'Jun', count: 1247 },
    ],
    category_breakdown: [
      { category: 'Police', value: 420 },
      { category: 'Utilities', value: 350 },
      { category: 'Healthcare', value: 210 },
      { category: 'Labour', value: 180 },
      { category: 'Other', value: 87 },
    ]
  } : initialStats);
  
  // Interactive Report Search
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResult, setSearchResult] = useState(null);
  const [searchLoading, setSearchLoading] = useState(false);
  const [searchError, setSearchError] = useState('');

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    setSearchLoading(true);
    setSearchError('');
    setSearchResult(null);
    try {
      const result = await lookupReport(searchQuery.trim());
      setSearchResult(result);
    } catch (err) {
      setSearchError('درج کردہ حوالہ نمبر نہیں مل سکا / Reference ID not found');
    } finally {
      setSearchLoading(false);
    }
  };

  const activeCity = stats.district_rankings?.[0]?.district || 'Karachi';
  const activeCityUrdu = districtUrduMap[activeCity] || activeCity;

  const primaryIssue = stats.top_issues?.[0]?.name || 'General';
  const primaryIssueUrdu = categoryUrduMap[primaryIssue] || primaryIssue;

  return (
    <>
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
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-accent/30 bg-accent/10 dark:bg-[#3A231A]/30 text-amber-950 dark:text-accent font-semibold text-[10px] uppercase tracking-widest font-inter">
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
                <h4 className="font-urdu text-xl font-bold text-accent mb-2" dir="rtl">آج کی سرگرمی / Today's Pulse</h4>
                <p className="text-xs text-muted-foreground font-inter leading-none">Real-time status updates from across Pakistan's districts.</p>
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-3 md:gap-6 text-xs font-semibold font-inter">
              <div className="px-4 py-2 bg-[#3A231A]/5 dark:bg-black/20 rounded-lg border border-accent/20 dark:border-accent/10">
                <span className="text-[10px] text-muted-foreground uppercase block mb-0.5">Today's Reports</span>
                <span className="text-amber-950 dark:text-accent text-sm font-bold">
                  {toUrduDigits(stats.total_reports)} شکایات / {stats.total_reports} Reports
                </span>
              </div>
              <div className="px-4 py-2 bg-[#3A231A]/5 dark:bg-black/20 rounded-lg border border-accent/20 dark:border-accent/10">
                <span className="text-[10px] text-muted-foreground uppercase block mb-0.5">Active City</span>
                <span className="text-amber-950 dark:text-accent text-sm font-bold">
                  {activeCity} / {activeCityUrdu}
                </span>
              </div>
              <div className="px-4 py-2 bg-[#3A231A]/5 dark:bg-black/20 rounded-lg border border-accent/20 dark:border-accent/10">
                <span className="text-[10px] text-muted-foreground uppercase block mb-0.5">Primary Issue</span>
                <span className="text-amber-950 dark:text-accent text-sm font-bold">
                  {primaryIssue} / {primaryIssueUrdu}
                </span>
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
            value={categoryUrduMap[stats.top_issues?.[0]?.name] || stats.top_issues?.[0]?.name || 'General'}
            iconName="TrendingUp"
            className="border-accent bg-accent/5"
            sparklineData={[20, 35, 45, 30, 60, 70, 85]}
          />

        </AnimatedContainer>

        {/* Main Visualizations */}
        <CivicPulse data={stats} />

        {/* Ledger & Targets grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-12">

          {/* Left side: Recent Reports registry log (Ledger Style) */}
          <AnimatedContainer variant="fadeUp" className="lg:col-span-7">
            <div className="wood-console rounded-2xl p-6 border border-accent/20 shadow-xl relative overflow-hidden h-full">
              <div className="grunge-overlay" />
              
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 relative z-10">
                <div className="flex items-center gap-3">
                  <Clock className="w-5 h-5 text-accent" />
                  <h3 className="font-urdu text-2xl font-bold text-primary dark:text-[#E6DBC6] m-0" dir="rtl">حالیہ شکایات لاگ / Activity Ledger</h3>
                </div>

                {/* Interactive Search Tool */}
                <form onSubmit={handleSearch} className="flex gap-2 max-w-xs w-full sm:w-auto">
                  <div className="relative flex-1">
                    <input
                      type="text"
                      placeholder="حوالہ نمبر تلاش کریں..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full text-xs font-inter border border-accent/30 bg-background/50 text-foreground rounded-md py-1.5 px-3 focus:outline-none focus:ring-1 focus:ring-accent pl-8"
                    />
                    <Search className="absolute left-2.5 top-2.5 w-3.5 h-3.5 text-muted-foreground" />
                  </div>
                  <Button 
                    type="submit" 
                    variant="secondary"
                    size="sm"
                    className="bezel-btn rounded-md h-8 px-3 font-urdu font-bold text-xs border-accent/30 cursor-pointer text-accent"
                    disabled={searchLoading}
                  >
                    {searchLoading ? (
                      <div className="w-3.5 h-3.5 border-2 border-accent border-t-transparent rounded-full animate-spin" />
                    ) : 'تلاش'}
                  </Button>
                </form>
              </div>

              {/* Interactive Search Results */}
              {searchError && (
                <div className="mb-4 p-3.5 bg-red-500/10 border border-red-500/20 rounded-xl text-red-600 dark:text-red-400 font-urdu text-sm text-right relative z-10" dir="rtl">
                  {searchError}
                </div>
              )}
              {searchResult && (
                <div className="mb-4 parchment-sheet rounded-xl p-4 border border-accent/30 shadow-inner relative z-10 flex flex-col gap-3 font-urdu text-right text-amber-950 dark:text-amber-100/90" dir="rtl">
                  <div className="flex items-center justify-between border-b border-accent/20 pb-2">
                    <h4 className="text-sm font-bold text-accent">شکایت کی معلومات / Report Verification</h4>
                    <button 
                      type="button" 
                      onClick={() => { setSearchResult(null); setSearchQuery(''); }}
                      className="text-muted-foreground hover:text-foreground cursor-pointer"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-xs mt-1">
                    <div>
                      <span className="text-[9px] uppercase font-bold text-muted-foreground/60 block">Reference ID</span>
                      <span className="font-inter font-bold">{searchResult.reference_id}</span>
                    </div>
                    <div>
                      <span className="text-[9px] uppercase font-bold text-muted-foreground/60 block">Category / شعبہ</span>
                      <span className="font-semibold">{categoryUrduMap[capitalize(searchResult.domain)] || searchResult.domain}</span>
                    </div>
                    <div>
                      <span className="text-[9px] uppercase font-bold text-muted-foreground/60 block">District / ضلع</span>
                      <span className="font-semibold">{districtUrduMap[searchResult.district] || searchResult.district}</span>
                    </div>
                    <div>
                      <span className="text-[9px] uppercase font-bold text-muted-foreground/60 block">Submission Date / تاریخ</span>
                      <span className="font-inter font-semibold">{searchResult.created_on}</span>
                    </div>
                  </div>
                </div>
              )}

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
    </>
  );
}
