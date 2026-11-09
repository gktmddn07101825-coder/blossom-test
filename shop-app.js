/* BLOSSOM rewards shop: all balances, ownership and attendance verified by server. */
(() => {
 'use strict';
 const API='https://hweouohzkwqhiwwsjlxu.supabase.co/functions/v1/blossom-rewards';
 const SESSION_KEY='blossom_test_auth_v1';
 const $=id=>document.getElementById(id);
 const kinds=[['all','전체'],['theme','테마'],['nickname','닉네임'],['title','칭호'],['timer','미니 타이머'],['checklist','체크리스트']];
 let state=null, view='shop',category='all', busy=false;
 const own=()=>new Set((state?.inventory||[]).map(x=>x.product_id));
 const wears=()=>Object.fromEntries((state?.equipped||[]).map(x=>[x.category,x.product_id]));
 const escSession=()=>{try{const x=JSON.parse(sessionStorage.getItem(SESSION_KEY)||'null');return x?.access_token&&Number(x.expires_at)>Date.now()/1000+10?x:null}catch{return null}};
 const el=(tag,cl,text)=>{const e=document.createElement(tag);if(cl)e.className=cl;if(text!==undefined)e.textContent=String(text);return e};
 function status(message,error=false){const n=$('actionStatus');n.textContent=message;n.classList.toggle('error',error)}
 async function api(payload){
  const ss=escSession();if(!ss)throw Error('로그인 정보가 없어요. 내 계정에서 다시 로그인해 주세요.');
  const response=await fetch(API,{method:'POST',headers:{'Content-Type':'application/json',Authorization:'Bearer '+ss.access_token},body:JSON.stringify(payload),cache:'no-store'});
  const data=await response.json().catch(()=>null);if(!response.ok||!data?.success)throw Error(data?.message||'서버 요청에 실패했습니다.');
  return data;
 }
 function kstDayParts(){
  const parts=new Intl.DateTimeFormat('en-US',{timeZone:'Asia/Seoul',year:'numeric',month:'2-digit',day:'2-digit'}).formatToParts(new Date());
  const o=Object.fromEntries(parts.map(x=>[x.type,x.value]));return [Number(o.year),Number(o.month),Number(o.day)];
 }
 function dateISO(d){return [d.getUTCFullYear(),String(d.getUTCMonth()+1).padStart(2,'0'),String(d.getUTCDate()).padStart(2,'0')].join('-')}
 function renderWeek(){
  const [y,m,d]=kstDayParts();const today=new Date(Date.UTC(y,m-1,d));const dow=(today.getUTCDay()+6)%7;
  const start=new Date(today.getTime()-dow*86400000);const checks=new Set((state?.attendance||[]).map(x=>x.day_kst));
  $('week').replaceChildren();
  for(let i=0;i<7;i++){
   const day=new Date(start.getTime()+i*86400000);const done=checks.has(dateISO(day));
   const cell=el('div','day'+(done?' checked':'')+(dateISO(day)===dateISO(today)?' today':''));
   cell.append(el('strong',['월','화','수','목','금','토','일'][i]),el('span','',done?'✓':'·'));
   cell.append(el('small','',`${day.getUTCDate()}일`));$('week').append(cell);
  }
 }
 function previewLabel(p){
  if(p.category==='theme')return '✿ BLOSSOM';
  if(p.category==='nickname')return '✦ 닉네임';
  if(p.category==='title')return '['+p.name+']';
  if(p.category==='timer')return '◷ 01:23:45';
  return '☑ 완료';
 }
 function mkButton(label,cls,fn,disabled=false){const b=el('button',cls,label);b.type='button';b.disabled=disabled||busy;if(fn)b.addEventListener('click',fn);return b}
 function renderProducts(){
  const list=$('products');list.replaceChildren();if(!state){list.append(el('div','empty','로그인 후 상품을 확인해 주세요.'));return}
  const inventory=own(),equipped=wears(),search=$('search').value.trim().toLowerCase();
  const chosen=(state.products||[]).filter(p=>(category==='all'||p.category===category)&& (view==='shop'||inventory.has(p.id)) && (!search||p.name.toLowerCase().includes(search)||p.description.toLowerCase().includes(search)));
  $('listingInfo').textContent=(view==='shop'?'판매 중 ':'보유 ') +chosen.length+'개 상품 · 현금 결제 없이 BP로 구매';
  if(!chosen.length){list.append(el('div','empty',view==='inventory'?'아직 보관함에 해당 상품이 없어요. 출석 포인트로 구매해 보세요!':'검색한 상품이 없어요.'));return}
  for(const p of chosen){
   const card=el('article','product');card.dataset.id=p.id;card.dataset.type=p.category;
   const preview=el('div','preview');const label=el('span','',previewLabel(p));
   if(p.category==='nickname')label.className='bl-nick-'+p.id.slice(9);preview.append(label);
   card.append(preview);
   const body=el('div','pbody');body.append(el('strong','',p.name),el('p','',p.description));
   const foot=el('div','pfoot');
   if(inventory.has(p.id))foot.append(el('span','pill'+(p.rarity==='epic'?' epic':''),equipped[p.category]===p.id?'✓ 적용 중':'✓ 보유'));
   else foot.append(el('span','price',p.price.toLocaleString()+' BP'));
   let button;
   if(view==='inventory'){
    const isOn=equipped[p.category]===p.id;
    button=mkButton(isOn?'해제':'적용',isOn?'btn buy secondary':'btn buy',()=>mutation({action:'equip',category:p.category,product_id:isOn?null:p.id}));
   }else if(inventory.has(p.id)){
    button=mkButton('보관함 보기','btn buy secondary',()=>{view='inventory';setActiveView();renderProducts()});
   }else{
    button=mkButton('구매','btn buy',()=>{
     if(!window.confirm(`${p.name}을(를) ${p.price} BP로 구매할까요?`))return;
     mutation({action:'buy',product_id:p.id});
    });
   }
   foot.append(button);body.append(foot);card.append(body);list.append(card);
  }
 }
 function setActiveView(){
  document.querySelectorAll('[data-view]').forEach(b=>b.classList.toggle('active',b.dataset.view===view));
 }
 function render(){
  if(!state)return;
  $('userBadge').textContent=(state.user?.nickname||state.user?.username||'길드원')+' 님';
  $('balance').replaceChildren(document.createTextNode(Number(state.wallet?.balance||0).toLocaleString()+' '),el('small','','BP'));
  $('earned').textContent=Number(state.wallet?.lifetime_earned||0).toLocaleString()+' BP';
  const history=state.attendance||[];
  $('streak').textContent=(history[0]?.streak||0)+'일';
  $('lastDay').textContent=history[0]?.day_kst||'없음';
  $('ownedCount').textContent=String((state.inventory||[]).length);
  const today=state.today_kst;
  const checked=history.some(row=>row.day_kst===today);
  $('checkinBtn').disabled=checked||busy;$('checkinBtn').textContent=checked?'✓ 오늘 출석 완료':'🌸 오늘 출석하고 +10 BP';
  $('ownerBox').classList.toggle('hidden',!state.can_adjust);
  renderWeek();renderProducts();
  if(window.BlossomSkin)window.BlossomSkin.apply(state.equipped,state.products,state.user?.nickname);
 }
 async function load(showStatus=true){
  const data=await api({action:'bootstrap'});state=data;render();
  if(showStatus)status('상점과 내 보관함을 불러왔어요!');
 }
 async function mutation(body){
  if(busy)return;busy=true;$('checkinBtn').disabled=true;status('Supabase에 저장하고 있어요...');
  try{
   const res=await api(body);await load(false);
   const extra=res.result?.earned?` +${res.result.earned} BP` :'';
   status((res.message||'완료!')+extra);
  }catch(e){status(e.message||'저장 실패',true)}
  finally{busy=false;if(state)render()}
 }
 function setup(){
  const filter=$('filters');for(const [id,label] of kinds){
   const b=el('button','chip'+(id==='all'?' active':''),label);b.type='button';
   b.addEventListener('click',()=>{category=id;filter.querySelectorAll('.chip').forEach(n=>n.classList.toggle('active',n===b));renderProducts()});filter.append(b);
  }
  document.querySelectorAll('[data-view]').forEach(b=>b.addEventListener('click',()=>{view=b.dataset.view;setActiveView();renderProducts()}));
  $('search').addEventListener('input',renderProducts);
  $('checkinBtn').addEventListener('click',()=>mutation({action:'checkin'}));
  $('adjustForm').addEventListener('submit',e=>{e.preventDefault();const username=$('adjustUsername').value.trim().toLowerCase();const delta=Number($('adjustDelta').value);
   if(!Number.isInteger(delta)||!delta||Math.abs(delta)>2000)return status('조정 BP를 확인해 주세요.',true);
   if(!window.confirm(`${username} 회원에게 ${delta>0?'+':''}${delta} BP를 적용할까요?`))return;
   mutation({action:'adjust',username,delta});
  });
  if(!escSession()){
   $('userBadge').textContent='로그인 필요';status('로그인이 필요해요. 상단의 [내 계정]에서 로그인한 뒤 돌아와 주세요.',true);
   $('week').append(el('div','empty','로그인 후 출석할 수 있어요.'));renderProducts();return;
  }
  load().catch(e=>{status(e.message||'데이터를 불러오지 못했습니다.',true);$('userBadge').textContent='연결 확인 필요'});
 }
 setup();
})();
