# Thatila Wijayathunga — Dynamic Portfolio

<div align="center">

[![Live Demo](https://img.shields.io/badge/Live_Demo-new--dynamic--portfolio--k7oiskd7a.vercel.app-c22026?style=for-the-badge&logo=vercel&logoColor=white)](https://new-dynamic-portfolio-k7oiskd7a.vercel.app/)
[![Next.js](https://img.shields.io/badge/Next.js-16-black?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.0-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)

<p align="center">
  A modern, high-performance personal portfolio built with cutting-edge web technologies, dynamic micro-interactions, and a signature high-contrast cyberpunk/editorial aesthetic.
</p>

🔗 **Live URL:** [https://new-dynamic-portfolio-k7oiskd7a.vercel.app/](https://new-dynamic-portfolio-k7oiskd7a.vercel.app/)

</div>

---

## ✨ Features

- 🌐 **Global Projects Explorer (`/global`):** Interactive world map with dynamic geo-filtering and continental project showcases.
- ⚡ **Animated Skills Marquee:** Smooth, hardware-accelerated continuous scrolling ribbons showcasing technical proficiencies.
- 🎨 **Dynamic Tech-Forward Aesthetic:** Sleek dark mode palette, glassmorphism card elevation, glow accents (`#c22026`), and editorial typography (Oswald + Inter).
- 📩 **Freelance & Collaboration Portal (`/contact`):** Interactive inquiry and budget estimation experience.
- 🧭 **Floating Dynamic Navbar:** Context-aware animated navigation dock for smooth page and section transitions.
- 📱 **Fully Responsive:** Precision-engineered layouts optimized across mobile, tablet, and ultra-wide displays.
- 🚀 **Static & Edge Ready:** Pre-rendered and deployed on Vercel's Edge Network for instant page loads.

---

## 💻 Tech Stack

| Layer | Technology |
|---|---|
| **Framework** | [Next.js](https://nextjs.org/) (App Router) |
| **UI Library** | [React](https://reactjs.org/) |
| **Styling** | [Tailwind CSS v4](https://tailwindcss.com/) |
| **Language** | [TypeScript](https://www.typescriptlang.org/) |
| **Animations** | GSAP & CSS3 Keyframes |
| **Deployment** | [Vercel](https://vercel.com/) |

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/thatiii24/new_dynamic_portfolio.git
cd new_dynamic_portfolio
```

### 2. Install dependencies

```bash
npm install
```

### 3. Run development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

### 4. Build for production

```bash
npm run build
```

---

## 📂 Project Structure

```text
├── public/                # Static assets (images, icons, geojson)
├── src/
│   ├── app/
│   │   ├── layout.tsx     # Root layout with fonts & metadata
│   │   ├── page.tsx       # Landing page (Hero, Experience, Projects)
│   │   ├── contact/       # Freelance inquiry portal
│   │   └── global/        # Global map explorer
│   ├── components/
│   │   ├── AnimatedSkills.tsx # Infinite scrolling skill marquee
│   │   ├── FloatingNavBar.tsx # Floating dock navigation
│   │   └── WorldMap.tsx       # Geo-interactive world map component
├── next.config.ts         # Next.js configuration
├── package.json           # Project manifest and scripts
└── tsconfig.json          # TypeScript compiler options
```

---

## 🌐 Deployment

This application is deployed and hosted on **Vercel**:

👉 **[https://new-dynamic-portfolio-k7oiskd7a.vercel.app/](https://new-dynamic-portfolio-k7oiskd7a.vercel.app/)**

---

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).
