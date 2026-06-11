import { Suspense } from 'react';
import { SiteHeader } from '@/components/marketing/SiteHeader';
import { Hero } from '@/components/marketing/Hero';
import { FeatureGrid } from '@/components/marketing/FeatureGrid';
import { HowToPlaySection } from '@/components/marketing/HowToPlaySection';
import { RulesSection } from '@/components/marketing/RulesSection';
import { AboutSection } from '@/components/marketing/AboutSection';
import { RoomDialogs } from '@/components/lobby/RoomDialogs';

export default function Home() {
  return (
    <main className="mx-auto w-full max-w-6xl px-6 pb-24">
      <SiteHeader />
      <Hero />
      <FeatureGrid />
      <HowToPlaySection />
      <RulesSection />
      <AboutSection />
      {/* Create / browse / join popups, opened via ?create / ?browse / ?join. */}
      <Suspense fallback={null}>
        <RoomDialogs />
      </Suspense>
    </main>
  );
}
