import { Suspense } from "react";
import ItemsExplorer from "@/components/ItemsExplorer";
import Spinner from "@/components/Spinner";

export const metadata = {
  title: "All items",
  description: "Search and filter keyboards, mice, displays, audio and desk gear for developers.",
};

export default function ItemsPage() {
  return (
    <div className="page-container py-12 sm:py-16">
      <header className="mb-8 max-w-2xl">
        <h1 className="text-4xl font-bold tracking-tightest sm:text-5xl">All items</h1>
        <p className="mt-3 text-lg text-muted">
          Search by name, then narrow the list by category, price and rating.
        </p>
      </header>

      <Suspense fallback={<Spinner label="Loading products" className="py-20" />}>
        <ItemsExplorer />
      </Suspense>
    </div>
  );
}
