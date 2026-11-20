"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import SocialButtons from "@/components/SocialButtons";
import { authClient } from "@/lib/auth-client";

export default function SignUpPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    const fd = new FormData(e.currentTarget);
    const name = String(fd.get("name") || "").trim();
    const email = String(fd.get("email") || "").trim();
    const password = String(fd.get("password") || "");

    if (!name || !email || !password) {
      const msg = "সব ঘর পূরণ করুন";
      setError(msg);
      toast.error(msg);
      return;
    }
    if (password.length < 8) {
      const msg = "পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে";
      setError(msg);
      toast.error(msg);
      return;
    }

    setLoading(true);
    const { error } = await authClient.signUp.email({ name, email, password });
    setLoading(false);

    if (error) {
      const msg = error.message || "রেজিস্ট্রেশন ব্যর্থ হয়েছে";
      setError(msg);
      toast.error(msg);
      return;
    }

    toast.success("রেজিস্ট্রেশন সফল! এখন সাইন ইন করুন");
    router.push("/signin");
  };

  return (
    <div className="mx-auto max-w-md px-4 py-12">
      <div className="card bg-base-100 border border-base-300 p-6 sm:p-8">
        <h1 className="text-2xl font-bold text-center">সাইন আপ করুন</h1>
        <form onSubmit={onSubmit} className="mt-6 space-y-4">
          <div className="form-control">
            <label className="label" htmlFor="name"><span className="label-text">নাম</span></label>
            <input id="name" name="name" type="text" placeholder="আপনার নাম" className="input input-bordered w-full" />
          </div>
          <div className="form-control">
            <label className="label" htmlFor="email"><span className="label-text">ইমেইল</span></label>
            <input id="email" name="email" type="email" placeholder="you@example.com" className="input input-bordered w-full" />
          </div>
          <div className="form-control">
            <label className="label" htmlFor="password"><span className="label-text">পাসওয়ার্ড</span></label>
            <input id="password" name="password" type="password" placeholder="কমপক্ষে ৮ অক্ষর" className="input input-bordered w-full" />
          </div>
          {error && <p className="text-sm text-error">{error}</p>}
          <button type="submit" disabled={loading} className="btn btn-primary w-full">
            {loading ? <span className="loading loading-spinner" /> : "রেজিস্টার করুন"}
          </button>
        </form>
        <SocialButtons />
        <p className="mt-4 text-center text-sm">
          আগে থেকেই অ্যাকাউন্ট আছে? <Link href="/signin" className="link link-primary">সাইন ইন করুন</Link>
        </p>
      </div>
    </div>
  );
}
