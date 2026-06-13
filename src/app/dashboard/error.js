'use client';

import React, { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { AlertOctagon } from 'lucide-react';
import Link from 'next/link';

export default function Error({ error, reset }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center px-4 py-16">
      <div className="wood-console rounded-2xl p-6 md:p-10 max-w-lg w-full text-center border border-accent/20 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/5 rounded-full blur-3xl pointer-events-none" />
        
        <div className="w-16 h-16 rounded-full bg-red-500/10 flex items-center justify-center text-red-600 dark:text-red-400 mx-auto mb-6">
          <AlertOctagon className="w-8 h-8" />
        </div>

        <h2 className="font-urdu text-3xl font-bold text-foreground mb-2" dir="rtl">
          سروس عارضی طور پر غیر فعال ہے
        </h2>
        <p className="font-inter text-xs text-accent uppercase tracking-widest font-semibold mb-4">
          Dashboard Unavailable
        </p>

        <p className="font-inter text-sm text-muted-foreground leading-relaxed mb-8">
          The dashboard data pipeline is currently offline or undergoing maintenance. Please check back shortly.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button
            onClick={() => reset()}
            className="bezel-btn rounded-lg px-6 h-12 w-full sm:w-auto font-bold font-inter text-sm cursor-pointer"
          >
            Try Again / دوبارہ کوشش
          </Button>
          <Link href="/" className="w-full sm:w-auto">
            <Button
              variant="outline"
              className="bezel-btn rounded-lg px-6 h-12 w-full font-bold font-inter text-sm cursor-pointer border-accent/30 text-accent bg-transparent"
            >
              Go Home / ہوم پیج
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
