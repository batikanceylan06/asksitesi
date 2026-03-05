function esc(s){return (s||'').replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]));}
function fmtDate(d){ if(!d) return ''; try{ return new Date(d).toLocaleDateString('tr-TR',{year:'numeric',month:'long',day:'numeric'});}catch{return d;} }
function galleryHTML(photos){
  if(!photos?.length) return `<div class="tcard muted" style="text-align:center">Fotoğraf yükledikçe burada görünecek.</div>`;
  return `<div class="gallery">` + photos.map(u=>`<div class="gimg"><img src="${esc(u)}" alt="Foto"/></div>`).join('') + `</div>`;
}

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
          ${galleryHTML(photos)}
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
          ${item.photoUrl?`<div class="heroimg" style="aspect-ratio:16/9;margin-top:10px;border-radius:18px"><img src="${esc(item.photoUrl)}" alt="Timeline"/></div>`:''}
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
          ${galleryHTML(photos)}
          <div class="small muted" style="text-align:center;margin-top:16px">
            💗 Siz de sevginiz için bir sayfa oluşturun — <b>askimiz.com</b>
          </div>
        </div>
      </div>
    </div>
  </div>`;
}

export function renderTemplate(templateId,site){
  if(templateId==='t2') return renderT2(site);
  if(templateId==='t3') return renderT3(site);
  return renderT1(site);
}
