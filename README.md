# Mente Sintética — Landing Page

Next.js 15 (App Router) · Tailwind CSS 4 · Framer Motion · Lucide React

## Rodar localmente
```bash
npm install
npm run dev   # http://localhost:3000
```

## Publicar em mentesintetica.com.br (Vercel)
1. Suba esta pasta para um repositório no GitHub.
2. Em vercel.com → New Project → importe o repositório (detecta Next.js sozinho).
3. Em Settings → Domains, adicione `mentesintetica.com.br` e siga as instruções de DNS.

## Onde editar
- WhatsApp, Instagram e domínio: `lib/site.ts`
- Foto do fundador: `public/fundador.png`
- Título/OpenGraph: `app/layout.tsx` e `app/opengraph-image.tsx`
- Seções: `components/`
