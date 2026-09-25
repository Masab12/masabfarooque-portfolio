import type { Metadata } from 'next';
import { site } from './data/site';
import Hero from './components/home/Hero';
import SelectedWork from './components/home/SelectedWork';
import ServiceSchedule from './components/home/ServiceSchedule';
import Decoupling from './components/home/Decoupling';
import ClientWords from './components/home/ClientWords';
import TerminalSection from './components/home/TerminalSection';
import ScrollRail from './components/home/ScrollRail';

export const metadata: Metadata = {
  title: { absolute: 'Masab Farooque | Full Stack Engineer, SaaS and AI Systems' },
  description:
    'Full stack engineer in Islamabad building SaaS platforms, AI systems and data pipelines, and moving slow WordPress sites onto Next.js. 148 reviews at 5.0 from clients in 23 countries.',
  alternates: { canonical: site.url },
};

const stops = [
  { id: 'hero-title', label: 'Cover' },
  { id: 'work', label: 'Work' },
  { id: 'services', label: 'Services' },
  { id: 'wordpress', label: 'WordPress' },
  { id: 'reviews', label: 'Reviews' },
  { id: 'terminal', label: 'Shell' },
];

/**
 * Cover sheet, then the evidence in the order a visitor weighs it: the work,
 * what can be hired, the main service argued with a drawing, what clients
 * said, and a terminal to poke at. There is no closing banner. The masthead
 * carries the contact button everywhere and the footer prints the address.
 */
export default function HomePage() {
  return (
    <>
      <ScrollRail stops={stops} />
      <Hero />
      <SelectedWork />
      <ServiceSchedule />
      <Decoupling />
      <ClientWords />
      <TerminalSection />
    </>
  );
}
