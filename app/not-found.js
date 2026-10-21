import Link from "next/link";

export default function NotFound() {
  return (
    <div className="page-container flex min-h-[60vh] flex-col items-start justify-center py-20">
      <p className="font-mono text-sm text-muted">404 / page not found</p>
      <h1 className="mt-3 text-4xl font-bold tracking-tightest sm:text-5xl">This page is not in the repo</h1>
      <p className="mt-4 max-w-md text-lg text-muted">
        The link may be broken or the page may have moved. Head back to the shop and keep browsing.
      </p>
      <div className="mt-8 flex gap-3">
        <Link href="/" className="btn btn-primary btn-lg">
          Go home
        </Link>
        <Link href="/items" className="btn btn-outline btn-lg">
          Browse items
        </Link>
      </div>
    </div>
  );
}
