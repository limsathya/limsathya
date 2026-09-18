import { BeaconMark } from "@/components/beacon-mark";
import { cn } from "@/lib/utils";

export default function Eyebrow({ children, className }) {
  return (
    <div className={cn("mb-4 flex items-center gap-2", className)}>
      <BeaconMark size={15} />
      <span className="font-mono text-xs uppercase tracking-[0.22em] text-accentInk">
        {children}
      </span>
    </div>
  );
}
