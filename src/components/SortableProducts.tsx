"use client";
import { useMemo, useState } from "react";
import type { Product } from "@/lib/api";
import ProductGrid from "./ProductGrid";

type Sort = "default" | "asc" | "desc";

export default function SortableProducts({ products }: { products: Product[] }) {
  const [sort, setSort] = useState<Sort>("default");

  // prices are real numbers (Bengali digits are parsed in lib/api), so this is a numeric sort
  const list = useMemo(() => {
    if (sort === "asc") return [...products].sort((a, b) => a.price - b.price);
    if (sort === "desc") return [...products].sort((a, b) => b.price - a.price);
    return products;
  }, [products, sort]);

  return (
    <>
      <div className="flex items-center justify-end gap-2 mb-4">
        <label htmlFor="sort" className="text-sm font-medium">সাজান:</label>
        <select
          id="sort"
          value={sort}
          onChange={(e) => setSort(e.target.value as Sort)}
          className="select select-bordered select-sm sm:select-md"
        >
          <option value="default">ডিফল্ট</option>
          <option value="asc">দাম: কম থেকে বেশি</option>
          <option value="desc">দাম: বেশি থেকে কম</option>
        </select>
      </div>
      <ProductGrid products={list} />
    </>
  );
}
