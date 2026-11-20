export function CardSkeleton() {
  return (
    <div className="card bg-base-100 border border-base-300 p-4 space-y-3">
      <div className="skeleton h-10 w-10 rounded-full" />
      <div className="skeleton h-5 w-2/3" />
      <div className="skeleton h-4 w-1/3" />
      <div className="flex justify-between pt-2">
        <div className="skeleton h-6 w-24" />
        <div className="skeleton h-6 w-14 rounded-full" />
      </div>
    </div>
  );
}

export function GridSkeleton({ count = 8 }: { count?: number }) {
  return (
    <div className="grid gap-4 grid-cols-1 min-[480px]:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {Array.from({ length: count }).map((_, i) => (
        <CardSkeleton key={i} />
      ))}
    </div>
  );
}

export function HomeSkeleton() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-8 space-y-10">
      <GridSkeleton count={6} />
      <GridSkeleton count={6} />
      <GridSkeleton count={8} />
    </div>
  );
}
