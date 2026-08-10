export default function Loading() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="flex flex-col items-center gap-4">
        <div className="h-10 w-10 animate-pulse rounded-full bg-ember/30" />
        <p className="font-mono text-xs uppercase tracking-[0.22em] text-mist-dim">
          Loading…
        </p>
      </div>
    </div>
  );
}
