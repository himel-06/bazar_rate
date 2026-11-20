const BN_DIGITS = "০১২৩৪৫৬৭৮৯";

export function bnToEn(s: string) {
  return s.replace(/[০-৯]/g, (d) => String(BN_DIGITS.indexOf(d)));
}

/** Converts numbers or Bengali/English numeric strings to a real number (used for sorting). */
export function parseNum(v: unknown): number {
  if (typeof v === "number") return Number.isFinite(v) ? v : 0;
  if (typeof v === "string") {
    const c = bnToEn(v)
      .replace(/,/g, "")
      .replace(/[−–—]/g, "-")
      .replace(/[^0-9.\-]/g, "");
    const n = parseFloat(c);
    return Number.isNaN(n) ? 0 : n;
  }
  return 0;
}

const nf = new Intl.NumberFormat("bn-BD");
const pf = new Intl.NumberFormat("bn-BD", {
  minimumFractionDigits: 1,
  maximumFractionDigits: 1,
});

export const toBn = (n: number) => nf.format(n);
export const formatPrice = (n: number) => `${toBn(n)} টাকা`;

export function formatChange(c: number) {
  const t = pf.format(Math.abs(c));
  if (c > 0) return `▲ ${t}%`;
  if (c < 0) return `▼ ${t}%`;
  return `—${t}%`;
}

export function banglaDate(d = new Date()) {
  return d.toLocaleDateString("bn-BD", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}
