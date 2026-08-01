import type { Metadata } from 'next';
import { marqueeTerms, site } from './data/site';
import Hero from './components/home/Hero';
import VelocityTicker from './components/core/VelocityTicker';
import ClientStrip from './components/core/ClientStrip';
import Statement from './components/home/Statement';
import ExperienceIndex from './components/home/ExperienceIndex';
import Capabilities from './components/home/Capabilities';
import WorkPlates from './components/home/WorkPlates';
import Process from './components/home/Process';
import Testimonials from './components/home/Testimonials';
import Reach from './components/home/Reach';
import ContactCTA from './components/home/ContactCTA';

export const metadata: Metadata = {
  title: 'Masab Farooque | Full Stack Engineer, SaaS and AI Systems',
  description:
    'Full stack engineer in Islamabad. SaaS platforms, AI systems and data pipelines built end to end with Next.js, FastAPI and Go. Clients in 24 countries.',
  alternates: { canonical: site.url },
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <VelocityTicker items={marqueeTerms} />
      <ClientStrip />
      <Statement />
      <ExperienceIndex />
      <Capabilities />
      <WorkPlates />
      <Process />
      <Testimonials />
      <Reach />
      <ContactCTA />
    </>
  );
}
