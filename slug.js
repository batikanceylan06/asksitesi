export const PLAN_PRICE={starter:999,standard:1499,premium:1999};
export const ADDON_PRICE={music:99,lock:49,theme:149,photoPack_to10:269,photoPack_to25:399,animations:199,video:299};

export function computeTotal(plan,addons){
  // Premium pakette tüm opsiyonlar dahildir.
  if(plan==='premium') return PLAN_PRICE.premium;

  let total=PLAN_PRICE[plan]||0;
  if(addons.music) total+=ADDON_PRICE.music;
  if(addons.lock) total+=ADDON_PRICE.lock;
  if(plan==='starter' && addons.theme) total+=ADDON_PRICE.theme;
  if(addons.photoPack==='to10') total+=ADDON_PRICE.photoPack_to10;
  if(addons.photoPack==='to25') total+=ADDON_PRICE.photoPack_to25;
  if(addons.animations) total+=ADDON_PRICE.animations;
  if(plan!=='premium' && addons.video) total+=ADDON_PRICE.video;
  return total;
}

export function upgradeSuggestion(plan,addons){
  const total=computeTotal(plan,addons);
  if(plan==='starter' && total>=PLAN_PRICE.standard) return {to:'standard',reason:'Eklerle birlikte Standart paket daha avantajlı.'};
  if(plan==='standard' && total>=PLAN_PRICE.premium) return {to:'premium',reason:'Eklerle birlikte Premium paket daha avantajlı.'};
  return null;
}
