import type { CheckResult } from '@/app/lib/site-check/checks';

export interface PdfReport {
  url: string;
  scannedAt: string;
  score: number;
  max: number;
  percent: number;
  counts: { pass: number; warn: number; fail: number };
  results: CheckResult[];
}

const INK = '#161512';
const MUTED = '#6b6a63';
const LINE = '#d9d7cc';
// The one accent colour the site allows itself, and the same one the web
// report uses for a failing check, so the PDF does not introduce a second
// idea of what a warning colour looks like.
const FAIL = '#c17165';

const STATUS_LABEL = { pass: 'Pass', warn: 'Check this', fail: 'Fix this' } as const;
const STATUS_COLOR = { pass: INK, warn: MUTED, fail: FAIL } as const;

/**
 * Lays the report out by hand with jsPDF's text and line primitives, rather
 * than screenshotting the page, so the PDF stays small, the text stays
 * selectable, and it paginates properly instead of cutting a card in half at
 * a page break.
 */
export async function buildSiteCheckPdf(report: PdfReport): Promise<void> {
  const { jsPDF } = await import('jspdf');
  const doc = new jsPDF({ unit: 'pt', format: 'a4' });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 50;
  const contentWidth = pageWidth - margin * 2;
  let y = margin;

  function ensureSpace(needed: number) {
    if (y + needed > pageHeight - margin) {
      doc.addPage();
      y = margin;
    }
  }

  function rule() {
    doc.setDrawColor(LINE);
    doc.setLineWidth(0.75);
    doc.line(margin, y, pageWidth - margin, y);
  }

  // Masthead
  doc.setTextColor(INK);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(20);
  doc.text('Site Check report', margin, y + 20);
  y += 34;

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  doc.setTextColor(MUTED);
  const scannedDate = new Date(report.scannedAt).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
  doc.text(report.url, margin, y);
  doc.text(`Scanned ${scannedDate}`, pageWidth - margin, y, { align: 'right' });
  y += 18;
  rule();
  y += 28;

  // Score block. Width has to be measured at the size the text was actually
  // set in, before switching down for the smaller "/ 100": measuring after
  // the switch reads back the width of the wrong font size and the two
  // pieces land on top of each other.
  doc.setTextColor(INK);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(34);
  doc.text(`${report.percent}`, margin, y + 24);
  const percentWidth = doc.getTextWidth(`${report.percent}`);
  doc.setFontSize(14);
  doc.text('/ 100', margin + percentWidth + 6, y + 24);

  // Same reasoning as the score above: lay these out from measured widths,
  // not guessed offsets, so a double digit count never runs into the next
  // label.
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  const GAP = 18;
  let countX = margin;
  const counts: [string, string][] = [
    [`${report.counts.pass} passing`, INK],
    [`${report.counts.warn} worth checking`, MUTED],
    [`${report.counts.fail} need fixing`, FAIL],
  ];
  for (const [label, color] of counts) {
    doc.setTextColor(color);
    doc.text(label, countX, y + 42);
    countX += doc.getTextWidth(label) + GAP;
  }
  y += 64;
  rule();
  y += 26;

  const categories = Array.from(new Set(report.results.map((r) => r.category)));

  for (const category of categories) {
    ensureSpace(40);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(13);
    doc.setTextColor(INK);
    doc.text(category, margin, y);
    y += 18;

    const items = report.results.filter((r) => r.category === category);
    for (const item of items) {
      const detailLines = doc.setFont('helvetica', 'normal').setFontSize(9.5).splitTextToSize(item.detail, contentWidth - 16);
      const blockHeight = 16 + detailLines.length * 12 + 10;
      ensureSpace(blockHeight);

      doc.setFont('helvetica', 'bold');
      doc.setFontSize(10.5);
      doc.setTextColor(STATUS_COLOR[item.status]);
      doc.text(`[${STATUS_LABEL[item.status]}]`, margin, y);

      doc.setTextColor(INK);
      doc.text(item.label, margin + 66, y);
      y += 14;

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(9.5);
      doc.setTextColor(MUTED);
      doc.text(detailLines, margin + 16, y);
      y += detailLines.length * 12 + 12;
    }
    y += 8;
  }

  ensureSpace(70);
  y += 10;
  rule();
  y += 24;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(12);
  doc.setTextColor(INK);
  doc.text('Want these fixed rather than just found?', margin, y);
  y += 18;
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  doc.setTextColor(MUTED);
  doc.text('Masab Farooque, full stack engineer. contact@masabfarooque.com / masabfarooque.com', margin, y);

  const host = (() => {
    try {
      return new URL(report.url).hostname;
    } catch {
      return 'site';
    }
  })();
  doc.save(`site-check-${host}.pdf`);
}
