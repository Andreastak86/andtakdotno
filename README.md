# 🌐 Portfolio – Andreas Takvam

Dette er min personlige portfolio bygget med moderne webteknologi og fokus på enkelhet, struktur og tydelig kommunikasjon.

Målet med prosjektet er å presentere hvem jeg er, hva jeg har bygget, og hvordan jeg jobber – på en måte som føles ekte, ryddig og profesjonell.

---

## ✨ Om prosjektet

Porteføljen er bygget som en lettvekts, server-first applikasjon med fokus på:

- Tydelig struktur og god arkitektur
- Komponentbasert oppbygging
- Minimal bruk av client-side JavaScript
- Et eget, enkelt design system basert på CSS-variabler

Jeg ønsket å lage noe som speiler hvordan jeg faktisk jobber:
👉 rolig, strukturert og med fokus på løsninger som fungerer i praksis

---

## 🧱 Teknologi

- **Next.js (App Router)**
- **TypeScript**
- **Tailwind CSS v4**
- **Server Actions (forms & backend-logikk)**
- **Resend (e-post via server)**

---

## 🧠 Arkitektur

Prosjektet er bygget med tydelig separasjon av ansvar

### Viktige prinsipper

- `page.tsx` er ren og fungerer kun som komposisjon
- Server Components som default
- Client Components kun der det faktisk trengs
- Data separert fra presentasjon

---

## 📬 Kontaktfunksjon

Kontaktskjemaet er implementert med:

- **Next.js Server Actions**
- Server-side e-postsending via **Resend**

Dette gir:

- Ingen client-side API-nøkler
- Ren og sikker flyt
- Bedre kontroll på backend-logikk

---

## 🎨 Design

Designet er basert på:

- Lyse, rolige farger
- Egendefinert fargepalett via `@theme` i Tailwind
- Fokus på lesbarhet og struktur fremfor visuelle effekter

---

## 🚀 Lokal utvikling

```bash
npm install
npm run dev
```

For kontaktskjemaet må lokal kjøring ha disse miljøvariablene i `.env.local`:

```bash
RESEND_API_KEY=...
CONTACT_TO_EMAIL=...
```

Produksjonsbuild skal fortsatt kunne kjøre uten disse verdiene, men selve e-postsendingen vil logge en serverfeil hvis de mangler.
