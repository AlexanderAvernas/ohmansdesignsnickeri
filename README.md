# Öhmans Design & Snickeri

Next.js 13 App Router + Tailwind CSS + Sanity (klar för integration)

## Kom igång

```bash
npm install
npm run dev
```

Öppna [http://localhost:3000](http://localhost:3000)

## Filstruktur

```
src/
├── app/
│   ├── layout.tsx       # Root layout med fonter
│   ├── page.tsx         # Startsidan
│   └── globals.css      # Tailwind + CSS-variabler
├── components/
│   ├── Navbar.tsx        # Sticky navbar med scroll-effekt
│   ├── Hero.tsx          # Fullscreen hero med overlay-texter
│   ├── TextSection.tsx   # Tre kolumner med h3 + text
│   ├── About.tsx         # Om-sektion med h1 + 2 stycken
│   ├── Gallery.tsx       # Server-wrapper (hämtar från Sanity)
│   ├── GalleryClient.tsx # Karusell med lightbox
│   └── Footer.tsx        # Footer med kontaktinfo
└── lib/
    └── sanity.ts         # Sanity-klient + TypeScript-typer
```

## Sanity-integration

1. Skapa ett Sanity-projekt på [sanity.io](https://sanity.io)
2. Installera paketen:
   ```bash
   npm install next-sanity @sanity/image-url
   ```
3. Kopiera `.env.example` till `.env.local` och fyll i:
   ```
   NEXT_PUBLIC_SANITY_PROJECT_ID=ditt-projekt-id
   NEXT_PUBLIC_SANITY_DATASET=production
   ```

### Sanity-scheman att skapa

**hero**
- `h1` (string)
- `h2` (string)
- `paragraph` (text)
- `backgroundImage` (image)

**textSection**
- `heading` (string)
- `body` (text)
- `order` (number)

**about**
- `heading` (string)
- `paragraph1` (text)
- `paragraph2` (text)

**gallery**
- `mainImage` (image)
- `images` (array of images)

## Deploy till Vercel

1. Pusha till GitHub
2. Importera repo på [vercel.com/new](https://vercel.com/new)
3. Lägg till environment variables i Vercel-dashboarden