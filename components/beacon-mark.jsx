import { useId } from "react";

export function BeaconMark({ size = 16, className }) {
  const gid = "bm-" + useId().replace(/:/g, "");
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id={gid} x1="12" y1="2" x2="12" y2="22" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#FFE3B0" />
          <stop offset="0.55" stopColor="#F6A23C" />
          <stop offset="1" stopColor="#E5552E" />
        </linearGradient>
      </defs>
      <path
        d="M12 2.5c2.4 3.2 5.2 5.4 5.2 9.4 0 3.2-2.4 5.6-5.2 5.6S6.8 15.1 6.8 11.9c0-4 2.8-6.2 5.2-9.4Z"
        fill={`url(#${gid})`}
      />
      <path d="M6 21.5h12" stroke="#F6A23C" strokeWidth="1.4" strokeLinecap="round" opacity="0.5" />
    </svg>
  );
}
