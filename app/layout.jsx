import "./globals.css";
import { LanguageProvider } from "@/components/language-provider";
import { ThemeProvider } from "@/components/theme-provider";
import AntiDev from "@/components/anti-dev";

export const metadata = {
  title: "Limsathya San — Medical student, builder, photographer",
  description:
    "Limsathya San (陕炎烽 · សាន្ត លីមសត្យា) — a Cambodian medical student in Kunming who builds software, makes photographs, and creates across Khmer, Chinese, and English.",
};

const THEME_SCRIPT = `(function(){try{var p=localStorage.getItem('theme');var d=window.matchMedia('(prefers-color-scheme: dark)').matches;var t=(p==='light'||p==='dark')?p:(d?'dark':'light');var r=document.documentElement;r.setAttribute('data-theme',t);r.style.colorScheme=t;}catch(e){}})();`;

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Preload the three most-used MiSans weights so first paint
            uses the brand font (no FOUT-driven layout shift). The
            remaining weights stay on font-display: swap. */}
        <link rel="preload" href="/fonts/MiSans-Regular.ttf" as="font" type="font/ttf" crossOrigin="anonymous" />
        <link rel="preload" href="/fonts/MiSans-Medium.ttf" as="font" type="font/ttf" crossOrigin="anonymous" />
        <link rel="preload" href="/fonts/MiSans-Semibold.ttf" as="font" type="font/ttf" crossOrigin="anonymous" />
        <script dangerouslySetInnerHTML={{ __html: THEME_SCRIPT }} />
      </head>
      <body className="font-sans bg-background text-foreground antialiased">
        <ThemeProvider>
          <LanguageProvider>{children}</LanguageProvider>
          <AntiDev />
        </ThemeProvider>
      </body>
    </html>
  );
}
