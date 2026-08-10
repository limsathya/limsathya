"use client";

import { useTheme } from "@/components/theme-provider";
import { useLang } from "@/components/language-provider";
import { Sun, Moon, Monitor } from "lucide-react";

export default function ThemeToggle() {
  const { preference, cycleTheme } = useTheme();
  const { t } = useLang();
  const labels = t.theme || { label: "Theme", system: "System", light: "Light", dark: "Dark" };
  const Icon = preference === "light" ? Sun : preference === "dark" ? Moon : Monitor;
  const text = `${labels.label}: ${labels[preference]}`;
  return (
    <button
      type="button"
      onClick={cycleTheme}
      aria-label={text}
      title={text}
      className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-line text-mist transition-colors hover:border-ember/50 hover:text-accentInk"
    >
      <Icon className="h-[18px] w-[18px]" />
    </button>
  );
}
