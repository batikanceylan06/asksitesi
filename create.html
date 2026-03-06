const { put } = require('@vercel/blob');
const { sql } = require('@vercel/postgres');
const { json, readBuffer, verifyBuilderToken, computePhotoLimit } = require('./_util');

module.exports = async (req, res) => {
  if(req.method !== 'PUT') return json(res, 405, { error:'Method not allowed' });

  const url = new URL(req.url, 'http://localhost');
  const slug = url.searchParams.get('slug') || '';
  const token = url.searchParams.get('token') || '';
  const type = url.searchParams.get('type') || '';
  const filename = url.searchParams.get('filename') || 'file.bin';

  if(!slug || !token) return json(res, 401, { error:'Yetkisiz' });
  if(!['photo','music'].includes(type)) return json(res, 400, { error:'Type geçersiz' });

  const ok = await verifyBuilderToken(slug, token);
  if(!ok) return json(res, 401, { error:'Token geçersiz' });

  const { rows:srows } = await sql`SELECT plan, addons FROM sites WHERE slug=${slug} LIMIT 1;`;
  const site = srows[0];
  if(!site) return json(res, 404, { error:'Site yok' });

  const allowMusic = (site.plan === 'premium') || ((site.addons||{}).music === true);
  if(type === 'music' && !allowMusic) return json(res, 400, { error:'Müzik eklentisi yok.' });

  if(type === 'photo'){
    const limit = computePhotoLimit(site.plan, site.addons || {});
    const { rows:crows } = await sql`SELECT COUNT(*)::int AS c FROM assets WHERE site_slug=${slug} AND type='photo';`;
    const count = crows[0]?.c || 0;
    if(count >= limit) return json(res, 400, { error:`Foto limitine ulaştın (${limit}).` });
  }

  const buf = await readBuffer(req);
  if(!buf || !buf.length) return json(res, 400, { error:'Dosya yok' });

  const ext = (filename.split('.').pop() || 'bin').toLowerCase();
  const pathname = `${slug}/${type}/${Date.now()}-${Math.random().toString(16).slice(2)}.${ext}`;

  const blob = await put(pathname, buf, { access:'public', addRandomSuffix:false });

  await sql`INSERT INTO assets (site_slug, type, url) VALUES (${slug}, ${type}, ${blob.url});`;
  if(type === 'music') await sql`UPDATE sites SET music_url=${blob.url}, updated_at=now() WHERE slug=${slug};`;

  return json(res, 200, { url: blob.url, pathname: blob.pathname });
};
