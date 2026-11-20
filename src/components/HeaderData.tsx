import { getCategories, getProducts } from "@/lib/api";
import Navbar from "./Navbar";
import Ticker from "./Ticker";

export default async function HeaderData() {
  const [categories, products] = await Promise.all([getCategories(), getProducts()]);
  return (
    <header className="sticky top-0 z-40">
      <Navbar categories={categories} />
      <Ticker products={products} />
    </header>
  );
}
