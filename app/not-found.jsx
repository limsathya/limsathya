import Link from "next/link";
import { BeaconMark } from "@/components/beacon-mark";

export default function NotFound() {
  return (
    <div className="flex min-h-[70vh] items-center justify-center px-5">
      <div className="text-center">
        <div className="mb-6 inline-flex items-center gap-2">
          <BeaconMark size={18} />
          <span className="font-mono text-xs uppercase tracking-[0.22em] text-accentInk">
            404
          </span>
        </div>
        <h1 className="font-display text-5xl font-semibold text-paper sm:text-6xl">
          Page not found
        </h1>
        <p className="mx-auto mt-4 max-w-md text-mist">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <Link
          href="/"
          className="mt-8 inline-flex items-center gap-2 rounded-full border border-line bg-night-2 px-5 py-2.5 text-sm text-foreground transition-colors hover:border-ember/50 hover:text-accentInk hover:bg-ember/5"
        >
          ← Back to home
        </Link>
      </div>
    </div>
  );
}
