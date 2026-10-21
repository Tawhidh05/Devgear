import { BadgeCheck, RefreshCcw, ShieldCheck, Truck } from "lucide-react";
import SectionHeading from "@/components/home/SectionHeading";

const FEATURES = [
  {
    icon: BadgeCheck,
    title: "Tested by developers",
    text: "Each product spends two weeks on a real desk before we list it. If it fails, you never see it.",
  },
  {
    icon: Truck,
    title: "Free, tracked shipping",
    text: "Orders over $50 ship free and arrive in three to five working days, with tracking from the first scan.",
  },
  {
    icon: RefreshCcw,
    title: "30-day returns",
    text: "Try it on your own desk. If it is not right, send it back and we refund the full price.",
  },
  {
    icon: ShieldCheck,
    title: "Two-year warranty",
    text: "Every item is covered for two years. Ask us for a repair or a replacement and we handle the rest.",
  },
];

export default function WhyDevGear() {
  return (
    <section className="page-container pt-24">
      <SectionHeading
        title="A shop that works the way you do"
        description="No filler, no fake discounts. Just gear that has earned its place."
      />

      <ul className="grid gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
        {FEATURES.map(({ icon: Icon, title, text }) => (
          <li key={title} className="border-t-2 border-ink pt-6">
            <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-cobalt-soft text-cobalt">
              <Icon className="h-5 w-5" aria-hidden="true" />
            </span>
            <h3 className="mt-5 text-xl font-semibold">{title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted">{text}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
