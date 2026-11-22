/* ===== Karakter chibi 3D orisinal (Three.js) =====
   6 karakter voxel rancangan sendiri. Mereka berjalan antar ruangan, duduk bekerja,
   dan ngopi di dapur. Jika WebGL/THREE tidak ada, tampilan pixel SVG tetap dipakai. */
(function(){
  if(!window.THREE)return;
  let renderer;
  try{renderer=new THREE.WebGLRenderer({canvas:document.getElementById("gl"),alpha:true,antialias:false,powerPreference:"low-power"})}catch(e){return}
  if(!renderer||!renderer.getContext())return;
  renderer.setPixelRatio(Math.min(window.devicePixelRatio||1,2));
  renderer.autoClear=false;renderer.setClearColor(0x000000,0);
  const scene=new THREE.Scene();
  scene.add(new THREE.AmbientLight(0xffffff,.62));
  const dl=new THREE.DirectionalLight(0xffffff,.55);dl.position.set(10,20,25);scene.add(dl);
  const cam=new THREE.PerspectiveCamera(30,1,1,200);cam.position.set(0,14,46);cam.lookAt(0,8.5,0);
  const SC=.86,VIEW=24.6,FOOT=.155;               // skala model, tinggi pandang, posisi kaki di viewport
  const M=c=>new THREE.MeshLambertMaterial({color:c});
  const bx=(w,h,d,m,x,y,z,p)=>{const o=new THREE.Mesh(new THREE.BoxGeometry(w,h,d),m);o.position.set(x,y,z);p.add(o);return o};
  const cone=(r,h,m,x,y,z,p,seg)=>{const o=new THREE.Mesh(new THREE.ConeGeometry(r,h,seg||4),m);o.position.set(x,y,z);p.add(o);return o};

  /* ---------- warna & ciri tiap karakter ---------- */
  const SPEC={
    price:  {skin:0xaec6e0,body:0x2f6f95,limb:0x8fa8c4,eye:0x67e8f9,kind:"robot"},
    safety: {skin:0xf1ecf8,body:0xdc4a4a,limb:0xf1ecf8,eye:0x14532d,kind:"cat"},
    analyst:{skin:0xffd9c2,body:0x6d28d9,limb:0x5b21b6,eye:0x1a1226,kind:"witch"},
    trader: {skin:0xf97316,body:0xf8fafc,limb:0xf97316,eye:0x1a1226,kind:"fox"},
    wallet: {skin:0x86c76b,body:0xfde68a,limb:0x6fb356,eye:0x1a1226,kind:"turtle"},
    ledger: {skin:0xef4444,body:0xfde68a,limb:0x2563eb,eye:0x1a1226,kind:"parrot"}
  };

  function build(k,c1,c2,girl){
    const sp=SPEC[k]||SPEC.price;
    const skin=M(sp.skin),body=M(sp.body),limb=M(sp.limb),dark=M(0x1a1226),white=M(0xffffff);
    const accent=M(parseInt(c1.slice(1),16)),accent2=M(parseInt(c2.slice(1),16));
    const eyeM=M(sp.eye);
    const root=new THREE.Group(),hips=new THREE.Group(),torsoG=new THREE.Group(),neck=new THREE.Group();
    root.add(hips);hips.add(torsoG);torsoG.add(neck);neck.position.set(0,4.4,0);
    root.scale.setScalar(SC);
    /* kaki: paha + betis + telapak */
    const leg=(s)=>{const th=new THREE.Group();th.position.set(s*1.5,0,0);hips.add(th);
      bx(2.2,2.3,2.4,limb,0,-1.15,0,th);
      const sh=new THREE.Group();sh.position.set(0,-2.3,0);th.add(sh);
      bx(2.1,2.3,2.2,limb,0,-1.1,0,sh);
      bx(2.4,1,3.4,sp.kind==="parrot"?M(0xf59e0b):dark,0,-2.3,.5,sh);
      return {th,sh}};
    const L=leg(-1),R=leg(1);
    /* badan */
    bx(6,4.4,4,body,0,2.2,0,torsoG);
    /* lengan */
    const arm=(s)=>{const sh=new THREE.Group();sh.position.set(s*3.9,3.8,0);torsoG.add(sh);
      bx(1.9,2.3,1.9,sp.kind==="witch"||sp.kind==="fox"?body:limb,0,-1.1,0,sh);
      const el=new THREE.Group();el.position.set(0,-2.3,0);sh.add(el);
      bx(1.8,2.2,1.8,sp.kind==="witch"?body:limb,0,-1.05,0,el);
      bx(1.6,1.5,1.6,sp.kind==="witch"?skin:(sp.kind==="fox"||sp.kind==="turtle"?skin:limb),0,-2.3,0,el);
      return {sh,el}};
    const aL=arm(-1),aR=arm(1);
    const mug=new THREE.Group();aR.el.add(mug);mug.position.set(0,-2.4,1.3);mug.visible=false;
    bx(1.9,2.2,1.9,M(0xf3eefc),0,0,0,mug);bx(1.5,.3,1.5,M(0x6b3f1d),0,1.2,0,mug);bx(.5,1.2,.5,M(0xf3eefc),1.2,0,0,mug);
    /* kepala */
    const head=new THREE.Group();neck.add(head);
    bx(9,8,8,skin,0,4,0,head);
    /* wajah umum */
    let eyes=[],mouth;
    const faceY=4.3;
    if(sp.kind==="robot"){
      bx(7.4,5.2,.4,dark,0,faceY,4.05,head);
      eyes=[bx(1.5,1.7,.4,eyeM,-1.9,faceY+.4,4.3,head),bx(1.5,1.7,.4,eyeM,1.9,faceY+.4,4.3,head)];
      mouth=bx(2.4,.5,.4,eyeM,0,faceY-1.6,4.3,head);
    }else{
      eyes=[bx(1.3,1.8,.4,eyeM,-2.1,faceY,4.05,head),bx(1.3,1.8,.4,eyeM,2.1,faceY,4.05,head)];
      bx(.5,.5,.3,white,-2.4,faceY+.5,4.3,head);bx(.5,.5,.3,white,1.8,faceY+.5,4.3,head);
      mouth=bx(1.6,.5,.4,dark,0,faceY-2,4.05,head);
      bx(1.2,.8,.3,M(0xfda4af),-3.3,faceY-1.1,4.05,head);bx(1.2,.8,.3,M(0xfda4af),3.3,faceY-1.1,4.05,head);
    }
    if(girl){bx(1.8,.4,.4,dark,-2.3,faceY+1.3,4.2,head).rotation.z=.25;bx(1.8,.4,.4,dark,2.3,faceY+1.3,4.2,head).rotation.z=-.25}
    /* ciri khas */
    let tail=null;
    if(sp.kind==="robot"){
      bx(.6,1.8,.6,M(0x94a3b8),0,8.9,0,head);bx(1.4,1.4,1.4,accent,0,10.2,0,head);
      bx(1.2,3,3,M(0x64748b),-4.8,4,0,head);bx(1.2,3,3,M(0x64748b),4.8,4,0,head);
      bx(3.2,2.2,.4,M(0x0b1220),0,2.2,2.05,torsoG);bx(.7,.7,.3,eyeM,-.9,2.0,2.3,torsoG);bx(.7,1.3,.3,eyeM,0,2.3,2.3,torsoG);bx(.7,1.9,.3,eyeM,.9,2.5,2.3,torsoG);
    }else if(sp.kind==="cat"){
      [-1,1].forEach(s=>{cone(2.3,2.8,skin,s*3,9.2,0,head).rotation.z=-s*.25;cone(1.2,1.8,M(0xf9a8d4),s*3,8.9,.7,head).rotation.z=-s*.25});
      bx(9.4,1.4,8.4,accent,0,7.4,0,head);                       // topi/ikat kepala
      bx(1.6,1.1,.4,accent2,0,6.9,4.2,head);
      bx(7,1.4,4.6,accent2,0,4.9,0,torsoG);                    // syal
      tail=new THREE.Group();tail.position.set(0,1,-2);torsoG.add(tail);bx(1.6,1.6,4.4,skin,0,0,-2.2,tail);bx(1.6,1.6,1.6,accent,0,.9,-4.4,tail);
    }else if(sp.kind==="witch"){
      bx(10.6,.8,10.6,M(0x3b0764),0,7.9,0,head);                 // pinggiran topi
      cone(4.4,5.6,M(0x4c1d95),0,10.8,0,head,4).rotation.y=Math.PI/4;
      bx(8,1,8,accent,0,8.6,0,head);
      cone(1,1.6,M(0x4c1d95),1.1,14,0,head,4).rotation.z=-.5;
      const hair=M(0x7c3aed);bx(9.4,8.4,2.2,hair,0,3.6,-3.6,head);bx(2,6,2.4,hair,-4.7,2.6,-1,head);bx(2,6,2.4,hair,4.7,2.6,-1,head);
      [-1,1].forEach(s=>{bx(2.8,2.6,.4,M(0xfbbf24),s*2.1,faceY,4.3,head);bx(2.0,1.9,.5,M(0xbfe3ff),s*2.1,faceY,4.34,head)});
      bx(1,.4,.4,M(0xfbbf24),0,faceY+.3,4.3,head);
      bx(7,2.4,4.6,body,0,-.3,0,torsoG);bx(1,3,.4,M(0xfbbf24),0,2,2.1,torsoG);
    }else if(sp.kind==="fox"){
      const w=M(0xfff7ed);
      [-1,1].forEach(s=>{cone(2.2,3,skin,s*3,9.3,0,head).rotation.z=-s*.2;cone(1.1,1.8,dark,s*3.3,10.4,0,head).rotation.z=-s*.2});
      bx(9.2,2.8,2,w,0,1.8,3.5,head);bx(3.2,2.4,2.2,w,0,2.6,4.6,head);bx(1,.9,.5,dark,0,3.2,5.8,head);
      bx(8.6,1.6,.5,M(0x111827),0,6.4,3.2,head);                // kacamata hitam di dahi
      bx(1.2,1.2,.4,M(0x111827),-2.2,6.4,3.5,head);
      bx(1.2,3.6,.4,accent2,0,3.4,2.1,torsoG);bx(1.8,1,.5,accent2,0,4.1,2.1,torsoG);    // dasi
      tail=new THREE.Group();tail.position.set(0,1.6,-2);torsoG.add(tail);bx(2.2,2.2,4.6,skin,0,0,-2.4,tail);bx(2.4,2.4,1.8,w,0,0,-5.2,tail);
    }else if(sp.kind==="turtle"){
      const sh=M(0xd97706),sh2=M(0xfbbf24);
      bx(8,6,3.2,sh,0,2.4,-3.4,torsoG);bx(6,4,.5,sh2,0,2.4,-5.2,torsoG);bx(2,2,.5,sh,0,2.4,-5.5,torsoG);
      bx(6.4,1.2,.4,accent2,0,1.0,2.05,torsoG);
      bx(1.6,1.6,.5,M(0xfbbf24),3.2,9.2,2.6,head);bx(.7,.7,.4,M(0xd97706),3.2,9.2,2.9,head);   // koin penjepit
      bx(3,2,.5,M(0xfda4af),0,faceY-3,4.0,head);
    }else if(sp.kind==="parrot"){
      const beak=M(0xfbbf24);
      bx(3.2,1.8,2.6,beak,0,faceY-1.4,5,head);bx(2.4,1.2,2.2,M(0xf59e0b),0,faceY-2.6,4.7,head);
      [-1,0,1].forEach((s,i)=>{const f=bx(1.6,2.8,1.2,i===1?M(0x2563eb):M(0xfacc15),s*1.8,9.2+(i===1?.6:0),-.5,head);f.rotation.z=-s*.35});
      bx(4.4,3,.4,M(0xffffff),-2.1,faceY+.1,3.98,head);bx(4.4,3,.4,M(0xffffff),2.1,faceY+.1,3.98,head);
      bx(8,3.8,.6,M(0x93c5fd),0,.9,2.15,torsoG);
      tail=new THREE.Group();tail.position.set(0,.5,-2);torsoG.add(tail);bx(1.6,1.2,4.4,M(0x2563eb),0,0,-2.2,tail);bx(1.6,1.2,2.6,M(0xef4444),0,.1,-5,tail);
    }
    if(girl&&sp.kind!=="witch"){bx(2,1.6,1,accent,-1.5,8.4,3.2,head);bx(2,1.6,1,accent,1.5,8.4,3.2,head);bx(1,1.2,1.2,accent2,0,8.4,3.3,head)}
    return {k,root,hips,torsoG,neck,head,L,R,aL,aR,mug,eyes,mouth,eyeM,tail,sp,
      x:0,y:0,yaw:0,loc:"",path:[],wait:0,init:false,ph:Math.random()*6,cur:{},
      act:"type",actEnd:0,lastStretch:0,nextBlink:1,blinkT:0,laughEnd:0,nextLaugh:6,wander:0,wTarget:null,size:70};
  }

  /* ---------- laptop 3D (punggung layar menghadap penonton) ---------- */
  const LAPK=["price","safety","analyst","trader"],LAPY=5.0,LAPZ=3.2;
  function buildLap(c1){
    const g=new THREE.Group(),s=new THREE.Group();s.scale.setScalar(SC);g.add(s);
    bx(6.6,.4,4.4,M(0x94a3b8),0,LAPY,LAPZ,s);
    const lid=new THREE.Group();lid.position.set(0,LAPY+.2,LAPZ+2.1);lid.rotation.x=-.3;s.add(lid);
    bx(6.6,3.6,.4,M(0x475569),0,1.8,0,lid);bx(1.1,1.1,.2,M(parseInt(c1.slice(1),16)),0,1.9,.3,lid);
    return g;
  }
  /* ---------- sistem aktor ---------- */
  const SEATUP=10;
  const ROOMKEYS=["price","safety","analyst","wallet","trader","ledger"];
  const COL={price:["#38bdf8","#0ea5e9",0],safety:["#f87171","#dc2626",1],analyst:["#a78bfa","#7c3aed",1],wallet:["#fbbf24","#d97706",0],trader:["#4ade80","#16a34a",0],ledger:["#f472b6","#db2777",1]};
  const actors={};
  ROOMKEYS.forEach(k=>{const c=COL[k];const a=build(k,c[0],c[1],c[2]);actors[k]=a;scene.add(a.root)});
  const laps=[];
  LAPK.forEach(k=>{const g=buildLap(COL[k][0]);scene.add(g);g.visible=false;laps.push({k,g,type:"desk"});
    const g2=buildLap(COL[k][0]);scene.add(g2);g2.visible=false;laps.push({k,g:g2,type:"meet"})});
  const H=document.querySelector(".housewrap");
  let cw=0,ch=0,last=0,frame=0,ready=false;
  const actors_all=[];ROOMKEYS.forEach(k=>actors_all.push(actors[k].root));laps.forEach(l=>actors_all.push(l.g));

  function homeOf(k,hb){
    const s=document.querySelector('.scene[data-k="'+k+'"]');if(!s)return null;
    const r=s.getBoundingClientRect();return {x:r.left+r.width/2-hb.left,y:r.bottom-15-hb.top-3};
  }
  function anchorOf(k,hb){
    const el=document.querySelector('.walker[data-k="'+k+'"]');if(!el)return null;
    const r=el.getBoundingClientRect();if(!r.width)return null;
    const loc=el.closest(".kslot")?"kitchen":el.closest(".mseat")?"meet":"desk";
    let x=r.left+r.width/2-hb.left,y=r.bottom-hb.top-3;
    if(loc==="desk"){const h=homeOf(k,hb);if(h){x=h.x;y=h.y}}          // posisi duduk = lantai depan meja
    return {x,y,loc,mood:(el.className.match(/(working|alert|idle|waiting)/)||[])[1]||"idle"};
  }
  const lerpA=(a,b,t)=>{let d=((b-a+Math.PI)%(2*Math.PI)+2*Math.PI)%(2*Math.PI)-Math.PI;return a+d*t};
  const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));

  function pickAct(a,t,mood){
    const r=Math.random();
    if(mood==="alert"){a.act="alert";a.actEnd=t+4;return}
    if(t-a.lastStretch>22&&r<.12){a.act="stretch";a.actEnd=t+2;a.lastStretch=t}
    else if(r<.3){a.act="think";a.actEnd=t+2.2+Math.random()*1.6}
    else if(r<.45){a.act="glance";a.actEnd=t+1.6+Math.random()}
    else{a.act="type";a.actEnd=t+3+Math.random()*4}
  }

  function targetPose(a,t,mode,ctx){
    const T={hipsY:0,lean:0,twist:0,hx:0,hy:0,hz:0,lx:0,lz:0,lf:0,rx:0,rz:0,rf:0,lth:0,lsh:0,rth:0,rsh:0,mouth:0,tail:0};
    const ph=a.ph,mood=ctx.mood;
    if(mode==="walk"){
      const p=a.ph;const s=Math.sin(p),c=Math.cos(p);
      T.hipsY=Math.abs(c)*.45;T.lean=.1;T.hx=.03;
      T.lth=s*.8;T.rth=-s*.8;T.lsh=Math.max(0,-s)*.9;T.rsh=Math.max(0,s)*.9;
      T.lx=-s*.65;T.rx=s*.65;T.lz=.08;T.rz=.08;T.lf=-.25-(s>0?.15:0);T.rf=-.25-(s<0?.15:0);
      if(a.loc==="kitchen"&&a.mug){T.rx=-.8;T.rf=-1.5}
      T.tail=Math.sin(t*6)*.3;
    }else if(mode==="seat"||mode==="meet"){
      T.hipsY=mode==="meet"?.6:-1.3;T.lth=T.rth=-1.5;T.lsh=T.rsh=1.5;T.lean=.1+Math.sin(t*.7+ph)*.03;T.tail=Math.sin(t*2+ph)*.25;
      if(Math.sin(t*.9+ph)>.93){T.lsh=1.2}                       // kaki mengetuk
      const act=a.act;
      const speak=ctx.speaking;
      if(mode==="meet"){
        if(speak){
          T.lx=-.9+Math.sin(t*3.1)*.35;T.lf=-1.1+Math.sin(t*4.2)*.4;T.rx=-.9+Math.sin(t*2.7+1)*.35;T.rf=-1.1+Math.sin(t*3.6+2)*.4;
          T.lz=.2;T.rz=.2;T.mouth=.5+.5*Math.abs(Math.sin(t*11));T.hx=.05+Math.sin(t*3)*.08;T.hy=Math.sin(t*1.3)*.2;
        }else{
          T.lx=-.55;T.lf=-1.15+Math.sin(t*11+ph)*.08;T.rx=-.55;T.rf=-1.15+Math.sin(t*10+ph)*.08;
          T.hy=ctx.look;T.hx=Math.max(0,Math.sin(t*1.6+ph*3)-.7)*.5;     // menoleh ke pembicara, sesekali mengangguk
        }
      }else if(act==="type"||act==="glance"){
        const f=mood==="waiting"?.4:1;
        T.lx=-.55+Math.sin(t*9+ph)*.06*f;T.lf=-1.15+Math.sin(t*13+ph)*.2*f;
        T.rx=-.55+Math.sin(t*10+ph+2)*.06*f;T.rf=-1.15+Math.sin(t*15+ph+1)*.2*f;
        T.hx=.14+Math.sin(t*2.4+ph)*.04;T.hy=act==="glance"?Math.sin((t-a.actEnd)*2)*.6:Math.sin(t*.5+ph)*.14;
      }else if(act==="think"){
        T.lx=-.55;T.lf=-1.15;T.rx=-.95;T.rf=-2.35;T.rz=-.05;
        T.hx=.12;T.hz=.14;T.hy=.2+Math.sin(t*.8)*.08;T.lean=.04;
      }else if(act==="stretch"){
        const u=Math.sin(clamp((a.actEnd-t)/2,0,1)*Math.PI);
        T.lx=T.rx=-2.9*u;T.lf=T.rf=-.3*u;T.lz=T.rz=.35*u;T.lean=-.25*u;T.hx=-.25*u;T.mouth=.8*u;
      }else if(act==="alert"){
        T.lx=-2.6;T.rx=-2.6;T.lz=.5+Math.sin(t*14)*.25;T.rz=.5-Math.sin(t*14)*.25;T.lf=T.rf=-.4;
        T.hy=Math.sin(t*20)*.3;T.hipsY=Math.abs(Math.sin(t*10))*.4;T.mouth=.6;
      }
      if(mood==="alert"&&mode==="seat"&&act!=="alert"){a.act="alert";a.actEnd=t+3}
    }else if(mode==="kitchen"){
      T.lth=Math.sin(t*.9+ph)*.04;T.rth=-T.lth;T.lean=Math.sin(t*1.1+ph)*.05;T.tail=Math.sin(t*3+ph)*.3;
      const cyc=(t*.2+ph*.3)%1;                                    // siklus minum ~5 dtk
      const sip=cyc<.18?cyc/.18:cyc<.4?1:cyc<.5?1-(cyc-.4)/.1:0;
      T.rx=-.9-sip*.5;T.rf=-1.5-sip*.7;T.hx=-sip*.2;
      const speak=ctx.speaking,laugh=t<a.laughEnd;
      if(speak){T.lx=-.7+Math.sin(t*3.3)*.5;T.lf=-.9+Math.sin(t*4.1)*.5;T.lz=.25;T.mouth=.5+.5*Math.abs(Math.sin(t*11));T.hy=Math.sin(t*1.2)*.25}
      else{T.lx=Math.sin(t*1.5+ph)*.12;T.lf=-.15;T.hy=ctx.look;T.rz=.05}
      if(laugh){T.hipsY=Math.abs(Math.sin(t*18))*.35;T.hx=-.25;T.mouth=1;T.lean=-.1}
      if(a.wander>0)T.rx=-.85,T.rf=-1.4;
    }else{ // stand
      T.lth=T.rth=0;T.lx=Math.sin(t*1.6+ph)*.08;T.rx=-T.lx;T.hy=Math.sin(t*1.1+ph)*.3;
    }
    return T;
  }

  function step(a,dt,t,hb,speakers){
    const tg=anchorOf(a.k,hb);if(!tg)return false;
    if(tg.loc!=="kitchen")tg.y-=SEATUP;                                  // duduk di kursi: badan terangkat dari lantai
    if(!a.init){const h=homeOf(a.k,hb)||tg;a.x=h.x;a.y=h.y-SEATUP;a.loc="desk";a.init=true;a.yaw=0}
    /* tentukan tujuan, termasuk jalan-jalan kecil di dapur */
    let goal={x:tg.x,y:tg.y};
    if(tg.loc==="kitchen"&&a.loc==="kitchen"){
      if(t>a.wander&&!a.wTarget&&!a.path.length&&Math.hypot(a.x-tg.x,a.y-tg.y)<3&&Math.random()<dt*.12){
        const cm=document.querySelector(".kscene .kitem"),tb=document.querySelector(".ktable");
        const pts=[];
        if(cm){const r=cm.getBoundingClientRect();pts.push({x:r.left+r.width/2-hb.left+(Math.random()*16-8),y:tg.y})}
        if(tb){const r=tb.getBoundingClientRect();pts.push({x:r.left+r.width/2-hb.left-34+(Math.random()*10-5),y:tg.y})}
        if(pts.length){a.wTarget=pts[Math.floor(Math.random()*pts.length)];a.wander=1;a.path=[a.wTarget]}
      }
    }
    const gk=tg.loc+":"+Math.round(goal.x/3)+","+Math.round(goal.y/3);
    const moved=!a.wTarget&&gk!==a.gk&&Math.hypot(a.x-goal.x,a.y-goal.y)>4;
    if(moved){a.gk=gk;
      /* rute: berdiri -> keluar kursi -> ke depan tujuan -> masuk */
      const out=(a.loc==="desk"||a.loc==="meet")?[{x:a.x,y:a.y+SEATUP+2}]:[];
      const mid=[{x:goal.x,y:Math.max(a.y+(a.loc==="kitchen"?0:SEATUP),goal.y+(tg.loc==="kitchen"?0:SEATUP))+(tg.loc==="kitchen"?0:2)}];
      a.path=out.concat(mid,[goal]);a.wait=(a.loc==="desk"||a.loc==="meet")?.5:0;a.walkTo=tg.loc;
    }
    let mode="stand",vx=0,vy=0;
    if(a.wait>0){a.wait-=dt;mode="stand"}
    else if(a.path.length){
      const p=a.path[0],dx=p.x-a.x,dy=p.y-a.y,d=Math.hypot(dx,dy),sp=88;
      if(d<=sp*dt+.5){a.x=p.x;a.y=p.y;a.path.shift();
        if(!a.path.length){if(a.wTarget){a.wTarget=null;a.wander=t+5+Math.random()*7;a.path=[{x:tg.x,y:tg.y}]}else{a.loc=a.walkTo||tg.loc;a.wander=t+4+Math.random()*5}}
      }else{vx=dx/d;vy=dy/d;a.x+=vx*sp*dt;a.y+=vy*sp*dt;a.ph+=sp*dt*.26;mode="walk"}
    }else{
      a.x=tg.x;a.y=tg.y;
      if(a.wander>0&&t>a.wander&&a.loc==="kitchen"&&Math.hypot(a.x-tg.x,a.y-tg.y)<3)a.wander=0;
      mode=a.loc==="desk"?"seat":a.loc==="meet"?"meet":a.loc==="kitchen"?"kitchen":"stand";
    }
    if(mode==="seat"||mode==="meet"){if(t>a.actEnd)pickAct(a,t,tg.mood)}
    if(a.loc==="kitchen"&&t>a.nextLaugh){a.laughEnd=t+1.3;a.nextLaugh=t+7+Math.random()*9}
    /* menoleh ke pembicara */
    const sk=mode==="meet"?speakers.meet:mode==="kitchen"?speakers.kitchen:null;
    const sa=sk&&sk!==a.k?actors[sk]:null;
    const look=sa?clamp((sa.x-a.x)/90,-.75,.75):0;
    const ctx={mood:tg.mood,speaking:sk===a.k,look};
    const T=targetPose(a,t,mode,ctx);
    /* haluskan semua sendi */
    const rate=mode==="walk"?16:9,kf=1-Math.exp(-dt*rate),c=a.cur;
    for(const key in T){c[key]=(c[key]===undefined?T[key]:c[key]+(T[key]-c[key])*kf)}
    /* arah hadap */
    let yawT=0;
    if(mode==="walk")yawT=Math.atan2(vx,vy);
    else if(sa&&mode==="kitchen")yawT=look*.7;
    a.yaw=lerpA(a.yaw,yawT,1-Math.exp(-dt*(mode==="walk"?8:5)));
    /* terapkan */
    a.hips.position.y=5.1+c.hipsY;a.torsoG.rotation.x=c.lean;
    a.head.rotation.set(c.hx,c.hy,c.hz);
    a.L.th.rotation.x=c.lth;a.L.sh.rotation.x=c.lsh;a.R.th.rotation.x=c.rth;a.R.sh.rotation.x=c.rsh;
    a.aL.sh.rotation.set(c.lx,0,-c.lz);a.aL.el.rotation.x=c.lf;
    a.aR.sh.rotation.set(c.rx,0,c.rz);a.aR.el.rotation.x=c.rf;
    if(a.tail)a.tail.rotation.y=c.tail;
    a.mouth.scale.y=1+c.mouth*4;
    a.mug.visible=a.loc==="kitchen";
    a.root.rotation.y=a.yaw;
    /* kedip */
    if(t>a.nextBlink){a.blinkT=t;a.nextBlink=t+2.5+Math.random()*3.5}
    const bl=t-a.blinkT<.14?.1:1;a.eyes.forEach(e=>e.scale.y=bl);
    a.eyeM.color.set(tg.mood==="alert"&&a.sp.kind!=="robot"?0xef4444:a.sp.eye);
    a.size+=((mode==="walk"||a.loc==="kitchen"?80:a.loc==="meet"?70:66)-a.size)*(1-Math.exp(-dt*4));
    return true;
  }

  function loop(ms){
    requestAnimationFrame(loop);
    if(document.hidden||(++frame&1))return;
    const t=ms/1000,dt=Math.min(.1,last?t-last:.033);last=t;
    const hb=H.getBoundingClientRect();
    const w=Math.round(hb.width),h=Math.round(hb.height);
    if(!w||!h)return;
    if(w!==cw||h!==ch){cw=w;ch=h;renderer.setSize(w,h,false)}
    renderer.setScissorTest(false);renderer.setViewport(0,0,w,h);renderer.clear();renderer.setScissorTest(true);
    const sm=document.querySelector(".mseat.talk"),sk=document.querySelector(".kslot.talk");
    const speakers={meet:sm?sm.dataset.r:null,kitchen:sk?sk.dataset.r:null};
    const list=[];
    ROOMKEYS.forEach(k=>{const a=actors[k];a.root.visible=false;if(step(a,dt,t,hb,speakers)){a.root.visible=true;list.push(a)}});
    const items=list.map(a=>({y:a.y,size:Math.round(a.size),x:a.x,obj:a.root}));
    laps.forEach(l=>{
      let pos=null;
      if(l.type==="desk"){pos=homeOf(l.k,hb)}
      else{const m=document.querySelector('.mseat[data-r="'+l.k+'"]');if(m){const r=m.getBoundingClientRect();pos={x:r.left+r.width/2-hb.left,y:r.bottom-30-hb.top-3}}}
      if(pos)items.push({y:pos.y+1.5,size:66,x:pos.x,obj:l.g});
    });
    items.sort((p,q)=>p.y-q.y);
    items.forEach(it=>{
      const size=it.size,x=Math.round(it.x-size/2),y=Math.round(h-(it.y+FOOT*size));
      actors_all.forEach(o=>o.visible=false);it.obj.visible=true;
      renderer.setViewport(x,y,size,size);renderer.setScissor(x,y,size,size);renderer.render(scene,cam);
    });
    if(!ready){ready=true;document.body.classList.add("three")}
  }
  requestAnimationFrame(loop);
})();
