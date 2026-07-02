import "./globals.css";
import { Fraunces, IBM_Plex_Sans, IBM_Plex_Mono, Noto_Serif_SC, Noto_Serif_Khmer } from "next/font/google";
import { LanguageProvider } from "@/components/language-provider";
import { ThemeProvider } from "@/components/theme-provider";
import { Analytics } from "@vercel/analytics/next";

export const metadata = {
  title: "Limsathya San — Medical student, builder, photographer",
  description:
    "Limsathya San (陕炎烽 · សាន្ត លីមសត្យា) — a Cambodian medical student in Kunming who builds software, makes photographs, and creates across Khmer, Chinese, and English.",
};

// --- Google Fonts via next/font (self-hosted, zero layout shift) ---
const fraunces = Fraunces({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-display",
  display: "swap",
});

const ibmPlexSans = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-sans",
  display: "swap",
});

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
  display: "swap",
});

const notoSerifSC = Noto_Serif_SC({
  subsets: ["latin"],
  weight: ["500", "700"],
  variable: "--font-sc",
  display: "swap",
});

const notoSerifKhmer = Noto_Serif_Khmer({
  subsets: ["khmer"],
  weight: ["500", "700"],
  variable: "--font-khmer",
  display: "swap",
});

// Runs before paint to set the theme from saved preference or the OS,
// avoiding a flash of the wrong theme.
const THEME_SCRIPT = `(function(){try{var p=localStorage.getItem('theme');var d=window.matchMedia('(prefers-color-scheme: dark)').matches;var t=(p==='light'||p==='dark')?p:(d?'dark':'light');var r=document.documentElement;r.setAttribute('data-theme',t);r.style.colorScheme=t;}catch(e){}})();`;

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${fraunces.variable} ${ibmPlexSans.variable} ${ibmPlexMono.variable} ${notoSerifSC.variable} ${notoSerifKhmer.variable}`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_SCRIPT }} />
      </head>
      <body className="font-sans bg-background text-foreground antialiased">
        <ThemeProvider>
          <LanguageProvider>{children}</LanguageProvider>
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
