'use client';

import { useEffect, useState } from 'react';
import Script from 'next/script';
import Clarity from '@microsoft/clarity';
import { AnimatePresence, motion } from 'framer-motion';

const NOTICE_SEEN_KEY = 'analytics-notice-seen';
const GA_ID = 'G-YSMF0ZW4R1';
const CLARITY_ID = 'xxif6p5n31';

/** Google Analytics and Microsoft Clarity, loaded on every visit. */
export function Analytics() {
  useEffect(() => {
    Clarity.init(CLARITY_ID);
  }, []);

  return (
    <>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="afterInteractive" />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_ID}');
        `}
      </Script>
    </>
  );
}

/**
 * A one time, dismiss only heads up that analytics run on the site. This is
 * a notice, not a consent control: dismissing it does not change whether
 * analytics load, so it does not carry Accept/Decline buttons that would
 * imply a choice that is not actually offered.
 */
export default function AnalyticsNotice() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!window.localStorage.getItem(NOTICE_SEEN_KEY)) setVisible(true);
  }, []);

  const dismiss = () => {
    window.localStorage.setItem(NOTICE_SEEN_KEY, '1');
    setVisible(false);
  };

  return (
    <AnimatePresence>
      {visible ? (
        <motion.div
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 40, opacity: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          role="status"
          aria-label="Analytics notice"
          className="fixed inset-x-3 bottom-3 z-[90] sm:inset-x-auto sm:bottom-6 sm:right-6 sm:max-w-sm"
        >
          <div
            className="rounded-2xl border bg-[#101010] p-5 shadow-2xl"
            style={{ borderColor: 'var(--line-2)' }}
          >
            <p className="text-sm text-cream">A quick word on analytics</p>
            <p className="mt-2 text-xs leading-relaxed text-gray-400">
              This site uses analytics to see which pages are working and which are not, so I can
              keep improving it. Details are in the{' '}
              <a href="/privacy" className="text-primary hover:underline">
                privacy policy
              </a>
              .
            </p>
            <button
              type="button"
              onClick={dismiss}
              className="mt-4 w-full rounded-full bg-primary px-4 py-2 text-xs font-medium text-black transition-opacity hover:opacity-85"
            >
              OK
            </button>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
