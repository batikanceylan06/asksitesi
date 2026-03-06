import { pathSlug, qs } from './slug-util.js';
import { postJSON, getJSON } from './api.js';

const q=(s)=>document.querySelector(s);

async function uploadRaw(file,type,slug,token){
  const url=`/api/upload?slug=${encodeURIComponent(slug)}&token=${encodeURIComponent(token)}&type=${encodeURIComponent(type)}&filename=${encodeURIComponent(file.name)}`;
  const r=await fetch(url,{method:'PUT',headers:{'content-type':file.type||'application/octet-stream'},body:file});
  const j=await r.json().catch(()=> ({}));
  if(!r.ok) throw new Error(j.error||'Upload hatası');
  return j.url;
}

function renderRepeater(holder, items, schema, title){
  holder.innerHTML = `
    <div class="tcard" style="border-radius:18px">
      <div style="display:flex;justify-content:space-between;gap:10px;align-items:center">
        <b>${title}</b>
        <button class="btn" type="button" data-add>+ Ekle</button>
      </div>
      <div data-list style="margin-top:10px; display:grid; gap:10px"></div>
    </div>
  `;
  const list = holder.querySelector('[data-list]');
  const addBtn = holder.querySelector('[data-add]');

  function rowHtml(it, idx){
    const fields = schema.map(s=>{
      const v = it[s.k] || '';
      if(s.type === 'textarea'){
        return `<div><div class="small muted">${s.label}</div><textarea class="input" data-idx="${idx}" data-k="${s.k}">${v}</textarea></div>`;
      }
      return `<div><div class="small muted">${s.label}</div><input class="input" value="${v}" data-idx="${idx}" data-k="${s.k}" /></div>`;
    }).join('');
    return `
      <div class="tcard" style="border-radius:18px">
        <div style="display:flex;justify-content:space-between;gap:10px;align-items:center">
          <b>#${idx+1}</b>
          <button class="btn" type="button" data-del="${idx}">Sil</button>
        </div>
        <div style="margin-top:10px; display:grid; gap:10px">${fields}</div>
      </div>
    `;
  }

  function render(){
    list.innerHTML = items.map((it, idx)=>rowHtml(it, idx)).join('') || `<div class="muted small">Henüz ek yok.</div>`;
    list.querySelectorAll('button[data-del]').forEach(btn=>{
      btn.addEventListener('click', ()=>{
        const i = Number(btn.getAttribute('data-del'));
        items.splice(i,1);
        render();
      });
    });
    list.querySelectorAll('input[data-idx], textarea[data-idx]').forEach(el=>{
      el.addEventListener('input', ()=>{
        const i = Number(el.getAttribute('data-idx'));
        const k = el.getAttribute('data-k');
        items[i][k] = el.value;
      });
    });
  }

  addBtn.addEventListener('click', ()=>{
    const obj = {};
    schema.forEach(s=>obj[s.k]='');
    items.push(obj);
    render();
  });

  render();
}

async function main(){
  const slug=pathSlug();
  const token=qs('token')||'';
  if(!token){
    q('#root').innerHTML=`<div class="container"><div class="card"><div class="p"><div class="h2">Builder</div><div class="err" style="margin-top:8px">Token yok. Bu sayfa ödeme sonrası verilen link ile açılır.</div></div></div></div>`;
    return;
  }

  let site=null;
  try{ site=await getJSON(`/api/site?slug=${encodeURIComponent(slug)}&token=${encodeURIComponent(token)}`); }catch{}

  q('#slugText').textContent=slug;
  q('#previewLink').href=`/${slug}?token=${encodeURIComponent(token)}`;
  q('#previewLink').textContent=`Önizleme: /${slug}?token=...`;

  if(site?.content){
    q('#names1').value = site.content.names1 || q('#names1').value;
    q('#names2').value = site.content.names2 || q('#names2').value;
    q('#date').value   = site.content.date || q('#date').value;
    q('#story').value  = site.content.story || '';
    q('#outro').value  = site.content.outro || '';
  }

  const allowMusic = site ? (site.plan==='premium' || site.addons?.music===true) : true;
  const allowLock  = site ? (site.plan==='premium' || site.addons?.lock===true) : true;

  if(site?.photoLimit){
    const note=document.createElement('div');
    note.className='small muted';
    note.style.marginTop='6px';
    note.textContent=`Foto limitin: ${site.photoLimit}`;
    const photoBox=q('#photoBox');
    photoBox.insertBefore(note, photoBox.querySelector('input'));
  }

  if(!allowMusic){
    const box=q('#musicBox');
    box.style.opacity='0.6';
    box.innerHTML=`<div style="font-weight:800">🎵 Müzik Yükle</div><div class="small muted" style="margin-top:6px">Bu paket için müzik eklentisi alınmamış.</div>`;
  }
  if(!allowLock){
    const box=q('#lockBox');
    box.style.opacity='0.6';
    box.innerHTML=`<div style="font-weight:800">🔒 Kilit Ekranı</div><div class="small muted" style="margin-top:6px">Bu paket için kilit eklentisi alınmamış.</div>`;
  }

  // Advanced fields
  let highlights = (site?.content?.highlights || []).map(x=>({title:x.title||'', text:x.text||''}));
  let chapters   = (site?.content?.chapters || []).map(x=>({title:x.title||'', text:x.text||'', photoUrl:x.photoUrl||''}));
  let timeline   = (site?.content?.timeline || []).map(x=>({title:x.title||'', date:x.date||'', text:x.text||'', photoUrl:x.photoUrl||''}));
  let videoUrl   = site?.content?.videoUrl || '';

  const tpl = site?.templateId || '';
  const needsTimeline = (tpl==='p3' || tpl==='t3');
  const needsHighlights = (tpl==='p1');
  const needsChapters = (tpl==='p2');
  const needsVideo = (tpl==='p2') || (site?.plan==='premium') || (site?.addons?.video===true);

  const advBox = q('#advancedBox');
  const fields = q('#premiumFields');

  if(needsHighlights || needsChapters || needsTimeline || needsVideo){
    advBox.style.display='block';
    fields.innerHTML='';

    if(needsHighlights){
      const div=document.createElement('div');
      fields.appendChild(div);
      renderRepeater(div, highlights, [
        {k:'title', label:'Başlık', type:'text'},
        {k:'text', label:'Metin', type:'textarea'}
      ], 'Öne Çıkan Anlar (P1)');
    }

    if(needsChapters){
      const div=document.createElement('div');
      fields.appendChild(div);
      renderRepeater(div, chapters, [
        {k:'title', label:'Başlık', type:'text'},
        {k:'text', label:'Metin', type:'textarea'},
        {k:'photoUrl', label:'Foto URL (ops.)', type:'text'}
      ], 'Chapters (P2)');
    }

    if(needsVideo){
      const box=document.createElement('div');
      box.className='tcard';
      box.style.borderRadius='18px';
      box.innerHTML=`
        <b>🎬 Video URL</b>
        <div class="small muted" style="margin-top:6px">YouTube embed örn: https://www.youtube.com/embed/VIDEO_ID</div>
        <input id="videoUrl" class="input" value="${videoUrl}" placeholder="https://www.youtube.com/embed/..." style="margin-top:10px"/>
      `;
      fields.appendChild(box);
    }

    if(needsTimeline){
      const div=document.createElement('div');
      fields.appendChild(div);
      renderRepeater(div, timeline, [
        {k:'title', label:'Başlık', type:'text'},
        {k:'date', label:'Tarih (YYYY-MM-DD)', type:'text'},
        {k:'text', label:'Metin', type:'textarea'},
        {k:'photoUrl', label:'Foto URL (ops.)', type:'text'}
      ], 'Timeline');
    }
  }

  q('#saveBtn').addEventListener('click', async ()=>{
    try{
      const payload = {
        slug, token,
        content:{
          names1:q('#names1')?.value||'',
          names2:q('#names2')?.value||'',
          date:q('#date')?.value||'',
          story:q('#story')?.value||'',
          outro:q('#outro')?.value||'',
          highlights,
          chapters,
          videoUrl: q('#videoUrl') ? q('#videoUrl').value : (videoUrl||''),
          timeline
        },
        lockPin: allowLock ? (q('#lockpin')?.value||null) : null
      };
      await postJSON('/api/builder-save', payload);
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
    if(!allowMusic) return alert('Bu paket için müzik eklentisi yok.');
    try{
      await uploadRaw(f,'music',slug,token);
      q('#musicStatus').textContent='Müzik yüklendi ✅';
      q('#musicStatus').className='ok';
    }catch(err){ alert(err.message||'Müzik upload hata'); }
  });
}

document.addEventListener('DOMContentLoaded', main);
