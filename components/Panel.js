export default function Panel({ label, meta, children }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-white/10 bg-black/20 transition focus-within:border-teal-300/40 focus-within:ring-2 focus-within:ring-teal-300/20">
      <div className="flex items-center justify-between gap-3 border-b border-white/5 px-4 py-3">
        <span className="text-sm font-medium text-zinc-200">{label}</span>
        <span className="text-xs text-zinc-500">{meta}</span>
      </div>
      {children}
    </div>
  );
}
