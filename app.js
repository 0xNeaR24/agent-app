const BOT=[
"..kk........kk..",
".kBBk.kkkk.kBBk.",
".kBBkkBBBBkkBBk.",
"..kBBhhhhhhBBk..",
".hkBBBBBBBBBBkh.",
"hhkBeBBBBBBeBkhh",
"hhkBBBBBBBBBBkhh",
".hkBBkDDDDkBBkh.",
"..kBBkDkkDkBBk..",
"..kBBBkDDkBBBk..",
"...kkBBBBBBkk...",
"..kBBttttttBBk..",
".kBBBBBBBBBBBBk.",
"kBBkBBBBBBBBkBBk",
"kkkk.kBBBBk.kkkk"];
const LEGS=["...kBBk..kBBk...",".....kBBkkBBk..."];
const ROOMS=[
 ["price","Harga","#38bdf8","#0ea5e9","Paijo",0],
 ["safety","Keamanan","#f87171","#dc2626","Ijem",1],
 ["analyst","Analis","#a78bfa","#7c3aed","Painem",1],
 ["wallet","Dompet","#fbbf24","#d97706","",0],
 ["trader","Trader","#4ade80","#16a34a","Sobri",0],
 ["ledger","Marketing","#f472b6","#db2777","",1]];
function tint0(h,a){const n=parseInt(h.slice(1),16);const f=c=>Math.round(c+(255-c)*a).toString(16).padStart(2,"0");return "#"+f(n>>16)+f((n>>8)&255)+f(n&255)}
function bot(c1,c2,mood,girl,k){
  const col={k:"#0e0a1c",B:"#f9b4c4",D:"#f08fa8",e:mood==="alert"?"#ef4444":"#0e0a1c",h:c1,t:c2};
  const px=(row,y,cls)=>[...row].map((ch,x)=>col[ch]?`<rect x="${x}" y="${y}" width="1" height="1" fill="${col[ch]}"${cls&&ch==="e"?' class="eye"':''}/>`:"").join("");
  let r=BOT.map((row,y)=>px(row,y,1)).join("");
  if(girl)r+=R(6,0,1,1,"#ec4899")+R(7,0,2,1,"#f472b6")+R(9,0,1,1,"#ec4899")+R(5,4,1,1,"#0e0a1c")+R(10,4,1,1,"#0e0a1c");
  const legs=LEGS.map((row,i)=>`<g class="leg l${i}">${px(row,15)}</g>`).join("");
  return `<div class="walker ${mood}" data-k="${k||""}" data-c1="${c1}" data-c2="${c2}" data-girl="${girl?1:0}"><svg class="bot ${mood}" viewBox="0 0 16 16">${r}${legs}</svg></div>`;
}
function R(x,y,w,h,c,cls){return `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${c}"${cls?` class="${cls}"`:""}/>`}
function laptop(inner){return `<svg class="prop lap" viewBox="0 0 20 12">${R(2,0,16,8,"#cbd5e1")}${R(3,1,14,6,"#0b1220")}<g class="scr">${inner}</g>${R(0,8,20,2,"#94a3b8")}${R(8,9,4,1,"#64748b")}</svg>`}
function prop(k,mood){
  if(k==="price")return laptop([[4,5],[6,4],[8,5],[10,3],[12,4],[14,2]].map(a=>R(a[0],a[1],2,1,"#38bdf8")).join(""));
  if(k==="safety")return laptop(mood==="alert"?R(10,2,1,3,"#f87171")+R(10,6,1,1,"#f87171"):R(8,2,5,3,"#4ade80")+R(9,5,3,1,"#4ade80")+R(10,6,1,1,"#4ade80"));
  if(k==="analyst")return laptop(R(5,5,2,1,"#a78bfa")+R(8,3,2,3,"#a78bfa")+R(11,4,2,2,"#a78bfa")+R(14,2,2,4,"#a78bfa"));
  if(k==="trader")return laptop(R(5,3,1,3,"#4ade80")+R(8,2,1,4,"#f87171")+R(11,4,1,2,"#4ade80")+R(14,2,1,4,"#4ade80"));
  if(k==="wallet")return `<svg class="prop" viewBox="0 0 20 12"><g class="coin">${R(7,0,3,2,"#fbbf24")}${R(11,1,3,2,"#fbbf24")}</g>${R(3,4,14,3,"#a16207")}${R(3,7,14,5,"#78350f")}${R(9,6,2,2,"#fbbf24")}${R(3,4,14,1,"#0e0a1c")}</svg>`;
  if(k==="ledger")return `<svg class="prop" viewBox="0 0 22 12">${R(1,5,3,3,"#fbbf24")}${R(4,4,3,5,"#fbbf24")}${R(7,3,3,7,"#f59e0b")}${R(10,2,3,9,"#f59e0b")}${R(2,8,2,3,"#92400e")}${R(14,4,1,5,"#fde68a","wave")}${R(16,3,1,7,"#fde68a","wave w2")}${R(18,2,1,9,"#fde68a","wave w3")}</svg>`;
  return "";
}

function svgp(vb,cls,inner){return `<svg class="${cls}" viewBox="${vb}">${inner}</svg>`}
function chair(c){return svgp("0 0 14 15","chair",R(2,0,10,8,"#0e0a1c")+R(3,1,8,6,c)+R(1,8,12,3,"#0e0a1c")+R(2,8,10,2,tint0(c,.2))+R(6,11,2,3,"#0e0a1c")+R(3,14,8,1,"#0e0a1c"))}
function desk(){return svgp("0 0 38 13","desk",R(0,0,38,5,"#0e0a1c")+R(1,1,36,3,"#b97a44")+R(1,1,36,1,"#d9a066")+R(1,5,3,8,"#7a5230")+R(34,5,3,8,"#7a5230")+R(5,5,28,6,"#8a5e36")+R(5,5,28,1,"#0e0a1c")+R(17,7,4,1,"#fbbf24"))}
const LAP={price:1,safety:1,analyst:1,trader:1};
function propOn(k,mood,on){return (LAP[k]&&!on)?laptop(""):prop(k,mood)}
function coffeeM(){return svgp("0 0 12 14","kitem",R(0,0,12,12,"#0e0a1c")+R(1,0,10,12,"#475569")+R(2,1,8,4,"#0b1220")+R(3,2,2,2,"#f87171")+R(4,7,4,4,"#0b1220")+R(5,8,2,2,"#9a5b2a")+R(0,12,12,2,"#334155")+R(5,-1,1,1,"#fff","wave")+R(7,-2,1,1,"#fff","wave w2"))}
function mugs(){return svgp("0 0 16 5","kitem",[0,6,12].map(x=>R(x,1,4,4,"#f3eefc")+R(x,1,4,1,"#6b3f1d")+R(x+4,2,1,2,"#f3eefc")).join(""))}
function plant(){return svgp("0 0 10 14","kitem",R(0,0,4,4,"#4ade80")+R(6,1,4,4,"#22c55e")+R(3,3,4,6,"#16a34a")+R(2,9,6,5,"#b45309")+R(2,9,6,1,"#d97706"))}
function ktable(){return svgp("0 0 24 20","ktable",R(5,0,3,4,"#f3eefc")+R(5,0,3,1,"#6b3f1d")+R(15,0,3,4,"#f3eefc")+R(15,0,3,1,"#6b3f1d")+R(6,-1,1,1,"#fff","wave")+R(1,4,22,4,"#0e0a1c")+R(2,4,20,3,"#c28a50")+R(2,4,20,1,"#d9a066")+R(10,8,4,8,"#7a5230")+R(6,16,12,3,"#0e0a1c")+R(7,16,10,2,"#7a5230"))}
const JOKE={
 price:["Ngopi dulu, grafiknya nggak ke mana-mana kok","Kopi ini naiknya lebih stabil dari harga token","Aku lihat angka terus, mata minta libur"],
 safety:["Kopinya sudah kucek, aman dari honeypot","Aku curiga sama siapa pun yang janji untung 100%","Hidup tenang itu kalau kontraknya open source"],
 analyst:["Skor kopi hari ini: 92 dari 100","Kalau semua syarat terpenuhi, aku baru senyum","Rapat berikutnya aku bawa gorengan"],
 trader:["Sabar, beli itu bukan balapan","Stop loss itu teman, bukan musuh","Aku beli kecil saja, sisanya beli pisang goreng"],
 wallet:["Saldo aman, brankas dikunci tiga kali","Siapa yang habisin gulanya?","Uangnya jangan dipinjam ya"],
 ledger:["Ada kabar bagus? Kita umumkan setelah kopi","Poster baru udah siap, tinggal tunggu sinyal","Promosi tanpa data itu bohong, aku nggak mau"]};
function pick(a,seed){return a[Math.abs(seed)%a.length]}
function tick(){
  document.querySelectorAll(".says").forEach(sa=>{
    const b=sa.querySelectorAll(".bub");if(!b.length)return;
    const i=(+sa.dataset.i||0)%b.length;
    b.forEach((x,j)=>x.classList.toggle("on",j===i));
    const r=b[i].dataset.r;
    sa.parentElement.querySelectorAll("[data-r]").forEach(e=>e.classList.toggle("talk",e.dataset.r===r));
    sa.dataset.i=(i+1)%b.length;
  });
}
setInterval(tick,3200);
const fmt=n=>n>=1000?"$"+n.toLocaleString("en-US",{maximumFractionDigits:0}):"$"+(+n).toPrecision(4).replace(/\.?0+$/,"");
const esc=s=>String(s).replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
const $=id=>document.getElementById(id);
const DEMO={v:3,t:0,mode:"paper",eq:1042.5,cash:700,pnl:4.25,
 pos:[["NEAR",5.1,5.4,5.9,342.5]],
 tok:[["BNB","WATCH",68,612.3,95,0,9e8,1.2,1],["NEAR","BUY",78,5.4,95,0,2e8,3.1,0],["PI","AVOID",41,0.21,90,0,1e7,-6.2,2]],
 rl:12.4,ur:-3.1,cyc:0,poll:300,led:[[0,"NEAR","BUY",78,"Syarat BUY terpenuhi"],[0,"NEAR","RAPAT",78,"Dewan: SETUJU | risiko RENDAH"],[0,"PI","AVOID",41,"Likuiditas rendah"]],trd:[[0,"BUY","NEAR",100,0],[0,"SELL","SOL",112.4,12.4]],
 chat:{sym:"NEAR",ts:0,cf:78,rk:"RENDAH",v:"SETUJU",l:[["price","NEAR naik 3% dengan volume sehat."],["safety","Aset utama, tidak ada bendera merah."],["analyst","Skor 78, saya condong BUY."],["trader","Oke, beli kecil saja."]]},
 ag:{price:["working","3/3 aset terpantau"],safety:["working","Tidak ada bendera merah"],
 analyst:["working","1 BUY | 1 WATCH | 1 AVOID"],wallet:["idle","Saldo 0.00000 ETH"],
 trader:["working","1 posisi | PnL +4.3%"],ledger:["working","Umumkan 1 sinyal BUY"]}};
async function decode(s){
  const b=s.replace(/-/g,"+").replace(/_/g,"/");
  const bin=atob(b+"=".repeat((4-b.length%4)%4));
  const u=Uint8Array.from(bin,c=>c.charCodeAt(0));
  const ds=new DecompressionStream("deflate");
  const w=ds.writable.getWriter();w.write(u);w.close();
  return JSON.parse(await new Response(ds.readable).text());
}
function render(d,demo){
  try{const tg=window.Telegram&&Telegram.WebApp;if(tg){tg.ready();tg.expand()}}catch(e){}
  const bd=$("badge");
  const now=Math.floor(Date.now()/1000),poll=d.poll||300,age=demo?0:Math.max(0,now-(d.t||0));
  const stuck=!demo&&d.cyc&&((d.t||0)-d.cyc)>3*poll;
  const mn=s=>s<90?Math.round(s)+" dtk":s<5400?Math.round(s/60)+" mnt":Math.round(s/3600)+" jam";
  let st=demo?["DEMO","demo"]:stuck?["BOT MACET","off"]:age<2*poll?["LIVE","live"]:age<12*poll?["TERTUNDA","stale"]:["USANG","off"];
  bd.textContent=st[0];bd.className="badge "+st[1];
  $("stat").innerHTML=demo?"<i>Data contoh</i>":`<i>Data ${mn(age)} lalu</i><i>Interval ${mn(poll)}</i>`+(d.cyc?`<i>Siklus ${mn(Math.max(0,(d.t||0)-d.cyc))} sebelum snapshot</i>`:"")+(age>=2*poll?"<i>Ketik /app untuk data terbaru</i>":"");
  const rk=n=>`<span class="rk rk${n}">${["RISIKO RENDAH","RISIKO SEDANG","RISIKO TINGGI"][n]||""}</span>`;
  const hm=t=>t?new Date(t*1000).toLocaleString("id-ID",{day:"2-digit",month:"short",hour:"2-digit",minute:"2-digit"}):"-";
  const sg=(n,p)=>(n>=0?"+":"")+n.toFixed(2)+(p?"%":"");
  $("eq").textContent=fmt(d.eq);$("cash").textContent=fmt(d.cash);
  $("pnl").textContent=sg(d.pnl,1);$("pnl").className=d.pnl>=0?"up":"dn";
  const sgm=v=>(v>=0?"+$":"-$")+Math.abs(v).toFixed(2);
  $("pl2").innerHTML=`<div>PnL realized<b class="${(d.rl||0)>=0?"up":"dn"}">${sgm(d.rl||0)}</b></div><div>PnL unrealized<b class="${(d.ur||0)>=0?"up":"dn"}">${sgm(d.ur||0)}</b></div>`;
  const L=(d.chat&&d.chat.l)||[];
  const live=d.chat&&((d.t||0)-(d.chat.ts||0))<600;
  const nmm={price:"Paijo",safety:"Ijem",analyst:"Painem",trader:"Sobri"};
  const seed=Math.floor((d.t||0)/300);
  const SIT=["price","safety","analyst","trader"];
  const where={};
  ROOMS.forEach(([k])=>{
    const mood=((d.ag||{})[k]||["waiting"])[0];
    where[k]=(live&&nmm[k])?"meet":(mood==="working"||mood==="alert")?"desk":"kitchen";
  });
  const home=ROOMS.map(([k,name,c1,c2,who,girl],ri)=>{
    const [mood,txt]=(d.ag||{})[k]||["waiting","menunggu data"];
    const lbl={working:"BEKERJA",alert:"WASPADA",idle:"SANTAI",waiting:"MENUNGGU"}[mood]||"MENUNGGU";
    const w=where[k],here=w==="desk";
    const away=w==="meet"?"🚪 sedang rapat":w==="kitchen"?"☕ istirahat di dapur":"";
    const pill=w==="meet"?'<span class="pill idle">DI RUANG RAPAT</span>':w==="kitchen"?'<span class="pill idle">ISTIRAHAT</span>':`<span class="pill ${mood}">${lbl}</span>`;
    const post=(k==="ledger"&&here)?'<div class="poster">📣 BUY!</div>':"";
    const pigs=here?`<div class="stage">${bot(c1,c2,mood,girl,k)}</div>`:"";
    const scene=`<div class="scene" data-k="${k}">${chair(c1)}${pigs}${desk()}${propOn(k,mood,here)}</div>`;
    return `<div class="room"><h2>${who?who+" · ":""}${name}</h2>${post}${away?`<div class="away">${away}</div>`:""}${scene}${pill}<div class="msg">${esc(txt)}</div></div>`;}).join("");
  const seatsHTML=SIT.map((k,i)=>{const r=ROOMS.find(q=>q[0]===k);
    const pig=live?`<div class="stage">${bot(r[2],r[3],"idle",r[5],k)}</div>`:"";
    return `<div class="mseat" style="left:${i*25}%" data-r="${k}">${chair(r[2])}${pig}${propOn(k,"working",live)}<div class="nm">${r[4]}</div></div>`;}).join("");
  const says=live?L.map(x=>`<div class="bub" data-r="${x[0]}"><b>${nmm[x[0]]||x[0]}:</b> ${esc(x[1])}</div>`).join(""):"";
  const meet=`<div class="room meet"><h2>Ruang rapat${live?": "+esc(d.chat.sym):" (kosong)"}</h2>${live?`<div class="says">${says}</div>`:""}<div class="mscene"><div class="mtable"></div>${seatsHTML}</div></div>`;
  const kids=ROOMS.filter(r=>where[r[0]]==="kitchen");
  const kpigs=kids.map(r=>`<div class="kslot" data-r="${r[0]}">${bot(r[2],r[3],"idle",r[5],r[0]).replace('<div class="walker','<div data-mug="1" class="walker')}<div class="nm">${r[4]||r[1]}</div></div>`).join("");
  const ksays=kids.map((r,i)=>`<div class="bub" data-r="${r[0]}"><b>${r[4]||r[1]}:</b> ${esc(pick(JOKE[r[0]],seed+i*7))}</div>`).join("");
  const kitchen=`<div class="room kitchen"><h2>Dapur · tempat istirahat</h2>${kids.length?`<div class="says">${ksays}</div>`:""}<div class="kscene"><div class="cbar"></div>${coffeeM().replace('class="kitem"','class="kitem" style="left:12%;top:-12px;width:24px"')}${mugs().replace('class="kitem"','class="kitem" style="left:40%;top:15px;width:36px"')}${plant().replace('class="kitem"','class="kitem" style="left:70%;top:-10px;width:22px"')}${kids.length?`<div class="kpigs">${kpigs}</div>`:'<div class="kempty">Dapur sepi, semua sedang bekerja</div>'}${ktable()}</div></div>`;
  $("house").innerHTML=home+kitchen+meet;
  document.querySelectorAll(".says").forEach(s=>s.dataset.i=0);tick();
  const nm={price:"Paijo (Harga)",safety:"Ijem (Keamanan)",analyst:"Painem (Analis)",trader:"Sobri (Trader)"};
  $("rapatwrap").innerHTML=d.chat?`<h3>Rapat agen: ${esc(d.chat.sym)}</h3><div class="rapat">${d.chat.l.map(x=>`<p><b>${nm[x[0]]||x[0]}:</b> ${esc(x[1])}</p>`).join("")}<p><b>${d.chat.v==="SETUJU"?"✅ Disetujui":"⛔ Ditolak"}</b>${d.chat.cf!=null?` · keyakinan ${d.chat.cf}%`:""}${d.chat.rk?` · risiko ${esc(d.chat.rk.toLowerCase())}`:""}</p></div>`:"";
  $("pos").innerHTML=(d.pos||[]).length?d.pos.map(p=>`<div class="card"><div><b>${esc(p[0])}</b><small>masuk ${p[1]} → ${p[2]}</small></div><div class="${p[3]>=0?"up":"dn"}">${sg(p[3],1)}<small>${fmt(p[4])}</small></div></div>`).join(""):'<div class="empty">Belum ada posisi terbuka.</div>';
  $("trd").innerHTML=(d.trd||[]).length?d.trd.map(x=>`<div class="row"><span class="tm">${hm(x[0])}</span><span class="sd ${x[1]==="BUY"?"up":"dn"}">${esc(x[1])}</span><span class="tx">${esc(x[2])} <small>$${(+x[3]).toFixed(2)}</small></span>${x[1]==="SELL"?`<span class="${x[4]>=0?"up":"dn"}">${sgm(x[4])}</span>`:""}</div>`).join(""):'<div class="empty">Belum ada order simulasi.</div>';
  $("led").innerHTML=(d.led||[]).length?d.led.map(x=>`<div class="row"><span class="tm">${hm(x[0])}</span><span class="sd">${esc(x[2])}</span><span class="tx"><b>${esc(x[1])}</b> <small>skor ${x[3]} · ${esc(x[4])}</small></span></div>`).join(""):'<div class="empty">Belum ada catatan keputusan.</div>';
  $("tok").innerHTML=(d.tok||[]).length?d.tok.map(t=>`<div class="card"><div><b>${esc(t[0])}</b><small>${fmt(t[3])} · 24j ${t[7]>=0?"+":""}${t[7]}%${t[4]>=0?" · aman "+t[4]:""}</small></div><span><span class="tag ${esc(t[1])}">${esc(t[1])} ${t[2]}</span>${t[8]!=null?rk(t[8]):""}</span></div>`).join(""):'<div class="empty">Belum ada data. Tunggu siklus pertama bot lalu ketik /app lagi.</div>';
  $("foot").textContent=(demo?"Data contoh. Buka lewat /app di bot untuk data asli. ":"Update: "+new Date(d.t*1000).toLocaleString("id-ID")+". Ketik /app lagi untuk menyegarkan. ")+"Simulasi uang virtual, bukan nasihat finansial.";
}
/* ===== Validasi payload ?s= : angka dibatasi, teks dipotong, bentuk dicek ===== */
function validate(x){
  if(!x||typeof x!=="object"||Array.isArray(x))throw new Error("bentuk data salah");
  const n=(v,def=0)=>Number.isFinite(+v)?+v:def;
  const t=(v,m=80)=>String(v==null?"":v).slice(0,m);
  const arr=(v,m)=>Array.isArray(v)?v.slice(0,m):[];
  const d={v:n(x.v),t:n(x.t),mode:t(x.mode,12),eq:n(x.eq),cash:n(x.cash),pnl:n(x.pnl),rl:n(x.rl),ur:n(x.ur),cyc:n(x.cyc),poll:Math.max(30,n(x.poll,300))};
  if(!d.t||d.t<1.5e9||d.t>4e9)throw new Error("waktu tidak valid");
  d.pos=arr(x.pos,20).filter(Array.isArray).map(p=>[t(p[0],12),n(p[1]),n(p[2]),n(p[3]),n(p[4])]);
  d.tok=arr(x.tok,20).filter(Array.isArray).map(r=>[t(r[0],12),["BUY","WATCH","AVOID"].includes(r[1])?r[1]:"WATCH",n(r[2]),n(r[3]),n(r[4]),n(r[5]),n(r[6]),n(r[7]),r[8]==null?null:Math.min(2,Math.max(0,n(r[8])))]);
  d.led=arr(x.led,20).filter(Array.isArray).map(r=>[n(r[0]),t(r[1],12),t(r[2],8),n(r[3]),t(r[4],80)]);
  d.trd=arr(x.trd,20).filter(Array.isArray).map(r=>[n(r[0]),r[1]==="SELL"?"SELL":"BUY",t(r[2],12),n(r[3]),n(r[4])]);
  d.ag={};
  const A=x.ag&&typeof x.ag==="object"?x.ag:{};
  Object.keys(A).slice(0,12).forEach(k=>{const v=A[k];if(Array.isArray(v))d.ag[t(k,12)]=[["working","idle","alert","waiting"].includes(v[0])?v[0]:"waiting",t(v[1],90)]});
  if(x.chat&&typeof x.chat==="object"){const c=x.chat;
    d.chat={sym:t(c.sym,12),v:c.v==="SETUJU"?"SETUJU":"TOLAK",ts:n(c.ts),cf:c.cf==null?null:n(c.cf),rk:t(c.rk,10),
      l:arr(c.l,6).filter(Array.isArray).map(r=>[t(r[0],10),t(r[1],160)])};}
  return d;
}
function notice(msg,info){const e=$("notice");if(!e)return;e.textContent=msg;e.className="notice"+(info?" info":"");e.hidden=!msg}
(function(){
  const rf=$("refresh");
  if(rf)rf.onclick=()=>{try{const tg=window.Telegram&&Telegram.WebApp;if(tg&&tg.close)return tg.close()}catch(e){}notice("Tutup halaman ini, lalu ketik /app di bot untuk data terbaru.",true)};
  ["tok","pos","trd","led"].forEach(i=>{const e=$(i);if(e)e.innerHTML='<div class="loading">Memuat…</div>'});
})();
(async()=>{
  const s=new URLSearchParams(location.search).get("s");
  if(!s)return render(DEMO,true);
  try{
    if(s.length>4000||!/^[A-Za-z0-9_-]+$/.test(s))throw new Error("format parameter salah");
    if(typeof DecompressionStream==="undefined")throw new Error("WebView ini tidak mendukung dekompresi");
    render(validate(await decode(s)),false);
  }catch(e){
    notice("Data tidak bisa dibaca ("+e.message+"). Menampilkan contoh. Ketik /app lagi di bot.");
    render(DEMO,true);
  }
})();
