# Anshad — Freelance SEO Specialist Portfolio

A dark editorial personal portfolio website built with **Next.js (App Router)**, **Tailwind CSS**, **GSAP + ScrollTrigger**, **Lenis Smooth Scroll**, **Framer Motion**, and **Lucide React** for **Anshad**, Freelance SEO Specialist from Ernakulam, Kerala, India.

## Getting Started

```bash
npm install
npm run dev
```

Open `http://localhost:3000` in your browser.

## Configuration

All portfolio copy, domain metadata, and contact/social link placeholders live in:

- `src/data/portfolio.js` — update `siteConfig.siteUrl` and `contactData.channels` with your live domain, email, WhatsApp, LinkedIn, and Instagram URLs.
- `src/data/services.js` — service offerings and focus areas.
- `public/images/anshad-portrait.jpg` — hero portrait image (configured in `siteConfig.profileImage` inside `src/data/portfolio.js`).

## Production Build

```bash
npm run build
npm run start
```

