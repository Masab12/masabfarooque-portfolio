/**
 * app/template.tsx remounts on every navigation, which makes it the place
 * for the page entrance: a short lift, done in CSS.
 *
 * It used to be a Framer Motion fade from opacity 0. Framer writes that
 * starting state into the server HTML, so every page was invisible until
 * JavaScript hydrated, and the largest paint on each page waited for the
 * bundle. A CSS animation starts on the first frame with or without
 * JavaScript, and it never goes below 0.7 opacity, so the text is readable
 * and measurable from the start.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  return <div className="page-enter">{children}</div>;
}
