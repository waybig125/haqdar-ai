import React from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { getStats } from '@/lib/api';
import { DashboardClient } from './DashboardClient';

export const metadata = {
  title: "Civic Pulse | HaqDar AI",
  description: "Live dashboard tracking institutional corruption and complaints across Pakistan.",
};

export default async function DashboardPage() {
  const stats = await getStats();

  return (
    <div className="min-h-screen flex flex-col selection:bg-primary/20 selection:text-primary">
      <Header />
      <main className="flex-grow">
        <DashboardClient initialStats={stats} />
      </main>
      <Footer />
    </div>
  );
}
