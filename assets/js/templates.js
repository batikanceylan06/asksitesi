function esc(s){return (s||'').replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]));}
function fmtDate(d){ if(!d) return ''; try{ return new Date(d).toLocaleDateString('tr-TR',{year:'numeric',month:'long',day:'numeric'});}catch{return d;} }
function galleryHTML(photos, lightbox=false){
  if(!photos?.length) return `<div class="tcard muted" style="text-align:center">Fotoğraf yükledikçe burada görünecek.</div>`;
  const attr = lightbox ? ' data-lightbox="gallery" ' : '';
  return `<div class="gallery">` + photos.map((u,i)=>`
    <div class="gimg reveal">
      <img ${attr} data-src="${esc(u)}" src="${esc(u)}" alt="Foto ${i+1}" />
    </div>`).join('') + `</div>`;
}

export function renderS1(site){
  const hero=site.photos?.[0]||'';
  const photos=(site.photos||[]).slice(0,site.photoLimit||3);
  return `
  <div class="template-wrap" style="background:#fff;color:#111">
    <div class="tbox" style="max-width:860px">
      <div class="card" style="border-radius:28px">
        <div class="p">
          <div class="small muted" style="letter-spacing:.18em;text-transform:uppercase">Starter</div>
          <div style="font-size:30px;font-weight:950;margin-top:8px">
            ${esc(site.content.names1||'İsim 1')} <span style="color:#111">❤</span> ${esc(site.content.names2||'İsim 2')}
          </div>
          <div class="muted" style="margin-top:6px">${site.content.date?fmtDate(site.content.date):'Tarih ekle'}</div>

          <div class="heroimg" style="aspect-ratio:16/9;margin-top:14px;border-radius:22px">
            ${hero?`<img src="${esc(hero)}" alt="Hero"/>`:`<div class="muted" style="padding:18px">Hero foto yükleyin</div>`}
          </div>

          <div style="margin-top:14px">
            <b>Hikaye</b>
            <div class="muted" style="margin-top:6px;white-space:pre-wrap;line-height:1.6">
              ${esc(site.content.story||'Buraya kısa hikayenizi yazın…')}
            </div>
          </div>

          <div style="margin-top:16px">
            <b>Galeri</b>
            <div style="margin-top:10px">${galleryHTML(photos,false)}</div>
          </div>

          <div class="small muted" style="text-align:center;margin-top:16px">
            💗 Siz de sevginiz için bir sayfa oluşturun — <b>askimiz.com</b>
          </div>
        </div>
      </div>
    </div>
  </div>`;
}

/* Standard templates */
export function renderT1(site){
  const hero=site.photos?.[0]||'';
  const photos=(site.photos||[]).slice(0,site.photoLimit||3);
  return `
  <div class="template-wrap" style="background:linear-gradient(to bottom,#fff1f2,#fff,#fff);">
    <div class="tbox">
      <div class="hero-card">
        <div class="row" style="align-items:flex-start;justify-content:space-between">
          <div>
            <div class="small muted" style="letter-spacing:.18em;text-transform:uppercase">Romantic Classic</div>
            <div style="font-size:30px;font-weight:900;margin-top:6px">
              ${esc(site.content.names1||'İsim 1')} <span style="color:#f43f5e">❤</span> ${esc(site.content.names2||'İsim 2')}
            </div>
            <div class="muted" style="margin-top:6px;font-size:14px">
              ${site.content.date?`Tanışma: ${fmtDate(site.content.date)}`:'Tarih ekle'}
            </div>
          </div>
          <div id="musicSlot"></div>
        </div>

        <div class="grid2" style="margin-top:16px">
          <div class="heroimg">
            ${hero?`<img src="${esc(hero)}" alt="Hero"/>`:`<div class="muted" style="padding:18px">Hero foto yükleyin</div>`}
          </div>
          <div class="tcard" style="border-radius:26px">
            <div style="font-weight:800">Bizim Hikayemiz</div>
            <div style="margin-top:8px;white-space:pre-wrap;line-height:1.6;font-size:14px">
              ${esc(site.content.story||'Buraya hikayenizi yazın…')}
            </div>
            ${site.content.outro?`<div style="margin-top:12px;padding:10px;border-radius:16px;background:#fff1f2;color:#9f1239">${esc(site.content.outro)}</div>`:''}
          </div>
        </div>

        <div style="margin-top:20px">
          <div style="font-weight:800;margin-bottom:10px">Galeri</div>
          ${galleryHTML(photos,false)}
          <div class="small muted" style="text-align:center;margin-top:16px">
            💗 Siz de sevginiz için bir sayfa oluşturun — <b>askimiz.com</b>
          </div>
        </div>
      </div>
    </div>
  </div>`;
}

export function renderT2(site){
  const hero=site.photos?.[0]||'';
  const photos=(site.photos||[]).slice(0,site.photoLimit||3);
  const strip=photos.map(u=>`
    <div style="width:176px;height:176px;border-radius:16px;overflow:hidden;background:#f2f2f2;flex:0 0 auto">
      <img src="${esc(u)}" alt="Foto" style="width:100%;height:100%;object-fit:cover"/>
    </div>`).join('');
  return `
  <div class="template-wrap" style="background:#fff">
    <div class="tbox" style="max-width:860px">
      <div class="row" style="align-items:flex-start;justify-content:space-between">
        <div>
          <div class="small muted">Minimal Love</div>
          <div style="font-size:42px;font-weight:950;letter-spacing:-.02em;margin-top:8px">
            ${esc(site.content.names1||'İsim 1')} <span style="color:#d4d4d8">×</span> ${esc(site.content.names2||'İsim 2')}
          </div>
          <div class="muted" style="margin-top:8px;font-size:14px">${site.content.date?fmtDate(site.content.date):'Tarih ekle'}</div>
        </div>
        <div id="musicSlot"></div>
      </div>

      <div class="heroimg" style="aspect-ratio:16/9;margin-top:18px;border-radius:28px">
        ${hero?`<img src="${esc(hero)}" alt="Hero"/>`:`<div class="muted" style="padding:18px">Hero foto yükleyin</div>`}
      </div>

      <div class="tcard" style="margin-top:16px;border-radius:28px">
        <div style="font-weight:800">Hikaye</div>
        <div style="margin-top:8px;white-space:pre-wrap;line-height:1.6;font-size:14px">
          ${esc(site.content.story||'Buraya hikayenizi yazın…')}
        </div>
      </div>

      <div style="margin-top:18px">
        <div style="font-weight:800;margin-bottom:10px">Fotoğraflar</div>
        <div style="display:flex;gap:10px;overflow:auto;padding-bottom:6px">
          ${strip || `<div class="tcard muted" style="width:100%;text-align:center">Fotoğraf yükledikçe burada görünecek.</div>`}
        </div>
        <div class="small muted" style="text-align:center;margin-top:16px">
          💗 Siz de sayfanızı oluşturun — <b>askimiz.com</b>
        </div>
      </div>
    </div>
  </div>`;
}

export function renderT3(site){
  const hero=site.photos?.[0]||'';
  const photos=(site.photos||[]).slice(0,site.photoLimit||3);
  const tl=(site.content.timeline||[]).slice(0,10);
  const timelineHTML=tl.length?`
    <div class="timeline">
      ${tl.map(item=>`
        <div class="tcard">
          <div style="display:flex;justify-content:space-between;gap:12px">
            <div style="font-weight:900">${esc(item.title||'Başlık')}</div>
            <div class="small muted">${item.date?fmtDate(item.date):''}</div>
          </div>
          ${item.text?`<div style="margin-top:8px;font-size:14px;line-height:1.6">${esc(item.text)}</div>`:''}
        </div>`).join('')}
    </div>`:`<div class="tcard muted" style="text-align:center">Timeline maddeleri ekledikçe burada görünecek.</div>`;

  return `
  <div class="template-wrap" style="background:linear-gradient(to bottom,#eef2ff,#fff,#fff)">
    <div class="tbox">
      <div class="hero-card">
        <div class="row" style="align-items:flex-start;justify-content:space-between">
          <div>
            <div class="small muted" style="letter-spacing:.18em;text-transform:uppercase">Memory Timeline</div>
            <div style="font-size:30px;font-weight:900;margin-top:6px">
              ${esc(site.content.names1||'İsim 1')} <span style="color:#6366f1">∞</span> ${esc(site.content.names2||'İsim 2')}
            </div>
            <div class="muted" style="margin-top:6px;font-size:14px">
              ${site.content.date?`Tanışma: ${fmtDate(site.content.date)}`:'Tarih ekle'}
            </div>
          </div>
          <div id="musicSlot"></div>
        </div>

        <div class="grid2" style="margin-top:16px">
          <div class="heroimg">
            ${hero?`<img src="${esc(hero)}" alt="Hero"/>`:`<div class="muted" style="padding:18px">Hero foto yükleyin</div>`}
          </div>
          <div class="tcard" style="border-radius:26px">
            <div style="font-weight:800">Kısa Not</div>
            <div style="margin-top:8px;white-space:pre-wrap;line-height:1.6;font-size:14px">
              ${esc(site.content.story||"Bu şablonda ağırlık timeline'da. Buraya kısa bir not yazabilirsin.")}
            </div>
          </div>
        </div>

        <div style="margin-top:20px">
          <div style="font-weight:900;margin-bottom:10px">Timeline</div>
          ${timelineHTML}
        </div>

        <div style="margin-top:20px">
          <div style="font-weight:900;margin-bottom:10px">Galeri</div>
          ${galleryHTML(photos,false)}
          <div class="small muted" style="text-align:center;margin-top:16px">
            💗 Siz de sevginiz için bir sayfa oluşturun — <b>askimiz.com</b>
          </div>
        </div>
      </div>
    </div>
  </div>`;
}

/* Premium templates */
export function renderP1(site){
  const hero=site.photos?.[0]||'';
  const photos=(site.photos||[]).slice(0,site.photoLimit||25);
  const highlights=(site.content.highlights||[]).slice(0,3);
  const hiHTML = highlights.length ? `
    <div class="grid" style="grid-template-columns:1fr;gap:10px">
      ${highlights.map(h=>`
        <div class="tcard reveal" style="border-radius:18px">
          <div style="font-weight:900">${esc(h.title||'Öne çıkan')}</div>
          ${h.text?`<div class="muted" style="margin-top:6px;line-height:1.6">${esc(h.text)}</div>`:''}
        </div>
      `).join('')}
    </div>` : `<div class="tcard muted reveal">Öne çıkan anlar ekleyebilirsin.</div>`;

  return `
  <div class="template-wrap plan-premium p1">
    <div class="tbox">
      <div class="hero-card">
        <div class="row" style="align-items:flex-start;justify-content:space-between">
          <div class="reveal">
            <div class="small muted" style="letter-spacing:.22em;text-transform:uppercase">Royal Glow</div>
            <div style="font-size:34px;font-weight:950;margin-top:8px">
              ${esc(site.content.names1||'İsim 1')} <span style="color:var(--premium-accent)">❤</span> ${esc(site.content.names2||'İsim 2')}
            </div>
            <div class="muted" style="margin-top:6px">${site.content.date?`Tanışma: ${fmtDate(site.content.date)}`:'Tarih ekle'}</div>
          </div>
          <div id="musicSlot" class="reveal"></div>
        </div>

        <div class="grid2" style="margin-top:16px">
          <div class="heroimg reveal" style="position:relative">
            ${hero?`<img src="${esc(hero)}" alt="Hero"/>`:`<div class="muted" style="padding:18px">Hero foto yükleyin</div>`}
          </div>
          <div class="tcard reveal" style="border-radius:26px">
            <div style="font-weight:900">Bizim Hikayemiz</div>
            <div class="muted" style="margin-top:8px;white-space:pre-wrap;line-height:1.7">
              ${esc(site.content.story||'Premium hikayenizi buraya yazın…')}
            </div>
            ${site.content.outro?`<div style="margin-top:12px;padding:10px;border-radius:16px;background:rgba(215,182,106,.12);border:1px solid rgba(215,182,106,.22)">${esc(site.content.outro)}</div>`:''}
          </div>
        </div>

        <div style="margin-top:18px">
          <div class="reveal" style="font-weight:900;margin-bottom:10px">Öne Çıkan Anlar</div>
          ${hiHTML}
        </div>

        <div style="margin-top:20px">
          <div class="reveal" style="font-weight:900;margin-bottom:10px">Premium Galeri</div>
          ${galleryHTML(photos,true)}
          <div class="small muted" style="text-align:center;margin-top:16px">
            💗 Siz de sevginiz için bir sayfa oluşturun — <b>askimiz.com</b>
          </div>
        </div>
      </div>
    </div>
  </div>`;
}

export function renderP2(site){
  const hero=site.photos?.[0]||'';
  const photos=(site.photos||[]).slice(0,site.photoLimit||25);
  const chapters=(site.content.chapters||[]).slice(0,6);
  const videoUrl = site.content.videoUrl || '';
  const chHTML = chapters.length ? chapters.map((c,idx)=>`
      <div class="tcard reveal" style="border-radius:22px;position:relative;overflow:hidden">
        <div class="small muted" style="letter-spacing:.2em;text-transform:uppercase">Chapter ${idx+1}</div>
        <div style="font-weight:950;font-size:18px;margin-top:6px">${esc(c.title||'Başlık')}</div>
        ${c.text?`<div class="muted" style="margin-top:8px;line-height:1.7">${esc(c.text)}</div>`:''}
        ${c.photoUrl?`<div class="heroimg" style="aspect-ratio:16/9;margin-top:12px;border-radius:18px"><img src="${esc(c.photoUrl)}" alt="Chapter"/></div>`:''}
      </div>
  `).join('') : `<div class="tcard muted reveal">Bölümler (chapter) ekleyebilirsin.</div>`;

  return `
  <div class="template-wrap plan-premium p2">
    <div class="tbox" style="max-width:980px">
      <div class="hero-card film-grain" style="position:relative;overflow:hidden">
        <div class="row" style="align-items:flex-start;justify-content:space-between">
          <div class="reveal">
            <div class="small muted" style="letter-spacing:.22em;text-transform:uppercase">Cinematic Story</div>
            <div style="font-size:40px;font-weight:980;margin-top:10px">
              ${esc(site.content.names1||'İsim 1')} <span style="color:var(--premium-accent)">×</span> ${esc(site.content.names2||'İsim 2')}
            </div>
            <div class="muted" style="margin-top:6px">${site.content.date?fmtDate(site.content.date):'Tarih ekle'}</div>
          </div>
          <div id="musicSlot" class="reveal"></div>
        </div>

        <div class="heroimg reveal" style="aspect-ratio:21/9;margin-top:16px;border-radius:26px">
          ${hero?`<img src="${esc(hero)}" alt="Hero"/>`:`<div class="muted" style="padding:18px">Hero foto yükleyin</div>`}
        </div>

        <div style="margin-top:16px" class="grid">
          ${chHTML}
        </div>

        <div style="margin-top:18px">
          <div class="reveal" style="font-weight:950;margin-bottom:10px">Video</div>
          ${videoUrl ? `
            <div class="heroimg reveal" style="aspect-ratio:16/9;border-radius:22px;background:#000">
              <iframe src="${esc(videoUrl)}" style="width:100%;height:100%;border:0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
            </div>
          ` : `<div class="tcard muted reveal">Video eklemek için builder’da Video URL alanını doldur.</div>`}
        </div>

        <div style="margin-top:20px">
          <div class="reveal" style="font-weight:950;margin-bottom:10px">Galeri</div>
          ${galleryHTML(photos,true)}
        </div>

        <div class="small muted" style="text-align:center;margin-top:16px">
          💗 Siz de sevginiz için bir sayfa oluşturun — <b>askimiz.com</b>
        </div>
      </div>
    </div>
  </div>`;
}

export function renderP3(site){
  const hero=site.photos?.[0]||'';
  const photos=(site.photos||[]).slice(0,site.photoLimit||25);
  const tl=(site.content.timeline||[]).slice(0,12);

  const timelineHTML = tl.length ? `
    <div class="tline">
      ${tl.map(item=>`
        <div class="tcard reveal" style="margin-bottom:10px;border-radius:22px">
          <div style="display:grid;grid-template-columns:12px 1fr;gap:10px;align-items:start">
            <div class="tdot"></div>
            <div>
              <div style="display:flex;justify-content:space-between;gap:12px">
                <div style="font-weight:950">${esc(item.title||'Başlık')}</div>
                <div class="small muted">${item.date?fmtDate(item.date):''}</div>
              </div>
              ${item.text?`<div class="muted" style="margin-top:8px;line-height:1.7">${esc(item.text)}</div>`:''}
              ${item.photoUrl?`<div class="heroimg" style="aspect-ratio:16/9;margin-top:12px;border-radius:18px"><img src="${esc(item.photoUrl)}" alt="Timeline"/></div>`:''}
            </div>
          </div>
        </div>
      `).join('')}
    </div>
  ` : `<div class="tcard muted reveal">Timeline maddeleri ekleyebilirsin.</div>`;

  return `
  <div class="template-wrap plan-premium p3">
    <div class="tbox">
      <div class="hero-card">
        <div class="row" style="align-items:flex-start;justify-content:space-between">
          <div class="reveal">
            <div class="small muted" style="letter-spacing:.22em;text-transform:uppercase">Infinity Timeline Deluxe</div>
            <div style="font-size:34px;font-weight:980;margin-top:8px">
              ${esc(site.content.names1||'İsim 1')} <span style="color:var(--premium-accent2)">∞</span> ${esc(site.content.names2||'İsim 2')}
            </div>
            <div class="muted" style="margin-top:6px">${site.content.date?`Tanışma: ${fmtDate(site.content.date)}`:'Tarih ekle'}</div>
          </div>
          <div id="musicSlot" class="reveal"></div>
        </div>

        <div class="grid2" style="margin-top:16px">
          <div class="heroimg reveal">
            ${hero?`<img src="${esc(hero)}" alt="Hero"/>`:`<div class="muted" style="padding:18px">Hero foto yükleyin</div>`}
          </div>
          <div class="tcard reveal" style="border-radius:26px">
            <div style="font-weight:950">Birlikte Geçen Süre</div>
<div class="counter-grid reveal">
  <div class="counter-card"><div id="daysCounter" class="n">0</div><div class="l">Gün</div></div>
  <div class="counter-card"><div id="hoursCounter" class="n">00</div><div class="l">Saat</div></div>
  <div class="counter-card"><div id="minutesCounter" class="n">00</div><div class="l">Dakika</div></div>
  <div class="counter-card"><div id="secondsCounter" class="n">00</div><div class="l">Saniye</div></div>
</div>
<div class="muted" style="margin-top:10px;line-height:1.7">
              ${esc(site.content.story||'Kısa bir not ekleyebilirsin.')}
            </div>
          </div>
        </div>

        <div style="margin-top:18px">
          <div class="reveal" style="font-weight:980;margin-bottom:10px">Timeline</div>
          ${timelineHTML}
        </div>

        <div style="margin-top:20px">
          <div class="reveal" style="font-weight:980;margin-bottom:10px">Galeri</div>
          ${galleryHTML(photos,true)}
        </div>

        <div class="small muted" style="text-align:center;margin-top:16px">
          💗 Siz de sevginiz için bir sayfa oluşturun — <b>askimiz.com</b>
        </div>
      </div>
    </div>
  </div>`;
}

export function renderTemplate(templateId,site){
  if(templateId==='s1') return renderS1(site);

  if(templateId==='t2') return renderT2(site);
  if(templateId==='t3') return renderT3(site);
  if(templateId==='t1') return renderT1(site);

  if(templateId==='p1') return renderP1(site);
  if(templateId==='p2') return renderP2(site);
  if(templateId==='p3') return renderP3(site);

  if(site?.plan==='premium') return renderP1(site);
  if(site?.plan==='starter') return renderS1(site);
  return renderT1(site);
}
