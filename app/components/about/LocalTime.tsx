'use client';

import { useEffect, useState } from 'react';

const format = () =>
  new Date().toLocaleTimeString('en-GB', { timeZone: 'Asia/Karachi', hour: '2-digit', minute: '2-digit' });

/**
 * The time in Islamabad right now, so a visitor in another time zone can see
 * at a glance whether it is working hours. The server renders the zone name
 * only; the clock fills in on the client, which avoids a mismatched time.
 */
export default function LocalTime() {
  const [time, setTime] = useState<string | null>(null);
  useEffect(() => {
    setTime(format());
    const id = window.setInterval(() => setTime(format()), 15000);
    return () => window.clearInterval(id);
  }, []);
  return (
    <span className="tabular-nums" suppressHydrationWarning>
      {time ?? '--:--'}
    </span>
  );
}
