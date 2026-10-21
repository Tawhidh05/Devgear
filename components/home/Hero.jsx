import Link from "next/link";
import { seedProducts } from "@/lib/products";
import { formatPrice } from "@/lib/utils";

const setupItems = [
  seedProducts.find((p) => p.id === "tactile-75-keyboard"),
  seedProducts.find((p) => p.id === "27-4k-coding-monitor"),
  seedProducts.find((p) => p.id === "focus-anc-headphones"),
  seedProducts.find((p) => p.id === "aluminium-laptop-stand"),
];

const total = setupItems.reduce((sum, p) => sum + p.price, 0);

export default function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-line">
      <div aria-hidden="true" className="dot-grid absolute inset-0 opacity-60 [mask-image:linear-gradient(to_bottom,black,transparent_85%)]" />

      <div className="page-container relative grid grid-cols-[minmax(0,1fr)] items-center gap-12 py-16 sm:py-20 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)] lg:gap-16 lg:py-28">
        <div className="min-w-0">
          <h1 className="font-display text-4xl font-bold leading-[1.05] tracking-tightest text-ink sm:text-5xl lg:text-6xl">
            The hardware you code on, picked by people who code.
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted">
            Keyboards that feel right at hour eight, screens that keep text sharp and desk gear that gets out
            of your way. Every product is tested by working developers before it reaches the shop.
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-3">
            <Link href="/items" className="btn btn-primary btn-lg">
              Shop all gear
            </Link>
            <Link href="#categories" className="btn btn-outline btn-lg">
              Browse categories
            </Link>
          </div>

          <dl className="mt-12 grid max-w-lg grid-cols-3 gap-6 border-t border-line pt-6">
            <div>
              <dt className="text-sm text-muted">Products tested</dt>
              <dd className="mt-1 font-display text-2xl font-bold">120+</dd>
            </div>
            <div>
              <dt className="text-sm text-muted">Average rating</dt>
              <dd className="mt-1 font-display text-2xl font-bold">4.7 / 5</dd>
            </div>
            <div>
              <dt className="text-sm text-muted">Returns window</dt>
              <dd className="mt-1 font-display text-2xl font-bold">30 days</dd>
            </div>
          </dl>
        </div>

        {/* A "setup file" in an editor window: the one memorable element on the page. */}
        <div className="relative min-w-0">
          <div className="overflow-hidden rounded-2xl border border-slate-800 bg-ink shadow-2xl shadow-slate-900/20">
            <div className="flex items-center gap-2 border-b border-slate-800 px-4 py-3">
              <span className="h-3 w-3 rounded-full bg-slate-700" />
              <span className="h-3 w-3 rounded-full bg-slate-700" />
              <span className="h-3 w-3 rounded-full bg-slate-700" />
              <span className="ml-3 font-mono text-xs text-slate-400">my-setup.js</span>
            </div>

            <pre className="overflow-x-auto p-5 font-mono text-[13px] leading-7 text-slate-300 sm:text-sm">
              <code>
                <span className="text-slate-500">{"// the desk you will actually enjoy"}</span>
                {"\n"}
                <span className="text-[#8EA2FF]">const</span> setup = [
                {setupItems.map((p) => (
                  <span key={p.id} className="block pl-4 sm:pl-6">
                    {"{ "}
                    <span className="text-slate-400">item:</span>{" "}
                    <span className="text-[#7EE0B5]">&quot;{p.title.length > 26 ? p.title.slice(0, 24) + "..." : p.title}&quot;</span>
                    {", "}
                    <span className="text-slate-400">price:</span>{" "}
                    <span className="text-amber">{p.price}</span>
                    {" },"}
                  </span>
                ))}
                ];
                {"\n\n"}
                <span className="text-[#8EA2FF]">const</span> total = setup.reduce(
                <span className="text-slate-400">(sum, i) =&gt; sum + i.price</span>, 0);{"\n"}
                <span className="text-slate-500">{`// ${formatPrice(total)}, shipped free`}</span>
              </code>
            </pre>

            <div className="flex items-center justify-between border-t border-slate-800 bg-slate-900/60 px-5 py-3">
              <span className="font-mono text-xs text-slate-400">build passing</span>
              <Link
                href="/items"
                className="rounded-md bg-amber px-3 py-1.5 text-sm font-semibold text-ink transition-colors hover:bg-[#ffb84a]"
              >
                Shop this setup
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
