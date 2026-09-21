<div align="center">
  <img alt="GreenLife Tree Nursery Banner" src="https://github.com/user-attachments/assets/c1103197-00b4-46e6-a300-c95b1856dce7" width="723" height="154" />

  <br>

  <h3>🌿 GreenLife Tree Nursery — Botanical Sanctuary (v1.0.0-PROD)</h3>

  <p>
    <img src="https://img.shields.io/badge/build-passing-brightgreen" alt="Build Status" />
    <img src="https://img.shields.io/badge/deployment-production-blue" alt="Deployment" />
    <img src="https://img.shields.io/badge/version-1.0.0--PROD-orange" alt="Version" />
    <img src="https://img.shields.io/badge/performance-optimized-success" alt="Performance" />
  </p>
</div>

<br>

> **Architectural Living Arbors & Botanical Sanctuary E-Commerce.**  
> A high-end interactive web application and digital sanctuary for master-cultivated specimen trees and rare ornamental flora, featuring interactive catalogs, microclimate matching, and sensory immersion.

<br>

<div align="center">
  <h3>🌍 <b><a href="https://greenlife-web-nine.vercel.app">View Live Platform (Production) 🟢</a></b></h3>
  <br>
  <img alt="GreenLife Preview" src="https://github.com/user-attachments/assets/e7199bf7-00ef-424f-b1e3-f2b4adb1a23f" width="80%" />
</div>

## 🎥 E-Commerce Platform Demo

**🎬 Botanical Sanctuary & UI Walkthrough**  
Walkthrough of the digital sanctuary interface: exploring master-cultivated specimen trees, climate hardiness filtering, the Arboreal Matcher questionnaire, slide-over cart and wishlist drawers, and procedural audio synthesis.

https://github.com/user-attachments/assets/c21c78e6-5a31-4a60-99d0-18425ceed6bc

---

### 🌐 Overview

With heartfelt care and dedication, **GreenLife Tree Nursery** unites the timeless elegance of nature with an intuitive, accessible, and aesthetically serene digital interface. Our vision was to ensure that exploring specimen trees feels less like a conventional online store and more like a peaceful, leisurely walk through a curated digital botanical sanctuary.

This repository contains the client-side user interface and interaction logic, built with modern frontend tools to deliver smooth navigation across mobile, tablet, and desktop screens.

---

### 🚀 Features & Accomplishments

* 🌳 **Interactive Specimen Catalog**
  * Showcase of rare botanical specimens (ancient Bonsais, flowering Cherry Blossoms, Meyer Lemon trees, Japanese Maples, Blue Spruces, and Saucer Magnolias).
  * Dynamic category filtering (*Bonsais, Flowering, Citrus Orchards, Conifers, All*).
  * Comprehensive botanical specifications: scientific names, daily sunlight hours, climate hardiness zones, watering cadence, and optimal soil composition.

* 🔍 **Arboreal Specimen Matcher (Plant Finder)**
  * A thoughtful, step-by-step questionnaire designed to guide users toward the best-suited tree for their microclimate:
    * Direct sunlight hours and landscape exposure.
    * Preferred canopy silhouette and seasonal presence.
    * Gardening rhythm and pruning commitment.
  * Real-time compatibility rating algorithm with tailored botanical recommendations.

* 🛒 **Seamless Shopping & Wishlist Experience**
  * **Slide-out Cart Drawer:** Custom handcrafted container/pot selection, live quantity adjustments, and transparent subtotal breakdowns.
  * **Wishlist Drawer:** Dedicated favorites drawer with one-tap transfer of saved trees directly into the cart.
  * **Local Storage Persistence:** Keeps cart contents and favorited specimens preserved across browser sessions.

* ⌨️ **Instant Search with Keyboard Shortcut**
  * Instant search modal with live filtering, accessible globally via keyboard shortcut (`Ctrl + K` or `Cmd + K`).

* ✨ **Visual Atmosphere & Sensory Immersion**
  * **Bioluminescent Spore Canvas:** An interactive HTML5 canvas simulating gentle floating spores and fireflies drifting across the background.
  * **Procedural Web Audio:** Subtle, soothing audio chimes generated in real time using the native **Web Audio API**, removing the need for heavy external sound assets.
  * **Curated Nighttime Palette:** Typography pairings (*Syne*, *Plus Jakarta Sans*, *Cinzel*) styled atop an ambient deep forest and emerald aesthetic.

---

### 🛠️ Technology Stack

* **Client & Core:** React 19 + TypeScript
* **Styling & Layout:** Tailwind CSS v4
* **Motion & Transitions:** Motion (`motion/react`)
* **Visuals & Canvas:** Three.js & HTML5 Canvas
* **Audio:** Web Audio API
* **Iconography:** Lucide React
* **Build Tool:** Vite

---

### 📂 Project Structure

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

### 💻 Installation & Quick Start

1. **Clone repository:**
   ```bash
   git clone https://github.com/JastinBolanos/GreenLife.git
   cd GreenLife
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start local development server:**
   ```bash
   npm run dev
   ```
   Open your browser and navigate to `http://localhost:3000`.

4. **Compile production build:**
   ```bash
   npm run build
   ```

---

### 📄 License

Crafted with dedication © GreenLife Sanctuary. All rights reserved.
