import { cn } from "@/lib/utils";

export default function Timeline({ items, present }) {
  return (
    <ol className="relative ml-1 border-l border-line">
      {items.map((item, i) => {
        const when =
          item.when ||
          (item.start
            ? `${item.start} – ${present}`
            : "");
        return (
          <li key={i} className="relative pl-8 pb-9 last:pb-0">
            <span
              className={cn(
                "absolute -left-[5px] top-1.5 h-2.5 w-2.5 rounded-full",
                item.now
                  ? "bg-gradient-to-br from-ember to-flame ring-4 ring-ember/15"
                  : "bg-line"
              )}
            />
            <div className="font-mono text-xs uppercase tracking-wider text-mist-dim">
              {when}
            </div>
            <h3 className="mt-1.5 font-display text-lg text-paper">{item.title}</h3>
            <p className="text-sm text-mist">{item.sub}</p>
            <p className="mt-0.5 text-sm text-mist-dim">{item.place}</p>
          </li>
        );
      })}
    </ol>
  );
}
