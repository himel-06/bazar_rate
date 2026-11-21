# 🛒 বাজার দর (BazarDor)

wellcome to the site 


বাংলাদেশের নিত্যপ্রয়োজনীয় পণ্যের দৈনিক বাজার দর এক নজরে দেখার একটি Next.js অ্যাপ্লিকেশন।

## Tech Stack
- Next.js (App Router) + TypeScript
- Tailwind CSS + DaisyUI
- BetterAuth (Email/Password, Google, GitHub) + MongoDB
- react-hot-toast

## Key Features
1. লাইভ প্রাইস টিকার (infinite marquee) ও বাংলা তারিখসহ নেভবার
2. দাম বাড়া/কমার Top 6 সেকশন এবং সব পণ্যের রেসপন্সিভ গ্রিড
3. ক্যাটাগরি পেজ — স্কেলেটন লোডিং ও বাংলা সংখ্যাসহ সঠিক সর্টিং
4. প্রোটেক্টেড পণ্য-বিস্তারিত পেজ — সর্বনিম্ন/সর্বোচ্চ/গড় দাম ও বাজারভিত্তিক দাম
5. BetterAuth দিয়ে সাইন ইন/সাইন আপ + সোশ্যাল লগইন + টোস্ট নোটিফিকেশন
6. প্রোফাইল ও নাম আপডেট ফিচার, কাস্টম ৪০৪ পেজ

## Getting Started
```bash
npm install
cp .env.example .env.local   # fill in values
npm run dev
```

## Deployment (Vercel)
Add all variables from `.env.example` to Project Settings → Environment Variables and set
`BETTER_AUTH_URL` to your live URL. Add the callback URLs
`https://<your-domain>/api/auth/callback/google` and `/github` in the OAuth apps.




