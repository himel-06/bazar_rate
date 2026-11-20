"use client";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";

export default function ProfilePage() {
  const { data: session, isPending } = authClient.useSession();

  if (isPending) {
    return (
      <div className="mx-auto max-w-md px-4 py-12">
        <div className="skeleton h-64 w-full" />
      </div>
    );
  }
  if (!session) return null;

  const { user } = session;
  return (
    <div className="mx-auto max-w-md px-4 py-12">
      <div className="card bg-base-100 border border-base-300 p-8 items-center text-center space-y-3">
        <div className="avatar placeholder">
          <div className="bg-primary text-primary-content w-20 rounded-full text-3xl">
            {user.image ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={user.image} alt={user.name} />
            ) : (
              <span>{user.name?.[0]?.toUpperCase()}</span>
            )}
          </div>
        </div>
        <h1 className="text-2xl font-bold">{user.name}</h1>
        <p className="text-neutral/60">{user.email}</p>
        <Link href="/profile/update" className="btn btn-primary">তথ্য আপডেট করুন</Link>
      </div>
    </div>
  );
}
