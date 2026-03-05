import { pathSlug, qs } from './slug-util.js';
import { postJSON } from './api.js';

const q=(s)=>document.querySelector(s);

async function uploadRaw(file,type,slug,token){
  const url=`/api/upload?slug=${encodeURIComponent(slug)}&token=${encodeURIComponent(token)}&type=${encodeURIComponent(type)}&filename=${encodeURIComponent(file.name)}`;
  const r=await fetch(url,{method:'PUT',headers:{'content-type':file.type||'application/octet-stream'},body:file});
  const j=await r.json().catch(()=> ({}));
  if(!r.ok) throw new Error(j.error||'Upload hatası');
  return j.url;
}

async function main(){
  const slug=pathSlug();
  const token=qs('token')||'';
  if(!token){
    q('#root').innerHTML=`<div class="container"><div class="card"><div class="p"><div class="h2">Builder</div><div class="err" style="margin-top:8px">Token yok. Bu sayfa ödeme sonrası verilen link ile açılır.</div></div></div></div>`;
    return;
  }

  q('#slugText').textContent=slug;
  q('#previewLink').href=`/${slug}?token=${encodeURIComponent(token)}`;
  q('#previewLink').textContent=`Önizleme: /${slug}?token=...`;

  q('#saveBtn').addEventListener('click', async ()=>{
    try{
      await postJSON('/api/builder-save',{
        slug, token,
        content:{
          names1:q('#names1').value,
          names2:q('#names2').value,
          date:q('#date').value,
          story:q('#story').value,
          outro:q('#outro').value
        },
        lockPin:q('#lockpin').value||null
      });
      alert('Kaydedildi ✅');
    }catch(e){ alert(e.message||'Kaydetme hatası'); }
  });

  q('#publishBtn').addEventListener('click', async ()=>{
    try{
      await postJSON('/api/builder-publish',{slug,token});
      alert('Yayınlandı ✅');
      window.location.href=`/${slug}`;
    }catch(e){ alert(e.message||'Yayınlama hatası'); }
  });

  q('#photoInput').addEventListener('change', async (e)=>{
    const f=e.target.files?.[0]; e.target.value='';
    if(!f) return;
    try{
      const url=await uploadRaw(f,'photo',slug,token);
      const img=document.createElement('img'); img.src=url;
      q('#photoGrid').appendChild(img);
    }catch(err){ alert(err.message||'Foto upload hata'); }
  });

  q('#musicInput').addEventListener('change', async (e)=>{
    const f=e.target.files?.[0]; e.target.value='';
    if(!f) return;
    try{
      await uploadRaw(f,'music',slug,token);
      q('#musicStatus').textContent='Müzik yüklendi ✅';
      q('#musicStatus').className='ok';
    }catch(err){ alert(err.message||'Müzik upload hata'); }
  });
}

document.addEventListener('DOMContentLoaded', main);
