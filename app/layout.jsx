import "./globals.css";
import localFont from "next/font/local";
import { LanguageProvider } from "@/components/language-provider";
import { ThemeProvider } from "@/components/theme-provider";

export const metadata = {
  title: "Limsathya San — Medical student, builder, photographer",
  description:
    "Limsathya San (陕炎烽 · សាន្ត លីមសត្យា) — a Cambodian medical student in Kunming who builds software, makes photographs, and creates across Khmer, Chinese, and English.",
};

const misans = localFont({
  src: [
    { path: "../public/fonts/MiSans-Thin.ttf",       weight: "100", style: "normal" },
    { path: "../public/fonts/MiSans-ExtraLight.ttf", weight: "200", style: "normal" },
    { path: "../public/fonts/MiSans-Light.ttf",      weight: "300", style: "normal" },
    { path: "../public/fonts/MiSans-Regular.ttf",    weight: "400", style: "normal" },
    { path: "../public/fonts/MiSans-Medium.ttf",     weight: "500", style: "normal" },
    { path: "../public/fonts/MiSans-Semibold.ttf",   weight: "600", style: "normal" },
    { path: "../public/fonts/MiSans-Bold.ttf",       weight: "700", style: "normal" },
    { path: "../public/fonts/MiSans-Heavy.ttf",      weight: "900", style: "normal" },
  ],
  variable: "--font-misans",
  display: "swap",
  preload: true,
  adjustFontFallback: false,
});

const THEME_SCRIPT = `(function(){try{var p=localStorage.getItem('theme');var d=window.matchMedia('(prefers-color-scheme: dark)').matches;var t=(p==='light'||p==='dark')?p:(d?'dark':'light');var r=document.documentElement;r.setAttribute('data-theme',t);r.style.colorScheme=t;}catch(e){}})();`;

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning className={misans.variable}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_SCRIPT }} />
      </head>
      <body className="font-sans bg-background text-foreground antialiased">
        <ThemeProvider>
          <LanguageProvider>{children}</LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
