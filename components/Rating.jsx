import { Star } from "lucide-react";

export default function Rating({ rating = 0, reviews = 0, size = "sm" }) {
  if (!reviews) {
    return (
      <span className="inline-flex items-center rounded-md bg-cobalt-soft px-2 py-0.5 text-xs font-semibold text-cobalt">
        New
      </span>
    );
  }

  const iconSize = size === "lg" ? "h-5 w-5" : "h-4 w-4";
  return (
    <div className="flex items-center gap-1.5" aria-label={`Rated ${rating} out of 5 from ${reviews} reviews`}>
      <Star className={`${iconSize} fill-amber text-amber`} aria-hidden="true" />
      <span className={size === "lg" ? "text-base font-semibold" : "text-sm font-semibold"}>
        {Number(rating).toFixed(1)}
      </span>
      <span className="text-sm text-muted">({reviews.toLocaleString("en-US")})</span>
    </div>
  );
}
