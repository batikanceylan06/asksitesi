import { normalizeSlug, isValidSlug } from './slug-util.js';
import { postJSON } from './api.js';
import { computeTotal, upgradeSuggestion } from './pricing.js';

const state = {
  plan: 'standard',
  templateId: 't1',
  addons: { music:false, lock:false, theme:false, photoPack:null, animations:false, video:false }
};
const q=(s)=>document.querySelector(s);

const TEMPLATE_SETS = {
  starter: [
    { id:'s1', name:'Starter (Sabit)', desc:'Tek şablon — sade' }
  ],
  standard: [
    { id:'t1', name:'Romantic Classic', desc:'Klasik romantik' },
    { id:'t2', name:'Minimal Love', desc:'Modern sade' },
    { id:'t3', name:'Memory Timeline', desc:'Timeline (standart)' }
  ],
  premium: [
    { id:'p1', name:'Royal Glow', desc:'Glass + glow + premium galeri' },
    { id:'p2', name:'Cinematic Story', desc:'Film vibe + chapter + video' },
    { id:'p3', name:'Infinity Timeline Deluxe', desc:'Deluxe timeline + sayaç' }
  ]
};

function renderTemplateOptions(){
  const plan = q('input[name="plan"]:checked')?.value || 'standard';
  const list = TEMPLATE_SETS[plan];
  const holder = q('#templateOptions');

  holder.innerHTML = list.map(t=>`
    <label class="radio">
      <input type="radio" name="template" value="${t.id}"/>
      <div style="flex:1">
        <div style="display:flex;justify-content:space-between;gap:12px">
          <b>${t.name}</b>
          <span class="kbd">${t.id}</span>
        </div>
        <div class="small muted" style="margin-top:4px">${t.desc}</div>
      </div>
    </label>
  `).join('');

  const first = holder.querySelector('input[name="template"]');
  if(first) first.checked = true;

  q('#tplNote').style.display = (plan === 'starter') ? 'block' : 'none';

  document.querySelectorAll('input[name="template"]').forEach(r=>r.addEventListener('change', recalc));
}

function enforceRules(){
  if(state.plan === 'premium'){
    state.addons.music = true;
    state.addons.lock = true;
    state.addons.theme = true;
    state.addons.animations = true;
    state.addons.video = true;
    state.addons.photoPack = null;

    const m=q('#ad_music'), l=q('#ad_lock');
    if(m){ m.checked=true; m.disabled=true; }
    if(l){ l.checked=true; l.disabled=true; }

    q('#addonsDynamic').innerHTML = `<div class="notice">Premium pakette müzik, kilit, tema, animasyon ve video <b>dahil</b>. Premium şablonlar (p1/p2/p3) kullanılır.</div>`;
  }else{
    const m=q('#ad_music'), l=q('#ad_lock');
    if(m){ m.disabled=false; }
    if(l){ l.disabled=false; }
  }

  if(state.plan === 'starter'){
    state.templateId = 's1';
  }
}

function readState(){
  state.plan = q('input[name="plan"]:checked')?.value || 'standard';
  state.templateId = q('input[name="template"]:checked')?.value || (state.plan==='starter'?'s1':'t1');

  state.addons.music = q('#ad_music')?.checked || false;
  state.addons.lock  = q('#ad_lock')?.checked || false;
  state.addons.theme = q('#ad_theme') ? q('#ad_theme').checked : false;

  state.addons.photoPack = null;
  if(q('#ad_to10')?.checked) state.addons.photoPack='to10';
  if(q('#ad_to25')?.checked) state.addons.photoPack='to25';

  state.addons.animations = q('#ad_anim')?.checked || false;
  state.addons.video = q('#ad_video')?.checked || false;

  enforceRules();
}

function renderAddonsByPlan(){
  const plan = q('input[name="plan"]:checked')?.value || 'standard';

  if(plan==='premium'){
    q('#addonsDynamic').innerHTML = `<div class="notice">Premium pakette müzik, kilit, tema, animasyon ve video <b>dahil</b>.</div>`;
    return;
  }

  let html='';
  if(plan==='starter'){
    html+=`
      <label class="check"><input id="ad_theme" type="checkbox"/><div><b>🎨 Tema paketi</b> <span class="muted">(149 TL)</span><div class="small muted">Renk/gradient seçenekleri açılır.</div></div></label>
      <label class="check"><input id="ad_to10" type="checkbox"/><div><b>📸 Fotoğraf paketi: 3 → 10</b> <span class="muted">(269 TL)</span><div class="small muted">Giriş paketini 10 foto seviyesine yükseltir.</div></div></label>`;
  }
  if(plan==='standard'){
    html+=`
      <label class="check"><input id="ad_to25" type="checkbox"/><div><b>📸 Fotoğraf paketi: 10 → 25</b> <span class="muted">(399 TL)</span><div class="small muted">Standart paketini Premium foto seviyesine yükseltir.</div></div></label>
      <label class="check"><input id="ad_video" type="checkbox"/><div><b>🎬 Video bloğu</b> <span class="muted">(299 TL)</span><div class="small muted">Sayfaya video alanı ekler.</div></div></label>
      <label class="check"><input id="ad_anim" type="checkbox"/><div><b>✨ Premium animasyon paketi</b> <span class="muted">(199 TL)</span><div class="small muted">Daha premium geçişler ve efektler.</div></div></label>`;
  }

  q('#addonsDynamic').innerHTML = html;
  document.querySelectorAll('input').forEach(el=>el.addEventListener('change',recalc));
}

function recalc(){
  readState();
  const total = computeTotal(state.plan, state.addons);
  q('#total').textContent = total + ' TL';

  const sug = upgradeSuggestion(state.plan, state.addons);
  const box = q('#suggestion');
  if(sug){
    box.style.display='block';
    box.querySelector('b').textContent = sug.to.toUpperCase() + ' paket daha mantıklı';
    box.querySelector('.small').textContent = sug.reason;
  }else{
    box.style.display='none';
  }
}

async function checkSlug(){
  const slug = normalizeSlug(q('#slug').value);
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

  const res = await postJSON('/api/checkout', {
    slug,
    plan: state.plan,
    templateId: state.templateId,
    addons: state.addons
  });
  if(res.builderUrl){ window.location.href = res.builderUrl; return; }
  alert('Canlı ödeme entegrasyonu bağlanınca checkoutUrl dönecek. OrderId: '+res.orderId);
}

document.addEventListener('DOMContentLoaded', ()=>{
  const sp = new URLSearchParams(window.location.search);
  const qp = sp.get('plan');
  if(qp && ['starter','standard','premium'].includes(qp)){
    const el = document.querySelector(`input[name="plan"][value="${qp}"]`);
    if(el) el.checked = true;
  }else{
    q('input[value="standard"][name="plan"]').checked=true;
  }

  renderTemplateOptions();
  renderAddonsByPlan();
  recalc();

  q('#btnSlug').addEventListener('click', checkSlug);
  q('#btnPay').addEventListener('click', checkout);

  document.querySelectorAll('input[name="plan"]').forEach(r=>r.addEventListener('change', ()=>{
    renderTemplateOptions();
    renderAddonsByPlan();
    recalc();
  }));

  q('#ad_music').addEventListener('change', recalc);
  q('#ad_lock').addEventListener('change', recalc);
});
