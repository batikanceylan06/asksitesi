const { sql } = require('@vercel/postgres');
const { json, readBody, verifyBuilderToken } = require('./_util');

module.exports = async (req, res) => {
  if(req.method !== 'POST') return json(res, 405, { error:'Method not allowed' });

  const raw = await readBody(req);
  let body = {};
  try{ body = JSON.parse(raw || '{}'); }catch{}

  const slug = body.slug || '';
  const token = body.token || '';
  if(!slug || !token) return json(res, 401, { error:'Yetkisiz' });

  const ok = await verifyBuilderToken(slug, token);
  if(!ok) return json(res, 401, { error:'Token geçersiz' });

  await sql`UPDATE sites SET status='published', updated_at=now() WHERE slug=${slug};`;
  return json(res, 200, { ok:true });
};
