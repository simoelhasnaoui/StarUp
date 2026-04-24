export function publicImage(filename) {
  const base = process.env.PUBLIC_URL || '';
  return `${base}/images/${encodeURIComponent(filename)}`;
}
