import { notFound } from "next/navigation";
import ChangeBadge from "@/components/ChangeBadge";
import { formatPrice } from "@/lib/bengali";
import { getProduct } from "@/lib/api";

export const dynamic = "force-dynamic";

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = await getProduct(slug);
  if (!p) notFound();

  const stats = [
    { label: "সর্বনিম্ন দাম", value: p.min, cls: "text-green-700" },
    { label: "সর্বোচ্চ দাম", value: p.max, cls: "text-red-600" },
    { label: "গড় দাম", value: p.avg, cls: "text-primary" },
  ];

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 space-y-8">
      {/* Summary */}
      <section className="card bg-base-100 border border-base-300 p-6">
        <div className="flex items-start gap-4">
          <div className="text-6xl">{p.emoji}</div>
          <div className="space-y-2">
            <h1 className="text-3xl font-bold">{p.name}</h1>
            {p.description && <p className="text-neutral/70">{p.description}</p>}
            <div className="flex flex-wrap items-center gap-2">
              {p.categories.map((c) => (
                <span key={c} className="badge badge-outline badge-primary">{c}</span>
              ))}
              <span className="badge badge-ghost">{p.unit}</span>
              <ChangeBadge change={p.change} />
            </div>
          </div>
        </div>
      </section>

      {/* Price summary */}
      <section className="grid gap-4 sm:grid-cols-3">
        {stats.map((s) => (
          <div key={s.label} className="card bg-base-100 border border-base-300 p-5">
            <p className="text-sm text-neutral/60">{s.label}</p>
            <p className={`mt-1 text-2xl font-bold ${s.cls}`}>{formatPrice(s.value)}</p>
          </div>
        ))}
      </section>

      {/* Market wise */}
      <section>
        <h2 className="text-xl font-bold mb-4">বাজারভিত্তিক আজকের দাম</h2>
        {p.markets.length ? (
          <div className="card bg-base-100 border border-base-300 overflow-x-auto">
            <table className="table">
              <thead>
                <tr>
                  <th>বাজার</th>
                  <th>দাম</th>
                  <th>পরিবর্তন</th>
                </tr>
              </thead>
              <tbody>
                {p.markets.map((m, i) => (
                  <tr key={`${m.name}-${i}`}>
                    <td className="font-medium">{m.name}</td>
                    <td>{formatPrice(m.price)}</td>
                    <td><ChangeBadge change={m.change} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-neutral/60">বাজারভিত্তিক তথ্য পাওয়া যায়নি।</p>
        )}
      </section>
    </div>
  );
}
