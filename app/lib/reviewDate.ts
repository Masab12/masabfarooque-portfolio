/**
 * Review date formatting, kept out of the card component because that file is
 * a client component and a server page cannot call across that boundary.
 * Parsed by hand rather than with toLocaleDateString so the server and the
 * client always produce the same string.
 */

const MONTHS = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
];

/** "2026-07-21T14:23:21" becomes "Jul 2026". */
export function formatReviewDate(value: string) {
  const [year, month] = value.split('T')[0].split('-');
  return `${MONTHS[Number(month) - 1]} ${year}`;
}
