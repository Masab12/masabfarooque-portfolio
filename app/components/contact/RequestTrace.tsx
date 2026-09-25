/**
 * The route a message takes, drawn as a pipe: this browser, EmailJS, then
 * the inbox. It is the real path, since the form sends from the browser
 * through EmailJS. While sending, a packet runs the pipe on a loop; once
 * delivered, every station is lit.
 */
export default function RequestTrace({ state }: { state: 'idle' | 'sending' | 'sent' | 'error' }) {
  const stations = ['Your browser', 'EmailJS', 'My inbox'];
  const reached = state === 'sent' ? 3 : state === 'sending' ? 1 : 0;
  return (
    <div className="relative py-2" aria-hidden>
      <div className="relative mx-[0.4rem] h-[3px] rounded-full bg-ink/10">
        <div
          className="absolute inset-y-0 left-0 origin-left rounded-full bg-sage transition-transform duration-700"
          style={{ width: '100%', transform: `scaleX(${state === 'sent' ? 1 : state === 'sending' ? 0.5 : 0})` }}
        />
        {state === 'sending' ? <span className="trace-packet absolute top-1/2 h-2.5 w-2.5 -translate-y-1/2 border bg-paper" style={{ borderColor: 'var(--clay)' }} /> : null}
      </div>
      <ol className="mt-2.5 flex justify-between">
        {stations.map((s, i) => (
          <li key={s} className="flex flex-col items-center gap-1.5 first:items-start last:items-end">
            <span className={`-mt-[1.15rem] h-3 w-3 rounded-full border-2 transition-colors duration-500 ${i < reached ? 'border-sage bg-sage' : 'border-ink/25 bg-paper'}`} />
            <span className={`mono text-[0.66rem] uppercase ${i < reached ? 'text-ink' : 'text-ink-3'}`}>{s}</span>
          </li>
        ))}
      </ol>
    </div>
  );
}
