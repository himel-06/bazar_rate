"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

export default function UpdateProfilePage() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (session?.user.name) setName(session.user.name);
  }, [session?.user.name]);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return toast.error("নাম লিখুন");

    setLoading(true);
    const { error } = await authClient.updateUser({ name: name.trim() });
    setLoading(false);

    if (error) return toast.error(error.message || "আপডেট ব্যর্থ হয়েছে");
    toast.success("তথ্য আপডেট হয়েছে");
    router.push("/profile");
    router.refresh();
  };

  if (isPending) {
    return (
      <div className="mx-auto max-w-md px-4 py-12">
        <div className="skeleton h-48 w-full" />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-md px-4 py-12">
      <div className="card bg-base-100 border border-base-300 p-6 sm:p-8">
        <h1 className="text-2xl font-bold text-center">তথ্য আপডেট করুন</h1>
        <form onSubmit={onSubmit} className="mt-6 space-y-4">
          <div className="form-control">
            <label className="label" htmlFor="name"><span className="label-text">নাম</span></label>
            <input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="input input-bordered w-full"
            />
          </div>
          <button type="submit" disabled={loading} className="btn btn-primary w-full">
            {loading ? <span className="loading loading-spinner" /> : "তথ্য আপডেট করুন"}
          </button>
        </form>
      </div>
    </div>
  );
}
