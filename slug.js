export async function postJSON(url, data){
  const r = await fetch(url, { method:'POST', headers:{'content-type':'application/json'}, body: JSON.stringify(data||{}) });
  const j = await r.json().catch(()=> ({}));
  if(!r.ok) throw new Error(j.error || 'İstek hatası');
  return j;
}
export async function getJSON(url){
  const r = await fetch(url);
  const j = await r.json().catch(()=> ({}));
  if(!r.ok) throw new Error(j.error || 'İstek hatası');
  return j;
}
