# Web Shield

**Tactical tracker visualizer and link safety scanner for modern browsers.**

Browser extension that reveals the hidden tracking ecosystem of any website and warns about potentially dangerous links in real-time.

---

## Overview

Web Shield provides complete visibility into third-party tracking activities on any webpage you visit. It combines real-time network analysis with link safety heuristics, presenting the data through an interactive tactical HUD interface.

### Key capabilities

- **Real-time tracker detection** — identifies 50+ known trackers including Google Analytics, Facebook Pixel, Yandex Metrika, Chartbeat, Optimizely, and others
- **Interactive network map** — visualizes connections between the current website and third-party trackers using force-directed graph layout
- **Link safety scanner** — analyzes URLs on hover using multiple heuristics (IP addresses, suspicious keywords, excessive subdomains, unencrypted connections)
- **Dangerous link highlighting** — suspicious and dangerous links are underlined directly on the page
- **Tactical HUD design** — cyberpunk-inspired interface with JetBrains Mono typography and amber accent colors
- **100% private** — all analysis happens locally in your browser, no data is transmitted externally

---

## Installation

### From source

```bash
git clone https://github.com/CerCraft07/web-shield.git
cd web-shield
npm install
npm run build
