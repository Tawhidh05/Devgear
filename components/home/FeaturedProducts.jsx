"use client";

import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import SectionHeading from "@/components/home/SectionHeading";
import { useProducts } from "@/context/ProductsContext";

export default function FeaturedProducts() {
  const { products } = useProducts();
  const featured = products.filter((p) => p.featured).slice(0, 4);

  return (
    <section className="page-container pt-24">
      <SectionHeading
        title="What developers are buying this month"
        description="Our best-reviewed gear, from the keyboard on your desk to the drive in your bag."
        action={
          <Link href="/items" className="btn btn-outline self-start sm:self-auto">
            See all items
          </Link>
        }
      />

      {featured.length === 0 ? (
        <p className="surface p-8 text-center text-muted">
          No featured products right now.{" "}
          <Link href="/items" className="font-semibold text-cobalt hover:underline">
            Browse every item
          </Link>
          .
        </p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </section>
  );
}
