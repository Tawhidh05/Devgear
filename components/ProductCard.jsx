import Link from "next/link";
import ProductArt from "@/components/ProductArt";
import Rating from "@/components/Rating";
import { formatPrice } from "@/lib/utils";

export default function ProductCard({ product }) {
  return (
    <article className="surface card-hover group flex h-full flex-col overflow-hidden">
      <Link href={`/items/${product.id}`} tabIndex={-1} aria-hidden="true" className="block">
        <ProductArt product={product} className="aspect-[4/3] w-full" />
      </Link>

      <div className="flex flex-1 flex-col p-5">
        <div className="mb-2 flex items-center justify-between gap-3">
          <span className="text-sm font-medium text-muted">{product.category}</span>
          <Rating rating={product.rating} reviews={product.reviews} />
        </div>

        <h3 className="text-lg font-semibold leading-snug">{product.title}</h3>
        <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-muted">{product.shortDescription}</p>

        <div className="mt-auto flex items-center justify-between gap-3 pt-5">
          <span className="font-display text-xl font-semibold">{formatPrice(product.price)}</span>
          <Link href={`/items/${product.id}`} className="btn btn-dark px-4 py-2">
            View details
          </Link>
        </div>
      </div>
    </article>
  );
}
