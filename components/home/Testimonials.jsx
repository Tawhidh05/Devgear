import { Star } from "lucide-react";
import SectionHeading from "@/components/home/SectionHeading";

const REVIEWS = [
  {
    name: "Amina Rahman",
    role: "Frontend engineer",
    quote:
      "I moved to the Tactile 75 after a month of wrist pain. The typing feel is lovely and the aches are gone. My team now asks which keyboard I use on every call.",
  },
  {
    name: "Tomás Herrera",
    role: "Backend developer, remote",
    quote:
      "The 4K monitor lets me keep code, logs and docs open together without squinting. One USB-C cable and my whole desk is wired.",
  },
  {
    name: "Priya Nair",
    role: "Data engineer",
    quote:
      "I bought the portable SSD to carry datasets between machines. It is fast, tiny and has not missed a transfer in four months.",
  },
];

export default function Testimonials() {
  return (
    <section className="page-container pt-24">
      <SectionHeading
        title="What our customers say"
        description="Real notes from developers who replaced something on their desk."
      />

      <ul className="grid gap-6 md:grid-cols-3">
        {REVIEWS.map((r) => (
          <li key={r.name}>
            <figure className="surface card-hover flex h-full flex-col p-6">
              <div className="flex gap-0.5" aria-label="5 out of 5 stars">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-amber text-amber" aria-hidden="true" />
                ))}
              </div>
              <blockquote className="mt-4 flex-1 text-base leading-relaxed text-slate-700">
                &ldquo;{r.quote}&rdquo;
              </blockquote>
              <figcaption className="mt-6 flex items-center gap-3 border-t border-line pt-5">
                <span
                  aria-hidden="true"
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-ink text-sm font-bold text-white"
                >
                  {r.name.charAt(0)}
                </span>
                <span>
                  <span className="block text-sm font-semibold">{r.name}</span>
                  <span className="block text-sm text-muted">{r.role}</span>
                </span>
              </figcaption>
            </figure>
          </li>
        ))}
      </ul>
    </section>
  );
}
