"use client";

import Link from "next/link";
import { ArrowLeft, Boxes, CalendarDays, ShoppingCart, Tag, Store } from "lucide-react";
import toast from "react-hot-toast";
import ProductArt from "@/components/ProductArt";
import ProductCard from "@/components/ProductCard";
import Rating from "@/components/Rating";
import Spinner from "@/components/Spinner";
import { useProducts } from "@/context/ProductsContext";
import { formatDate, formatPrice } from "@/lib/utils";

function BackButton() {
  return (
    <Link href="/items" className="btn btn-outline">
      <ArrowLeft className="h-4 w-4" aria-hidden="true" />
      Back to items
    </Link>
  );
}

export default function ProductDetails({ id }) {
  const { products, ready } = useProducts();
  const product = products.find((p) => p.id === id);

  if (!product) {
    if (!ready) {
      return <Spinner label="Loading product" className="py-32" />;
    }
    return (
      <div className="page-container py-24">
        <div className="surface mx-auto max-w-lg px-6 py-14 text-center">
          <h1 className="text-3xl font-bold">We could not find that product</h1>
          <p className="mt-3 text-muted">It may have been removed, or the link is out of date.</p>
          <div className="mt-8 flex justify-center">
            <BackButton />
          </div>
        </div>
      </div>
    );
  }

  const related = [
    ...products.filter((p) => p.id !== product.id && p.category === product.category),
    ...products.filter((p) => p.id !== product.id && p.category !== product.category),
  ].slice(0, 3);

  const inStock = Number(product.stock) > 0;
  const keyInfo = [
    { icon: Tag, label: "Category", value: product.category },
    { icon: Store, label: "Brand", value: product.brand || "DevGear" },
    { icon: Boxes, label: "Availability", value: inStock ? `${product.stock} in stock` : "Out of stock" },
    { icon: CalendarDays, label: "Added", value: formatDate(product.createdAt) },
  ];

  const handleAddToCart = () => {
    toast.success(`${product.title} added to your cart.`);
  };

  return (
    <div className="page-container py-10 sm:py-14">
      <BackButton />

      <div className="mt-8 grid gap-10 lg:grid-cols-2 lg:gap-14">
        <ProductArt product={product} className="aspect-square w-full rounded-2xl border border-line lg:sticky lg:top-24 lg:self-start" iconClassName="h-32 w-32" />

        <div>
          <p className="text-sm font-semibold text-cobalt">{product.category}</p>
          <h1 className="mt-2 text-3xl font-bold leading-tight tracking-tightest sm:text-4xl">{product.title}</h1>

          <div className="mt-4">
            <Rating rating={product.rating} reviews={product.reviews} size="lg" />
          </div>

          <p className="mt-6 font-display text-4xl font-bold">{formatPrice(product.price)}</p>
          <p className="mt-4 text-lg leading-relaxed text-slate-700">{product.shortDescription}</p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <button type="button" onClick={handleAddToCart} disabled={!inStock} className="btn btn-primary btn-lg">
              <ShoppingCart className="h-5 w-5" aria-hidden="true" />
              {inStock ? "Add to cart" : "Out of stock"}
            </button>
            <span className={`text-sm font-semibold ${inStock ? "text-emerald-700" : "text-red-600"}`}>
              {inStock ? "In stock, ships in 1 to 2 days" : "Currently unavailable"}
            </span>
          </div>

          <dl className="mt-10 grid gap-px overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-2">
            {keyInfo.map(({ icon: Icon, label, value }) => (
              <div key={label} className="flex items-center gap-3 bg-white p-4">
                <Icon className="h-5 w-5 shrink-0 text-muted" aria-hidden="true" />
                <div className="min-w-0">
                  <dt className="text-xs text-muted">{label}</dt>
                  <dd className="truncate text-sm font-semibold">{value}</dd>
                </div>
              </div>
            ))}
          </dl>

          <section className="mt-10">
            <h2 className="text-xl font-semibold">About this product</h2>
            <p className="mt-3 leading-relaxed text-slate-700">{product.description}</p>
          </section>

          {product.specs?.length > 0 && (
            <section className="mt-10">
              <h2 className="text-xl font-semibold">Specifications</h2>
              <dl className="mt-4 divide-y divide-line overflow-hidden rounded-xl border border-line bg-white">
                {product.specs.map((spec) => (
                  <div key={spec.label} className="grid grid-cols-5 gap-4 px-4 py-3 text-sm">
                    <dt className="col-span-2 font-medium text-muted">{spec.label}</dt>
                    <dd className="col-span-3 font-medium">{spec.value}</dd>
                  </div>
                ))}
              </dl>
            </section>
          )}
        </div>
      </div>

      {related.length > 0 && (
        <section className="mt-20 border-t border-line pt-12">
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">You might also like</h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
