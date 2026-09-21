"use client";

import { cn } from "@/lib/utils";
import { useScrollReveal, revealClasses } from "@/lib/use-scroll-reveal";

export default function Timeline({ items, present }) {
  const [ref, inView] = useScrollReveal();

  return (
    <ol ref={ref} className="relative ml-1">
      {/* The spine draws itself top-to-bottom as the list enters view */}
      <span
        aria-hidden="true"
        className={cn(
          "absolute left-0 top-0 h-full w-px origin-top bg-line transition-transform duration-1000 ease-out",
          inView ? "scale-y-100" : "scale-y-0"
        )}
      />
      {items.map((item, i) => {
        const when =
          item.when ||
          (item.start
            ? `${item.start} – ${present}`
            : "");
        const reveal = revealClasses(inView, i, "up");
        return (
          <li
            key={i}
            className={cn("relative pb-9 pl-8 last:pb-0", reveal.className)}
            style={reveal.style}
          >
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
