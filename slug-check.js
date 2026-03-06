# askimiz.com — Static HTML/CSS/JS + Vercel Functions + Vercel Postgres + Vercel Blob

- Next.js yok.
- Statik sayfalar root’ta.
- Dinamik işler `api/` (Vercel Functions).

## Kurulum
1) Vercel’e deploy et
2) Storage > Postgres + Blob ekle
3) Postgres Query: `scripts/schema.sql`
4) Local:
   ```bash
   vercel env pull .env.development.local
   npm i
   npx vercel dev
   ```

## Kurallar (v2)
- Starter (999): şablon seçimi yok (t1 sabit).
- Premium (1999): müzik + kilit + tema + animasyon + video dahil (ek ücret yok).

## Test
- /create → “Ödemeye Geç (DEV)” → builder linki açılır.
- Builder’da foto/müzik yükle, kaydet, yayınla.
- /{slug} açılır.
