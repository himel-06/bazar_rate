
"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

export default function SocialButtons() {
  const [loading, setLoading] = useState<string | null>(null);

  const login = async (provider: "google" | "github") => {
    if (loading) return;

    setLoading(provider);

    try {
      const { error } = await authClient.signIn.social({
        provider,
        callbackURL: "/",
      });

      if (error) {
        toast.error(error.message || "সোশ্যাল লগইন ব্যর্থ হয়েছে");
        setLoading(null);
      }
    } catch (err) {
      console.error(`${provider} login error:`, err);
      toast.error("লগইন করা যায়নি। আবার চেষ্টা করুন।");
      setLoading(null);
    }
  };

  return (
    <div className="space-y-3">
      <div className="divider text-xs">অথবা</div>

      <button
        type="button"
        onClick={() => login("google")}
        disabled={loading !== null}
        className="btn btn-outline w-full"
      >
        {loading === "google" ? (
          <span className="loading loading-spinner loading-sm" />
        ) : (
          <span className="font-bold text-red-500">G</span>
        )}
        {loading === "google"
          ? "Connecting to Google..."
          : "Google দিয়ে চালিয়ে যান"}
      </button>

      <button
        type="button"
        onClick={() => login("github")}
        disabled={loading !== null}
        className="btn btn-outline w-full"
      >
        {loading === "github" ? (
          <span className="loading loading-spinner loading-sm" />
        ) : (
          <span className="font-bold">GH</span>
        )}
        {loading === "github"
          ? "Connecting to GitHub..."
          : "GitHub দিয়ে চালিয়ে যান"}
      </button>
    </div>
  );
}
