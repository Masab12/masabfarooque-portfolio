'use client';

import { MotionConfig } from 'framer-motion';

/**
 * Framer Motion does not honour prefers-reduced-motion on its own. With
 * `reducedMotion="user"` every transform animation on the site is skipped
 * for visitors who have asked for less movement, and opacity still fades so
 * content never appears with a jolt.
 */
export default function MotionProvider({ children }: { children: React.ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
