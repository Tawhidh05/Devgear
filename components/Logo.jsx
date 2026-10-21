import Link from "next/link";

export default function Logo({ light = false }) {
  return (
    <Link href="/" className="inline-flex items-center gap-2.5" aria-label="DevGear home">
      <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-ink">
        <svg viewBox="0 0 32 32" className="h-6 w-6" aria-hidden="true">
          <path d="M9 11l6 5-6 5" fill="none" stroke="#fff" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M17.5 21.5h6" stroke="#F5A524" strokeWidth="2.6" strokeLinecap="round" />
        </svg>
      </span>
      <span className={`font-display text-xl font-bold tracking-tight ${light ? "text-white" : "text-ink"}`}>
        DevGear
      </span>
    </Link>
  );
}
