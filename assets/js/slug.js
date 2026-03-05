import { pathSlug, qs } from './slug-util.js';
import { getJSON } from './api.js';
import { renderTemplate } from './templates.js';
import { mountMusicPlayer } from './addons-music.js';
import { mountLockIfNeeded } from './addons-lock.js';

async function main(){
  const slug = pathSlug();
  const token = qs('token');
  const url = token ? `/api/site?slug=${encodeURIComponent(slug)}&token=${encodeURIComponent(token)}` : `/api/site?slug=${encodeURIComponent(slug)}`;
  const data = await getJSON(url);

  const root = document.getElementById('root');
  root.innerHTML = renderTemplate(data.templateId, data);

  const slot = document.querySelector('#musicSlot');
  if(data.addons?.music && data.musicUrl) mountMusicPlayer(slot, data.musicUrl);

  if(data.lockEnabled) mountLockIfNeeded(true, `/api/lock-verify?slug=${encodeURIComponent(slug)}`);
}

main().catch((e)=>{
  document.getElementById('root').innerHTML = `
    <div class="container"><div class="card"><div class="p">
      <div class="h2">Sayfa bulunamadı</div>
      <div class="muted" style="margin-top:8px">${(e&&e.message)?e.message:'Hata'}</div>
      <a class="btn" style="margin-top:12px" href="/">Ana sayfa</a>
    </div></div></div>`;
});
