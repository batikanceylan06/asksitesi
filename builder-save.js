const { sql } = require('@vercel/postgres');
const { normalizeSlug, isValidSlug, json, readBody, randomToken, sha256, computeTotal, computePhotoLimit } = require('./_util');

const SETS = {
  starter: new Set(['s1']),
  standard: new Set(['t1','t2','t3']),
  premium: new Set(['p1','p2','p3']),
};

module.exports = async (req, res) => {
  if(req.method !== 'POST') return json(res, 405, { error:'Method not allowed' });

  const raw = await readBody(req);
  let body = {};
  try{ body = JSON.parse(raw || '{}'); }catch{}

  const slug = normalizeSlug(body.slug || '');
  const plan = body.plan;
  const templateId = body.templateId;
  const addons = body.addons || {};

  if(!isValidSlug(slug)) return json(res, 400, { error:'Slug geçersiz' });
  if(!['starter','standard','premium'].includes(plan)) return json(res, 400, { error:'Plan geçersiz' });

  let tpl = templateId;

  if(plan === 'starter'){
    tpl = 's1';
  } else {
    if(!SETS[plan].has(tpl)){
      tpl = (plan === 'premium') ? 'p1' : 't1';
    }
  }

  let addonsFixed = addons;
  if(plan === 'premium'){
    addonsFixed = Object.assign({}, addons, { music:true, lock:true, theme:true, animations:true, video:true, photoPack:null });
  }

  const total = computeTotal(plan, addonsFixed);
  const photoLimit = computePhotoLimit(plan, addonsFixed);

  await sql`
    INSERT INTO sites (slug, plan, template_id, addons, content, photo_limit, status)
    VALUES (
      ${slug}, ${plan}, ${tpl},
      ${JSON.stringify(addonsFixed)}::jsonb,
      ${JSON.stringify({
        names1:'İsim 1',
        names2:'İsim 2',
        date:'',
        story:'',
        outro:'',
        highlights:[],
        chapters:[],
        videoUrl:'',
        timeline:[]
      })}::jsonb,
      ${photoLimit},
      'draft'
    )
    ON CONFLICT (slug) DO UPDATE SET
      plan=EXCLUDED.plan,
      template_id=EXCLUDED.template_id,
      addons=EXCLUDED.addons,
      photo_limit=EXCLUDED.photo_limit,
      updated_at=now();
  `;

  const { rows } = await sql`
    INSERT INTO orders (site_slug, plan, template_id, addons, total_price, payment_status)
    VALUES (${slug}, ${plan}, ${tpl}, ${JSON.stringify(addonsFixed)}::jsonb, ${total}, 'pending')
    RETURNING id;
  `;
  const orderId = rows[0].id;

  const mode = process.env.PAYMENT_MODE || 'dev';
  const appUrl = process.env.APP_URL || 'http://localhost:3000';

  if(mode === 'dev'){
    const token = randomToken(24);
    const tokenHash = sha256(token);
    const expiresAt = new Date(Date.now() + 1000*60*60*48);

    await sql`
      INSERT INTO builder_tokens (site_slug, token_hash, expires_at)
      VALUES (${slug}, ${tokenHash}, ${expiresAt.toISOString()})
      ON CONFLICT (site_slug) DO UPDATE SET token_hash=EXCLUDED.token_hash, expires_at=EXCLUDED.expires_at, updated_at=now();
    `;

    return json(res, 200, { orderId, builderUrl: `${appUrl}/builder/${encodeURIComponent(slug)}?token=${encodeURIComponent(token)}` });
  }

  return json(res, 200, { orderId, message:'Canlı ödeme entegrasyonu bağlanınca checkoutUrl döndür.' });
};
