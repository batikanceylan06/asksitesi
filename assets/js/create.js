import { normalizeSlug, isValidSlug } from './slug-util.js';
import { postJSON } from './api.js';
import { computeTotal, upgradeSuggestion } from './pricing.js';

const state={ plan:'standard', templateId:'t1', addons:{music:false,lock:false,theme:false,photoPack:null,animations:false,video:false} };
const q=(s)=>document.querySelector(s);

function readState(){
  state.plan=q('input[name="plan"]:checked')?.value||'standard';
  state.templateId=q('input[name="template"]:checked')?.value||'t1';
  state.addons.music=q('#ad_music').checked;
  state.addons.lock=q('#ad_lock').checked;
  state.addons.theme=q('#ad_theme')?q('#ad_theme').checked:false;

  state.addons.photoPack=null;
  if(q('#ad_to10')?.checked) state.addons.photoPack='to10';
  if(q('#ad_to25')?.checked) state.addons.photoPack='to25';

  state.addons.animations=q('#ad_anim')?.checked||false;
  state.addons.video=q('#ad_video')?.checked||false;
}

function renderAddonsByPlan(){
  const plan=q('input[name="plan"]:checked')?.value||'standard';
  const holder=q('#addonsDynamic');
  let html='';
  if(plan==='starter'){
    html+=`
      <label class="check"><input id="ad_theme" type="checkbox"/><div><b>🎨 Tema paketi</b> <span class="muted">(149 TL)</span><div class="small muted">Renk/gradient seçenekleri açılır.</div></div></label>
      <label class="check"><input id="ad_to10" type="checkbox"/><div><b>📸 Fotoğraf paketi: 3 → 10</b> <span class="muted">(269 TL)</span><div class="small muted">Giriş paketini 10 foto seviyesine yükseltir.</div></div></label>`;
  }
  if(plan==='standard'){
    html+=`
      <label class="check"><input id="ad_to25" type="checkbox"/><div><b>📸 Fotoğraf paketi: 10 → 25</b> <span class="muted">(399 TL)</span><div class="small muted">Standart paketini Premium foto seviyesine yükseltir.</div></div></label>
      <label class="check"><input id="ad_video" type="checkbox"/><div><b>🎬 Video bloğu</b> <span class="muted">(299 TL)</span><div class="small muted">Sayfaya video alanı ekler.</div></div></label>`;
  }
  if(plan!=='premium'){
    html+=`
      <label class="check"><input id="ad_anim" type="checkbox"/><div><b>✨ Premium animasyon paketi</b> <span class="muted">(199 TL)</span><div class="small muted">Daha premium geçişler ve efektler.</div></div></label>`;
  }else{
    html+=`<div class="notice">Premium pakette animasyon/video/timeline zaten en dolu.</div>`;
  }
  holder.innerHTML=html;

  // bind all inputs to recalc
  document.querySelectorAll('input').forEach(el=>el.addEventListener('change',recalc));
}

function recalc(){
  readState();
  const total=computeTotal(state.plan,state.addons);
  q('#total').textContent=total+' TL';
  const sug=upgradeSuggestion(state.plan,state.addons);
  const box=q('#suggestion');
  if(sug){
    box.style.display='block';
    box.querySelector('b').textContent=sug.to.toUpperCase()+' paket daha mantıklı';
    box.querySelector('.small').textContent=sug.reason;
  }else box.style.display='none';
}

async function checkSlug(){
  const raw=q('#slug').value;
  const slug=normalizeSlug(raw);
  q('#slugPreview').textContent='askimiz.com/'+(slug||'...');
  if(!isValidSlug(slug)){
    q('#slugMsg').innerHTML='<span class="err">Slug geçersiz. Örn: batikan.sezin</span>';
    return;
  }
  const res=await postJSON('/api/slug-check',{slug});
  q('#slugMsg').innerHTML = res.available ? '<span class="ok">Bu URL boşta ✅</span>' : `<span class="err">Bu URL dolu ❌ Öneri: <span class="kbd">${res.suggestion||''}</span></span>`;
}

async function checkout(){
  readState();
  const slug=normalizeSlug(q('#slug').value);
  if(!isValidSlug(slug)) return alert('Slug geçersiz. Örn: batikan.sezin');
  const res=await postJSON('/api/checkout',{slug,plan:state.plan,templateId:state.templateId,addons:state.addons});
  if(res.builderUrl){ window.location.href=res.builderUrl; return; }
  alert('Canlı ödeme entegrasyonu bağlanınca checkoutUrl dönecek. OrderId: '+res.orderId);
}

document.addEventListener('DOMContentLoaded', ()=>{
  q('input[value="standard"][name="plan"]').checked=true;
  q('input[value="t1"][name="template"]').checked=true;
  renderAddonsByPlan();
  recalc();
  q('#btnSlug').addEventListener('click', checkSlug);
  q('#btnPay').addEventListener('click', checkout);
  document.querySelectorAll('input[name="plan"]').forEach(r=>r.addEventListener('change',()=>{renderAddonsByPlan();recalc();}));
});
