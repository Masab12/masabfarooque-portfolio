/** Anchor ids from titles. Shared so a link to /capabilities#x always lands. */
export const slugify = (value: string) =>
  value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
