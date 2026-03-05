const { sql } = require('@vercel/postgres');
const { json, readBody, verifyBuilderToken, bcrypt } = require('./_util');

module.exports = async (req, res) => {
  if(req.method !== 'POST') return json(res, 405, { error:'Method not allowed' });

  const raw = await readBody(req);
  let body = {};
  try{ body = JSON.parse(raw || '{}'); }catch{}

  const slug = body.slug || '';
  const token = body.token || '';
  const content = body.content || {};
  const lockPin = body.lockPin || null;

  if(!slug || !token) return json(res, 401, { error:'Yetkisiz' });

  const ok = await verifyBuilderToken(slug, token);
  if(!ok) return json(res, 401, { error:'Token geçersiz' });

  const { rows } = await sql`SELECT slug FROM sites WHERE slug=${slug} LIMIT 1;`;
  if(!rows[0]) return json(res, 404, { error:'Site yok' });

  await sql`
    UPDATE sites SET content=${
      JSON.stringify({
        names1:String(content.names1||''),
        names2:String(content.names2||''),
        date:String(content.date||''),
        story:String(content.story||''),
        outro:String(content.outro||''),
        timeline: content.timeline || []
      })
    }::jsonb, updated_at=now()
    WHERE slug=${slug};
  `;

  if(lockPin && String(lockPin).trim().length >= 3){
    const hash = await bcrypt.hash(String(lockPin).trim(), 10);
    await sql`UPDATE sites SET lock_pin_hash=${hash}, updated_at=now() WHERE slug=${slug};`;
  }else{
    await sql`UPDATE sites SET lock_pin_hash=NULL, updated_at=now() WHERE slug=${slug};`;
  }

  return json(res, 200, { ok:true });
};
