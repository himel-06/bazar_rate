"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import SocialButtons from "@/components/SocialButtons";
import { authClient } from "@/lib/auth-client";

export default function SignInPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const redirect = new URLSearchParams(window.location.search).get("redirect");
    if (redirect) toast.error("এই পেজ দেখতে আগে সাইন ইন করুন", { id: "protected" });
  }, []);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    const fd = new FormData(e.currentTarget);
    const email = String(fd.get("email") || "").trim();
    const password = String(fd.get("password") || "");

    if (!email || !password) {
      const msg = "ইমেইল ও পাসওয়ার্ড দিন";
      setError(msg);
      toast.error(msg);
      return;
    }

    setLoading(true);
    const { error } = await authClient.signIn.email({ email, password });
    setLoading(false);

    if (error) {
      const msg = error.message || "ইমেইল বা পাসওয়ার্ড ভুল";
      setError(msg);
      toast.error(msg);
      return;
    }

    toast.success("সফলভাবে সাইন ইন হয়েছে");
    const redirect = new URLSearchParams(window.location.search).get("redirect");
    router.push(redirect && redirect.startsWith("/") ? redirect : "/");
    router.refresh();
  };

  return (
    <div className="mx-auto max-w-md px-4 py-12">
      <div className="card bg-base-100 border border-base-300 p-6 sm:p-8">
        <h1 className="text-2xl font-bold text-center">সাইন ইন করুন</h1>
        <form onSubmit={onSubmit} className="mt-6 space-y-4">
          <div className="form-control">
            <label className="label" htmlFor="email"><span className="label-text">ইমেইল</span></label>
            <input id="email" name="email" type="email" placeholder="you@example.com" className="input input-bordered w-full" />
          </div>
          <div className="form-control">
            <label className="label" htmlFor="password"><span className="label-text">পাসওয়ার্ড</span></label>
            <input id="password" name="password" type="password" placeholder="••••••••" className="input input-bordered w-full" />
          </div>
          {error && <p className="text-sm text-error">{error}</p>}
          <button type="submit" disabled={loading} className="btn btn-primary w-full">
            {loading ? <span className="loading loading-spinner" /> : "সাইন ইন"}
          </button>
        </form>
        <SocialButtons />
        <p className="mt-4 text-center text-sm">
          অ্যাকাউন্ট নেই? <Link href="/signup" className="link link-primary">সাইন আপ করুন</Link>
        </p>
      </div>
    </div>
  );
}
