import type { Metadata } from 'next';
import { site } from './data/site';
import Hero from './components/home/Hero';
import Statement from './components/home/Statement';
import Features from './components/home/Features';
import ExperienceIndex from './components/home/ExperienceIndex';
import WorkPlates from './components/home/WorkPlates';
import Testimonials from './components/home/Testimonials';
import ContactCTA from './components/home/ContactCTA';

export const metadata: Metadata = {
  title: 'Masab Farooque | Full Stack Engineer, SaaS and AI Systems',
  description:
    'Full stack engineer in Islamabad. SaaS platforms, AI systems and data pipelines built end to end with Next.js, FastAPI and Go. Clients in 23 countries.',
  alternates: { canonical: site.url },
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <Statement />
      <Features />
      <ExperienceIndex />
      <WorkPlates />
      <Testimonials />
      <ContactCTA />
    </>
  );
}
