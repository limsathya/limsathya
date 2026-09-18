export default function ContactRow({ icon: Icon, label, children }) {
  return (
    <div className="flex gap-4">
      <div className="mt-0.5 inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-line bg-night-2">
        <Icon className="h-4 w-4 text-accentInk" />
      </div>
      <div className="min-w-0">
        <dt className="font-mono text-xs uppercase tracking-wider text-mist-dim">{label}</dt>
        <dd className="mt-1 text-sm">{children}</dd>
      </div>
    </div>
  );
}
