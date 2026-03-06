const map = { "ş":"s","Ş":"s","ı":"i","I":"i","İ":"i","ğ":"g","Ğ":"g","ü":"u","Ü":"u","ö":"o","Ö":"o","ç":"c","Ç":"c" };
export function normalizeSlug(raw){
  const trimmed=(raw||'').trim();
  const tr=[...trimmed].map(ch=>map[ch]??ch).join('');
  let s=tr.toLowerCase().replace(/[^a-z0-9.-]+/g,'-');
  s=s.replace(/-+/g,'-').replace(/^\-+|\-+$/g,'');
  s=s.replace(/\.+/g,'.').replace(/^\.+|\.+$/g,'');
  return s.slice(0,48);
}
export function isValidSlug(slug){
  return /^[a-z0-9]+([.-][a-z0-9]+)*$/.test(slug) && slug.length>=3 && slug.length<=48;
}
export function pathSlug(){
  const p=window.location.pathname.replace(/^\/+|\/+$/g,'');
  const parts=p.split('/');
  if(parts[0]==='builder') return parts[1]||'';
  return parts[0]||'';
}
export function qs(name){ return new URLSearchParams(window.location.search).get(name); }
