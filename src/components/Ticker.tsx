import { formatChange, formatPrice } from "@/lib/bengali";
import type { Product } from "@/lib/api";

export default function Ticker({ products }: { products: Product[] }) {
  if (!products.length) return null;

  const items = products.map((p) => (
    <span key={p.id} className="flex items-center gap-2 px-6 text-sm whitespace-nowrap">
      <span>{p.emoji}</span>
      <span className="font-medium">{p.name}</span>
      <span>
        {formatPrice(p.price)}/{p.unit.replace("প্রতি ", "")}
      </span>
      <span className={p.change > 0 ? "text-green-600" : p.change < 0 ? "text-red-600" : "text-gray-500"}>
        {formatChange(p.change)}
      </span>
    </span>
  ));

  return (
    <div className="overflow-hidden bg-neutral text-neutral-content border-b border-neutral">
      <div className="flex w-max animate-marquee py-2 hover:[animation-play-state:paused]">
        <div className="flex">{items}</div>
        <div className="flex" aria-hidden>{items}</div>
      </div>
    </div>
  );
}
