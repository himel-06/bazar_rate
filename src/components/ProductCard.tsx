import Link from "next/link";
import { formatPrice } from "@/lib/bengali";
import type { Product } from "@/lib/api";
import ChangeBadge from "./ChangeBadge";

export default function ProductCard({ product: p }: { product: Product }) {
  return (
    <Link
      href={`/product/${p.id}`}
      className="card bg-base-100 border border-base-300 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition"
    >
      <div className="card-body p-4 gap-1">
        <div className="text-4xl">{p.emoji}</div>
        <h3 className="mt-1 text-lg font-semibold">{p.name}</h3>
        <p className="text-sm text-neutral/60">{p.unit}</p>
        <div className="mt-3 flex items-end justify-between gap-2">
          <div>
            <p className="text-xs text-neutral/60">আজকের দাম</p>
            <p className="text-lg font-bold text-primary">{formatPrice(p.price)}</p>
          </div>
          <ChangeBadge change={p.change} />
        </div>
      </div>
    </Link>
  );
}
