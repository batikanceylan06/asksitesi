const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const { sql } = require('@vercel/postgres');

const TR_MAP = { 'ş':'s','Ş':'s','ı':'i','I':'i','İ':'i','ğ':'g','Ğ':'g','ü':'u','Ü':'u','ö':'o','Ö':'o','ç':'c','Ç':'c' };

function normalizeSlug(raw){
  const trimmed = (raw || '').trim();
  const tr = [...trimmed].map(ch => TR_MAP[ch] || ch).join('');
  let s = tr.toLowerCase().replace(/[^a-z0-9.-]+/g,'-');
  s = s.replace(/-+/g,'-').replace(/^\-+|\-+$/g,'');
  s = s.replace(/\.+/g,'.').replace(/^\.+|\.+$/g,'');
  return s.slice(0,48);
}
function isValidSlug(slug){
  return /^[a-z0-9]+([.-][a-z0-9]+)*$/.test(slug) && slug.length>=3 && slug.length<=48;
}
function json(res, code, obj){
  res.statusCode = code;
  res.setHeader('content-type','application/json; charset=utf-8');
  res.end(JSON.stringify(obj));
}
function readBody(req){
  return new Promise((resolve, reject) => {
    let data = '';
    req.on('data', chunk => data += chunk);
    req.on('end', () => resolve(data));
    req.on('error', reject);
  });
}
function readBuffer(req){
  return new Promise((resolve, reject) => {
    const chunks = [];
    req.on('data', c => chunks.push(c));
    req.on('end', () => resolve(Buffer.concat(chunks)));
    req.on('error', reject);
  });
}
function sha256(s){ return crypto.createHash('sha256').update(s).digest('hex'); }
function randomToken(bytes=24){ return crypto.randomBytes(bytes).toString('hex'); }

async function getBuilderToken(slug){
  const { rows } = await sql`SELECT token_hash, expires_at FROM builder_tokens WHERE site_slug=${slug} LIMIT 1;`;
  return rows[0] || null;
}
async function verifyBuilderToken(slug, token){
  const t = await getBuilderToken(slug);
  if(!t) return false;
  return sha256(token) === t.token_hash && new Date(t.expires_at) > new Date();
}

const PLAN_PRICE = { starter:999, standard:1499, premium:1999 };
const PLAN_PHOTO_LIMIT = { starter:3, standard:10, premium:25 };
const ADDON_PRICE = { music:99, lock:49, theme:149, photoPack_to10:269, photoPack_to25:399, animations:199, video:299 };

function computeTotal(plan, addons){
  if(plan === 'premium') return PLAN_PRICE.premium; // all included
  let total = PLAN_PRICE[plan] || 0;
  if(addons.music) total += ADDON_PRICE.music;
  if(addons.lock) total += ADDON_PRICE.lock;
  if(plan==='starter' && addons.theme) total += ADDON_PRICE.theme;
  if(addons.photoPack==='to10') total += ADDON_PRICE.photoPack_to10;
  if(addons.photoPack==='to25') total += ADDON_PRICE.photoPack_to25;
  if(addons.animations) total += ADDON_PRICE.animations;
  if(plan!=='premium' && addons.video) total += ADDON_PRICE.video;
  return total;
}
function computePhotoLimit(plan, addons){
  if(plan==='starter' && addons.photoPack==='to10') return 10;
  if(plan==='standard' && addons.photoPack==='to25') return 25;
  return PLAN_PHOTO_LIMIT[plan] || 3;
}

module.exports = {
  bcrypt, sql,
  normalizeSlug, isValidSlug,
  json, readBody, readBuffer,
  sha256, randomToken,
  verifyBuilderToken,
  computeTotal, computePhotoLimit
};
