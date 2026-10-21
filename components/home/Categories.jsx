import Link from "next/link";
import CategoryIcon, { getCategoryStyle } from "@/components/CategoryIcon";
import SectionHeading from "@/components/home/SectionHeading";
import { CATEGORIES } from "@/lib/products";
import { cn } from "@/lib/utils";

export default function Categories() {
  return (
    <section id="categories" className="page-container scroll-mt-20 pt-20">
      <SectionHeading
        title="Start with the part of your desk that needs work"
        description="Six categories, each with a short list of products we would happily use ourselves."
      />

      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {CATEGORIES.map((cat) => {
          const { tile } = getCategoryStyle(cat.name);
          return (
            <li key={cat.name}>
              <Link
                href={`/items?category=${encodeURIComponent(cat.name)}`}
                className="surface card-hover flex h-full items-center gap-5 p-5"
              >
                <span className={cn("flex h-16 w-16 shrink-0 items-center justify-center rounded-xl", tile)}>
                  <CategoryIcon category={cat.name} className="h-8 w-8" strokeWidth={1.6} />
                </span>
                <span>
                  <span className="block font-display text-xl font-semibold">{cat.name}</span>
                  <span className="mt-1 block text-sm leading-snug text-muted">{cat.blurb}</span>
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
