(() => {
 'use strict';
 const URL='https://hweouohzkwqhiwwsjlxu.supabase.co/functions/v1/blossom-buffs';
 const KEY='blossom_test_auth_v1';
 const $=id=>document.getElementById(id);
 let buffs=[];
 const ss=()=>{try{const x=JSON.parse(sessionStorage.getItem(KEY)||'null');return x?.access_token&&x.expires_at>Date.now()/1000+10?x:null}catch{return null}};
 function fmt(s){const a=Math.max(0,Math.ceil(s)),h=Math.floor(a/3600),m=Math.floor(a%3600/60),sec=a%60;return `${h?String(h)+':':''}${String(m).padStart(2,'0')}:${String(sec).padStart(2,'0')}`}
 function text(n){$('message').textContent=n}
 function render(){
  const list=$('list');list.replaceChildren();const running=buffs.filter(x=>x.ends_at && Date.parse(x.ends_at)>Date.now());
  $('count').textContent=running.length+'개 진행 중';
  if(!running.length){const d=document.createElement('div');d.className='empty';d.textContent='실행 중인 버프가 없습니다. 버프 타이머에서 시작해 주세요.';list.append(d);return}
  for(const b of running){
   const card=document.createElement('div');card.className='buff';
   const img=document.createElement('img');img.alt='';img.src={booster:'Booster.PNG',integration:'Integration.PNG',blessing:'Blessing.PNG'}[b.icon]||'Booster.PNG';
   const name=document.createElement('span');name.className='name';name.textContent=b.name;
   const clock=document.createElement('span');clock.className='clock';clock.textContent=fmt((Date.parse(b.ends_at)-Date.now())/1000);
   card.append(img,name,clock);list.append(card);
  }
 }
 async function load(){const s=ss();if(!s){text('로그인 후 이용해 주세요.');return}
  const res=await fetch(URL,{method:'POST',headers:{'Content-Type':'application/json',Authorization:'Bearer '+s.access_token},body:JSON.stringify({action:'list'}),cache:'no-store'});
  const data=await res.json().catch(()=>null);if(!res.ok||!data?.success)throw Error(data?.message||'타이머 정보를 불러오지 못했어요.');
  const templateMap=new Map((data.entries||[]).filter(x=>x.template_id).map(x=>[x.template_id,x]));
  buffs=[];
  for(const t of data.templates||[]){if(!t.is_active)continue;const o=templateMap.get(t.id);buffs.push({
   name:o?.name_override||t.name,icon:o?.icon_override||t.icon_key,ends_at:o?.ends_at||null});}
  for(const p of data.entries||[]){if(p.template_id)continue;buffs.push({name:p.custom_name||'내 버프',icon:p.custom_icon||'booster',ends_at:p.ends_at||null});}
  render();text('서버와 동기화했습니다.');
 }
 $('refresh').addEventListener('click',()=>load().catch(e=>text(e.message)));
 load().catch(e=>text(e.message));
 setInterval(render,1000);setInterval(()=>load().catch(()=>{}),45000);
})();
