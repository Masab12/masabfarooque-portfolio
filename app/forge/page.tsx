import type { Metadata } from 'next';
import Navigation from '../components/Navigation';
import ForgeChat from '../components/ForgeChat';

export const metadata: Metadata = {
  title: 'Forge — Project Scoping Bot | Masab Farooque',
  description:
    "Tell Forge what you want to build. It scopes your project, generates a structured brief, and lands in Masab's inbox ready to act on.",
  alternates: { canonical: 'https://masabfarooque.com/forge' },
};

export default function ForgePage() {
  return (
    <>
      <Navigation />
      <main className="relative bg-void-black min-h-screen pt-20">
        <ForgeChat />
      </main>
    </>
  );
}
