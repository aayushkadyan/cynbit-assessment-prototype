# Cynbit Smart Project Scoping Assistant

> **A prototype improvement for [cynbit.in](https://www.cynbit.in)** — replacing the static 5-field contact form with an intelligent, guided project scoping assistant.

## 🔗 Live Demo

**[→ View Live Prototype](https://cynbit-smart-intake.vercel.app)**

## 🎯 Problem Statement

Cynbit Technologies' contact page (`/contact`) uses a passive 5-field form (Name, Email, Company, Industry, Message). For a company positioning itself as an AI-first innovator, this is a missed opportunity:

- **No qualification** — Cynbit doesn't know lead quality until a human reads the email  
- **No instant value** — user submits → nothing → waits 24–48hrs for a reply  
- **No guided scoping** — visitors don't know what to say or which service fits  
- **No intelligent routing** — everyone gets the same blank form  

## 💡 Improvement

An **AI-Powered Smart Project Scoping Assistant** that:

1. **Guides** users through 6 smart steps (goal → services → budget → timeline → details → contact)
2. **Qualifies** leads automatically using a scoring algorithm (0–100)
3. **Recommends** the right Cynbit services based on answers
4. **Generates** a personalized project brief instantly — no waiting required
5. **Syncs** visual design exactly with Cynbit's production design system

## 🛠 Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 15 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS v4 |
| Icons | Google Material Symbols |
| Deployment | Vercel |
| Font | System UI (matches Cynbit's production perf) |

## 📁 Project Structure

```
cynbit-smart-intake/
├── app/
│   ├── layout.tsx          # Root layout with metadata
│   ├── page.tsx            # Main page composition
│   └── globals.css         # Tailwind + custom animations
├── components/
│   ├── Navbar.tsx          # Cynbit-branded nav
│   ├── HeroSection.tsx     # Prototype explanation hero
│   ├── ScopingAssistant.tsx # ★ Core 6-step intake wizard
│   ├── ProjectBrief.tsx    # Generated brief display
│   ├── FeatureHighlights.tsx # Before/after comparison
│   └── Footer.tsx          # Branded footer
└── next.config.ts          # Static export config
```

## 🚀 Run Locally

```bash
git clone https://github.com/<your-username>/cynbit-smart-intake
cd cynbit-smart-intake
npm install
npm run dev
# Open http://localhost:3000
```

## 📊 Key Features

### Lead Scoring Algorithm
Automatically scores leads 0–100 based on:
- Budget range (10–40 pts)
- Timeline urgency (10–30 pts)  
- Number of services selected (10–20 pts)
- Project description depth (0–10 pts)

### Service Recommendation Engine
Maps user selections to Cynbit's exact service offerings:
- AI Automation → `/services`
- Full-Stack Dev → `/services`
- Cloud Systems → `/services`
- Digital Growth → `/services`
- Products → `/products`
- BitElevate → `/bitelevate`

### Design Fidelity
- Identical color tokens (indigo-600 primary)
- Same rounded corner radius (rounded-3xl, rounded-full)  
- Same typography weight conventions
- Same micro-interaction patterns (hover lift, active scale)

## 📈 Expected Impact

| Metric | Before | After (Projected) |
|---|---|---|
| Lead qualification | Manual, 24–48hrs | Instant, automated |
| Form completion rate | ~30–40% | ~55–65% (guided) |
| Time to qualified lead | 48hrs | 0 seconds |
| Lead data quality | 5 generic fields | 15+ structured data points |

---

Built as part of Cynbit Technologies assessment. All design decisions documented in the [Technical Report](./TECHNICAL_REPORT.md).
