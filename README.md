<div align="center">

# 🌿 GreenLife Tree Nursery — Botanical Sanctuary

<p align="center">
  A modern, interactive, and tranquil botanical web experience crafted for exploring and acquiring premium specimen trees and rare ornamental flora.
</p>

[![React](https://img.shields.io/badge/React_19-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS_v4-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Three.js](https://img.shields.io/badge/Three.js-black?style=for-the-badge&logo=three.js&logoColor=white)](https://threejs.org/)
[![Motion](https://img.shields.io/badge/Motion-black?style=for-the-badge&logo=framer&logoColor=white)](https://motion.dev/)
[![Web Audio API](https://img.shields.io/badge/Web_Audio_API-%230A84FF.svg?style=for-the-badge&logo=audio&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API)

</div>

---

## 📖 About The Project

With heartfelt care and dedication, we built this project to unite the timeless elegance of nature with an intuitive, accessible, and aesthetically serene digital interface. Our vision was to ensure that exploring specimen trees feels less like a conventional online store and more like a peaceful, leisurely walk through a curated digital botanical sanctuary.

---

## ✨ Features & Accomplishments

1. **Interactive Specimen Catalog**
   - Showcase of rare botanical specimens (ancient Bonsais, flowering Cherry Blossoms, Meyer Lemon trees, Japanese Maples, Blue Spruces, and Saucer Magnolias).
   - Dynamic category filtering (Bonsais, Flowering, Citrus Orchards, Conifers, All).
   - Comprehensive botanical specifications: scientific names, daily sunlight hours, climate hardiness zones, watering cadence, and optimal soil composition.

2. **Arboreal Specimen Matcher (Plant Finder)**
   - A thoughtful, step-by-step questionnaire designed to guide users toward the best-suited tree for their microclimate:
     - Direct sunlight hours and landscape exposure.
     - Preferred canopy silhouette and seasonal presence.
     - Gardening rhythm and pruning commitment.
   - Real-time compatibility rating algorithm with tailored botanical recommendations.

3. **Seamless Shopping & Wishlist Experience**
   - **Slide-out Cart Drawer:** Custom handcrafted container/pot selection, live quantity adjustments, and transparent subtotal breakdowns.
   - **Wishlist Drawer:** Dedicated favorites drawer with one-tap transfer of saved trees directly into the cart.
   - **Local Storage Persistence:** Keeps cart contents and favorited specimens preserved across browser sessions.

4. **Instant Search with Keyboard Shortcut**
   - Instant search modal with live filtering, accessible globally via keyboard shortcut (`Ctrl + K` or `Cmd + K`).

5. **Visual Atmosphere & Sensory Immersion**
   - **Bioluminescent Spore Canvas:** An interactive HTML5 canvas simulating gentle floating spores and fireflies drifting across the background.
   - **Procedural Web Audio:** Subtle, soothing audio chimes generated in real time using the native **Web Audio API**, removing the need for heavy external sound assets.
   - **Curated Nighttime Palette:** Typography pairings (`Syne`, `Plus Jakarta Sans`, `Cinzel`) styled atop an ambient deep forest and emerald aesthetic.

---

## 🛠️ Built With

- **React 19 & TypeScript:** Component-driven frontend architecture with strict type safety and maintainability.
- **Vite:** Blazing-fast development environment and optimized production bundling.
- **Tailwind CSS v4:** Modern utility-first styling with responsive layouts and dark-mode botanical aesthetics.
- **Motion:** Smooth micro-interactions and modal transitions.
- **Three.js & HTML5 Canvas:** Ambient particle systems and interactive 3D visual touches.
- **Lucide React:** Clean, consistent, and accessible iconography.
- **Web Audio API:** Lightweight procedural sound synthesis for responsive feedback.

---

## 📂 Project Structure

```text
├── index.html                 # Application entry point with typography & meta tags
├── package.json               # Dependencies and scripts
├── vite.config.ts             # Vite configuration and server settings
├── tsconfig.json              # TypeScript compiler options
└── src/
    ├── main.tsx               # Root React entry point
    ├── App.tsx                # Central state manager, drawers, and modal coordinator
    ├── index.css              # Global Tailwind CSS imports
    ├── types.ts               # TypeScript interfaces and data models
    ├── components/
    │   ├── Navbar.tsx         # Header navigation, category filters, and live counters
    │   ├── Hero.tsx           # Sanctuary introduction banner and interactive triggers
    │   ├── ProductSection.tsx # Specimen grid, filters, and quick-view actions
    │   ├── ProductCard.tsx    # Specimen card with botanical details & audio feedback
    │   ├── ProductDetailModal.tsx # Full specimen specs, care guide, and pot selection
    │   ├── PlantFinderModal.tsx   # 3-step microclimate arbor match questionnaire
    │   ├── CartDrawer.tsx     # Slide-over cart with pot options and checkout summary
    │   ├── WishlistDrawer.tsx # Slide-over saved favorites with quick-add to cart
    │   ├── SearchModal.tsx    # Quick search modal with keyword filtering
    │   ├── FireflyCanvas.tsx  # Interactive bioluminescent particle canvas
    │   └── Footer.tsx         # Botanical sanctuary footer and brand links
    ├── data/
    │   └── products.ts        # Botanical specimens and specifications database
    ├── hooks/
    │   ├── useCart.ts         # Custom hook managing persistent cart state
    │   └── useWishlist.ts     # Custom hook managing persistent wishlist state
    └── utils/
        └── audio.ts           # Procedural Web Audio API sound synthesizer
```

---

## 🚀 Getting Started Locally

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start the local development server:**
   ```bash
   npm run dev
   ```
   Open your browser and navigate to `http://localhost:3000`.

3. **Build for production:**
   ```bash
   npm run build
   ```

---

## 💚 Acknowledgments & Dedication

This project was built with immense respect for craftsmanship, clean code, and natural beauty. We hope it serves as an inspiring, delightful, and welcoming foundation for anyone exploring or expanding upon it. Feedback, ideas, and contributions are always deeply appreciated!
