export function parseFRDate(dateStr: string): number {
  // attend "dd/mm/yyyy"
  const [dd, mm, yyyy] = dateStr.split("/").map((x) => Number(x));
  if (!dd || !mm || !yyyy) return 0;
  return new Date(yyyy, mm - 1, dd).getTime();
}

export function normalize(s: string): string {
  return (s || "").toLowerCase().trim();
}
