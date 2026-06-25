// Reads configuration from environment variables (see .env.example).
// NOTE: NEXT_PUBLIC_* vars must be referenced statically so Next.js can
// inline them at build time — do not access process.env dynamically here.

export const siteConfig = {
  name: process.env.NEXT_PUBLIC_SITE_NAME || "Limsathya San",
  logo: process.env.NEXT_PUBLIC_LOGO_URL || "/logo.svg",
  profileImage: process.env.NEXT_PUBLIC_PROFILE_IMAGE_URL || "/profile.svg",
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL || "info@limsathya.com",
  phones: [
    process.env.NEXT_PUBLIC_CONTACT_PHONE_KH || "+855 89972121",
    process.env.NEXT_PUBLIC_CONTACT_PHONE_CN || "+86 15618072128",
  ].filter(Boolean),
  socials: [
    { key: "github", label: "GitHub", url: process.env.NEXT_PUBLIC_SOCIAL_GITHUB },
    { key: "instagram", label: "Instagram", url: process.env.NEXT_PUBLIC_SOCIAL_INSTAGRAM },
    { key: "linkedin", label: "LinkedIn", url: process.env.NEXT_PUBLIC_SOCIAL_LINKEDIN },
    { key: "facebook", label: "Facebook", url: process.env.NEXT_PUBLIC_SOCIAL_FACEBOOK },
    { key: "telegram", label: "Telegram", url: process.env.NEXT_PUBLIC_SOCIAL_TELEGRAM },
  ].filter((s) => s.url && s.url.trim() !== ""),
};
