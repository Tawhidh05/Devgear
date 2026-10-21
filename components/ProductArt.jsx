"use client";

import { useEffect, useState } from "react";
import CategoryIcon, { getCategoryStyle } from "@/components/CategoryIcon";
import { cn } from "@/lib/utils";

/**
 * Shows the product photo when an image URL exists (and loads),
 * otherwise a flat illustrated tile with the category icon.
 */
export default function ProductArt({ product, className = "", iconClassName = "h-16 w-16" }) {
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    setFailed(false);
  }, [product.image]);

  const { tile } = getCategoryStyle(product.category);

  if (product.image && !failed) {
    return (
      <div className={cn("overflow-hidden bg-slate-100", className)}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={product.image}
          alt={product.title}
          loading="lazy"
          onError={() => setFailed(true)}
          className="h-full w-full object-cover"
        />
      </div>
    );
  }

  return (
    <div
      role="img"
      aria-label={`${product.title} illustration`}
      className={cn("relative flex items-center justify-center overflow-hidden", tile, className)}
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            "linear-gradient(currentColor 1px, transparent 1px), linear-gradient(90deg, currentColor 1px, transparent 1px)",
          backgroundSize: "28px 28px",
          maskImage: "radial-gradient(circle at center, black 0%, transparent 70%)",
          WebkitMaskImage: "radial-gradient(circle at center, black 0%, transparent 70%)",
          opacity: 0.18,
        }}
      />
      <CategoryIcon category={product.category} className={cn("relative", iconClassName)} strokeWidth={1.4} />
    </div>
  );
}
