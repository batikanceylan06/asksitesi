export function initReveal(){
  const els = Array.from(document.querySelectorAll('.reveal'));
  if(!els.length) return;
  const io = new IntersectionObserver((entries)=>{
    entries.forEach(e=>{
      if(e.isIntersecting){
        e.target.classList.add('is-visible');
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.12 });
  els.forEach(el=>io.observe(el));
}

export function initLightbox(){
  const items = Array.from(document.querySelectorAll('[data-lightbox="gallery"]'));
  if(!items.length) return;

  const urls = items.map(el => el.getAttribute('data-src') || el.getAttribute('src') || '');
  let idx = 0;
  let overlay = null;

  function close(){
    overlay?.remove();
    overlay = null;
    document.removeEventListener('keydown', onKey);
  }
  function show(i){
    idx = (i + urls.length) % urls.length;
    if(!overlay){
      overlay = document.createElement('div');
      overlay.className = 'lb-backdrop';
      overlay.innerHTML = `
        <div class="lb-modal">
          <div class="lb-top">
            <div class="lb-title">Premium Galeri</div>
            <div class="lb-actions">
              <button class="lb-btn" data-act="prev">◀</button>
              <button class="lb-btn" data-act="next">▶</button>
              <button class="lb-btn" data-act="close">✕</button>
            </div>
          </div>
          <div class="lb-img"><img alt="Foto"/></div>
        </div>
      `;
      overlay.addEventListener('click', (e)=>{ if(e.target === overlay) close(); });
      overlay.querySelector('[data-act="close"]').addEventListener('click', close);
      overlay.querySelector('[data-act="prev"]').addEventListener('click', ()=>show(idx-1));
      overlay.querySelector('[data-act="next"]').addEventListener('click', ()=>show(idx+1));

      let sx = 0, sy = 0;
      overlay.addEventListener('touchstart', (e)=>{ sx = e.touches[0].clientX; sy = e.touches[0].clientY; }, { passive:true });
      overlay.addEventListener('touchend', (e)=>{
        const ex = e.changedTouches[0].clientX;
        const ey = e.changedTouches[0].clientY;
        const dx = ex - sx, dy = ey - sy;
        if(Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(dy)){
          if(dx < 0) show(idx+1); else show(idx-1);
        }
      });

      document.body.appendChild(overlay);
      document.addEventListener('keydown', onKey);
    }
    overlay.querySelector('img').src = urls[idx];
  }

  function onKey(e){
    if(!overlay) return;
    if(e.key === 'Escape') close();
    if(e.key === 'ArrowRight') show(idx+1);
    if(e.key === 'ArrowLeft') show(idx-1);
  }

  items.forEach((el, i)=> el.addEventListener('click', ()=>show(i)));
}

export function initDaysCounter(isoDate){
  const el = document.getElementById('daysCounter');
  if(!el || !isoDate) return;
  const start = new Date(isoDate);
  if(Number.isNaN(start.getTime())) return;
  const now = new Date();
  const diff = Math.floor((now - start) / (1000*60*60*24));
  el.textContent = String(Math.max(diff, 0));
}

export function initPremiumEffects(site){
  initReveal();
  initLightbox();
  if(site?.content?.date) initDaysCounter(site.content.date);
}
