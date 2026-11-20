import Link from "next/link";

export default function EmptyState({
  title = "৪০৪ — পাওয়া যায়নি",
  message = "আপনি যে পেজ বা পণ্য খুঁজছেন তা পাওয়া যায়নি।",
}: {
  title?: string;
  message?: string;
}) {
  return (
    <div className="mx-auto max-w-md px-4 py-20 text-center">
      <div className="text-6xl">🛒</div>
      <h2 className="mt-4 text-2xl font-bold">{title}</h2>
      <p className="mt-2 text-neutral/60">{message}</p>
      <Link href="/" className="btn btn-primary mt-6">
        হোম পেজে ফিরে যান
      </Link>
    </div>
  );
}
