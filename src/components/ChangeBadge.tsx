import { formatChange } from "@/lib/bengali";

export default function ChangeBadge({ change }: { change: number }) {
  const cls =
    change > 0
      ? "bg-green-100 text-green-700"
      : change < 0
      ? "bg-red-100 text-red-700"
      : "bg-gray-100 text-gray-600";
  return (
    <span className={`rounded-full px-2.5 py-0.5 text-xs font-semibold whitespace-nowrap ${cls}`}>
      {formatChange(change)}
    </span>
  );
}
