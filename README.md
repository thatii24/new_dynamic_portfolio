# Thatila Wijayathunga — Dynamic Portfolio

<div align="center">

[![Live Demo](https://img.shields.io/badge/Live_Demo-new--dynamic--portfolio--k7oiskd7a.vercel.app-c22026?style=for-the-badge&logo=vercel&logoColor=white)](https://new-dynamic-portfolio-k7oiskd7a.vercel.app/)
[![Next.js](https://img.shields.io/badge/Next.js-16.3-black?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.2-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![GSAP](https://img.shields.io/badge/GSAP-3.15-88CE02?style=for-the-badge&logo=greensock&logoColor=white)](https://greensock.com/gsap/)
[![Nodemailer](https://img.shields.io/badge/Nodemailer-9.1-007ACC?style=for-the-badge&logo=node.js&logoColor=white)](https://nodemailer.com/)

<p align="center">
  A state-of-the-art, high-performance personal portfolio engineered with <strong>Next.js 16 (App Router)</strong>, <strong>React 19</strong>, <strong>TypeScript</strong>, and <strong>Tailwind CSS v4</strong>. Features interactive 3D map exploration, dynamic project carousels, animated skills ribbons, and an automated freelance inquiry SMTP portal with rate limiting and security defenses.
</p>

🔗 **Live Production URL:** [https://new-dynamic-portfolio-k7oiskd7a.vercel.app/](https://new-dynamic-portfolio-k7oiskd7a.vercel.app/)

</div>

---

## 🌟 Key Features

- 🗺️ **Interactive Global Projects Explorer (`/global`):**
  - Interactive SVG GeoJSON world map with real-time country hover highlights and zoom transitions.
  - Continental project filtering (Americas, Europe, Asia-Pacific, Africa, Global).
  - Dynamic project pins and interactive side-drawers with technology stacks and repository links.

- ⚡ **Interactive Skill Showcase & Infinite Marquee:**
  - Categorized skill breakdown (Frontend, Backend, Cloud & DevOps, AI & System Architecture).
  - Infinite hardware-accelerated animated marquee ribbons for fluid brand & tool presentation.
  - Interactive proficiency level meters and detailed technology descriptions.

- 🎠 **3D Perspective Project Carousel:**
  - Modern card deck showcasing flagship client and open-source applications.
  - Live demo launchers, GitHub source links, and dynamic technology tags.

- 💼 **Professional Experience & Expertise Matrix:**
  - Timeline of roles, achievements, and core engineering philosophy.
  - Real-time animated stats and competency breakdowns.

- 📩 **Freelance & Client Inquiry Portal (`/contact` & `/api/contact`):**
  - Dynamic budget estimator, scope checklist, and timeline calculator.
  - Direct **Nodemailer SMTP integration** with branded, responsive HTML client notifications.
  - **In-memory IP rate limiting** (sliding window: max 5 requests per 15 min).
  - **Honeypot anti-spam defense** and HTML escaping / XSS protection.

- 🧭 **Dynamic Floating Navigation Dock:**
  - Glassmorphic, floating dock with active route detection and smooth page transitions.

- 🎨 **Cyberpunk / Editorial Dark Aesthetic:**
  - Deep dark mode (`#080808` / `#0f0f10`), glassmorphism, vibrant Crimson Red glow accents (`#c22026`), and editorial typography (Oswald & Inter).

---

## 💻 Tech Stack

| Layer | Technologies |
|---|---|
| **Framework** | [Next.js 16](https://nextjs.org/) (App Router, Server Actions, Route Handlers) |
| **UI & Core** | [React 19](https://react.org/), [TypeScript 5](https://www.typescriptlang.org/) |
| **Styling** | [Tailwind CSS v4](https://tailwindcss.com/) with custom glassmorphism and keyframes |
| **Animations** | [GSAP](https://greensock.com/gsap/) & Hardware-accelerated CSS3 transforms |
| **Email Delivery** | [Nodemailer](https://nodemailer.com/) (Secure SMTP via TLS / SSL) |
| **Mapping & GIS** | TopoJSON / GeoJSON interactive SVG projections |
| **Hosting & CDN** | [Vercel](https://vercel.com/) (Edge Network & Serverless Functions) |

---

## 📂 Project Structure

```text
dynemic-portfolio/
├── public/                     # Static assets, brand icons, and GeoJSON files
│   ├── favicon.ico
│   └── world.geojson           # Global map boundary definitions
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   └── contact/
│   │   │       └── route.ts    # Secure SMTP inquiry handler + Rate limiter
│   │   ├── contact/
│   │   │   └── page.tsx        # Freelance inquiry portal with budget estimator
│   │   ├── global/
│   │   │   └── page.tsx        # Global project explorer with geo-filtering
│   │   ├── globals.css         # Tailwind CSS v4 directives & theme tokens
│   │   ├── layout.tsx          # Root layout, fonts (Oswald/Inter), & SEO metadata
│   │   └── page.tsx            # Main landing page (Hero, Experience, Projects)
│   └── components/
│       ├── AboutExpertise.tsx   # Experience timeline & core competencies
│       ├── AnimatedSkills.tsx  # Infinite scrolling marquee ribbon
│       ├── AnimeLoader.tsx     # Futuristic interactive splash loader
│       ├── FloatingNavBar.tsx  # Floating navigation dock
│       ├── ProjectCarousel.tsx # Interactive perspective project cards
│       ├── SkillShowcase.tsx   # Tabbed skill matrix & proficiency meters
│       ├── WavingCharacter.tsx # Interactive welcome avatar
│       └── WorldMap.tsx        # Geo-interactive world map component
├── .env.example                # Environment variables template
├── .env.local                  # Local environment overrides (git-ignored)
├── next.config.ts              # Next.js configuration
├── package.json                # Project dependencies and npm scripts
└── tsconfig.json               # TypeScript compiler configuration
```

---

## 🚀 Getting Started

### Prerequisites

Ensure you have the following installed on your local environment:
- **Node.js:** `v18.17.0` or later (Node.js 20+ recommended)
- **npm:** `v9+` (or `pnpm` / `yarn`)

### 1. Clone the Repository

```bash
git clone https://github.com/thatiii24/new_dynamic_portfolio.git
cd new_dynamic_portfolio
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env.local` file by copying the provided template:

```bash
cp .env.example .env.local
```

Fill in your SMTP credentials to enable the Contact Form email dispatcher:

```env
# Email address to receive inquiries
CONTACT_RECEIVER_EMAIL=your-email@gmail.com

# Public contact details displayed in UI
NEXT_PUBLIC_CONTACT_EMAIL=your-email@gmail.com
NEXT_PUBLIC_CONTACT_PHONE=+94 78 1263 743

# Gmail SMTP Configuration (Recommended)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=465
SMTP_SECURE=true
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-16-character-gmail-app-password
```

> 💡 **Tip for Gmail SMTP:** Generate a 16-character App Password at [Google Account > Security > 2-Step Verification > App Passwords](https://myaccount.google.com/apppasswords).

### 4. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the application with hot-reloading.

### 5. Build for Production

```bash
npm run build
npm run start
```

---

## 🛡️ Security & Performance Highlights

- **Server-Side Rate Limiting:** In-memory sliding window algorithm on `/api/contact` limits submissions to 5 per 15 minutes per IP address to prevent spam or DOS attacks.
- **XSS & Injection Protection:** All input fields are HTML-escaped and strictly validated with regular expressions before email compilation.
- **Honeypot Trap:** Hidden form fields catch automated bot submissions and silently discard spam.
- **Optimized Asset Delivery:** Dynamic imports and modular SVG world mapping ensure minimal initial bundle sizes and fast First Contentful Paint (FCP).

---

## 🌐 Deployment

This project is optimized for deployment on the **Vercel Platform**:

1. Push your changes to GitHub / GitLab.
2. Import the repository into your [Vercel Dashboard](https://vercel.com/new).
3. Add your Environment Variables (`SMTP_HOST`, `SMTP_USER`, `SMTP_PASS`, `CONTACT_RECEIVER_EMAIL`, etc.) in the Vercel project settings.
4. Deploy! Next.js will automatically build and deploy the edge-optimized production package.

---

## 👤 Author

**Thatila Wijayathunga**
- 🌐 **Portfolio:** [new-dynamic-portfolio-k7oiskd7a.vercel.app](https://new-dynamic-portfolio-k7oiskd7a.vercel.app/)
- 📧 **Email:** [thatilawijayathunga@gmail.com](mailto:thatilawijayathunga@gmail.com)
- 💼 **LinkedIn:** [Thatila Wijayathunga](https://linkedin.com/in/thatila-wijayathunga)
- 🐙 **GitHub:** [@thatiii24](https://github.com/thatiii24)

---

## 📄 License

This project is open-source and licensed under the [MIT License](LICENSE).
