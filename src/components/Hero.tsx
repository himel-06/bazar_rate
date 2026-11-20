import Image from "next/image";

export default function Hero() {
  return (
    <section className="bg-gradient-to-b from-green-50 to-base-200">
      <div className="mx-auto max-w-6xl px-4 py-10 md:py-16 grid gap-8 md:grid-cols-2 items-center">
        <div className="text-center md:text-left">
          <p className="text-sm font-semibold text-primary tracking-wide">আজকের বাজার দর</p>
          <h1 className="mt-2 text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight text-neutral">
            নিত্যপ্রয়োজনীয় পণ্যের দাম <span className="text-primary">এক নজরে</span>
          </h1>
          <p className="mt-4 text-neutral/70 max-w-md mx-auto md:mx-0">
            চাল, ডাল, তেল, সবজি, মাছ-মাংস — প্রতিদিনের বাজার দর ও দামের উঠানামা দেখুন এক জায়গায়।
          </p>
          <a href="#সব-পণ্য" className="btn btn-primary mt-6 btn-sm sm:btn-md">
            সব পণ্য দেখুন ↓
          </a>
        </div>
        <div className="flex justify-center">
          <Image
            src="/bazar-hero.png"
            alt="বাজারের ঝুড়ি"
            width={420}
            height={320}
            priority
            className="w-full max-w-sm md:max-w-md h-auto"
          />
        </div>
      </div>
    </section>
  );
}
