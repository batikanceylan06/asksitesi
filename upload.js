const { sql } = require('@vercel/postgres');
const { json, readBody, bcrypt } = require('./_util');

module.exports = async (req, res) => {
  if(req.method !== 'POST') return json(res, 405, { error:'Method not allowed' });

  const url = new URL(req.url, 'http://localhost');
  const slug = url.searchParams.get('slug') || '';

  const raw = await readBody(req);
  let body = {};
  try{ body = JSON.parse(raw || '{}'); }catch{}
  const pin = String(body.pin || '');

  if(!slug) return json(res, 400, { error:'Slug yok' });

  const { rows } = await sql`SELECT lock_pin_hash FROM sites WHERE slug=${slug} LIMIT 1;`;
  if(!rows[0]) return json(res, 404, { error:'Site yok' });

  const hash = rows[0].lock_pin_hash;
  if(!hash) return json(res, 200, { ok:true });

  const ok = await bcrypt.compare(pin, hash);
  if(!ok) return json(res, 401, { error:'PIN yanlış' });

  return json(res, 200, { ok:true });
};
