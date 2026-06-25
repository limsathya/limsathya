"use client";

import { useLang } from "@/components/language-provider";
import { siteConfig } from "@/lib/site-config";
import { locales } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import { BeaconMark } from "@/components/beacon-mark";
import { ContactForm } from "@/components/contact-form";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Stethoscope,
  Code2,
  Camera,
  Clapperboard,
  Phone,
  Mail,
  MapPin,
  Clock,
  Globe,
  Github,
  Instagram,
  Linkedin,
  Facebook,
  Send,
  ArrowUpRight,
  Sun,
  Moon,
  Monitor,
} from "lucide-react";
import { useTheme } from "@/components/theme-provider";

const FOCUS_ICONS = [Stethoscope, Code2, Camera, Clapperboard];
const SOCIAL_ICONS = {
  github: Github,
  instagram: Instagram,
  linkedin: Linkedin,
  facebook: Facebook,
  telegram: Send,
};

const NAV_LINKS = [
  { id: "profile", key: "profile" },
  { id: "focus", key: "focus" },
  { id: "education", key: "path" },
  { id: "languages", key: "languages" },
  { id: "contact", key: "contact" },
];

function ThemeToggle() {
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

function Eyebrow({ children }) {
  return (
    <div className="mb-4 inline-flex items-center gap-2">
      <BeaconMark size={15} />
      <span className="font-mono text-xs uppercase tracking-[0.22em] text-accentInk">
        {children}
      </span>
    </div>
  );
}

function Timeline({ items, present }) {
  return (
    <ol className="relative ml-1 border-l border-line">
      {items.map((item, i) => {
        const when = item.when || `${item.start} – ${present}`;
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

export default function Site() {
  const { t, locale, setLocale } = useLang();

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const year = new Date().getFullYear();

  return (
    <div className="min-h-screen">
      {/* ===================== NAV ===================== */}
      <header className="sticky top-0 z-50 border-b border-line/60 bg-night/80 backdrop-blur-md">
        <nav className="mx-auto flex max-w-5xl items-center justify-between px-5 py-3.5">
          <a href="#top" className="flex items-center gap-2.5">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={siteConfig.logo} alt="" className="h-7 w-7 rounded-md" />
            <span className="font-display text-base text-paper">{siteConfig.name}</span>
          </a>

          <div className="hidden items-center gap-7 md:flex">
            {NAV_LINKS.map((link) => (
              <a
                key={link.id}
                href={`#${link.id}`}
                className="text-sm text-mist transition-colors hover:text-accentInk"
              >
                {t.nav[link.key]}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-3">
            {/* language switcher */}
            <div className="flex items-center gap-0.5 rounded-full border border-line p-0.5">
              {locales.map((l) => (
                <button
                  key={l.code}
                  onClick={() => setLocale(l.code)}
                  aria-pressed={locale === l.code}
                  className={cn(
                    "rounded-full px-2.5 py-1 text-xs transition-colors",
                    l.face,
                    locale === l.code
                      ? "bg-ember/15 text-accentInk"
                      : "text-mist hover:text-accentInk"
                  )}
                >
                  {l.label}
                </button>
              ))}
            </div>
            <ThemeToggle />
          </div>
        </nav>
      </header>

      <main id="top">
        {/* ===================== HERO ===================== */}
        <section className="relative overflow-hidden px-5 pb-20 pt-20 sm:pt-28">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute left-1/2 top-[36%] h-[min(620px,90vw)] w-[min(620px,90vw)] -translate-x-1/2 -translate-y-1/2 animate-breathe rounded-full blur-2xl bg-[radial-gradient(closest-side,rgba(246,162,60,0.30),rgba(229,85,46,0.12)_55%,transparent_72%)]"
          />
          <div className="relative mx-auto max-w-5xl">
            <div
              className="mb-6 inline-flex animate-rise items-center gap-2 rounded-full border border-line bg-night-2/50 px-3.5 py-1.5"
              style={{ animationDelay: "0ms" }}
            >
              <MapPin className="h-3.5 w-3.5 text-accentInk" />
              <span className="font-mono text-xs tracking-wide text-mist">
                {t.hero.location}
              </span>
            </div>

            <h1
              className="animate-rise font-display font-semibold leading-[0.95] tracking-tight text-[clamp(2.7rem,9vw,7rem)]"
              style={{ animationDelay: "80ms" }}
            >
              <span className="hero-name inline-block">
                Limsathya San
              </span>
            </h1>

            <p
              className="mt-4 animate-rise text-lg text-mist sm:text-xl"
              style={{ animationDelay: "160ms" }}
            >
              <span className="font-sc text-paper">陕炎烽</span>
              <span className="mx-2.5 text-mist-dim">·</span>
              <span className="font-khmer text-paper">សាន្ត លីមសត្យា</span>
            </p>

            <p
              className="mt-8 max-w-2xl animate-rise font-display text-2xl text-paper sm:text-3xl"
              style={{ animationDelay: "240ms" }}
            >
              {t.hero.lede}
            </p>
            <p
              className="mt-4 max-w-xl animate-rise text-base leading-relaxed text-mist"
              style={{ animationDelay: "300ms" }}
            >
              {t.hero.sub}
            </p>

            <div
              className="mt-9 flex animate-rise flex-wrap items-center gap-3"
              style={{ animationDelay: "360ms" }}
            >
              <Button variant="ember" size="lg" onClick={() => scrollTo("contact")}>
                {t.hero.ctaPrimary}
                <ArrowUpRight className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="lg" onClick={() => scrollTo("education")}>
                {t.hero.ctaSecondary}
              </Button>
            </div>

            <p
              className="mt-10 animate-rise font-mono text-xs uppercase tracking-[0.18em] text-mist-dim"
              style={{ animationDelay: "440ms" }}
            >
              {t.hero.micro}
            </p>
          </div>
        </section>

        {/* ===================== PROFILE ===================== */}
        <section id="profile" className="px-5 py-16 sm:py-20">
          <div className="mx-auto grid max-w-5xl items-start gap-10 md:grid-cols-[260px_1fr] md:gap-14">
            <div className="mx-auto md:mx-0">
              <div className="relative h-[220px] w-[220px]">
                <div className="absolute inset-0 -z-10 rounded-full bg-ember/20 blur-2xl" />
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={siteConfig.profileImage}
                  alt={t.profile.portraitAlt}
                  className="h-[220px] w-[220px] rounded-full border border-line object-cover ring-1 ring-ember/30"
                  onError={(e) => {
                    if (!e.currentTarget.dataset.fallback) {
                      e.currentTarget.dataset.fallback = "1";
                      e.currentTarget.src = "/profile.svg";
                    }
                  }}
                />
              </div>
            </div>

            <div>
              <Eyebrow>{t.profile.eyebrow}</Eyebrow>
              <h2 className="font-display text-3xl text-paper sm:text-4xl">
                {t.profile.heading}
              </h2>
              <p className="mt-5 text-lg leading-relaxed text-paper/90">{t.profile.lede}</p>
              <p className="mt-4 leading-relaxed text-mist">{t.profile.body}</p>
            </div>
          </div>
        </section>

        {/* ===================== FOCUS ===================== */}
        <section id="focus" className="px-5 py-16 sm:py-20">
          <div className="mx-auto max-w-5xl">
            <Eyebrow>{t.focus.eyebrow}</Eyebrow>
            <h2 className="font-display text-3xl text-paper sm:text-4xl">{t.focus.heading}</h2>
            <p className="mt-3 max-w-2xl text-mist">{t.focus.sub}</p>

            <div className="mt-10 grid gap-5 sm:grid-cols-2">
              {t.focus.items.map((item, i) => {
                const Icon = FOCUS_ICONS[i] || Code2;
                return (
                  <Card
                    key={i}
                    className="bg-gradient-to-b from-night-2 to-night transition-colors hover:border-ember/45"
                  >
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between gap-4">
                        <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-ember/25 bg-ember/10">
                          <Icon className="h-5 w-5 text-accentInk" />
                        </div>
                        <Badge variant="soft">{item.tag}</Badge>
                      </div>
                      <h3 className="mt-5 font-display text-xl text-paper">{item.title}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-mist">{item.text}</p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        {/* ===================== EDUCATION + EXPERIENCE ===================== */}
        <section id="education" className="px-5 py-16 sm:py-20">
          <div className="mx-auto grid max-w-5xl gap-14 lg:grid-cols-2">
            <div>
              <Eyebrow>{t.education.eyebrow}</Eyebrow>
              <h2 className="font-display text-3xl text-paper sm:text-4xl">
                {t.education.heading}
              </h2>
              <p className="mb-9 mt-3 text-mist">{t.education.sub}</p>
              <Timeline items={t.education.items} present={t.present} />
            </div>

            <div id="experience">
              <Eyebrow>{t.work.eyebrow}</Eyebrow>
              <h2 className="font-display text-3xl text-paper sm:text-4xl">{t.work.heading}</h2>
              <p className="mb-9 mt-3 text-mist">{t.work.sub}</p>
              <Timeline items={t.work.items} present={t.present} />
            </div>
          </div>
        </section>

        {/* ===================== LANGUAGES ===================== */}
        <section id="languages" className="px-5 py-16 sm:py-20">
          <div className="mx-auto max-w-5xl">
            <Eyebrow>{t.languages.eyebrow}</Eyebrow>
            <h2 className="font-display text-3xl text-paper sm:text-4xl">
              {t.languages.heading}
            </h2>

            <div className="mt-10 grid gap-5 sm:grid-cols-3">
              {t.languages.items.map((lang, i) => (
                <Card key={i} className="bg-night-2">
                  <CardContent className="p-6">
                    <div className={cn("text-3xl text-accentInk", lang.face)}>{lang.greet}</div>
                    <h3 className="mt-4 font-display text-lg text-paper">{lang.name}</h3>
                    <p className="mt-1 font-mono text-xs uppercase tracking-wider text-accentInk">
                      {lang.note}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>

            <p className="mt-7 max-w-2xl text-sm leading-relaxed text-mist-dim">
              {t.languages.more}
            </p>
          </div>
        </section>

        {/* ===================== CONTACT ===================== */}
        <section id="contact" className="px-5 py-16 sm:py-20">
          <div className="mx-auto max-w-5xl">
            <Eyebrow>{t.contact.eyebrow}</Eyebrow>
            <h2 className="font-display text-3xl text-paper sm:text-4xl">
              {t.contact.heading}
            </h2>
            <p className="mt-3 max-w-2xl text-mist">{t.contact.lede}</p>

            <div className="mt-10 grid gap-12 lg:grid-cols-5">
              <div className="lg:col-span-3">
                <ContactForm />
              </div>

              <div className="lg:col-span-2">
                <dl className="space-y-6">
                  <ContactRow icon={Phone} label={t.contact.info.phone}>
                    {siteConfig.phones.map((p) => (
                      <a
                        key={p}
                        href={`tel:${p.replace(/\s/g, "")}`}
                        className="block text-paper transition-colors hover:text-accentInk"
                      >
                        {p}
                      </a>
                    ))}
                  </ContactRow>

                  <ContactRow icon={Mail} label={t.contact.info.email}>
                    <a
                      href={`mailto:${siteConfig.email}`}
                      className="text-paper transition-colors hover:text-accentInk"
                    >
                      {siteConfig.email}
                    </a>
                  </ContactRow>

                  <ContactRow icon={MapPin} label={t.contact.info.location}>
                    <span className="text-paper">{t.contact.locationValue}</span>
                  </ContactRow>

                  <ContactRow icon={Clock} label={t.contact.info.hours}>
                    <div className="space-y-1 text-paper">
                      <div className="flex justify-between gap-6">
                        <span className="text-mist">{t.contact.info.monFri}</span>
                        <span>9:00 – 17:00</span>
                      </div>
                      <div className="flex justify-between gap-6">
                        <span className="text-mist">{t.contact.info.sat}</span>
                        <span>10:00 – 15:00</span>
                      </div>
                      <div className="flex justify-between gap-6">
                        <span className="text-mist">{t.contact.info.sun}</span>
                        <span className="text-mist-dim">{t.contact.info.closed}</span>
                      </div>
                    </div>
                  </ContactRow>

                  <ContactRow icon={Globe} label={t.contact.info.timezone}>
                    <span className="text-paper">{t.contact.info.tz}</span>
                  </ContactRow>
                </dl>

                {siteConfig.socials.length > 0 && (
                  <div className="mt-8">
                    <Separator className="mb-6" />
                    <p className="mb-3 font-mono text-xs uppercase tracking-[0.18em] text-mist-dim">
                      {t.contact.connect}
                    </p>
                    <div className="flex flex-wrap gap-2.5">
                      {siteConfig.socials.map((s) => {
                        const Icon = SOCIAL_ICONS[s.key] || Globe;
                        return (
                          <a
                            key={s.key}
                            href={s.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={s.label}
                            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-line text-mist transition-colors hover:border-ember/50 hover:text-accentInk"
                          >
                            <Icon className="h-[18px] w-[18px]" />
                          </a>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* ===================== FOOTER ===================== */}
      <footer className="border-t border-line px-5 py-10">
        <div className="mx-auto flex max-w-5xl flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
          <div className="flex items-center gap-3">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={siteConfig.logo} alt="" className="h-8 w-8 rounded-md" />
            <div>
              <div className="font-display text-paper">{siteConfig.name}</div>
              <div className="text-sm text-mist-dim">
                <span className="font-sc">陕炎烽</span>
                <span className="mx-1.5">·</span>
                <span className="font-khmer">សាន្ត លីមសត្យា</span>
              </div>
            </div>
          </div>

          <div className="text-sm text-mist-dim sm:text-right">
            <div>{t.footer.tagline}</div>
            <div className="mt-1">
              © {year} {siteConfig.name}. {t.footer.rights}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

function ContactRow({ icon: Icon, label, children }) {
  return (
    <div className="flex gap-4">
      <div className="mt-0.5 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-line bg-night-2">
        <Icon className="h-4 w-4 text-accentInk" />
      </div>
      <div className="min-w-0">
        <dt className="font-mono text-xs uppercase tracking-wider text-mist-dim">{label}</dt>
        <dd className="mt-1 text-sm">{children}</dd>
      </div>
    </div>
  );
}
