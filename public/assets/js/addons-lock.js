import { postJSON } from './api.js';
export function mountLockIfNeeded(enabled, verifyUrl){
  if(!enabled) return;
  const key='askimiz:unlock:'+verifyUrl;
  if(sessionStorage.getItem(key)==='1') return;

  const wrap=document.createElement('div');
  wrap.className='lock-backdrop';
  wrap.innerHTML=`
    <div class="lock-modal">
      <div style="font-weight:800;font-size:18px">🔒 Bu sayfa kilitli</div>
      <div class="muted" style="margin-top:6px;font-size:14px">PIN girerek devam edebilirsin.</div>
      <div style="margin-top:14px;display:grid;gap:10px">
        <input class="input" inputmode="numeric" placeholder="PIN"/>
        <div class="err small" style="display:none"></div>
        <button class="btn primary" type="button">Aç</button>
      </div>
    </div>`;
  document.body.appendChild(wrap);

  const pin=wrap.querySelector('input');
  const err=wrap.querySelector('.err');
  const btn=wrap.querySelector('button');

  btn.addEventListener('click', async ()=>{
    err.style.display='none';
    try{
      await postJSON(verifyUrl,{pin:pin.value});
      sessionStorage.setItem(key,'1');
      wrap.remove();
    }catch(e){
      err.textContent=e.message||'PIN yanlış';
      err.style.display='block';
    }
  });
}
