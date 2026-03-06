export function mountMusicPlayer(container,url){
  if(!container||!url) return;
  const btn=document.createElement('button');
  btn.className='music-btn'; btn.type='button'; btn.textContent='🎵 Müziği Başlat';
  const audio=new Audio(url); audio.loop=true;
  let playing=false;
  btn.addEventListener('click', async ()=>{
    try{
      if(!playing){ await audio.play(); playing=true; btn.textContent='⏸️ Durdur'; }
      else{ audio.pause(); playing=false; btn.textContent='🎵 Müziği Başlat'; }
    }catch{}
  });
  container.appendChild(btn);
}
