import { BeaconMark } from "@/components/beacon-mark";

export default function Eyebrow({ children }) {
  return (
    <div className="mb-4 inline-flex items-center gap-2">
      <BeaconMark size={15} />
      <span className="font-mono text-xs uppercase tracking-[0.22em] text-accentInk">
        {children}
      </span>
    </div>
  );
}
