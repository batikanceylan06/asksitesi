const { sql } = require('@vercel/postgres');
const { json, sha256, computePhotoLimit } = require('./_util');

module.exports = async (req, res) => {
  if(req.method !== 'GET') return json(res, 405, { error:'Method not allowed' });

  const url = new URL(req.url, 'http://localhost');
  const slug = url.searchParams.get('slug') || '';
  const token = url.searchParams.get('token') || '';

  if(!slug) return json(res, 400, { error:'Slug yok' });

  const { rows } = await sql`
    SELECT slug, plan, template_id, addons, content, music_url, lock_pin_hash, status, created_at
    FROM sites WHERE slug=${slug} LIMIT 1;
  `;
  const site = rows[0];
  if(!site) return json(res, 404, { error:'Sayfa bulunamadı' });

  if(site.status !== 'published'){
    if(!token) return json(res, 404, { error:'Sayfa bulunamadı' });
    const { rows:trows } = await sql`SELECT token_hash, expires_at FROM builder_tokens WHERE site_slug=${slug} LIMIT 1;`;
    const t = trows[0];
    if(!t) return json(res, 404, { error:'Sayfa bulunamadı' });
    const ok = sha256(token) === t.token_hash && new Date(t.expires_at) > new Date();
    if(!ok) return json(res, 404, { error:'Sayfa bulunamadı' });
  }

  // effective addons
  let addonsOut = site.addons || {};
  if(site.plan === 'premium'){
    addonsOut = Object.assign({}, addonsOut, { music:true, lock:true, theme:true, animations:true, video:true, photoPack:null });
  }
  if(site.plan === 'standard'){
    addonsOut = Object.assign({}, addonsOut, { theme:true });
  }

  const { rows: arows } = await sql`
    SELECT url FROM assets WHERE site_slug=${slug} AND type='photo' ORDER BY created_at ASC;
  `;
  const photos = arows.map(r => r.url);

  const photoLimit = computePhotoLimit(site.plan, addonsOut || {});
  return json(res, 200, {
    slug: site.slug,
    plan: site.plan,
    templateId: site.template_id,
    addons: addonsOut || {},
    content: site.content || {},
    photoLimit,
    musicUrl: site.music_url || null,
    lockEnabled: !!site.lock_pin_hash,
    status: site.status,
    photos: photos.slice(0, photoLimit),
    createdAt: site.created_at
  });
};
