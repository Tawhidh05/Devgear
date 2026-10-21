"use client";

import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Search, SearchX, X } from "lucide-react";
import ProductCard from "@/components/ProductCard";
import { useProducts } from "@/context/ProductsContext";
import { CATEGORIES, PRICE_RANGES, RATING_OPTIONS, SORT_OPTIONS } from "@/lib/products";

export default function ItemsExplorer() {
  const { products } = useProducts();
  const searchParams = useSearchParams();

  const [query, setQuery] = useState(searchParams.get("q") || "");
  const [category, setCategory] = useState(searchParams.get("category") || "All");
  const [price, setPrice] = useState("all");
  const [minRating, setMinRating] = useState("0");
  const [sort, setSort] = useState("featured");

  // Keep the category filter in sync when the user follows a /items?category=... link.
  useEffect(() => {
    setCategory(searchParams.get("category") || "All");
    setQuery(searchParams.get("q") || "");
  }, [searchParams]);

  const categoryOptions = useMemo(() => {
    const names = new Set(CATEGORIES.map((c) => c.name));
    products.forEach((p) => names.add(p.category));
    return ["All", ...names];
  }, [products]);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    const range = PRICE_RANGES.find((r) => r.value === price) || PRICE_RANGES[0];
    const ratingFloor = Number(minRating);

    const filtered = products.filter((p) => {
      const matchesQuery =
        !q ||
        [p.title, p.shortDescription, p.category, p.brand]
          .filter(Boolean)
          .some((field) => field.toLowerCase().includes(q));
      const matchesCategory = category === "All" || p.category === category;
      const matchesPrice = p.price >= range.min && p.price < range.max;
      const matchesRating = (p.rating || 0) >= ratingFloor;
      return matchesQuery && matchesCategory && matchesPrice && matchesRating;
    });

    const sorted = [...filtered];
    switch (sort) {
      case "price-asc":
        sorted.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        sorted.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        sorted.sort((a, b) => (b.rating || 0) - (a.rating || 0));
        break;
      case "newest":
        sorted.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        break;
      default:
        sorted.sort((a, b) => Number(Boolean(b.featured)) - Number(Boolean(a.featured)));
    }
    return sorted;
  }, [products, query, category, price, minRating, sort]);

  const hasFilters = query || category !== "All" || price !== "all" || minRating !== "0";

  const clearFilters = () => {
    setQuery("");
    setCategory("All");
    setPrice("all");
    setMinRating("0");
    setSort("featured");
  };

  return (
    <div>
      {/* Search + filters */}
      <div className="surface p-4 sm:p-5">
        <div className="relative">
          <label htmlFor="search" className="sr-only">
            Search products
          </label>
          <Search className="pointer-events-none absolute left-3.5 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" aria-hidden="true" />
          <input
            id="search"
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by name, brand or category"
            className="field-input py-3 pl-11 pr-10"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery("")}
              aria-label="Clear search"
              className="absolute right-2.5 top-1/2 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-md text-slate-400 hover:bg-slate-100 hover:text-ink"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <label htmlFor="category" className="field-label">
              Category
            </label>
            <select id="category" value={category} onChange={(e) => setCategory(e.target.value)} className="field-input">
              {categoryOptions.map((c) => (
                <option key={c} value={c}>
                  {c === "All" ? "All categories" : c}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="price" className="field-label">
              Price
            </label>
            <select id="price" value={price} onChange={(e) => setPrice(e.target.value)} className="field-input">
              {PRICE_RANGES.map((r) => (
                <option key={r.value} value={r.value}>
                  {r.label}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="rating" className="field-label">
              Rating
            </label>
            <select id="rating" value={minRating} onChange={(e) => setMinRating(e.target.value)} className="field-input">
              {RATING_OPTIONS.map((r) => (
                <option key={r.value} value={r.value}>
                  {r.label}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="sort" className="field-label">
              Sort by
            </label>
            <select id="sort" value={sort} onChange={(e) => setSort(e.target.value)} className="field-input">
              {SORT_OPTIONS.map((s) => (
                <option key={s.value} value={s.value}>
                  {s.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Result summary */}
      <div className="mb-6 mt-8 flex items-center justify-between gap-4">
        <p className="text-sm text-muted" aria-live="polite">
          Showing <span className="font-semibold text-ink">{results.length}</span> of {products.length} products
        </p>
        {hasFilters && (
          <button type="button" onClick={clearFilters} className="text-sm font-semibold text-cobalt hover:underline">
            Clear filters
          </button>
        )}
      </div>

      {/* Grid */}
      {results.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {results.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="surface flex flex-col items-center px-6 py-16 text-center">
          <span className="flex h-14 w-14 items-center justify-center rounded-full bg-slate-100 text-slate-500">
            <SearchX className="h-7 w-7" aria-hidden="true" />
          </span>
          <h2 className="mt-5 text-xl font-semibold">No products match those filters</h2>
          <p className="mt-2 max-w-md text-sm text-muted">
            Try a different search term, widen the price range or lower the minimum rating.
          </p>
          <button type="button" onClick={clearFilters} className="btn btn-dark mt-6">
            Clear filters
          </button>
        </div>
      )}
    </div>
  );
}
