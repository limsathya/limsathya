"use client";

import { useEffect, useState } from "react";
import { ShieldAlert } from "lucide-react";

/**
 * AntiDev — client-side deterrents against casual inspection:
 *  - blocks the context menu (right-click / long-press menu)
 *  - blocks common DevTools & view-source keyboard shortcuts
 *    (F12, Ctrl/Cmd+Shift+I/J/C/K, Ctrl/Cmd+U, Ctrl/Cmd+S, Ctrl/Cmd+P)
 *  - detects an open DevTools — docked (viewport geometry) AND
 *    undocked (debugger-timing) — and shows a full-screen warning
 *    overlay while it stays open
 *
 * Enabled by default in every environment. Set NEXT_PUBLIC_ANTI_DEV=off
 * (e.g. in .env.local) to disable it while developing.
 *
 * Note: no client-side measure can stop a determined user — this raises
 * the bar for casual copying only.
 */
const ENABLED = process.env.NEXT_PUBLIC_ANTI_DEV !== "off";

export default function AntiDev() {
  const [devtoolsOpen, setDevtoolsOpen] = useState(false);

  useEffect(() => {
    if (!ENABLED) return undefined;

    /* ---- 1. context menu ---- */
    const onContextMenu = (e) => e.preventDefault();

    /* ---- 2. keyboard shortcuts ---- */
    const onKeyDown = (e) => {
      const key = e.key.toLowerCase();
      const mod = e.ctrlKey || e.metaKey;
      const blocked =
        e.key === "F12" ||
        (mod && e.shiftKey && ["i", "j", "c", "k"].includes(key)) ||
        (mod && !e.shiftKey && ["u", "s", "p"].includes(key));
      if (blocked) {
        e.preventDefault();
        e.stopPropagation();
      }
    };

    /* ---- 3a. docked DevTools — dock shrinks the viewport ---- */
    const THRESHOLD = 170;
    const geometryOpen = () =>
      window.outerWidth - window.innerWidth > THRESHOLD ||
      window.outerHeight - window.innerHeight > THRESHOLD;

    /* ---- 3b. undocked DevTools — debugger pauses only while open ---- */
    const timingOpen = () => {
      const t0 = performance.now();
      // eslint-disable-next-line no-debugger
      debugger;
      return performance.now() - t0 > 80;
    };

    const detect = () => setDevtoolsOpen(geometryOpen() || timingOpen());
    const interval = setInterval(detect, 1200);
    window.addEventListener("resize", detect);

    document.addEventListener("contextmenu", onContextMenu);
    document.addEventListener("keydown", onKeyDown, true);

    return () => {
      clearInterval(interval);
      window.removeEventListener("resize", detect);
      document.removeEventListener("contextmenu", onContextMenu);
      document.removeEventListener("keydown", onKeyDown, true);
    };
  }, []);

  if (!devtoolsOpen) return null;

  return (
    <div
      role="alert"
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-night/70 p-6 backdrop-blur-2xl"
    >
      <div className="glass-strong max-w-sm rounded-3xl p-8 text-center">
        <div className="mx-auto mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl border border-ember/30 bg-ember/10">
          <ShieldAlert className="h-6 w-6 text-accentInk" />
        </div>
        <h2 className="font-display text-xl text-paper">Developer tools detected</h2>
        <p className="mt-2 text-sm leading-relaxed text-mist">
          This site&apos;s content and code are protected. Please close the
          developer tools to continue browsing.
        </p>
      </div>
    </div>
  );
}
