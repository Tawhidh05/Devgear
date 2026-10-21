export default function Spinner({ label = "Loading", className = "" }) {
  return (
    <div role="status" className={`flex items-center justify-center gap-3 text-muted ${className}`}>
      <span
        aria-hidden="true"
        className="h-5 w-5 animate-spin rounded-full border-2 border-slate-300 border-t-cobalt"
      />
      <span className="text-sm font-medium">{label}</span>
    </div>
  );
}
