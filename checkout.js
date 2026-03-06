const { sql } = require('@vercel/postgres');
const { normalizeSlug, isValidSlug, json, readBody } = require('./_util');

module.exports = async (req, res) => {
  if(req.method !== 'POST') return json(res, 405, { error:'Method not allowed' });

  const raw = await readBody(req);
  let body = {};
  try{ body = JSON.parse(raw || '{}'); }catch{}
  const slug = normalizeSlug(body.slug || '');
  if(!isValidSlug(slug)) return json(res, 400, { error:'Slug geçersiz', available:false });

  const { rows } = await sql`SELECT slug FROM sites WHERE slug=${slug} LIMIT 1;`;
  if(rows.length === 0) return json(res, 200, { available:true });

  let suggestion = '';
  for(let i=1;i<=9;i++){
    const s = `${slug}${i}`;
    const { rows:r2 } = await sql`SELECT slug FROM sites WHERE slug=${s} LIMIT 1;`;
    if(r2.length===0){ suggestion=s; break; }
  }
  return json(res, 200, { available:false, suggestion });
};
