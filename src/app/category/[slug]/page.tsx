import { Suspense } from "react";
import EmptyState from "@/components/EmptyState";
import { GridSkeleton } from "@/components/Skeletons";
import SortableProducts from "@/components/SortableProducts";
import { getCategory, getProducts } from "@/lib/api";

export const dynamic = "force-dynamic";

async function CategoryContent({ slug }: { slug: string }) {
  const [category, products] = await Promise.all([getCategory(slug), getProducts(slug)]);

  if (!category && !products.length) {
    return <EmptyState title="৪০৪ — ক্যাটাগরি পাওয়া যায়নি" message="এই ক্যাটাগরিতে কোনো পণ্য নেই বা লিংকটি সঠিক নয়।" />;
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <div className="mb-6 flex items-center gap-3">
        <span className="text-4xl">{category?.icon ?? "🛒"}</span>
        <h1 className="text-3xl font-bold">{category?.name ?? slug}</h1>
      </div>
      {products.length ? (
        <SortableProducts products={products} />
      ) : (
        <EmptyState title="কোনো পণ্য পাওয়া যায়নি" message="এই ক্যাটাগরিতে এখনো কোনো পণ্য যোগ হয়নি।" />
      )}
    </div>
  );
}

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return (
    <Suspense
      fallback={
        <div className="mx-auto max-w-6xl px-4 py-10 space-y-6">
          <div className="skeleton h-10 w-48" />
          <GridSkeleton />
        </div>
      }
    >
      <CategoryContent slug={slug} />
    </Suspense>
  );
}
