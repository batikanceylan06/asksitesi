# askimiz.com — Static HTML/CSS/JS + Vercel Functions + Vercel Postgres + Vercel Blob

Next.js yok. Statik sayfalar root'ta (`index.html`, `create.html`, `builder.html`, `slug.html`).
Dinamik işlemler `api/` altında Vercel Serverless Functions.

## Kurulum
1) Vercel'e import/deploy et
2) Storage > Postgres + Blob ekle (projeye bağla)
3) Postgres Query tabında `scripts/schema.sql` çalıştır
4) Local env:
   ```bash
   vercel env pull .env.development.local
   npm i
   npx vercel dev
   ```

## URL'ler
- / (landing)
- /create (paket+ek seçim)
- /builder/{slug}?token=... (içerik paneli)
- /{slug} (satılan sayfa)
- /demo/t1 /demo/t2 /demo/t3

## DEV ödeme
PAYMENT_MODE=dev iken /create üzerinden checkout yapınca sistem ödeme yapılmış sayar ve builder linki verir.
Canlı ödeme için `api/checkout.js` ve bir webhook dosyası ile sağlayıcı bağlanır.
