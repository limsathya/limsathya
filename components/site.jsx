"use client";

import { useEffect, useState } from "react";
import { useLang } from "@/components/language-provider";
import { siteConfig } from "@/lib/site-config";
import { locales } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import { useScrollReveal, revealClasses } from "@/lib/use-scroll-reveal";
import { ContactForm } from "@/components/contact-form";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import Eyebrow from "@/components/eyebrow";
import ThemeToggle from "@/components/theme-toggle";
import Timeline from "@/components/timeline";
import ContactRow from "@/components/contact-row";
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
  GithubIcon,
  InstagramIcon,
  LinkedinIcon,
  FacebookIcon,
  Send,
  ChevronRight,
  Menu,
  X,
} from "lucide-react";

const FOCUS_ICONS = [Stethoscope, Code2, Camera, Clapperboard];
const SOCIAL_ICONS = {
  github: GithubIcon,
  instagram: InstagramIcon,
  linkedin: LinkedinIcon,
  facebook: FacebookIcon,
  telegram: Send,
};

const NAV_LINKS = [
  { id: "profile", key: "profile" },
  { id: "focus", key: "focus" },
  { id: "education", key: "path" },
  { id: "languages", key: "languages" },
  { id: "contact", key: "contact" },
];

const FOCUS_RING =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ember focus-visible:ring-offset-2 focus-visible:ring-offset-background";

export default function Site() {
  const { t, locale, setLocale } = useLang();
  const [menuOpen, setMenuOpen] = useState(false);

  // Close the mobile menu with Escape for keyboard users.
  useEffect(() => {
    if (!menuOpen) return undefined;
    const onKey = (e) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const year = new Date().getFullYear();

  // Scroll-reveal observers for each section
  const [profileRef, profileIn] = useScrollReveal();
  const [focusRef, focusIn] = useScrollReveal();
  const [eduRef, eduIn] = useScrollReveal();
  const [langRef, langIn] = useScrollReveal();
  const [contactRef, contactIn] = useScrollReveal();
  const [footerRef, footerIn] = useScrollReveal({ threshold: 0.05 });

  return (
    <div className="min-h-screen">
      {/* Skip link — visible only to keyboard users */}
      <a
        href="#top"
        className={cn(
          "sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-ember focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-onAccent",
          FOCUS_RING
        )}
      >
        {t.a11y.skip}
      </a>

      {/* ===================== NAV — slim frosted bar ===================== */}
      <header className="sticky top-0 z-50">
        <nav className="nav-glass" aria-label="Primary">
          <div className="mx-auto flex h-12 max-w-5xl items-center justify-between px-5">
            <a
              href="#top"
              className={cn("flex items-center gap-2 rounded-md", FOCUS_RING)}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={siteConfig.logo} alt="" width={24} height={24} decoding="async" className="h-6 w-6 rounded-md" />
              <span className="font-display text-sm font-medium text-paper">
                {siteConfig.name}
              </span>
            </a>

            <div className="hidden items-center gap-1 md:flex">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.id}
                  href={`#${link.id}`}
                  className={cn(
                    "rounded-md px-3 py-2 text-xs text-mist transition-colors duration-200 hover:text-paper",
                    FOCUS_RING
                  )}
                >
                  {t.nav[link.key]}
                </a>
              ))}
            </div>

            <div className="flex items-center gap-2">
              {/* Mobile menu toggle */}
              <button
                type="button"
                onClick={() => setMenuOpen((v) => !v)}
                aria-expanded={menuOpen}
                aria-controls="mobile-nav"
                aria-label={menuOpen ? "Close menu" : "Open menu"}
                className={cn(
                  "glass-control inline-flex h-9 w-9 items-center justify-center rounded-full text-mist transition-colors duration-200 hover:text-paper md:hidden",
                  FOCUS_RING
                )}
              >
                {menuOpen ? <X className="h-[18px] w-[18px]" /> : <Menu className="h-[18px] w-[18px]" />}
              </button>

              {/* iOS-style segmented language control */}
              <div className="glass-control flex items-center gap-0.5 rounded-full p-0.5">
                {locales.map((l) => (
                  <button
                    key={l.code}
                    onClick={() => setLocale(l.code)}
                    aria-pressed={locale === l.code}
                    className={cn(
                      "rounded-full px-2.5 py-1 text-xs transition-all duration-200",
                      FOCUS_RING,
                      l.face,
                      locale === l.code
                        ? "bg-ember/20 text-accentInk shadow-[inset_0_1px_0_0_rgba(255,255,255,0.12)]"
                        : "text-mist hover:text-paper"
                    )}
                  >
                    {l.label}
                  </button>
                ))}
              </div>
              <ThemeToggle />
            </div>
          </div>
        </nav>

        {/* Mobile dropdown — absolute so it never shifts page layout */}
        {menuOpen && (
          <div
            id="mobile-nav"
            className="glass-strong absolute inset-x-0 top-full border-x-0 border-t-0 md:hidden"
          >
            <div className="mx-auto flex max-w-5xl flex-col px-3 py-2">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.id}
                  href={`#${link.id}`}
                  onClick={() => setMenuOpen(false)}
                  className={cn(
                    "rounded-xl px-4 py-3 text-sm text-mist transition-colors duration-200 hover:bg-white/5 hover:text-paper",
                    FOCUS_RING
                  )}
                >
                  {t.nav[link.key]}
                </a>
              ))}
            </div>
          </div>
        )}
      </header>

      <main id="top">
        {/* ===================== HERO — one screen, one story ===================== */}
        <section className="relative overflow-hidden px-5 pb-24 pt-24 text-center sm:pb-32 sm:pt-36">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute left-1/2 top-[38%] h-[min(560px,90vw)] w-[min(560px,90vw)] -translate-x-1/2 -translate-y-1/2 animate-breathe rounded-full blur-3xl will-change-[opacity] bg-[radial-gradient(closest-side,rgba(246,162,60,0.20),rgba(229,85,46,0.08)_55%,transparent_72%)]"
          />
          <div className="relative mx-auto max-w-4xl">
            <h1
              className="animate-rise font-display font-semibold leading-[1.02] tracking-[-0.03em] text-[clamp(3rem,10vw,6.5rem)]"
              style={{ animationDelay: "0ms" }}
            >
              <span className="hero-name inline-block">Limsathya San</span>
            </h1>

            <p
              className="mt-5 animate-rise text-lg text-mist sm:text-xl"
              style={{ animationDelay: "80ms" }}
            >
              <span className="font-sc text-paper">陕炎烽</span>
              <span className="mx-2.5 text-mist-dim">·</span>
              <span className="font-khmer text-paper" lang="km">សាន្ត លីមសត្យា</span>
            </p>

            <p
              className="mx-auto mt-9 max-w-2xl animate-rise text-balance font-display text-2xl text-paper sm:text-3xl"
              style={{ animationDelay: "160ms" }}
            >
              {t.hero.lede}
            </p>
            <p
              className="mx-auto mt-4 max-w-xl animate-rise text-[17px] leading-relaxed text-mist"
              style={{ animationDelay: "240ms" }}
            >
              {t.hero.sub}
            </p>

            <div
              className="mt-10 flex animate-rise flex-wrap items-center justify-center gap-x-8 gap-y-4"
              style={{ animationDelay: "320ms" }}
            >
              <Button variant="ember" size="lg" onClick={() => scrollTo("contact")}>
                {t.hero.ctaPrimary}
              </Button>
              <Button variant="link" size="lg" onClick={() => scrollTo("education")}>
                {t.hero.ctaSecondary}
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>

            <p
              className="mt-12 flex animate-rise items-center justify-center gap-2 text-xs text-mist-dim"
              style={{ animationDelay: "400ms" }}
            >
              <MapPin className="h-3.5 w-3.5" />
              <span>{t.hero.location}</span>
              <span aria-hidden="true">·</span>
              <span>{t.hero.micro}</span>
            </p>
          </div>
        </section>

        {/* ===================== PROFILE ===================== */}
        <section id="profile" className="px-5 py-20 sm:py-28" ref={profileRef}>
          <div className="mx-auto grid max-w-5xl items-center gap-12 md:grid-cols-[260px_1fr] md:gap-16">
            <div className={cn("mx-auto md:mx-0", revealClasses(profileIn, 0, "scale").className)} style={revealClasses(profileIn, 0, "scale").style}>
              <div className="relative h-[220px] w-[220px]">
                <div className="absolute inset-0 -z-10 rounded-full bg-ember/15 blur-2xl" />
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={siteConfig.profileImage}
                  alt={t.profile.portraitAlt}
                  width={220}
                  height={220}
                  loading="lazy"
                  decoding="async"
                  className="h-[220px] w-[220px] rounded-full border border-line object-cover"
                  onError={(e) => {
                    if (!e.currentTarget.dataset.fallback) {
                      e.currentTarget.dataset.fallback = "1";
                      e.currentTarget.src = "/profile.svg";
                    }
                  }}
                />
              </div>
            </div>

            <div className={cn(revealClasses(profileIn, 1).className)} style={revealClasses(profileIn, 1).style}>
              <Eyebrow>{t.profile.eyebrow}</Eyebrow>
              <h2 className="font-display text-4xl font-semibold tracking-[-0.02em] text-paper sm:text-[2.75rem]">
                {t.profile.heading}
              </h2>
              <p className="mt-6 text-lg leading-relaxed text-paper/90">
                {t.profile.ledeAfter ? (
                  <>{t.profile.lede}<span className="font-khmer" lang="km">{t.profile.khmerName}</span>{t.profile.ledeAfter}</>
                ) : (
                  t.profile.lede
                )}
              </p>
              <p className="mt-4 text-[17px] leading-relaxed text-mist">{t.profile.body}</p>
            </div>
          </div>
        </section>

        {/* ===================== FOCUS — banded ===================== */}
        <section id="focus" className="section-band px-5 py-20 sm:py-28" ref={focusRef}>
          <div className="mx-auto max-w-5xl">
            <div className={cn("text-center", revealClasses(focusIn, 0).className)} style={revealClasses(focusIn, 0).style}>
              <Eyebrow className="justify-center">{t.focus.eyebrow}</Eyebrow>
              <h2 className="font-display text-4xl font-semibold tracking-[-0.02em] text-paper sm:text-[2.75rem]">
                {t.focus.heading}
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-[17px] text-mist">{t.focus.sub}</p>
            </div>

            <div className="mt-14 grid gap-6 sm:grid-cols-2">
              {t.focus.items.map((item, i) => {
                const Icon = FOCUS_ICONS[i] || Code2;
                return (
                  <Card
                    key={i}
                    className={cn(
                      "transition-[transform,box-shadow] duration-300 hover:-translate-y-1 hover:shadow-xl",
                      revealClasses(focusIn, i + 1).className
                    )}
                    style={revealClasses(focusIn, i + 1).style}
                  >
                    <CardContent className="p-8">
                      <div className="flex items-start justify-between gap-4">
                        <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl border border-ember/25 bg-ember/10">
                          <Icon className="h-5 w-5 text-accentInk" />
                        </div>
                        <Badge variant="soft">{item.tag}</Badge>
                      </div>
                      <h3 className="mt-6 font-display text-xl font-medium text-paper">{item.title}</h3>
                      <p className="mt-2 text-[15px] leading-relaxed text-mist">{item.text}</p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        {/* ===================== EDUCATION + EXPERIENCE ===================== */}
        <section id="education" className="px-5 py-20 sm:py-28" ref={eduRef}>
          <div className="mx-auto grid max-w-5xl gap-16 lg:grid-cols-2">
            <div className={cn(revealClasses(eduIn, 0, "left").className)} style={revealClasses(eduIn, 0, "left").style}>
              <Eyebrow>{t.education.eyebrow}</Eyebrow>
              <h2 className="font-display text-4xl font-semibold tracking-[-0.02em] text-paper sm:text-[2.75rem]">
                {t.education.heading}
              </h2>
              <p className="mb-10 mt-4 text-[17px] text-mist">{t.education.sub}</p>
              <Timeline items={t.education.items} present={t.present} />
            </div>

            <div id="experience" className={cn(revealClasses(eduIn, 1, "right").className)} style={revealClasses(eduIn, 1, "right").style}>
              <Eyebrow>{t.work.eyebrow}</Eyebrow>
              <h2 className="font-display text-4xl font-semibold tracking-[-0.02em] text-paper sm:text-[2.75rem]">
                {t.work.heading}
              </h2>
              <p className="mb-10 mt-4 text-[17px] text-mist">{t.work.sub}</p>
              <Timeline items={t.work.items} present={t.present} />
            </div>
          </div>
        </section>

        {/* ===================== LANGUAGES — banded ===================== */}
        <section id="languages" className="section-band px-5 py-20 sm:py-28" ref={langRef}>
          <div className="mx-auto max-w-5xl">
            <div className={cn("text-center", revealClasses(langIn, 0).className)} style={revealClasses(langIn, 0).style}>
              <Eyebrow className="justify-center">{t.languages.eyebrow}</Eyebrow>
              <h2 className="font-display text-4xl font-semibold tracking-[-0.02em] text-paper sm:text-[2.75rem]">
                {t.languages.heading}
              </h2>
            </div>

            <div className="mt-14 grid gap-6 sm:grid-cols-3">
              {t.languages.items.map((lang, i) => (
                <Card
                  key={i}
                  className={cn(
                    "transition-[transform,box-shadow] duration-300 hover:-translate-y-1 hover:shadow-xl",
                    revealClasses(langIn, i + 1, "scale").className
                  )}
                  style={revealClasses(langIn, i + 1, "scale").style}
                >
                  <CardContent className="p-8 text-center">
                    <div className={cn("text-4xl text-paper", lang.face)} {...(lang.face === "font-khmer" ? { lang: "km" } : {})}>{lang.greet}</div>
                    <h3 className="mt-5 font-display text-lg font-medium text-paper">{lang.name}</h3>
                    <p className="mt-1 text-xs uppercase tracking-wider text-mist-dim">
                      {lang.note}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>

            <p className={cn("mx-auto mt-10 max-w-2xl text-center text-sm leading-relaxed text-mist-dim", revealClasses(langIn, 4).className)} style={revealClasses(langIn, 4).style}>
              {t.languages.more}
            </p>
          </div>
        </section>

        {/* ===================== CONTACT ===================== */}
        <section id="contact" className="px-5 py-20 sm:py-28" ref={contactRef}>
          <div className="mx-auto max-w-5xl">
            <div className={cn("text-center", revealClasses(contactIn, 0).className)} style={revealClasses(contactIn, 0).style}>
              <Eyebrow className="justify-center">{t.contact.eyebrow}</Eyebrow>
              <h2 className="font-display text-4xl font-semibold tracking-[-0.02em] text-paper sm:text-[2.75rem]">
                {t.contact.heading}
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-[17px] text-mist">{t.contact.lede}</p>
            </div>

            <div className="mt-14 grid gap-14 lg:grid-cols-5">
              <div className={cn("lg:col-span-3", revealClasses(contactIn, 1, "left").className)} style={revealClasses(contactIn, 1, "left").style}>
                <ContactForm />
              </div>

              <div className={cn("lg:col-span-2", revealClasses(contactIn, 2, "right").className)} style={revealClasses(contactIn, 2, "right").style}>
                <dl className="space-y-7">
                  <ContactRow icon={Phone} label={t.contact.info.phone}>
                    {siteConfig.phones.map((p) => (
                      <a
                        key={p}
                        href={`tel:${p.replace(/\s/g, "")}`}
                        className={cn("block rounded-sm text-paper transition-colors duration-200 hover:text-accentInk", FOCUS_RING)}
                      >
                        {p}
                      </a>
                    ))}
                  </ContactRow>

                  <ContactRow icon={Mail} label={t.contact.info.email}>
                    <a
                      href={`mailto:${siteConfig.email}`}
                      className={cn("rounded-sm text-paper transition-colors duration-200 hover:text-accentInk", FOCUS_RING)}
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
                  <div className="mt-10">
                    <Separator className="mb-8" />
                    <p className="mb-4 text-xs uppercase tracking-[0.18em] text-mist-dim">
                      {t.contact.connect}
                    </p>
                    <div className="flex flex-wrap gap-3">
                      {siteConfig.socials.map((s) => {
                        const Icon = SOCIAL_ICONS[s.key] || Globe;
                        return (
                          <a
                            key={s.key}
                            href={s.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={s.label}
                            className={cn(
                              "glass-control inline-flex h-11 w-11 items-center justify-center rounded-full text-mist transition-colors duration-200 hover:text-accentInk",
                              FOCUS_RING
                            )}
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

      {/* ===================== FOOTER — functional footnote ===================== */}
      <footer className="border-t border-line px-5 py-8" ref={footerRef}>
        <div className={cn("mx-auto flex max-w-5xl flex-col items-start justify-between gap-6 sm:flex-row sm:items-center", revealClasses(footerIn, 0).className)} style={revealClasses(footerIn, 0).style}>
          <div className="flex items-center gap-3">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={siteConfig.logo} alt="" width={28} height={28} loading="lazy" decoding="async" className="h-7 w-7 rounded-md" />
            <div>
              <div className="font-display text-sm text-paper">{siteConfig.name}</div>
              <div className="text-xs text-mist-dim">
                <span className="font-sc">陕炎烽</span>
                <span className="mx-1.5">·</span>
                <span className="font-khmer">សាន្ត លីមសត្យា</span>
              </div>
            </div>
          </div>

          <div className="text-xs text-mist-dim sm:text-right">
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
