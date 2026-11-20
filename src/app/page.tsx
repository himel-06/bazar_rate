import { Suspense } from "react";
import Hero from "@/components/Hero";
import ProductGrid from "@/components/ProductGrid";
import { HomeSkeleton } from "@/components/Skeletons";
import { getProducts } from "@/lib/api";

export const dynamic = "force-dynamic";

async function HomeSections() {
  const products = await getProducts();
  const risers = products.filter((p) => p.change > 0).sort((a, b) => b.change - a.change).slice(0, 6);
  const fallers = products.filter((p) => p.change < 0).sort((a, b) => a.change - b.change).slice(0, 6);

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 space-y-12">
      <section>
        <h2 className="text-2xl font-bold mb-4 text-green-700">আজ দাম বেড়েছে ▲</h2>
        {risers.length ? <ProductGrid products={risers} /> : <p className="text-neutral/60">কোনো তথ্য নেই।</p>}
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4 text-red-600">আজ দাম কমেছে ▼</h2>
        {fallers.length ? <ProductGrid products={fallers} /> : <p className="text-neutral/60">কোনো তথ্য নেই।</p>}
      </section>

      <section id="সব-পণ্য" className="scroll-mt-32">
        <h2 className="text-2xl font-bold">সব পণ্য</h2>
        <p className="text-neutral/60 mb-4">নিত্যপ্রয়োজনীয় সব পণ্যের আজকের বাজার দর</p>
        {products.length ? <ProductGrid products={products} /> : <p className="text-neutral/60">পণ্য লোড করা যায়নি।</p>}
      </section>
    </div>
  );
}

export default function Home() {
  return (
    <>
      <Hero />
      <Suspense fallback={<HomeSkeleton />}>
        <HomeSections />
      </Suspense>
    </>
  );
}
