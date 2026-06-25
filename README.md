# Limsathya San — Personal Website

A trilingual (English / 中文 / ខ្មែរ) personal website built with **Next.js (App Router)**,
**Tailwind CSS**, and **shadcn-style** UI components, with a **Resend**-powered contact form.

---

## Requirements

- **Node.js 18.17+** (LTS recommended)
- npm (ships with Node)

---

## 1. Install

```bash
# from the project folder
npm install
```

## 2. Configure environment variables

```bash
cp .env.example .env.local
```

Then open `.env.local` and fill in your values. See the table below.

## 3. Run locally

```bash
npm run dev
```

Open http://localhost:3000

---

## Environment variables

| Variable | Public? | What it's for |
| --- | --- | --- |
| `RESEND_API_KEY` | **Secret** | Your Resend API key — powers the contact form |
| `CONTACT_TO_EMAIL` | Secret | Where contact messages are delivered |
| `CONTACT_FROM_EMAIL` | Secret | The "From" address (must be on a verified domain in production) |
| `NEXT_PUBLIC_SITE_NAME` | Public | Display name in the nav/footer |
| `NEXT_PUBLIC_LOGO_URL` | Public | Path/URL to your logo (default `/logo.svg`) |
| `NEXT_PUBLIC_PROFILE_IMAGE_URL` | Public | Path/URL to your profile photo (default `/profile.svg`) |
| `NEXT_PUBLIC_CONTACT_EMAIL` | Public | Email shown on the page |
| `NEXT_PUBLIC_CONTACT_PHONE_KH` | Public | Cambodia phone number |
| `NEXT_PUBLIC_CONTACT_PHONE_CN` | Public | China phone number |
| `NEXT_PUBLIC_SOCIAL_GITHUB` | Public | GitHub URL (leave blank to hide) |
| `NEXT_PUBLIC_SOCIAL_INSTAGRAM` | Public | Instagram URL (leave blank to hide) |
| `NEXT_PUBLIC_SOCIAL_LINKEDIN` | Public | LinkedIn URL (leave blank to hide) |
| `NEXT_PUBLIC_SOCIAL_FACEBOOK` | Public | Facebook URL (leave blank to hide) |
| `NEXT_PUBLIC_SOCIAL_TELEGRAM` | Public | Telegram URL (leave blank to hide) |

> Anything beginning with `NEXT_PUBLIC_` is bundled into the browser. Keep the Resend key
> and the `CONTACT_*` values **without** that prefix so they stay server-only.
> Any social link left blank simply won't appear on the site.

---

## Setting up Resend (contact form)

1. Create an account at <https://resend.com>.
2. Under **API Keys**, create a key and paste it into `RESEND_API_KEY`.
3. Under **Domains**, add `limsathya.com` and add the DNS records Resend gives you.
   Once verified, set `CONTACT_FROM_EMAIL` to an address on that domain, e.g.
   `Limsathya San <noreply@limsathya.com>`.

**Testing without a verified domain:** you can temporarily set
`CONTACT_FROM_EMAIL="Limsathya San <onboarding@resend.dev>"`. Resend only delivers messages
from that shared sender to the email address of your own Resend account — fine for a quick
test, but verify your domain before going live.

---

## Replacing the placeholder assets

- **Profile photo:** drop your image into `public/` (e.g. `public/profile.jpg`) and set
  `NEXT_PUBLIC_PROFILE_IMAGE_URL="/profile.jpg"`.
- **Logo:** replace `public/logo.svg` (or point `NEXT_PUBLIC_LOGO_URL` at a new file).

---

## Editing the text / translations

All copy lives in **`lib/i18n.js`**, grouped by language (`en`, `zh`, `km`).
The Chinese and Khmer were drafted as a starting point — since you're fluent in both,
please read through and adjust the wording to sound exactly the way you'd say it.

The language switcher (top-right) remembers the visitor's last choice.

---

## Appearance (light & dark)

The site automatically follows the visitor's device setting — light or dark — on **both mobile
and desktop**, and updates live if they switch their system theme. A toggle in the top-right
corner lets anyone override it: it cycles **System → Light → Dark** and remembers the choice.
There's no flash of the wrong theme on load (an inline script sets it before first paint).

---

## Deploying to Vercel

1. Push this project to a GitHub repository.
2. Go to <https://vercel.com>, click **Add New → Project**, and import the repo.
3. In **Settings → Environment Variables**, add **every** variable from your `.env.local`
   (both the `NEXT_PUBLIC_*` ones and the secret `RESEND_API_KEY` / `CONTACT_*` ones).
4. Click **Deploy**. To use `limsathya.com`, add it under **Settings → Domains**.

---

## Project structure

```
limsathya-website/
├─ app/
│  ├─ api/contact/route.js   # Resend contact endpoint (server)
│  ├─ globals.css            # theme tokens + base styles
│  ├─ layout.jsx             # fonts, metadata, language provider
│  └─ page.jsx               # renders <Site/>
├─ components/
│  ├─ ui/                    # button, card, badge, separator, input, textarea, label
│  ├─ beacon-mark.jsx        # the flame/beacon logo mark
│  ├─ contact-form.jsx       # trilingual form → /api/contact
│  ├─ language-provider.jsx  # language context + persistence
│  └─ site.jsx               # the full page
├─ lib/
│  ├─ i18n.js                # EN / 中文 / ខ្មែរ content
│  ├─ site-config.js         # reads env (socials, logo, profile, contact)
│  └─ utils.js               # cn() helper
├─ public/                   # logo.svg, profile.svg (replace these)
├─ .env.example
└─ tailwind.config.js
```

## A note on the design

The whole site is a dark "night," and your name is the lit beacon at the top — a nod to the
**烽** (signal-fire) in your Chinese name, and to a path that has crossed borders
(Phnom Penh → Shanghai → Kunming) and disciplines (business → medicine, plus software,
photography, and content).

---

## Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the dev server |
| `npm run build` | Production build |
| `npm run start` | Run the production build |
| `npm run lint` | Lint the project |
