"use client";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";
import { banglaDate } from "@/lib/bengali";
import type { Category } from "@/lib/api";

export default function Navbar({ categories }: { categories: Category[] }) {
  const pathname = usePathname();
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  const [date, setDate] = useState("");
useEffect(() => {
  const frame = requestAnimationFrame(() => setDate(banglaDate()));
  return () => cancelAnimationFrame(frame);
}, []);
  const handleSignOut = async () => {
    await authClient.signOut();
    toast.success("সফলভাবে সাইন আউট হয়েছে");
    router.push("/");
    router.refresh();
  };

  const linkCls = (active: boolean) =>
    `whitespace-nowrap rounded-full px-4 py-1.5 text-sm font-medium transition ${
      active ? "bg-primary text-primary-content" : "text-neutral hover:bg-base-200"
    }`;

  return (
    <nav className="bg-base-100 border-b border-base-300">
      <div className="mx-auto max-w-6xl px-4">
        {/* Row 1 */}
        <div className="flex items-center justify-between py-3 gap-3">
          <Link href="/" className="flex items-center gap-2">
            <Image src="/logo-icon.png" alt="লোগো" width={36} height={36} className="h-9 w-9 object-contain" />
            <div className="leading-tight">
              <div className="text-xl font-bold text-primary">🛒 বাজার দর</div>
              <div className="text-xs text-neutral/60 min-h-4">{date}</div>
            </div>
          </Link>

          <div className="flex items-center gap-2">
            {isPending ? (
              <div className="skeleton h-8 w-24 rounded-full" />
            ) : session ? (
              <div className="dropdown dropdown-end">
                <div tabIndex={0} role="button" className="btn btn-ghost btn-sm sm:btn-md gap-2">
                  <div className="avatar placeholder">
                    <div className="bg-primary text-primary-content w-8 rounded-full">
                      {session.user.image ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={session.user.image} alt={session.user.name} />
                      ) : (
                        <span>{session.user.name?.[0]?.toUpperCase()}</span>
                      )}
                    </div>
                  </div>
                  <span className="hidden sm:inline">{session.user.name}</span>
                </div>
                <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-50 mt-2 w-48 p-2 shadow border border-base-300">
                  <li><Link href="/profile">আমার প্রোফাইল</Link></li>
                  <li><button onClick={handleSignOut}>সাইন আউট</button></li>
                </ul>
              </div>
            ) : (
              <>
                <Link href="/signin" className="btn btn-outline btn-primary btn-sm sm:btn-md">সাইন ইন</Link>
                <Link href="/signup" className="btn btn-primary btn-sm sm:btn-md">সাইন আপ</Link>
              </>
            )}
          </div>
        </div>

        {/* Row 2: categories */}
        <div className="flex gap-2 overflow-x-auto no-scrollbar pb-3">
          <Link href="/" className={linkCls(pathname === "/")}>সব পণ্য</Link>
          {categories.map((c) => (
            <Link
              key={c.slug}
              href={`/category/${c.slug}`}
              className={linkCls(pathname === `/category/${c.slug}`)}
            >
              {c.icon} {c.name}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
