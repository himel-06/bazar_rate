import { parseNum } from "./bengali";

/**
 * NOTE: The README did not show the exact JSON shape, so this file normalizes
 * several common field names. If your API uses different keys, only edit
 * `normalizeProduct` / `normalizeCategory` below.
 */

const BASES = [
  process.env.NEXT_PUBLIC_API_URL,
  "https://openapi.programming-hero.com/api/bazardor",
  "https://api.api-store.workers.dev/api/bazardor",
  "https://api.abcz.workers.dev/api/bazardor",
].filter(Boolean) as string[];

export type Market = { name: string; price: number; change: number };

export type Product = {
  id: string;
  name: string;
  emoji: string;
  unit: string;
  price: number;
  change: number;
  description: string;
  categories: string[];
  markets: Market[];
  min: number;
  max: number;
  avg: number;
};

export type Category = { slug: string; name: string; icon: string };

/* eslint-disable @typescript-eslint/no-explicit-any */
const pick = (o: any, keys: string[]) => {
  for (const k of keys) {
    const v = o?.[k];
    if (v !== undefined && v !== null && v !== "") return v;
  }
  return undefined;
};

const UNIT_MAP: Record<string, string> = {
  kg: "কেজি",
  kilogram: "কেজি",
  litre: "লিটার",
  liter: "লিটার",
  l: "লিটার",
  dozen: "ডজন",
  piece: "পিস",
  pcs: "পিস",
  pc: "পিস",
  hali: "হালি",
};

function formatUnit(u: unknown) {
  const s = String(u ?? "").trim();
  if (!s) return "প্রতি কেজি";
  if (s.startsWith("প্রতি")) return s;
  const mapped = UNIT_MAP[s.toLowerCase().replace(/^per[\s_-]*/, "")];
  return `প্রতি ${mapped ?? s}`;
}

function toArray(json: any, keys: string[]): any[] {
  if (Array.isArray(json)) return json;
  if (!json || typeof json !== "object") return [];
  for (const k of [...keys, "data", "result", "results", "items"]) {
    if (Array.isArray(json[k])) return json[k];
  }
  return [];
}

function toObject(json: any, keys: string[]): any | null {
  if (!json || typeof json !== "object" || Array.isArray(json)) return null;
  for (const k of [...keys, "data", "result"]) {
    if (json[k] && typeof json[k] === "object" && !Array.isArray(json[k])) return json[k];
  }
  return json;
}

function signedChange(r: any): number {
  const raw = parseNum(
    pick(r, ["change", "changePercent", "change_percent", "percentChange", "percent", "priceChange"])
  );
  const dir = String(pick(r, ["trend", "direction", "status"]) ?? "").toLowerCase();
  if (dir === "up" || dir === "increase" || dir === "rise") return Math.abs(raw);
  if (dir === "down" || dir === "decrease" || dir === "fall") return -Math.abs(raw);
  return raw;
}

export function normalizeProduct(r: any): Product {
  const price = parseNum(pick(r, ["price", "currentPrice", "current_price", "todayPrice", "avgPrice"]));
  const rawMarkets = pick(r, ["markets", "bazars", "bazaars", "marketPrices", "market_prices", "prices"]);
  const markets: Market[] = Array.isArray(rawMarkets)
    ? rawMarkets.map((m: any) => ({
        name: String(pick(m, ["name", "market", "bazar", "bazarName", "location", "title"]) ?? "বাজার"),
        price: parseNum(pick(m, ["price", "todayPrice", "current", "value"])),
        change: signedChange(m),
      }))
    : [];

  const prices = markets.map((m) => m.price).filter((p) => p > 0);
  const min = parseNum(pick(r, ["min", "minPrice", "min_price"])) || (prices.length ? Math.min(...prices) : price);
  const max = parseNum(pick(r, ["max", "maxPrice", "max_price"])) || (prices.length ? Math.max(...prices) : price);
  const avg =
    parseNum(pick(r, ["avg", "average", "avgPrice", "avg_price", "averagePrice"])) ||
    (prices.length ? Math.round(prices.reduce((a, b) => a + b, 0) / prices.length) : price);

  const cats = pick(r, ["categories", "category", "tags"]);
  const categories = (Array.isArray(cats) ? cats : cats ? [cats] : []).map((c: any) =>
    typeof c === "string" ? c : String(pick(c, ["name", "nameBn", "title", "slug"]) ?? "")
  );

  return {
    id: String(pick(r, ["id", "_id", "slug"]) ?? ""),
    name: String(pick(r, ["nameBn", "name_bn", "name", "title"]) ?? "পণ্য"),
    emoji: String(pick(r, ["emoji", "icon", "image", "thumbnail"]) ?? "🛒"),
    unit: formatUnit(pick(r, ["unit", "unitBn"])),
    price: price || avg,
    change: signedChange(r),
    description: String(pick(r, ["description", "summary", "subtitle", "marketSummary", "note"]) ?? ""),
    categories: categories.filter(Boolean),
    markets,
    min,
    max,
    avg,
  };
}

export function normalizeCategory(r: any): Category {
  return {
    slug: String(pick(r, ["slug", "id", "key", "value"]) ?? ""),
    name: String(pick(r, ["nameBn", "name_bn", "name", "title", "label"]) ?? ""),
    icon: String(pick(r, ["icon", "emoji"]) ?? "🛒"),
  };
}

async function get(path: string): Promise<any | null> {
  for (const base of BASES) {
    try {
      const res = await fetch(base + path, { cache: "no-store" });
      if (res.ok) return await res.json();
    } catch {
      /* try next base */
    }
  }
  return null;
}

export async function getProducts(category?: string): Promise<Product[]> {
  const json = await get(category ? `/products?category=${encodeURIComponent(category)}` : "/products");
  return toArray(json, ["products"]).map(normalizeProduct);
}

export async function getProduct(id: string): Promise<Product | null> {
  const json = await get(`/products/${encodeURIComponent(id)}`);
  const obj = toObject(json, ["product"]);
  if (!obj || !Object.keys(obj).length) return null;
  const p = normalizeProduct(obj);
  if (!p.id) p.id = id;
  return p;
}

export async function getCategories(): Promise<Category[]> {
  const json = await get("/categories");
  return toArray(json, ["categories"]).map(normalizeCategory).filter((c) => c.slug);
}

export async function getCategory(slug: string): Promise<Category | null> {
  const json = await get(`/categories/${encodeURIComponent(slug)}`);
  const obj = toObject(json, ["category"]);
  if (!obj || !Object.keys(obj).length) return null;
  const c = normalizeCategory(obj);
  if (!c.slug) c.slug = slug;
  return c;
}
