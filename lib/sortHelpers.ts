export function parseDateSafe(date?: string): number {
  if (!date) return 0;

  const d = new Date(date);
  return isNaN(d.getTime()) ? 0 : d.getTime();
}

export function normalize(s: string): string {
  return (s || "").toLowerCase().trim();
}