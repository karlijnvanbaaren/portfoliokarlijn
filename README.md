# Karlijn — Portfolio Website

Een modern, redactioneel en minimalistisch portfolio gebouwd met **Next.js 15**, **React 19**, **TypeScript** en **Tailwind CSS**.

---

## 🚀 Aan de slag (Lokaal draaien)

### Vereisten
- [Node.js](https://nodejs.org/) (versie 18 of nieuwer)
- [Git](https://git-scm.com/) en [Git LFS](https://git-lfs.github.com/) (voor grote mediabestanden zoals video's)

### Installatie & Starten

1. **Clone de repository:**
   ```bash
   git clone https://github.com/JOUW_GEBRUIKERSNAAM/karlijn-portfolio.git
   cd karlijn-portfolio
   ```

2. **Grote bestanden ophalen via Git LFS:**
   ```bash
   git lfs pull
   ```

3. **Dependencies installeren:**
   ```bash
   npm install
   ```

4. **Ontwikkelserver starten:**
   ```bash
   npm run dev
   ```
   Open nu [http://localhost:3000](http://localhost:3000) in je browser.

5. **Productie-build testen:**
   ```bash
   npm run build
   npm run start
   ```

---

## 📁 Mappenstructuur

```text
├── app/                  # Next.js App Router pagina's en layouts
│   ├── about/            # Over mij pagina
│   ├── contact/          # Contact pagina
│   ├── projects/         # Projecten overzicht
│   │   └── [id]/         # Dynamische projectdetailpagina
│   ├── globals.css       # Globale styling & Tailwind CSS
│   ├── layout.tsx        # Hoofdlayout met Header en Footer
│   └── page.tsx          # Homepage
├── components/           # Herbruikbare React componenten
│   ├── ContactForm.tsx   # Contactformulier
│   ├── CopyEmailButton.tsx # Interactieve kopieerknop voor e-mail
│   ├── Footer.tsx        # Voettekst
│   ├── Header.tsx        # Navigatiebalk
│   ├── SectionHeading.tsx # Sectietitels
│   └── TiltedFrames.tsx  # Visuele kantelframes
├── data/                 # Data bestanden
│   └── projects.ts       # Alle projectinformatie en galerijen
├── public/               # Publieke bestanden en geoptimaliseerde media
│   └── Img/              # Afbeeldingen, posters en projectvideo's
├── types/                # TypeScript type definities
├── _legacy_static/       # Gearchiveerde oorspronkelijke statische HTML/CSS bestanden
├── .gitattributes        # Git LFS configuratie voor mediabestanden (*.mp4, *.pdf)
├── .gitignore            # Git exclusions (o.a. node_modules, .next, local env)
├── next.config.ts        # Next.js configuratie
├── package.json          # Project afhankelijkheden en scripts
├── tailwind.config.ts    # Tailwind kleurenpalet en thema
└── tsconfig.json         # TypeScript instellingen
```

---

## 🛠️ Gebruikte Technologieën

- **Framework:** [Next.js 15](https://nextjs.org/) (App Router)
- **UI Library:** [React 19](https://react.dev/)
- **Taal:** [TypeScript](https://www.typescriptlang.org/)
- **Styling:** [Tailwind CSS 3](https://tailwindcss.com/)
- **Iconen:** [Lucide React](https://lucide.dev/)
- **Media Management:** [Git LFS](https://git-lfs.github.com/)

---

## 📦 Deployment

Dit project kan met één klik gedeployed worden op platforms zoals [Vercel](https://vercel.com/):
1. Koppel je GitHub repository aan Vercel.
2. Vercel herkent automatisch Next.js en bouwt de site.
3. Je website staat direct online!
