"use client";

import React from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { HeroSection } from '@/components/sections/HeroSection';
import { HowItWorksSection } from '@/components/sections/HowItWorksSection';
import { SdgFocusSection } from '@/components/sections/SdgFocusSection';
import { FaqSection } from '@/components/sections/FaqSection';
import { ComplaintInput } from '@/components/features/ComplaintInput';
import { ResultCard } from '@/components/features/ResultCard';
import { KnowYourRights } from '@/components/features/KnowYourRights';
import { HeatmapSection } from '@/components/features/HeatmapSection';
import { useAnalyzeComplaint } from '@/lib/hooks';

export default function Home() {
  const { data: analysisResult, loading, analyze } = useAnalyzeComplaint();

  const handleAnalyze = (text) => {
    analyze(text);
    // Smooth scroll down slightly after analyzing
    setTimeout(() => {
      const resultEl = document.getElementById('result-section');
      if (resultEl) resultEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 500);
  };

  return (
    <div className="min-h-screen flex flex-col selection:bg-primary/20 selection:text-primary">
      <Header />
      
      <main className="flex-grow">
        <HeroSection />
        
        <HowItWorksSection />
        
        <ComplaintInput onAnalyze={handleAnalyze} loading={loading} />
        
        <div id="result-section" className="scroll-mt-24">
          {analysisResult && (
            <>
              <ResultCard result={analysisResult} />
              <KnowYourRights result={analysisResult} />
            </>
          )}
        </div>

        <div className="mt-12">
          <HeatmapSection />
        </div>

        <SdgFocusSection />

        <FaqSection />
      </main>

      <Footer />
    </div>
  );
}
