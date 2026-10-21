import Link from "next/link";
import { Hammer, Users, Recycle } from "lucide-react";
import ProductArt from "@/components/ProductArt";
import { seedProducts } from "@/lib/products";

export const metadata = {
  title: "About",
  description: "DevGear is a small shop for developer hardware, tested by the people who write code all day.",
};

const VALUES = [
  {
    icon: Hammer,
    title: "Tested before listed",
    text: "Every product spends two weeks on a working developer's desk. We list what survives.",
  },
  {
    icon: Users,
    title: "Honest reviews",
    text: "We show real ratings and real drawbacks, so you know what you are buying.",
  },
  {
    icon: Recycle,
    title: "Built to last",
    text: "We prefer repairable, well-supported hardware over things you will replace in a year.",
  },
];

const STACK = ["Next.js App Router", "React", "Tailwind CSS", "Firebase Authentication", "Context API"];

export default function AboutPage() {
  const showcase = ["tactile-75-keyboard", "27-4k-coding-monitor", "vertical-ergo-mouse", "portable-ssd-1tb"].map((id) =>
    seedProducts.find((p) => p.id === id)
  );

  return (
    <div className="page-container py-12 sm:py-20">
      <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <div>
          <h1 className="text-4xl font-bold leading-[1.08] tracking-tightest sm:text-5xl">
            About DevGear
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-slate-700">
            DevGear started with a simple frustration: most hardware reviews are written by people who do not
            spend eight hours a day in an editor. We built a shop where every keyboard, display and desk
            accessory is picked and tested by working developers.
          </p>
          <p className="mt-4 text-lg leading-relaxed text-slate-700">
            This app is a demo storefront. You can browse and filter the catalogue, read product details, and
            once you are logged in, add and manage products of your own.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/items" className="btn btn-primary btn-lg">
              Browse the shop
            </Link>
            <Link href="/contact" className="btn btn-outline btn-lg">
              Get in touch
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4" aria-hidden="true">
          {showcase.map((p, i) => (
            <ProductArt
              key={p.id}
              product={p}
              className={`aspect-square rounded-2xl ${i % 2 === 1 ? "translate-y-6" : ""}`}
              iconClassName="h-20 w-20"
            />
          ))}
        </div>
      </div>

      <section className="mt-24">
        <h2 className="text-3xl font-bold tracking-tightest">What we care about</h2>
        <ul className="mt-8 grid gap-6 md:grid-cols-3">
          {VALUES.map(({ icon: Icon, title, text }) => (
            <li key={title} className="surface card-hover p-6">
              <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-cobalt-soft text-cobalt">
                <Icon className="h-5 w-5" aria-hidden="true" />
              </span>
              <h3 className="mt-5 text-xl font-semibold">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{text}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-20 rounded-2xl bg-ink p-8 text-slate-300 sm:p-10">
        <h2 className="text-2xl font-bold text-white sm:text-3xl">How this app is built</h2>
        <p className="mt-3 max-w-2xl leading-relaxed text-slate-400">
          Public pages for browsing, Firebase email and Google sign-in, and protected pages for managing
          products.
        </p>
        <ul className="mt-6 flex flex-wrap gap-2">
          {STACK.map((s) => (
            <li key={s} className="rounded-lg border border-slate-700 px-3 py-1.5 font-mono text-sm text-slate-200">
              {s}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
