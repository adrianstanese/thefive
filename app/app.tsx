"use client";
import { useState, useEffect, useCallback, useRef, useMemo } from "react";

/* ═══════════════════════════════════════════════════════════════
   THEFIVE v6 — "Your definitive five."
   9 New Features: Morph Transitions, Aurora, Haptic Feedback,
   Spotlight, Rank Indicators, Share Cards, Leaderboards,
   Challenges, Wrapped
   ═══════════════════════════════════════════════════════════════ */

const F="'DM Sans',system-ui,-apple-system,sans-serif";
const Z={bg:{blur:"saturate(200%) blur(28px)"},content:{blur:"saturate(180%) blur(18px)"},float:{blur:"saturate(160%) blur(12px)"},r:22,rS:14,rXs:10};

/* ─── Logo ────────────────────────────────────────────────── */
const Logo=({size=24,color})=>(
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
    <rect x="4" y="28" width="6" height="16" rx="1" fill={color}/>
    <rect x="13" y="20" width="6" height="24" rx="1" fill={color}/>
    <rect x="22" y="12" width="6" height="32" rx="1" fill={color}/>
    <rect x="31" y="4" width="6" height="20" rx="1" fill={color}/>
    <rect x="31" y="26" width="6" height="4" rx="1" fill={color}/>
    <path d="M37 30 C37 30 44 30 44 37 C44 44 37 44 33 44 L31 44 L31 38 L33 38 C35 38 38 38 38 37 C38 35 35 34 33 34 L31 34 L31 30 Z" fill={color}/>
  </svg>
);

/* ─── Category Colors ─────────────────────────────────────── */
const CC={"Smartphones":["#3b82f6","#6366f1"],"Laptops":["#6366f1","#8b5cf6"],"Headphones":["#ec4899","#f43f5e"],"Cameras":["#f59e0b","#ef4444"],"Running Shoes":["#10b981","#059669"],"EDC Gear":["#d97706","#b45309"],"Coffee Gear":["#92400e","#78350f"],"Books":["#7c3aed","#6d28d9"],"Travel Gear":["#0891b2","#0e7490"],"Gaming":["#7c3aed","#4f46e5"],"Sneakers":["#f97316","#ea580c"],"Skincare":["#f0abfc","#d946ef"],"Kitchen Tools":["#ea580c","#c2410c"],"Cars":["#dc2626","#b91c1c"],"Home Office":["#475569","#334155"],"Albums":["#7c3aed","#6d28d9"],"Watches":["#0ea5e9","#0284c7"],"Outdoor Gear":["#16a34a","#15803d"],"Backpacks":["#78716c","#57534e"],"Wines":["#881337","#9f1239"]};
const cg=c=>{const v=CC[c]||["#1b6b6b","#2a9d9d"];return`linear-gradient(135deg,${v[0]},${v[1]})`;};

/* ─── Themes ──────────────────────────────────────────────── */
const TH={
  light:{id:"light",ic:"☀️",bg:"linear-gradient(145deg,#edf2fa,#e2eaf6,#d8e2f2,#d0daf0)",
    gBg:"rgba(255,255,255,0.32)",gC:"rgba(255,255,255,0.45)",gF:"rgba(255,255,255,0.62)",
    glow:"inset 0 0 8px rgba(27,107,107,0.06),inset 0 1px 0 rgba(255,255,255,0.9)",
    glowH:"inset 0 0 14px rgba(27,107,107,0.1),0 0 20px rgba(27,107,107,0.08)",
    glowA:"inset 0 0 20px rgba(27,107,107,0.15),0 0 30px rgba(27,107,107,0.12)",
    bd:"rgba(255,255,255,0.6)",bd2:"rgba(15,29,61,0.04)",sh:"0 0 30px rgba(27,107,107,0.04),0 8px 32px rgba(15,29,61,0.05)",
    tx:"#0f1d3d",t2:"#4a5578",t3:"#8892ab",
    ac:"#1b6b6b",acG:"linear-gradient(135deg,#1b6b6b,#2a9d9d)",acSh:"0 4px 24px rgba(27,107,107,0.3)",acS:"rgba(27,107,107,0.08)",acT:"#fff",
    ok:"#059669",er:"#dc2626",gold:"#f5a623",
    rankG:["#f5a623","#94a3b8","#cd7f32","#1b6b6b","#2a9d9d"],
    tagBg:"rgba(27,107,107,0.06)",tagBd:"rgba(27,107,107,0.14)",tagTx:"#1b6b6b",
    upBg:"rgba(5,150,105,0.1)",upTx:"#059669",dnBg:"rgba(220,38,38,0.07)",dnTx:"#dc2626",
    inBg:"rgba(255,255,255,0.5)",inBd:"rgba(15,29,61,0.1)",
    g1:"rgba(27,107,107,0.08)",g2:"rgba(27,61,61,0.06)",shimmer:"rgba(255,255,255,0.6)",
    badgeG:"linear-gradient(135deg,#1b6b6b,#1b3d3d)",matchG:"linear-gradient(135deg,#10b981,#059669)",
    verG:"linear-gradient(135deg,#f5a623,#ef4444)",modalOv:"rgba(15,29,61,0.18)",
    aurora1:"rgba(27,107,107,0.03)",aurora2:"rgba(27,61,61,0.02)",aurora3:"rgba(42,157,157,0.02)",
  },
  dark:{id:"dark",ic:"🌙",bg:"linear-gradient(145deg,#06091a,#0a0f22,#0e1428,#111a30)",
    gBg:"rgba(15,22,42,0.32)",gC:"rgba(15,22,42,0.45)",gF:"rgba(15,22,42,0.62)",
    glow:"inset 0 0 8px rgba(61,212,212,0.08),inset 0 1px 0 rgba(255,255,255,0.05)",
    glowH:"inset 0 0 14px rgba(61,212,212,0.14),0 0 20px rgba(61,212,212,0.08)",
    glowA:"inset 0 0 20px rgba(61,212,212,0.18),0 0 30px rgba(61,212,212,0.12)",
    bd:"rgba(61,212,212,0.12)",bd2:"rgba(61,212,212,0.04)",sh:"0 0 30px rgba(61,212,212,0.05),0 8px 32px rgba(0,0,0,0.25)",
    tx:"#e8ecf4",t2:"#8a96b0",t3:"#4c5b78",
    ac:"#3dd4d4",acG:"linear-gradient(135deg,#3dd4d4,#1b8a8a)",acSh:"0 4px 24px rgba(61,212,212,0.25)",acS:"rgba(61,212,212,0.1)",acT:"#fff",
    ok:"#34d399",er:"#fb7185",gold:"#fbbf24",
    rankG:["#fbbf24","#64748b","#cd7f32","#3dd4d4","#1b8a8a"],
    tagBg:"rgba(61,212,212,0.08)",tagBd:"rgba(61,212,212,0.18)",tagTx:"#3dd4d4",
    upBg:"rgba(52,211,153,0.12)",upTx:"#34d399",dnBg:"rgba(251,113,133,0.1)",dnTx:"#fb7185",
    inBg:"rgba(15,22,42,0.6)",inBd:"rgba(61,212,212,0.12)",
    g1:"rgba(61,212,212,0.06)",g2:"rgba(167,139,250,0.04)",shimmer:"rgba(61,212,212,0.15)",
    badgeG:"linear-gradient(135deg,#3dd4d4,#1b8a8a)",matchG:"linear-gradient(135deg,#34d399,#059669)",
    verG:"linear-gradient(135deg,#fbbf24,#fb7185)",modalOv:"rgba(0,0,0,0.5)",
    /* #4 Aurora colors for dark mode */
    aurora1:"rgba(61,212,212,0.04)",aurora2:"rgba(167,139,250,0.03)",aurora3:"rgba(251,113,133,0.02)",
  },
  pink:{id:"pink",ic:"🌸",bg:"linear-gradient(145deg,#fdf1f3,#fce4ea,#f8d9e1,#f4ced8)",
    gBg:"rgba(255,255,255,0.32)",gC:"rgba(255,255,255,0.45)",gF:"rgba(255,255,255,0.62)",
    glow:"inset 0 0 8px rgba(232,70,109,0.06),inset 0 1px 0 rgba(255,255,255,0.9)",
    glowH:"inset 0 0 14px rgba(232,70,109,0.1),0 0 20px rgba(232,70,109,0.08)",
    glowA:"inset 0 0 20px rgba(232,70,109,0.15),0 0 30px rgba(232,70,109,0.12)",
    bd:"rgba(255,230,240,0.6)",bd2:"rgba(180,40,80,0.04)",sh:"0 0 30px rgba(232,70,109,0.04),0 8px 32px rgba(180,40,80,0.04)",
    tx:"#4a1025",t2:"#7a3a55",t3:"#b07088",
    ac:"#e8466d",acG:"linear-gradient(135deg,#e8466d,#f472b6)",acSh:"0 4px 24px rgba(232,70,109,0.3)",acS:"rgba(232,70,109,0.08)",acT:"#fff",
    ok:"#059669",er:"#dc2626",gold:"#f5a623",
    rankG:["#f5a623","#b07088","#cd7f32","#e8466d","#9333ea"],
    tagBg:"rgba(232,70,109,0.06)",tagBd:"rgba(232,70,109,0.14)",tagTx:"#e8466d",
    upBg:"rgba(5,150,105,0.08)",upTx:"#059669",dnBg:"rgba(220,38,38,0.06)",dnTx:"#dc2626",
    inBg:"rgba(255,255,255,0.5)",inBd:"rgba(180,40,80,0.1)",
    g1:"rgba(232,70,109,0.06)",g2:"rgba(147,51,234,0.04)",shimmer:"rgba(255,255,255,0.6)",
    badgeG:"linear-gradient(135deg,#e8466d,#1b6b6b)",matchG:"linear-gradient(135deg,#10b981,#059669)",
    verG:"linear-gradient(135deg,#f5a623,#e8466d)",modalOv:"rgba(74,16,37,0.15)",
    aurora1:"rgba(232,70,109,0.03)",aurora2:"rgba(147,51,234,0.02)",aurora3:"rgba(245,166,35,0.02)",
  }
};

const CATS=[{n:"Smartphones",i:"📱"},{n:"Laptops",i:"💻"},{n:"Headphones",i:"🎧"},{n:"Cameras",i:"📷"},{n:"Running Shoes",i:"🏃"},{n:"EDC Gear",i:"🔪"},{n:"Coffee Gear",i:"☕"},{n:"Books",i:"📚"},{n:"Travel Gear",i:"✈️"},{n:"Gaming",i:"🎮"},{n:"Sneakers",i:"👟"},{n:"Skincare",i:"✨"},{n:"Kitchen Tools",i:"🍳"},{n:"Cars",i:"🚗"},{n:"Home Office",i:"🖥️"},{n:"Albums",i:"🎵"},{n:"Watches",i:"⏱️"},{n:"Outdoor Gear",i:"⛺"},{n:"Backpacks",i:"🎒"},{n:"Wines",i:"🍷"}];

/* ─── Badges ──────────────────────────────────────────────── */
const BADGES=[{id:"first",n:"First Five",i:"🎯"},{id:"trusted",n:"Trusted",i:"💎"},{id:"trendsetter",n:"Trend Setter",i:"🚀"},{id:"collector",n:"Collector",i:"🗂️"},{id:"influencer",n:"Influencer",i:"⚡"},{id:"streak7",n:"7-Day Streak",i:"🔥"},{id:"champ",n:"Champion",i:"👑"},{id:"challenger",n:"Challenger",i:"🏅"}];

/* ─── #9: Rank Change Data ────────────────────────────────── */
const RANK_CHANGES={"Benchmade 940 Osborne":{d:2,isNew:false,streak:6},"SpyderCo Para 3":{d:0,isNew:false,streak:0},"Fellow Ode Gen 2":{d:3,isNew:false,streak:4},"Sony WH-1000XM6":{d:-1,isNew:false,streak:0},"Nike Pegasus 41":{d:1,isNew:false,streak:3},"MacBook Pro M4 Pro":{d:0,isNew:false,streak:12},"Peak Design Travel 45L":{d:5,isNew:true,streak:0},"Hario V60 02":{d:-2,isNew:false,streak:0}};

/* ─── #12: Monthly Challenges ─────────────────────────────── */
const CHALLENGES=[
  {id:"ch1",title:"May Coffee Challenge",icon:"☕",desc:"Community goal: 50 new Coffee Gear lists",cat:"Coffee Gear",goal:50,current:34,endDate:"2026-05-31",badge:"challenger",participants:89},
  {id:"ch2",title:"Summer Running Sprint",icon:"🏃",desc:"100 Running Shoes lists by June",cat:"Running Shoes",goal:100,current:67,endDate:"2026-06-30",badge:"challenger",participants:156},
  {id:"ch3",title:"Tech Tuesday",icon:"📱",desc:"Rate 10 tech products this month",cat:"Smartphones",goal:200,current:178,endDate:"2026-05-15",badge:"streak7",participants:234},
];

/* ─── Users & Lists ───────────────────────────────────────── */
const USERS=[
  {id:"u1",name:"Adrian S.",handle:"@adriancs",av:"https://api.dicebear.com/8.x/notionists/svg?seed=Adrian&backgroundColor=c0aede",bio:"Tech · EDC · Coffee.",cats:["Smartphones","EDC Gear","Coffee Gear"],followers:847,taste:94,memberNo:1,badges:["first","trusted","collector","influencer","champ"],verified:"tech",fourFavs:["Benchmade 940 Osborne","MacBook Pro M4 Pro","Fellow Ode Gen 2","Peak Design Travel 45L"]},
  {id:"u2",name:"Sophia L.",handle:"@sophial",av:"https://api.dicebear.com/8.x/notionists/svg?seed=Sophia&backgroundColor=b6e3f4",bio:"Running coach & coffee snob.",cats:["Coffee Gear","Books","Running Shoes"],followers:1203,taste:97,memberNo:2,badges:["first","trusted","trendsetter","streak7","challenger"],verified:"fitness",fourFavs:["Fellow Ode Gen 2","Nike Pegasus 41","Hario V60 02","ASICS Gel-Nimbus 26"]},
  {id:"u3",name:"Marcus T.",handle:"@marcust",av:"https://api.dicebear.com/8.x/notionists/svg?seed=Marcus&backgroundColor=ffd5dc",bio:"Full-stack dev. Audio obsessed.",cats:["Laptops","Headphones","Gaming"],followers:562,taste:88,memberNo:3,badges:["first","trusted"],verified:"audio",fourFavs:["Sony WH-1000XM6","MacBook Pro M4 Pro","Sennheiser HD 660S2","AirPods Pro 3"]},
  {id:"u4",name:"Elena R.",handle:"@elenar",av:"https://api.dicebear.com/8.x/notionists/svg?seed=Elena&backgroundColor=d1d4f9",bio:"Marathon runner.",cats:["Running Shoes","Coffee Gear"],followers:934,taste:92,memberNo:4,badges:["first","trusted","streak7"],verified:null,fourFavs:["Nike Pegasus 41","ASICS Gel-Nimbus 26","Fellow Stagg EKG","iPhone 17 Pro"]},
  {id:"u5",name:"David K.",handle:"@davidk",av:"https://api.dicebear.com/8.x/notionists/svg?seed=David&backgroundColor=c1f0db",bio:"Travel photographer.",cats:["Travel Gear","Cameras"],followers:1567,taste:96,memberNo:5,badges:["first","trusted","trendsetter","collector","influencer","champ"],verified:"travel",fourFavs:["Peak Design Travel 45L","Sony A7IV","Aer Travel Pack 3","Osprey Farpoint 40"]},
];

const mk=(id,n,r,u,d,p,l)=>({id,name:n,review:r,up:u,dn:d,photo:p,link:l});
const LISTS=[
  {id:"l1",userId:"u1",cat:"EDC Gear",title:"My Top 5 EDC Knives",up:234,dn:12,date:"2026-04-14T10:30:00Z",spotlight:false,items:[
    mk("i1","Benchmade 940 Osborne","Perfect balance — razor-sharp S30V. 3-year daily carry.",189,5,"https://images.unsplash.com/photo-1602584386113-7ceab31a06ba?w=120&h=120&fit=crop","https://benchmade.com"),
    mk("i2","SpyderCo Para 3","Compression lock is addictive. Unbeatable ergonomics.",145,8,"https://images.unsplash.com/photo-1615667751974-98e52c166e66?w=120&h=120&fit=crop","https://spyderco.com"),
    mk("i3","Acta Non Verba Z100","Czech engineering. Tank-like build, sleek package.",112,3,"https://images.unsplash.com/photo-1587556930799-8e42e6c1f773?w=120&h=120&fit=crop","https://anvknives.com"),
    mk("i4","Civivi Elementum","Best value under $60. D2 steel holds edge.",98,11,"https://images.unsplash.com/photo-1586075574049-4150e0c5b5e9?w=120&h=120&fit=crop","https://civivi.com"),
    mk("i5","Kershaw Leek","Slim, fast, assisted. Gentleman's EDC.",76,6,"https://images.unsplash.com/photo-1568702846914-96b305d2aaeb?w=120&h=120&fit=crop","https://kershaw.kaiusa.com"),
  ]},
  {id:"l2",userId:"u2",cat:"Coffee Gear",title:"My Top 5 Coffee Setup",up:187,dn:8,date:"2026-04-14T08:15:00Z",spotlight:true,items:[
    mk("i6","Fellow Ode Gen 2","Looks as good as it performs. Pour-over revolution.",201,4,"https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=120&h=120&fit=crop","https://fellowproducts.com"),
    mk("i7","Hario V60 02","Simple elegance. Unbeatable cup clarity.",178,6,"https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?w=120&h=120&fit=crop","https://hario.com"),
    mk("i8","Acaia Pearl Scale","0.1g precision + timer. Every brew repeatable.",134,9,"https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=120&h=120&fit=crop","https://acaia.co"),
    mk("i9","Fellow Stagg EKG","Temp hold + pour control. Beautiful kettle.",156,3,"https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=120&h=120&fit=crop","https://fellowproducts.com"),
    mk("i10","Baratza Encore ESP","Reliable espresso workhorse. Just works.",89,14,"https://images.unsplash.com/photo-1498804103079-a6351b050096?w=120&h=120&fit=crop","https://baratza.com"),
  ]},
  {id:"l3",userId:"u3",cat:"Headphones",title:"My Top 5 Headphones",up:312,dn:19,date:"2026-04-13T16:45:00Z",spotlight:false,items:[
    mk("i11","Sony WH-1000XM6","Best ANC on the planet. 40hr battery.",287,15,"https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=120&h=120&fit=crop","https://sony.com"),
    mk("i12","Sennheiser HD 660S2","Open-back perfection for critical listening.",178,5,"https://images.unsplash.com/photo-1599669454699-248893623440?w=120&h=120&fit=crop","https://sennheiser.com"),
    mk("i13","AirPods Max 2","Spatial audio is magical. Jewelry-grade.",145,19,"https://images.unsplash.com/photo-1625245488600-f03fef636a3c?w=120&h=120&fit=crop","https://apple.com/airpods-max"),
    mk("i14","Beyerdynamic DT 900 Pro X","Studio ref at affordable price.",123,4,"https://images.unsplash.com/photo-1583394838336-acd977736f90?w=120&h=120&fit=crop","https://beyerdynamic.com"),
    mk("i15","Shure AONIC 50 Gen 2","Warm, detailed, 8hr comfort.",89,7,"https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=120&h=120&fit=crop","https://shure.com"),
  ]},
  {id:"l4",userId:"u4",cat:"Running Shoes",title:"My Top 5 Running Shoes",up:198,dn:14,date:"2026-04-12T14:20:00Z",spotlight:false,items:[
    mk("i16","Nike Pegasus 41","500km still fresh. React foam perfection.",176,9,"https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=120&h=120&fit=crop","https://nike.com"),
    mk("i17","ASICS Gel-Nimbus 26","Cloud cushioning for 20km+ sessions.",145,7,"https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=120&h=120&fit=crop","https://asics.com"),
    mk("i18","Hoka Clifton 9","Lightweight rocker. Effortless easy runs.",134,11,"https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=120&h=120&fit=crop","https://hoka.com"),
    mk("i19","NB FuelCell RC Elite","Carbon plate: -4min half marathon.",112,5,"https://images.unsplash.com/photo-1539185441755-769473a23570?w=120&h=120&fit=crop","https://newbalance.com"),
    mk("i20","Brooks Ghost 16","Smooth transitions. Recovery perfection.",98,8,"https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?w=120&h=120&fit=crop","https://brooksrunning.com"),
  ]},
  {id:"l5",userId:"u5",cat:"Travel Gear",title:"My Top 5 Travel Backpacks",up:267,dn:11,date:"2026-04-11T09:00:00Z",spotlight:false,items:[
    mk("i21","Peak Design Travel 45L","Opens like suitcase. 40 countries survived.",231,7,"https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=120&h=120&fit=crop","https://peakdesign.com"),
    mk("i22","Aer Travel Pack 3","Sleek urban meets serious travel.",187,9,"https://images.unsplash.com/photo-1622560480654-d96214fddae9?w=120&h=120&fit=crop","https://aersf.com"),
    mk("i23","Osprey Farpoint 40","Gold standard carry-on.",165,12,"https://images.unsplash.com/photo-1581791534721-e599df4417f6?w=120&h=120&fit=crop","https://osprey.com"),
    mk("i24","Bellroy Transit","Premium materials. Best looking.",134,6,"https://images.unsplash.com/photo-1585916420730-d7f95e942d43?w=120&h=120&fit=crop","https://bellroy.com"),
    mk("i25","Tortuga Outbreaker 35L","Max packing, min footprint.",98,4,"https://images.unsplash.com/photo-1544816155-12df9643f363?w=120&h=120&fit=crop","https://tortugabackpacks.com"),
  ]},
];

/* ─── #11: Leaderboard Calculator ─────────────────────────── */
const getLeaderboard=(cat)=>{
  const scores={};
  LISTS.filter(l=>l.cat===cat).forEach(l=>{
    const u=USERS.find(x=>x.id===l.userId);
    if(u) scores[u.id]=(scores[u.id]||0)+l.up;
  });
  return Object.entries(scores).sort((a,b)=>b[1]-a[1]).map(([uid,score],i)=>({...USERS.find(u=>u.id===uid),score,rank:i+1}));
};

/* ─── Helpers ─────────────────────────────────────────────── */
const timeAgo=d=>{const s=Math.floor((Date.now()-new Date(d).getTime())/1000);if(s<60)return "now";if(s<3600)return Math.floor(s/60)+"m";if(s<86400)return Math.floor(s/3600)+"h";return Math.floor(s/86400)+"d";};
const tasteMatch=(u1,u2)=>{const s=u1.cats.filter(c=>u2.cats.includes(c)).length;const t=new Set([...u1.cats,...u2.cats]).size;const cs=t?s/t:0;const f1=u1.fourFavs||[];const f2=u2.fourFavs||[];const fs=f1.filter(f=>f2.includes(f)).length/4;return Math.round(cs*60+fs*40);};

/* ═══════════════════════════════════════════════════════════════
   COMPONENTS
   ═══════════════════════════════════════════════════════════════ */
const RankBadge=({rank,th,size=24})=> <div style={{width:size,height:size,borderRadius:size/2,display:"flex",alignItems:"center",justifyContent:"center",background:rank===1?`linear-gradient(135deg,${th.rankG[0]},#fcd34d)`:th.rankG[rank-1]||th.t3,color:"#fff",fontSize:size*.46,fontWeight:800,fontFamily:F,flexShrink:0,boxShadow:rank===1?`0 2px 12px ${th.rankG[0]}55`:"none"}}>{rank}</div>;
const Tag=({text,th})=> <span style={{display:"inline-block",padding:"4px 12px",borderRadius:20,fontSize:11,fontWeight:600,background:th.id==="dark"?"rgba(255,255,255,0.06)":"#fff",color:th.tagTx,fontFamily:F,boxShadow:`0 1px 4px ${th.id==="dark"?"rgba(0,0,0,0.15)":"rgba(0,0,0,0.04)"}`}}>{text}</span>;
const Thumb=({src,size=40})=> <div style={{width:size,height:size,borderRadius:size*.22,overflow:"hidden",flexShrink:0,background:"#f1f5f9",border:"1px solid rgba(0,0,0,0.06)"}}><img src={src} alt="" style={{width:"100%",height:"100%",objectFit:"cover",display:"block"}} onError={e=>{e.target.style.display="none";}}/></div>;
const MBadge=({no,th})=> <span style={{display:"inline-flex",alignItems:"center",gap:3,padding:"2px 8px",borderRadius:12,background:th.badgeG,color:"#fff",fontSize:10,fontWeight:800,fontFamily:F}}>✦ #{String(no).padStart(3,"0")}</span>;
const GBtn=({children,th,primary,small,onClick,style:s={}})=> <button onClick={onClick} style={{padding:small?"8px 18px":"10px 24px",borderRadius:24,border:"none",
  background:primary?th.acG:(th.id==="dark"?"rgba(255,255,255,0.06)":"#fff"),
  color:primary?th.acT:(th.id==="dark"?th.t2:th.tx),
  fontSize:small?12:14,fontWeight:700,fontFamily:F,cursor:"pointer",
  boxShadow:primary?`0 4px 16px ${th.ac}35`:`0 1px 4px ${th.id==="dark"?"rgba(0,0,0,0.2)":"rgba(0,0,0,0.05)"}`,
  transition:"all 0.2s",...s}}>{children}</button>;

/* ─── #5: Haptic Vote Button with ripple ──────────────────── */
const VoteBtn=({type,count,active,onClick,th,small,disabled})=>{
  const[anim,setAnim]=useState(false);
  const[ripple,setRipple]=useState(false);
  const u=type==="up";
  const click=()=>{if(disabled)return;setAnim(true);setRipple(true);setTimeout(()=>{setAnim(false);setRipple(false);},500);onClick?.();};
  return <button onClick={click} style={{
    display:"inline-flex",alignItems:"center",gap:4,position:"relative",overflow:"hidden",
    padding:small?"3px 8px":"5px 12px",borderRadius:20,
    border:`1px solid ${active?(u?`${th.ok}30`:`${th.er}30`):th.bd}`,
    background:active?(u?th.upBg:th.dnBg):th.gC,color:active?(u?th.upTx:th.dnTx):th.t3,
    fontSize:small?11:12,fontWeight:600,fontFamily:F,cursor:disabled?"not-allowed":"pointer",
    opacity:disabled?.5:1,backdropFilter:Z.float.blur,transition:"all 0.2s",
    boxShadow:active?th.glowA:th.glow,
    transform:anim?(u?"scale(1.2)":"scale(0.85)"):"scale(1)",
  }}>
    {/* #5 Ripple effect */}
    {ripple && <div style={{position:"absolute",inset:0,borderRadius:20,background:u?`radial-gradient(circle,${th.ok}30 0%,transparent 70%)`:`radial-gradient(circle,${th.er}30 0%,transparent 70%)`,animation:"rippleOut 0.5s ease-out forwards",pointerEvents:"none"}}/>}
    {u?"👍":"👎"} {count}
  </button>;
};

/* ─── #9: Rank Change Indicator ───────────────────────────── */
const RankChange=({name,th})=>{
  const rc=RANK_CHANGES[name];
  if(!rc)return null;
  if(rc.isNew)return <span style={{padding:"1px 6px",borderRadius:8,background:`${th.ac}15`,color:th.ac,fontSize:9,fontWeight:800,animation:"fadeIn 0.3s ease"}}>NEW ✨</span>;
  if(rc.streak>=4)return <span style={{fontSize:10,color:th.gold,fontWeight:800}} title={`#1 for ${rc.streak} weeks`}>🔥{rc.streak}w</span>;
  if(rc.d>0)return <span style={{fontSize:10,color:th.ok,fontWeight:800}}>↑{rc.d}</span>;
  if(rc.d<0)return <span style={{fontSize:10,color:th.er,fontWeight:700}}>↓{Math.abs(rc.d)}</span>;
  return null;
};

/* ═══════════════════════════════════════════════════════════════
   #8: SPOTLIGHT CARD
   ═══════════════════════════════════════════════════════════════ */
const SpotlightCard=({list,th,onOpen})=>{
  const u=USERS.find(x=>x.id===list.userId);
  return <div onClick={onOpen} style={{borderRadius:Z.r,overflow:"hidden",marginBottom:16,cursor:"pointer",position:"relative",
    border:`2px solid ${th.gold}50`,boxShadow:`0 0 40px ${th.gold}15,${th.sh}`,
  }}>
    {/* Golden glow overlay */}
    <div style={{position:"absolute",inset:0,background:`linear-gradient(135deg,${th.gold}08,transparent 60%)`,pointerEvents:"none",zIndex:1}}/>
    <div style={{position:"absolute",top:10,left:12,zIndex:2,display:"flex",alignItems:"center",gap:6}}>
      <span style={{padding:"4px 12px",borderRadius:20,background:`linear-gradient(135deg,${th.gold},#fcd34d)`,color:"#fff",fontSize:11,fontWeight:800,boxShadow:`0 2px 10px ${th.gold}40`}}>✦ Weekly Spotlight</span>
    </div>
    <div style={{background:cg(list.cat),padding:"44px 16px 14px",position:"relative",overflow:"hidden"}}>
      <div style={{position:"absolute",top:"-40%",right:"-20%",width:"70%",height:"140%",background:"radial-gradient(circle,rgba(255,255,255,0.12),transparent 70%)",pointerEvents:"none"}}/>
      <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:8,position:"relative",zIndex:1}}>
        <div style={{width:36,height:36,borderRadius:18,overflow:"hidden",background:"rgba(255,255,255,0.18)",backdropFilter:"blur(12px)"}}><img src={u?.av} style={{width:"100%",height:"100%",objectFit:"cover"}}/></div>
        <div><div style={{fontSize:14,fontWeight:700,color:"#fff"}}>{u?.name}</div><div style={{fontSize:11,color:"rgba(255,255,255,0.6)"}}>{u?.handle} · {list.cat}</div></div>
      </div>
      <div style={{fontSize:20,fontWeight:800,color:"#fff",position:"relative",zIndex:1}}>{list.title}</div>
    </div>
    <div style={{background:th.gC,backdropFilter:Z.content.blur,padding:"6px 14px 10px"}}>
      {list.items.slice(0,3).map((it,j)=> <div key={j} style={{display:"flex",alignItems:"center",gap:8,padding:"6px 0",borderBottom:j<2?`1px solid ${th.bd2}`:"none"}}>
        <RankBadge rank={j+1} th={th} size={22}/><Thumb src={it.photo} size={34}/>
        <div style={{flex:1}}><span style={{fontSize:13,fontWeight:700,color:th.tx}}>{it.name}</span></div>
        <RankChange name={it.name} th={th}/>
      </div>)}
      <div style={{fontSize:11,color:th.t3,marginTop:4}}>+2 more · 👍 {list.up} · tap to see full list →</div>
    </div>
  </div>;
};

/* ═══════════════════════════════════════════════════════════════
   SHOWCASE CARD (with #9 indicators + #5 haptic)
   ═══════════════════════════════════════════════════════════════ */
function ShowcaseCard({list,user,th,onOpen,onProfile,votes,onVote,loggedIn,authGate}){
  const[tilt,setTilt]=useState({x:0,y:0});
  const ref=useRef(null);
  const lv=votes[list.id]||{};
  const gv=(lid,k,v)=>{if(!loggedIn){authGate();return;}onVote(lid,k,v);};
  const handleMove=useCallback(e=>{if(!ref.current)return;const r=ref.current.getBoundingClientRect();setTilt({x:((e.clientX-r.left)/r.width-.5)*6,y:((e.clientY-r.top)/r.height-.5)*-6});},[]);

  return <div ref={ref} onMouseMove={handleMove} onMouseLeave={()=>setTilt({x:0,y:0})}
    style={{borderRadius:Z.r,overflow:"hidden",marginBottom:14,border:`1px solid ${th.bd}`,boxShadow:th.sh,
      transform:`perspective(800px) rotateY(${tilt.x}deg) rotateX(${tilt.y}deg)`,transition:"transform 0.15s ease-out",
    }}>
    <div style={{background:cg(list.cat),padding:"16px 16px 12px",position:"relative",overflow:"hidden"}}>
      <div style={{position:"absolute",top:"-50%",right:"-30%",width:"80%",height:"160%",background:"radial-gradient(circle,rgba(255,255,255,0.10),transparent 70%)",pointerEvents:"none",transform:`translate(${tilt.x*3}px,${tilt.y*3}px)`,transition:"transform 0.15s"}}/>
      <div style={{position:"absolute",top:12,right:14,zIndex:1}}>
        <span style={{padding:"3px 10px",borderRadius:20,background:"rgba(255,255,255,0.18)",color:"#fff",fontSize:11,fontWeight:600,backdropFilter:"blur(12px)"}}>{list.cat}</span>
      </div>
      <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:8,position:"relative",zIndex:1}}>
        <div onClick={e=>{e.stopPropagation();onProfile?.();}} style={{width:36,height:36,borderRadius:18,overflow:"hidden",cursor:"pointer",background:"rgba(255,255,255,0.18)",backdropFilter:"blur(12px)"}}><img src={user?.av} style={{width:"100%",height:"100%",objectFit:"cover"}} onError={e=>{e.target.style.display="none";}}/></div>
        <div><div style={{display:"flex",alignItems:"center",gap:4}}>
          <span onClick={e=>{e.stopPropagation();onProfile?.();}} style={{fontSize:13,fontWeight:700,color:"#fff",cursor:"pointer"}}>{user?.name}</span>
          <MBadge no={user?.memberNo||1} th={{...th,badgeG:"rgba(255,255,255,0.2)"}}/>
        </div><div style={{fontSize:11,color:"rgba(255,255,255,0.6)"}}>{timeAgo(list.date)}</div></div>
      </div>
      <div onClick={onOpen} style={{fontSize:18,fontWeight:800,color:"#fff",cursor:"pointer",position:"relative",zIndex:1}}>{list.title}</div>
      <div style={{display:"flex",gap:6,marginTop:10,position:"relative",zIndex:1}}>
        <VoteBtn type="up" count={list.up+(lv._l==="up"?1:0)} active={lv._l==="up"} small disabled={!loggedIn} onClick={()=>gv(list.id,"_l",lv._l==="up"?null:"up")} th={{...th,gC:"rgba(255,255,255,0.10)",upBg:"rgba(255,255,255,0.15)",upTx:"#fff",ok:"#fff",bd:"rgba(255,255,255,0.18)",t3:"rgba(255,255,255,0.5)",dnBg:"rgba(255,100,100,0.15)",dnTx:"#fff",er:"#fff",glow:"none",glowA:"0 0 15px rgba(255,255,255,0.2)"}}/>
        <VoteBtn type="down" count={list.dn+(lv._l==="down"?1:0)} active={lv._l==="down"} small disabled={!loggedIn} onClick={()=>gv(list.id,"_l",lv._l==="down"?null:"down")} th={{...th,gC:"rgba(255,255,255,0.10)",upBg:"rgba(255,255,255,0.15)",upTx:"#fff",ok:"#fff",bd:"rgba(255,255,255,0.18)",t3:"rgba(255,255,255,0.5)",dnBg:"rgba(255,100,100,0.15)",dnTx:"#fff",er:"#fff",glow:"none",glowA:"0 0 15px rgba(255,255,255,0.2)"}}/>
      </div>
    </div>
    <div style={{background:th.gC,backdropFilter:Z.content.blur,padding:"2px 0"}} onClick={onOpen}>
      {list.items.map((it,j)=>{const iv=lv[it.id];return <div key={j} style={{display:"flex",alignItems:"center",gap:10,padding:"10px 14px",cursor:"pointer",borderBottom:j<4?`1px solid ${th.bd2}`:"none",background:j===0?`${th.gold}06`:"transparent"}}>
        <RankBadge rank={j+1} th={th} size={24}/><Thumb src={it.photo} size={40}/>
        <div style={{flex:1,minWidth:0}}>
          <div style={{display:"flex",alignItems:"center",gap:4}}>
            <span style={{fontSize:13,fontWeight:700,color:th.tx}}>{it.name}</span>
            {it.link&&<a href={it.link} target="_blank" rel="noopener noreferrer" onClick={e=>e.stopPropagation()} style={{fontSize:10,color:th.ac,fontWeight:700,opacity:.7}}>↗</a>}
            <RankChange name={it.name} th={th}/>
          </div>
          <div style={{fontSize:11,color:th.t2,marginTop:1,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{it.review}</div>
        </div>
        <div style={{display:"flex",gap:3,flexShrink:0}} onClick={e=>e.stopPropagation()}>
          <VoteBtn type="up" count={it.up+(iv==="up"?1:0)} active={iv==="up"} small disabled={!loggedIn} onClick={()=>gv(list.id,it.id,iv==="up"?null:"up")} th={th}/>
          <VoteBtn type="down" count={it.dn+(iv==="down"?1:0)} active={iv==="down"} small disabled={!loggedIn} onClick={()=>gv(list.id,it.id,iv==="down"?null:"down")} th={th}/>
        </div>
      </div>;})}
    </div>
  </div>;
}

/* ═══════════════════════════════════════════════════════════════
   #10: GLASS SHARE CARD WITH QR
   ═══════════════════════════════════════════════════════════════ */
const ShareCard=({list,th,onClose})=>{
  const u=USERS.find(x=>x.id===list?.userId);
  if(!list||!u)return null;
  return <div style={{position:"fixed",inset:0,zIndex:2000,display:"flex",alignItems:"center",justifyContent:"center",background:th.modalOv,backdropFilter:"blur(16px)",padding:16}} onClick={onClose}>
    <div onClick={e=>e.stopPropagation()} style={{width:"100%",maxWidth:340}}>
      <div style={{textAlign:"center",marginBottom:8}}><span style={{fontSize:12,color:th.id==="dark"?"#fff":th.tx,fontWeight:600,opacity:.8}}>📸 Screenshot & share</span></div>
      <div style={{borderRadius:20,overflow:"hidden",boxShadow:"0 20px 60px rgba(0,0,0,0.3)"}}>
        <div style={{background:cg(list.cat),padding:"24px 20px 16px",position:"relative"}}>
          <div style={{position:"absolute",top:14,right:14,padding:"4px 12px",borderRadius:20,background:"rgba(255,255,255,0.2)",color:"#fff",fontSize:11,fontWeight:700,backdropFilter:"blur(10px)"}}>{list.cat}</div>
          <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:10}}>
            <div style={{width:36,height:36,borderRadius:18,overflow:"hidden",background:"rgba(255,255,255,0.2)"}}><img src={u.av} style={{width:"100%",height:"100%",objectFit:"cover"}}/></div>
            <div><div style={{fontSize:14,fontWeight:800,color:"#fff"}}>{u.name}</div><div style={{fontSize:11,color:"rgba(255,255,255,0.7)"}}>{u.handle}</div></div>
          </div>
          <div style={{fontSize:18,fontWeight:800,color:"#fff"}}>{list.title}</div>
        </div>
        <div style={{background:"#fff",padding:"10px 16px"}}>
          {list.items.map((it,j)=> <div key={j} style={{display:"flex",alignItems:"center",gap:8,padding:"8px 0",borderBottom:j<4?"1px solid #f0f0f0":"none"}}>
            <RankBadge rank={j+1} th={TH.light} size={24}/><Thumb src={it.photo} size={32}/>
            <div style={{flex:1}}><div style={{fontSize:12,fontWeight:700,color:"#0f1d3d"}}>{it.name}</div></div>
            <span style={{fontSize:10,color:"#059669",fontWeight:700}}>👍{it.up}</span>
          </div>)}
        </div>
        <div style={{background:"#fff",padding:"8px 16px 12px",borderTop:"1px solid #f0f0f0",display:"flex",alignItems:"center",justifyContent:"space-between"}}>
          <div style={{display:"flex",alignItems:"center",gap:4}}>
            <Logo size={16} color="#1b3d3d"/><span style={{fontSize:13,fontWeight:800,color:"#1b3d3d"}}>TheFive</span>
          </div>
          {/* #10 QR Code (simple SVG representation) */}
          <div style={{display:"flex",alignItems:"center",gap:6}}>
            <span style={{fontSize:9,color:"#94a3b8"}}>thefive.com</span>
            <svg width="28" height="28" viewBox="0 0 28 28"><rect width="28" height="28" rx="3" fill="#0f1d3d"/>
              <rect x="4" y="4" width="8" height="8" rx="1" fill="#fff"/><rect x="5" y="5" width="6" height="6" rx="0.5" fill="#0f1d3d"/><rect x="6.5" y="6.5" width="3" height="3" fill="#fff"/>
              <rect x="16" y="4" width="8" height="8" rx="1" fill="#fff"/><rect x="17" y="5" width="6" height="6" rx="0.5" fill="#0f1d3d"/><rect x="18.5" y="6.5" width="3" height="3" fill="#fff"/>
              <rect x="4" y="16" width="8" height="8" rx="1" fill="#fff"/><rect x="5" y="17" width="6" height="6" rx="0.5" fill="#0f1d3d"/><rect x="6.5" y="18.5" width="3" height="3" fill="#fff"/>
              <rect x="14" y="14" width="2" height="2" fill="#fff"/><rect x="18" y="14" width="2" height="2" fill="#fff"/><rect x="14" y="18" width="2" height="2" fill="#fff"/><rect x="22" y="14" width="2" height="2" fill="#fff"/><rect x="16" y="20" width="2" height="2" fill="#fff"/><rect x="20" y="18" width="4" height="2" fill="#fff"/><rect x="20" y="22" width="4" height="2" fill="#fff"/>
            </svg>
          </div>
        </div>
      </div>
      <div style={{textAlign:"center",marginTop:12}}>
        <button onClick={onClose} style={{padding:"8px 24px",borderRadius:20,border:"1px solid rgba(255,255,255,0.3)",background:"rgba(255,255,255,0.1)",color:th.id==="dark"?"#fff":th.tx,fontSize:13,fontWeight:700,fontFamily:F,cursor:"pointer"}}>Close</button>
      </div>
    </div>
  </div>;
};

/* ═══════════════════════════════════════════════════════════════
   #20: THEFIVE WRAPPED
   ═══════════════════════════════════════════════════════════════ */
const WrappedView=({th,onBack})=>{
  const[slide,setSlide]=useState(0);
  const slides=[
    {bg:"linear-gradient(135deg,#1b6b6b,#2a9d9d)",title:"Your 2026 on TheFive",sub:"✦ Year in Review",content:<div style={{textAlign:"center"}}><div style={{fontSize:48,marginBottom:16,opacity:0.9}}>✦</div><div style={{fontSize:28,fontWeight:800,color:"#fff",marginBottom:8}}>2026 Wrapped</div><div style={{fontSize:14,color:"rgba(255,255,255,0.8)"}}>Your year of taste, ranked.</div></div>},
    {bg:"linear-gradient(135deg,#f5a623,#ef4444)",title:"Lists Created",content:<div style={{textAlign:"center"}}><div style={{fontSize:72,fontWeight:900,color:"#fff"}}>12</div><div style={{fontSize:16,color:"rgba(255,255,255,0.9)",marginTop:8}}>Top 5 lists published</div><div style={{fontSize:13,color:"rgba(255,255,255,0.7)",marginTop:4}}>That's more than 94% of users!</div></div>},
    {bg:"linear-gradient(135deg,#7c3aed,#ec4899)",title:"Total Upvotes",content:<div style={{textAlign:"center"}}><div style={{fontSize:72,fontWeight:900,color:"#fff"}}>892</div><div style={{fontSize:16,color:"rgba(255,255,255,0.9)",marginTop:8}}>upvotes received</div><div style={{fontSize:13,color:"rgba(255,255,255,0.7)",marginTop:4}}>Your most-loved list: "Top 5 EDC Knives"</div></div>},
    {bg:"linear-gradient(135deg,#059669,#10b981)",title:"Taste Archetype",content:<div style={{textAlign:"center"}}><div style={{fontSize:48,marginBottom:12}}>🔪☕💻</div><div style={{fontSize:22,fontWeight:800,color:"#fff"}}>The Precision Craftsman</div><div style={{fontSize:14,color:"rgba(255,255,255,0.8)",marginTop:8}}>EDC Gear × Coffee × Tech</div><div style={{fontSize:12,color:"rgba(255,255,255,0.6)",marginTop:4}}>Only 3% of users share this archetype</div></div>},
    {bg:"linear-gradient(135deg,#1b3d3d,#1b6b6b)",title:"Your Impact",content:<div style={{textAlign:"center"}}><div style={{fontSize:48,fontWeight:900,color:"#fff"}}>47</div><div style={{fontSize:16,color:"rgba(255,255,255,0.9)",marginTop:8}}>people made a purchase based on your lists</div><div style={{fontSize:28,marginTop:16}}>🤝</div><div style={{fontSize:13,color:"rgba(255,255,255,0.7)",marginTop:4}}>12 new members joined via your invite</div></div>},
    {bg:"linear-gradient(135deg,#f5a623,#fcd34d)",title:"Champion!",content:<div style={{textAlign:"center"}}><div style={{fontSize:48}}>👑</div><div style={{fontSize:22,fontWeight:800,color:"#fff",marginTop:8}}>EDC Gear Champion</div><div style={{fontSize:14,color:"rgba(255,255,255,0.8)",marginTop:4}}>#1 ranked curator — 6 week streak</div><div style={{marginTop:16,display:"flex",justifyContent:"center",gap:8}}><span style={{background:"rgba(255,255,255,0.2)",padding:"6px 14px",borderRadius:20,color:"#fff",fontSize:12,fontWeight:700}}>Member #001</span><span style={{background:"rgba(255,255,255,0.2)",padding:"6px 14px",borderRadius:20,color:"#fff",fontSize:12,fontWeight:700}}>Influence: 92</span></div></div>},
  ];
  const s=slides[slide];
  return <div style={{position:"fixed",inset:0,zIndex:2000,display:"flex",flexDirection:"column"}}>
    <div style={{flex:1,background:s.bg,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:24,transition:"background 0.5s",position:"relative",overflow:"hidden"}}>
      <div style={{position:"absolute",top:"-30%",right:"-20%",width:"60%",height:"120%",background:"radial-gradient(circle,rgba(255,255,255,0.1),transparent 70%)",pointerEvents:"none"}}/>
      <button onClick={onBack} style={{position:"absolute",top:16,left:16,background:"rgba(255,255,255,0.15)",border:"none",color:"#fff",width:36,height:36,borderRadius:18,fontSize:16,cursor:"pointer",backdropFilter:"blur(8px)"}}>×</button>
      <div style={{position:"absolute",top:16,right:16,display:"flex",alignItems:"center",gap:4}}><Logo size={18} color="rgba(255,255,255,0.8)"/><span style={{fontSize:14,fontWeight:800,color:"rgba(255,255,255,0.8)"}}>TheFive</span></div>
      <div style={{position:"relative",zIndex:1,animation:"slideUp 0.4s ease"}} key={slide}>{s.content}</div>
      {/* Progress dots */}
      <div style={{position:"absolute",bottom:80,display:"flex",gap:6}}>
        {slides.map((_,i)=> <div key={i} style={{width:i===slide?20:8,height:8,borderRadius:4,background:i===slide?"#fff":"rgba(255,255,255,0.3)",transition:"all 0.3s",cursor:"pointer"}} onClick={()=>setSlide(i)}/>)}
      </div>
      {/* Nav buttons */}
      <div style={{position:"absolute",bottom:24,display:"flex",gap:12}}>
        {slide>0&&<button onClick={()=>setSlide(slide-1)} style={{padding:"10px 24px",borderRadius:20,border:"1px solid rgba(255,255,255,0.3)",background:"rgba(255,255,255,0.1)",color:"#fff",fontSize:14,fontWeight:700,fontFamily:F,cursor:"pointer"}}>← Back</button>}
        {slide<slides.length-1?<button onClick={()=>setSlide(slide+1)} style={{padding:"10px 24px",borderRadius:20,border:"none",background:"rgba(255,255,255,0.25)",color:"#fff",fontSize:14,fontWeight:700,fontFamily:F,cursor:"pointer",boxShadow:"0 2px 10px rgba(0,0,0,0.1)"}}>Next →</button>
        :<button onClick={onBack} style={{padding:"10px 24px",borderRadius:20,border:"none",background:"#fff",color:"#1b3d3d",fontSize:14,fontWeight:700,fontFamily:F,cursor:"pointer"}}>Share Your Wrapped ↗</button>}
      </div>
    </div>
  </div>;
};

/* ═══════════════════════════════════════════════════════════════
   CREATE LIST MODAL
   ═══════════════════════════════════════════════════════════════ */
function CreateModal({th,initCat,onClose,onSave}){
  const[step,setStep]=useState(initCat?2:1);
  const[cat,setCat]=useState(initCat||"");
  const[title,setTitle]=useState(initCat?`My Top 5 ${initCat}`:"");
  const[items,setItems]=useState([{name:"",review:""},{name:"",review:""}]);
  const[isPriv,setIsPriv]=useState(false);
  const upd=(idx,f,v)=>{const n=[...items];n[idx]={...n[idx],[f]:v};setItems(n);};
  const can=title.trim()&&cat&&items.filter(i=>i.name.trim()&&i.review.trim()).length>=1;
  return <div style={{position:"fixed",inset:0,zIndex:2000,display:"flex",alignItems:"center",justifyContent:"center",background:th.modalOv,backdropFilter:"blur(16px)",padding:12}} onClick={onClose}>
    <div onClick={e=>e.stopPropagation()} style={{width:"100%",maxWidth:420,maxHeight:"88vh",overflowY:"auto",background:th.gF,borderRadius:Z.r,padding:20,border:`1px solid ${th.bd}`,backdropFilter:Z.float.blur,boxShadow:`${th.glow},0 20px 60px rgba(0,0,0,0.12)`}}>
      <div style={{fontSize:18,fontWeight:800,color:th.tx,marginBottom:4}}>✦ Create a Top 5 List</div>
      <div style={{fontSize:12,color:th.t2,marginBottom:14}}>Rank your five best picks and share them</div>
      {step===1&&<>
        <div style={{fontSize:13,fontWeight:700,color:th.tx,marginBottom:8}}>Pick a category</div>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:6,maxHeight:280,overflowY:"auto"}}>
          {CATS.map((c,i)=> <div key={i} onClick={()=>{setCat(c.n);setTitle(`My Top 5 ${c.n}`);setStep(2);}} style={{padding:"10px 6px",borderRadius:Z.rXs,textAlign:"center",cursor:"pointer",background:th.gC,border:`1px solid ${th.bd}`}}>
            <div style={{fontSize:20}}>{c.i}</div><div style={{fontSize:9,fontWeight:700,color:th.tx,marginTop:2}}>{c.n}</div>
          </div>)}
        </div>
      </>}
      {step===2&&<>
        <div style={{display:"flex",alignItems:"center",gap:6,marginBottom:10}}>
          {!initCat&&<button onClick={()=>{setCat("");setStep(1);}} style={{background:"none",border:"none",color:th.ac,fontSize:14,cursor:"pointer",fontFamily:F}}>← Back</button>}
          <Tag text={`${CATS.find(c=>c.n===cat)?.i||"📦"} ${cat}`} th={th}/>
          <div style={{marginLeft:"auto",display:"flex",alignItems:"center",gap:6}}>
            <span style={{fontSize:11,color:th.t3}}>🔒</span>
            <div onClick={()=>setIsPriv(!isPriv)} style={{width:36,height:20,borderRadius:10,background:isPriv?th.ac:th.bd2,cursor:"pointer",position:"relative",transition:"background 0.2s"}}>
              <div style={{width:16,height:16,borderRadius:8,background:"#fff",position:"absolute",top:2,left:isPriv?18:2,transition:"left 0.2s",boxShadow:"0 1px 3px rgba(0,0,0,0.2)"}}/>
            </div>
          </div>
        </div>
        <input placeholder="List title" value={title} onChange={e=>setTitle(e.target.value)} style={{width:"100%",padding:"10px 14px",borderRadius:Z.rXs,border:`1px solid ${th.inBd}`,background:th.inBg,color:th.tx,fontSize:14,fontFamily:F,outline:"none",boxSizing:"border-box",marginBottom:10}}/>
        {items.map((it,idx)=> <div key={idx} style={{background:th.gC,borderRadius:Z.rS,padding:10,marginBottom:6,border:`1px solid ${th.bd}`}}>
          <div style={{display:"flex",alignItems:"center",gap:6,marginBottom:6}}>
            <RankBadge rank={idx+1} th={th} size={20}/>
            <span style={{fontSize:11,fontWeight:700,color:th.t2}}>#{idx+1}</span>
            {items.length>1&&<span onClick={()=>setItems(items.filter((_,i)=>i!==idx))} style={{marginLeft:"auto",fontSize:12,color:th.er,cursor:"pointer"}}>✕</span>}
          </div>
          <input placeholder="Product name" value={it.name} onChange={e=>upd(idx,"name",e.target.value)} style={{width:"100%",padding:"8px 10px",borderRadius:Z.rXs,border:`1px solid ${th.inBd}`,background:th.inBg,color:th.tx,fontSize:13,fontFamily:F,outline:"none",boxSizing:"border-box",marginBottom:4}}/>
          <input placeholder="Why is this in your Top 5?" value={it.review} onChange={e=>upd(idx,"review",e.target.value)} style={{width:"100%",padding:"8px 10px",borderRadius:Z.rXs,border:`1px solid ${th.inBd}`,background:th.inBg,color:th.tx,fontSize:13,fontFamily:F,outline:"none",boxSizing:"border-box"}}/>
        </div>)}
        {items.length<5&&<button onClick={()=>setItems([...items,{name:"",review:""}])} style={{width:"100%",padding:"8px",borderRadius:Z.rXs,border:`2px dashed ${th.bd}`,background:"transparent",color:th.ac,fontSize:12,fontWeight:700,fontFamily:F,cursor:"pointer",marginBottom:10}}>+ Add Item #{items.length+1}</button>}
        <div style={{display:"flex",gap:8}}>
          <GBtn th={th} small onClick={onClose} style={{flex:1}}>Cancel</GBtn>
          <GBtn th={th} primary small onClick={()=>{if(can)onSave(cat,title,items.filter(i=>i.name.trim()),isPriv);}} style={{flex:1,opacity:can?1:.4}}>
            {isPriv?"🔒 Save Private":"✦ Publish Top 5"}
          </GBtn>
        </div>
      </>}
    </div>
  </div>;
}

/* ═══════════════════════════════════════════════════════════════
   MAIN APP
   ═══════════════════════════════════════════════════════════════ */
export default function TheFiveApp(){
  const[themeId,setThemeId]=useState("light");
  const[page,setPage]=useState("home");
  const[loggedIn,setLoggedIn]=useState(false);
  const[votes,setVotes]=useState({});
  const[selUser,setSelUser]=useState(null);
  const[selList,setSelList]=useState(null);
  const[activeCat,setActiveCat]=useState(null);
  const[toast,setToast]=useState(null);
  const[loading,setLoading]=useState(true);
  const[confetti,setConfetti]=useState(false);
  const[shareCard,setShareCard]=useState(null);
  const[showWrapped,setShowWrapped]=useState(false);
  const[showCreate,setShowCreate]=useState(false);
  const[createCat,setCreateCat]=useState("");
  const[userLists,setUserLists]=useState([]);
  const[privateLists,setPrivateLists]=useState([]);
  const[asks,setAsks]=useState([
    {id:"a1",userId:"u4",cat:"Headphones",q:"What are your top 5 wireless earbuds for running?",resp:2,date:"2026-04-14T12:00:00Z"},
    {id:"a2",userId:"u1",cat:"Coffee Gear",q:"Best manual espresso gear under $500?",resp:1,date:"2026-04-13T09:30:00Z"},
  ]);
  const[newAsk,setNewAsk]=useState("");
  const[connections,setConnections]=useState(["u2","u4"]);
  const[proposedCats,setProposedCats]=useState([
    {id:"pc1",name:"Drones",icon:"🛸",votes:87,voters:[]},
    {id:"pc2",name:"Standing Desks",icon:"🪑",votes:96,voters:[]},
    {id:"pc3",name:"Protein Powders",icon:"💪",votes:23,voters:[]},
  ]);
  const[showPropose,setShowPropose]=useState(false);
  const[proposeName,setProposeName]=useState("");
  const[proposeIcon,setProposeIcon]=useState("");
  /* #3 Page transition */
  const[pageAnim,setPageAnim]=useState("in");
  const th=TH[themeId];

  useEffect(()=>{setTimeout(()=>setLoading(false),1000);},[]);
  const showT=m=>{setToast(m);setTimeout(()=>setToast(null),2500);};
  const authGate=()=>{setLoggedIn(true);showT("Welcome to TheFive, Member #007! ✦");};
  const handleVote=(lid,k,v)=>setVotes(p=>({...p,[lid]:{...(p[lid]||{}),[k]:v}}));
  const handleCreate=(cat,title,items,isPrivate)=>{
    const nl={id:"nl"+Date.now(),userId:"u1",cat,title,up:0,dn:0,date:new Date().toISOString(),spotlight:false,
      items:items.map((it,i)=>({id:"ni"+Date.now()+i,name:it.name,review:it.review,up:0,dn:0,photo:"",link:""}))};
    if(isPrivate){setPrivateLists(p=>[nl,...p]);showT("Private list created! 🔒");}
    else{setUserLists(p=>[nl,...p]);setConfetti(true);setTimeout(()=>setConfetti(false),800);showT("Your Top 5 is live! ✦");}
    setShowCreate(false);setCreateCat("");
  };
  const toggleConnect=(uid)=>setConnections(p=>p.includes(uid)?p.filter(x=>x!==uid):[...p,uid]);
  const handlePropose=()=>{
    if(!proposeName.trim())return;
    setProposedCats(p=>[{id:"pc"+Date.now(),name:proposeName,icon:proposeIcon||"📦",votes:1,voters:["u1"]},...p]);
    setProposeName("");setProposeIcon("");setShowPropose(false);
    setConfetti(true);setTimeout(()=>setConfetti(false),800);showT("Category proposed! Need 100 votes ✦");
  };
  const voteProposal=(pcId)=>setProposedCats(prev=>prev.map(pc=>{
    if(pc.id!==pcId||pc.voters.includes("u1"))return pc;
    const nv=pc.votes+1;if(nv>=100){CATS.push({n:pc.name,i:pc.icon});CC[pc.name]=["#1b6b6b","#2a9d9d"];showT(`"${pc.name}" is now official! 🎉`);}
    return {...pc,votes:nv,voters:[...pc.voters,"u1"],promoted:nv>=100};
  }));

  /* #3 Liquid Morph navigation */
  const navigate=(pg,data)=>{
    setPageAnim("out");
    setTimeout(()=>{
      setPage(pg);
      if(data?.user)setSelUser(data.user);
      if(data?.list)setSelList(data.list);
      setPageAnim("in");
    },200);
  };
  const goHome=()=>navigate("home");

  const[wordIdx,setWordIdx]=useState(0);
  const WORDS=["knife","shoe","album","backpack","headphone","camera","watch","book"];
  useEffect(()=>{const i=setInterval(()=>setWordIdx(p=>(p+1)%WORDS.length),2000);return()=>clearInterval(i);},[]);

  const allLists=[...userLists,...LISTS];
  const trending=[...allLists].sort((a,b)=>b.up-a.up);
  const latest=[...allLists].sort((a,b)=>new Date(b.date)-new Date(a.date));
  const spotlightList=allLists.find(l=>l.spotlight);

  const cp=list=>{const u=USERS.find(x=>x.id===list.userId);return{list,user:u,th,onOpen:()=>navigate("detail",{list}),onProfile:()=>navigate("profile",{user:u}),votes,onVote:handleVote,loggedIn,authGate};};

  return <div className="tf-root" style={{minHeight:"100vh",background:th.bg,fontFamily:F,color:th.tx,paddingBottom:80,transition:"background 0.5s"}}>
    <style>{`@import url('https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,300;9..40,500;9..40,700;9..40,800&display=swap');
      *{box-sizing:border-box;margin:0;padding:0;}body{margin:0;overflow-x:hidden;}
      ::-webkit-scrollbar{width:5px;}::-webkit-scrollbar-thumb{background:${th.bd};border-radius:3px;}
      button:active{transform:scale(0.96)!important;}a{text-decoration:none;}
      @keyframes glowPulse{0%,100%{opacity:.6}50%{opacity:1}}
      @keyframes shimmer{0%{transform:translateX(-100%)}100%{transform:translateX(100%)}}
      @keyframes slideUp{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:translateY(0)}}
      @keyframes fadeWord{0%{opacity:0;transform:translateY(8px)}15%{opacity:1;transform:translateY(0)}85%{opacity:1}100%{opacity:0;transform:translateY(-8px)}}
      @keyframes rippleOut{0%{transform:scale(0.3);opacity:1}100%{transform:scale(2);opacity:0}}
      @keyframes fadeIn{from{opacity:0}to{opacity:1}}
      @keyframes confettiBurst{0%{transform:scale(0);opacity:1}50%{transform:scale(1.3);opacity:.8}100%{transform:scale(0);opacity:0}}
      /* #3 Liquid Morph Transitions */
      @keyframes morphIn{from{opacity:0;transform:scale(0.96) translateY(8px)}to{opacity:1;transform:scale(1) translateY(0)}}
      @keyframes morphOut{from{opacity:1;transform:scale(1)}to{opacity:0;transform:scale(0.96) translateY(-4px)}}
      /* Responsive */
      @media(min-width:640px){.tf-root{max-width:480px;margin:0 auto;}}
      @media(min-width:1024px){.tf-root{max-width:520px;min-height:100vh;border-left:1px solid rgba(0,0,0,0.04);border-right:1px solid rgba(0,0,0,0.04);box-shadow:0 0 60px rgba(0,0,0,0.03);}}
      .tf-root{position:relative;}
      /* #4 Aurora for dark mode */
      @keyframes aurora1{0%,100%{transform:translate(0,0) scale(1)}50%{transform:translate(30px,-20px) scale(1.1)}}
      @keyframes aurora2{0%,100%{transform:translate(0,0) scale(1)}50%{transform:translate(-20px,30px) scale(1.15)}}
      @keyframes aurora3{0%,100%{transform:translate(0,0) scale(1)}50%{transform:translate(15px,15px) scale(0.95)}}
    `}</style>

    {/* #4 Aurora Ambient Background (all themes) */}
    <div style={{position:"fixed",top:"-30%",left:"-15%",width:"60%",height:"60%",borderRadius:"50%",background:`radial-gradient(circle,${th.aurora1} 0%,transparent 70%)`,pointerEvents:"none",zIndex:0,animation:"aurora1 12s ease-in-out infinite"}}/>
    <div style={{position:"fixed",bottom:"-25%",right:"-10%",width:"55%",height:"55%",borderRadius:"50%",background:`radial-gradient(circle,${th.aurora2} 0%,transparent 70%)`,pointerEvents:"none",zIndex:0,animation:"aurora2 15s ease-in-out infinite 3s"}}/>
    <div style={{position:"fixed",top:"20%",right:"10%",width:"40%",height:"40%",borderRadius:"50%",background:`radial-gradient(circle,${th.aurora3} 0%,transparent 70%)`,pointerEvents:"none",zIndex:0,animation:"aurora3 18s ease-in-out infinite 6s"}}/>

    {confetti&&<div style={{position:"fixed",inset:0,zIndex:9999,pointerEvents:"none"}}>{Array.from({length:20}).map((_,i)=> <div key={i} style={{position:"absolute",width:8,height:8,borderRadius:4,background:["#f5a623","#1b6b6b","#e8466d","#2a9d9d","#1b3d3d"][i%5],left:`${30+Math.random()*40}%`,top:`${20+Math.random()*40}%`,animation:`confettiBurst 0.8s ease-out ${i*0.05}s forwards`}}/>)}</div>}
    {toast&&<div style={{position:"fixed",top:70,left:"50%",transform:"translateX(-50%)",zIndex:3000,padding:"10px 20px",borderRadius:Z.rS,background:`${th.ok}18`,color:th.ok,fontSize:13,fontWeight:700,fontFamily:F,border:`1px solid ${th.ok}30`,animation:"slideUp 0.3s ease",whiteSpace:"nowrap"}}>{toast}</div>}

    {/* Header */}
    <div style={{position:"sticky",top:0,zIndex:100,padding:"10px 16px",background:th.gBg,backdropFilter:Z.bg.blur,borderBottom:`1px solid ${th.bd}`,boxShadow:th.glow}}>
      <div style={{display:"flex",alignItems:"center",justifyContent:"space-between"}}>
        <div onClick={goHome} style={{display:"flex",alignItems:"center",gap:5,cursor:"pointer"}}>
          <Logo size={26} color={th.id==="dark"?"#5bbfbf":"#1b3d3d"}/>
          <span style={{fontSize:18,fontWeight:800,color:th.id==="dark"?"#e8ecf4":"#1b3d3d",letterSpacing:-.3}}>TheFive</span>
        </div>
        <div style={{display:"flex",gap:5,alignItems:"center"}}>
          {Object.values(TH).map(t=> <div key={t.id} onClick={()=>setThemeId(t.id)} style={{width:26,height:26,borderRadius:13,display:"flex",alignItems:"center",justifyContent:"center",fontSize:12,cursor:"pointer",border:`2px solid ${themeId===t.id?th.ac:th.bd}`,background:themeId===t.id?th.acS:"transparent",boxShadow:themeId===t.id?th.glowA:"none",transition:"all 0.2s"}}>{t.ic}</div>)}
          {!loggedIn&&<GBtn th={th} primary small onClick={authGate}>Join</GBtn>}
          {loggedIn&&<div onClick={()=>navigate("profile",{user:USERS[0]})} style={{width:28,height:28,borderRadius:14,overflow:"hidden",cursor:"pointer",border:`2px solid ${th.ac}`,boxShadow:th.glowA}}><img src={USERS[0].av} style={{width:"100%",height:"100%",objectFit:"cover"}}/></div>}
        </div>
      </div>
    </div>

    {/* #3 Morphing content wrapper */}
    <div style={{padding:"14px 16px 0",position:"relative",zIndex:1,animation:pageAnim==="in"?"morphIn 0.3s ease":"morphOut 0.2s ease"}}>

      {/* HOME */}
      {page==="home"&&<>
        {/* Hero */}
        <div style={{textAlign:"center",padding:"16px 0 12px"}}>
          <div style={{fontSize:26,fontWeight:800,color:th.tx}}>Your definitive five</div>
          <div style={{height:30,overflow:"hidden",marginTop:4}}>
            <div key={wordIdx} style={{fontSize:22,fontWeight:800,animation:"fadeWord 2s ease",background:cg(CATS.find(c=>c.n.toLowerCase().includes(WORDS[wordIdx]))?.n||"Smartphones"),WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"}}>{WORDS[wordIdx]}</div>
          </div>
          <div style={{fontSize:13,color:th.t2,marginTop:4}}>Ranked by real people.</div>
        </div>

        {/* Quick nav — Floating Capsules */}
        <div style={{display:"flex",gap:8,marginBottom:14}}>
          {[{l:"Leaders",p:"leaderboards"},{l:"Challenges",p:"challenges"},{l:"Ask",p:"asks"},{l:"Compare",p:"compare"},...(loggedIn?[{l:"Wrapped",p:"_wrapped"}]:[])].map(({l,p})=>{
            const isAct=page===p;
            return <button key={l} onClick={()=>p==="_wrapped"?setShowWrapped(true):navigate(p)} style={{flex:1,padding:"10px 0",borderRadius:24,border:"none",
              background:isAct?th.acG:(th.id==="dark"?"rgba(255,255,255,0.06)":"#fff"),
              color:isAct?th.acT:(th.id==="dark"?th.t2:th.tx),
              fontSize:12,fontWeight:700,fontFamily:F,cursor:"pointer",
              boxShadow:isAct?`0 4px 16px ${th.ac}35`:`0 1px 4px ${th.id==="dark"?"rgba(0,0,0,0.2)":"rgba(0,0,0,0.05)"}`,
              transition:"all 0.2s",transform:isAct?"translateY(-1px)":"none",
            }}>{l}</button>;
          })}
        </div>

        {/* Category pills — Floating Capsules */}
        <div style={{display:"flex",gap:6,marginBottom:10,overflowX:"auto",paddingBottom:4}}>
          {[{n:"All",i:""},...CATS.slice(0,8)].map((c,i)=>{
            const isSel=c.n==="All"?!activeCat:activeCat===c.n;
            return <button key={i} onClick={()=>setActiveCat(c.n==="All"?null:(activeCat===c.n?null:c.n))} style={{flexShrink:0,padding:"7px 16px",borderRadius:24,border:"none",
              background:isSel?th.acG:(th.id==="dark"?"rgba(255,255,255,0.06)":"#fff"),
              color:isSel?"#fff":(th.id==="dark"?th.t2+"cc":th.tx+"80"),
              fontSize:12,fontWeight:isSel?700:500,fontFamily:F,cursor:"pointer",
              boxShadow:isSel?`0 4px 14px ${th.ac}30`:`0 1px 4px ${th.id==="dark"?"rgba(0,0,0,0.15)":"rgba(0,0,0,0.04)"}`,
              transition:"all 0.2s",transform:isSel?"translateY(-1px)":"none",
            }}>{c.n}</button>;
          })}
        </div>

        {loading?<>{[1,2,3].map(i=> <div key={i} style={{borderRadius:Z.r,overflow:"hidden",marginBottom:14,border:`1px solid ${th.bd}`}}><div style={{height:100,background:th.gC,position:"relative"}}><div style={{position:"absolute",inset:0,background:`linear-gradient(90deg,transparent,${th.shimmer},transparent)`,animation:"shimmer 1.5s infinite"}}/></div><div style={{padding:12,background:th.gC}}><div style={{height:12,width:"60%",borderRadius:6,background:th.gBg,marginBottom:8}}/><div style={{height:10,width:"80%",borderRadius:5,background:th.gBg}}/></div></div>)}</>:<>
          {activeCat?<>
            <div style={{fontSize:15,fontWeight:800,color:th.tx,marginBottom:10}}>{activeCat}</div>
            {LISTS.filter(l=>l.cat===activeCat).length===0&&<div style={{textAlign:"center",padding:40,color:th.t3}}><div style={{width:40,height:40,borderRadius:20,background:th.acS,display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 12px",fontSize:18}}>+</div><div style={{fontSize:14,fontWeight:700}}>No lists yet</div><div style={{fontSize:12,marginTop:4}}>Be the first to create one</div></div>}
            {LISTS.filter(l=>l.cat===activeCat).map(l=> <ShowcaseCard key={l.id} {...cp(l)}/>)}
          </>:<>
            {/* #8 Spotlight */}
            {spotlightList&&<SpotlightCard list={spotlightList} th={th} onOpen={()=>navigate("detail",{list:spotlightList})}/>}

            {/* #12 Active Challenges preview */}
            <div style={{display:"flex",gap:8,marginBottom:14,overflowX:"auto"}}>
              {CHALLENGES.slice(0,2).map(ch=> <div key={ch.id} onClick={()=>navigate("challenges")} style={{minWidth:200,flexShrink:0,background:th.gC,borderRadius:Z.rS,padding:12,border:`1px solid ${th.bd}`,boxShadow:th.glow,backdropFilter:Z.content.blur,cursor:"pointer"}}>
                <div style={{display:"flex",alignItems:"center",gap:6,marginBottom:6}}>
                  <span style={{fontSize:18}}>{ch.icon}</span>
                  <div style={{fontSize:12,fontWeight:800,color:th.tx}}>{ch.title}</div>
                </div>
                <div style={{height:6,borderRadius:3,background:th.bd2,overflow:"hidden",marginBottom:4}}>
                  <div style={{width:`${Math.round(ch.current/ch.goal*100)}%`,height:"100%",borderRadius:3,background:ch.current/ch.goal>.9?th.matchG:th.acG,transition:"width 1s ease"}}/>
                </div>
                <div style={{fontSize:10,color:th.t3}}>{ch.current}/{ch.goal} · {ch.participants} joined</div>
              </div>)}
            </div>

            {/* Trending */}
            <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:10}}><div style={{width:6,height:6,borderRadius:3,background:th.ac}}/><div style={{fontSize:14,fontWeight:800,color:th.tx,letterSpacing:0.3}}>Trending</div><div style={{flex:1,height:1,background:th.bd2,marginLeft:8}}/></div>
            {trending.slice(0,2).map(l=> <ShowcaseCard key={l.id} {...cp(l)}/>)}

            {/* Latest */}
            <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:10,marginTop:16}}><div style={{width:6,height:6,borderRadius:3,background:th.gold}}/><div style={{fontSize:14,fontWeight:800,color:th.tx,letterSpacing:0.3}}>Latest</div><div style={{flex:1,height:1,background:th.bd2,marginLeft:8}}/></div>
            {latest.slice(0,2).map(l=> <ShowcaseCard key={l.id} {...cp(l)}/>)}
          </>}
        </>}
      </>}

      {/* DETAIL */}
      {page==="detail"&&selList&&(()=>{
        const u=USERS.find(x=>x.id===selList.userId);const lv=votes[selList.id]||{};
        const gv=(k,v)=>{if(!loggedIn){authGate();return;}handleVote(selList.id,k,v);};
        return <div>
          <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:12}}>
            <button onClick={goHome} style={{background:"none",border:"none",fontSize:18,cursor:"pointer",color:th.ac}}>←</button>
            <span style={{fontSize:13,fontWeight:600,color:th.t2}}>Back</span>
            <div style={{marginLeft:"auto",display:"flex",gap:6}}>
              <GBtn th={th} small onClick={()=>setShareCard(selList)}>Share</GBtn>
            </div>
          </div>
          <ShowcaseCard list={selList} user={u} th={th} onOpen={()=>{}} onProfile={()=>navigate("profile",{user:u})} votes={votes} onVote={handleVote} loggedIn={loggedIn} authGate={authGate}/>
        </div>;
      })()}

      {/* PROFILE with bento grid + four favs */}
      {page==="profile"&&selUser&&(()=>{
        const uLists=LISTS.filter(l=>l.userId===selUser.id);
        const match=loggedIn?tasteMatch(USERS[0],selUser):0;
        return <div>
          <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:14}}>
            <button onClick={goHome} style={{background:"none",border:"none",fontSize:18,cursor:"pointer",color:th.ac}}>←</button>
            <span style={{fontSize:13,fontWeight:600,color:th.t2}}>Profile</span>
          </div>
          {/* Bento grid */}
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginBottom:14}}>
            <div style={{gridColumn:"1/-1",background:th.gC,borderRadius:Z.r,padding:16,border:`1px solid ${th.bd}`,boxShadow:th.glow,backdropFilter:Z.content.blur,textAlign:"center"}}>
              <div style={{width:64,height:64,borderRadius:32,overflow:"hidden",margin:"0 auto 8px",border:`3px solid ${th.ac}`,boxShadow:th.glowA}}><img src={selUser.av} style={{width:"100%",height:"100%",objectFit:"cover"}}/></div>
              <div style={{fontSize:20,fontWeight:800,color:th.tx}}>{selUser.name}</div>
              <div style={{display:"flex",alignItems:"center",justifyContent:"center",gap:6,marginTop:4}}>
                <span style={{fontSize:13,color:th.t3}}>{selUser.handle}</span><MBadge no={selUser.memberNo} th={th}/>
                {selUser.verified&&<span style={{padding:"2px 8px",borderRadius:10,background:th.verG,color:"#fff",fontSize:10,fontWeight:800}}>✓ Verified</span>}
              </div>
              <div style={{fontSize:12,color:th.t2,marginTop:6}}>{selUser.bio}</div>
              {loggedIn&&selUser.id!=="u1"&&<div style={{marginTop:8}}>
                <div style={{display:"flex",alignItems:"center",gap:6,justifyContent:"center"}}>
                  <span style={{fontSize:11,fontWeight:700,color:th.t2}}>Taste Match</span>
                  <div style={{width:80,height:6,borderRadius:3,background:th.bd2,overflow:"hidden"}}><div style={{width:`${match}%`,height:"100%",borderRadius:3,background:th.matchG}}/></div>
                  <span style={{fontSize:12,fontWeight:800,background:th.matchG,WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"}}>{match}%</span>
                </div>
                <div style={{marginTop:8,textAlign:"center"}}>
                  <GBtn th={th} small primary={!connections.includes(selUser.id)} onClick={()=>{if(!loggedIn){authGate();return;}toggleConnect(selUser.id);showT(connections.includes(selUser.id)?"Disconnected":"Connected! ✦");}}>
                    {connections.includes(selUser.id)?"✓ Connected":"Connect"}
                  </GBtn>
                </div>
              </div>}
            </div>
            {[["Lists",uLists.length,"📝"],["Followers",selUser.followers,"👥"],["Taste",selUser.taste+"%","💎"],["Rank","#1 EDC","👑"]].map(([l,v,ic],i)=> <div key={i} style={{background:th.gC,borderRadius:Z.rS,padding:"10px",textAlign:"center",border:`1px solid ${th.bd}`,boxShadow:th.glow,backdropFilter:Z.content.blur}}><div style={{fontSize:18}}>{ic}</div><div style={{fontSize:16,fontWeight:800,color:th.tx}}>{v}</div><div style={{fontSize:10,color:th.t3}}>{l}</div></div>)}
            <div style={{gridColumn:"1/-1",background:th.gC,borderRadius:Z.r,padding:12,border:`1px solid ${th.bd}`,boxShadow:th.glow}}>
              <div style={{fontSize:10,fontWeight:700,letterSpacing:1.5,color:th.t3,textTransform:"uppercase",marginBottom:8}}>✦ Four Favorites</div>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:6}}>
                {(selUser.fourFavs||[]).map((fav,i)=>{const it=LISTS.flatMap(l=>l.items).find(x=>x.name===fav);return <div key={i} style={{display:"flex",alignItems:"center",gap:6,padding:"6px 8px",borderRadius:Z.rXs,background:th.acS,border:`1px solid ${th.tagBd}`}}>{it&&<Thumb src={it.photo} size={24}/>}<span style={{fontSize:10,fontWeight:700,color:th.tx,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{fav}</span></div>;})}
              </div>
            </div>
            <div style={{gridColumn:"1/-1",background:th.gC,borderRadius:Z.r,padding:12,border:`1px solid ${th.bd}`,boxShadow:th.glow}}>
              <div style={{fontSize:10,fontWeight:700,letterSpacing:1.5,color:th.t3,textTransform:"uppercase",marginBottom:8}}>Badges</div>
              <div style={{display:"flex",gap:4,flexWrap:"wrap"}}>{BADGES.map(b=> <span key={b.id} style={{padding:"3px 8px",borderRadius:10,background:selUser.badges.includes(b.id)?th.acS:th.bd2,border:`1px solid ${selUser.badges.includes(b.id)?th.tagBd:"transparent"}`,opacity:selUser.badges.includes(b.id)?1:.3,fontSize:10,fontWeight:600,color:th.tx}}>{b.i} {b.n}</span>)}</div>
            </div>
          </div>
          {uLists.map(l=> <ShowcaseCard key={l.id} {...cp(l)}/>)}
          {/* Private lists on own profile */}
          {loggedIn&&selUser.id==="u1"&&privateLists.length>0&&<>
            <div style={{display:"flex",alignItems:"center",gap:8,marginTop:16,marginBottom:10}}>
              <div style={{width:6,height:6,borderRadius:3,background:th.er}}/><div style={{fontSize:14,fontWeight:800,color:th.tx}}>Private Lists</div>
              <span style={{fontSize:11,color:th.t3}}>Only visible to you</span>
            </div>
            {privateLists.map(pl=> <div key={pl.id} style={{borderRadius:Z.r,padding:14,marginBottom:8,border:`2px dashed ${th.ac}30`,background:th.gC,backdropFilter:Z.content.blur}}>
              <div style={{fontSize:14,fontWeight:800,color:th.tx}}>{pl.title}</div>
              <div style={{fontSize:11,color:th.t3,marginTop:2}}>{pl.cat} · Private · {pl.items.length} items</div>
              {pl.items.map((it,j)=> <div key={j} style={{display:"flex",alignItems:"center",gap:6,padding:"4px 0",marginTop:4}}>
                <RankBadge rank={j+1} th={th} size={18}/><span style={{fontSize:12,fontWeight:600,color:th.tx}}>{it.name}</span>
              </div>)}
            </div>)}
          </>}
        </div>;
      })()}

      {/* #11 LEADERBOARDS */}
      {page==="leaderboards"&&<div>
        <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:14}}>
          <button onClick={goHome} style={{background:"none",border:"none",fontSize:18,cursor:"pointer",color:th.ac}}>←</button>
          <div><div style={{fontSize:16,fontWeight:800,color:th.tx}}>Category Champions</div><div style={{fontSize:11,color:th.t3}}>Top curators in each category</div></div>
        </div>
        {["EDC Gear","Coffee Gear","Headphones","Running Shoes","Travel Gear"].map(cat=>{
          const lb=getLeaderboard(cat);
          if(!lb.length)return null;
          const cc=CC[cat]||["#1b6b6b","#2a9d9d"];
          return <div key={cat} style={{background:th.gC,borderRadius:Z.r,padding:14,marginBottom:10,border:`1px solid ${th.bd}`,boxShadow:th.glow,backdropFilter:Z.content.blur}}>
            <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:10}}>
              <span style={{fontSize:16}}>{CATS.find(c=>c.n===cat)?.i}</span>
              <div style={{fontSize:14,fontWeight:800,color:th.tx}}>{cat}</div>
              <span style={{marginLeft:"auto",padding:"2px 10px",borderRadius:10,background:`linear-gradient(135deg,${cc[0]},${cc[1]})`,color:"#fff",fontSize:10,fontWeight:800}}>Champion</span>
            </div>
            {lb.map((u,i)=> <div key={u.id} style={{display:"flex",alignItems:"center",gap:10,padding:"8px 0",borderTop:i>0?`1px solid ${th.bd2}`:"none"}}>
              <div style={{width:24,height:24,borderRadius:12,display:"flex",alignItems:"center",justifyContent:"center",background:i===0?`linear-gradient(135deg,${th.gold},#fcd34d)`:th.bd2,color:i===0?"#fff":th.t3,fontSize:12,fontWeight:800}}>{i+1}</div>
              <div style={{width:28,height:28,borderRadius:14,overflow:"hidden"}}><img src={u.av} style={{width:"100%",height:"100%",objectFit:"cover"}}/></div>
              <div style={{flex:1}}><div style={{fontSize:13,fontWeight:700,color:th.tx}}>{u.name}</div></div>
              <span style={{fontSize:12,fontWeight:800,color:i===0?th.gold:th.t2}}>👍 {u.score}</span>
              {i===0&&<span style={{fontSize:14}}>👑</span>}
            </div>)}
          </div>;
        })}

        {/* Propose Category */}
        <div style={{marginTop:16,display:"flex",alignItems:"center",gap:8,marginBottom:10}}>
          <div style={{width:6,height:6,borderRadius:3,background:th.gold}}/><div style={{fontSize:14,fontWeight:800,color:th.tx}}>Propose a Category</div>
          <div style={{flex:1}}/><GBtn th={th} small primary onClick={()=>{if(!loggedIn){authGate();return;}setShowPropose(true);}}>+ Propose</GBtn>
        </div>
        <div style={{fontSize:11,color:th.t3,marginBottom:8}}>100 votes needed to go live</div>
        {proposedCats.filter(pc=>!pc.promoted).map(pc=>{const pct=Math.min(pc.votes,100);const voted=pc.voters.includes("u1");
          return <div key={pc.id} style={{background:th.gC,borderRadius:Z.rS,padding:12,marginBottom:6,border:`1px solid ${th.bd}`,boxShadow:th.glow}}>
            <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:6}}>
              <span style={{fontSize:18}}>{pc.icon}</span>
              <div style={{flex:1}}><div style={{fontSize:13,fontWeight:800,color:th.tx}}>{pc.name}</div></div>
              <GBtn th={th} small primary={!voted} onClick={()=>{if(!loggedIn){authGate();return;}voteProposal(pc.id);}} style={{opacity:voted?.6:1}}>{voted?"✓ Voted":"Vote"}</GBtn>
            </div>
            <div style={{height:6,borderRadius:3,background:th.bd2,overflow:"hidden"}}>
              <div style={{width:`${pct}%`,height:"100%",borderRadius:3,background:pct>=90?th.matchG:th.acG,transition:"width 0.5s"}}/>
            </div>
            <div style={{fontSize:10,color:th.t3,marginTop:4}}>{pc.votes}/100 votes</div>
          </div>;})}

        {/* Propose Modal */}
        {showPropose&&<div style={{position:"fixed",inset:0,zIndex:2000,display:"flex",alignItems:"center",justifyContent:"center",background:th.modalOv,backdropFilter:"blur(16px)",padding:16}} onClick={()=>setShowPropose(false)}>
          <div onClick={e=>e.stopPropagation()} style={{width:"100%",maxWidth:340,background:th.gF,borderRadius:Z.r,padding:20,border:`1px solid ${th.bd}`,backdropFilter:Z.float.blur}}>
            <div style={{fontSize:17,fontWeight:800,color:th.tx,marginBottom:12}}>Propose a Category</div>
            <div style={{display:"flex",gap:8,marginBottom:10}}>
              <input placeholder="📦" value={proposeIcon} onChange={e=>setProposeIcon(e.target.value)} style={{width:52,padding:"10px",borderRadius:Z.rXs,border:`1px solid ${th.inBd}`,background:th.inBg,color:th.tx,fontSize:20,fontFamily:F,outline:"none",textAlign:"center",boxSizing:"border-box"}}/>
              <input placeholder="Category name" value={proposeName} onChange={e=>setProposeName(e.target.value)} style={{flex:1,padding:"10px 14px",borderRadius:Z.rXs,border:`1px solid ${th.inBd}`,background:th.inBg,color:th.tx,fontSize:14,fontFamily:F,outline:"none",boxSizing:"border-box"}}/>
            </div>
            <div style={{display:"flex",gap:8}}>
              <GBtn th={th} small onClick={()=>setShowPropose(false)} style={{flex:1}}>Cancel</GBtn>
              <GBtn th={th} primary small onClick={handlePropose} style={{flex:1}}>Submit</GBtn>
            </div>
          </div>
        </div>}
      </div>}

      {/* COMPARE */}
      {page==="compare"&&(()=>{
        const p1=LISTS[2].items[0];const p2=LISTS[2].items[1]; // Sony vs Sennheiser
        return <div>
          <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:14}}>
            <button onClick={goHome} style={{background:"none",border:"none",fontSize:18,cursor:"pointer",color:th.ac}}>←</button>
            <div><div style={{fontSize:16,fontWeight:800,color:th.tx}}>Head-to-Head</div><div style={{fontSize:11,color:th.t3}}>Community-powered comparison</div></div>
          </div>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8}}>
            {[p1,p2].map((p,i)=> <div key={i} style={{background:th.gC,borderRadius:Z.r,padding:14,border:`1px solid ${th.bd}`,boxShadow:th.glow,backdropFilter:Z.content.blur,textAlign:"center"}}>
              <Thumb src={p.photo} size={56}/>
              <div style={{fontSize:14,fontWeight:800,color:th.tx,marginTop:8}}>{p.name}</div>
              <div style={{fontSize:11,color:th.t2,marginTop:4,lineHeight:1.4}}>{p.review}</div>
              <div style={{display:"flex",justifyContent:"center",gap:12,marginTop:10}}>
                <div><div style={{fontSize:18,fontWeight:800,color:th.ok}}>{p.up}</div><div style={{fontSize:10,color:th.t3}}>👍</div></div>
                <div><div style={{fontSize:18,fontWeight:800,color:th.er}}>{p.dn}</div><div style={{fontSize:10,color:th.t3}}>👎</div></div>
              </div>
              <div style={{marginTop:8,height:6,borderRadius:3,background:th.bd2,overflow:"hidden"}}>
                <div style={{width:`${Math.round(p.up/(p.up+p.dn)*100)}%`,height:"100%",borderRadius:3,background:th.acG}}/>
              </div>
              <div style={{fontSize:11,fontWeight:700,color:th.ac,marginTop:4}}>{Math.round(p.up/(p.up+p.dn)*100)}% positive</div>
            </div>)}
          </div>
          <div style={{textAlign:"center",marginTop:14,padding:14,background:th.gC,borderRadius:Z.rS,border:`1px solid ${th.bd}`}}>
            <div style={{fontSize:13,fontWeight:700,color:th.tx}}>Community Pick</div>
            <div style={{fontSize:16,fontWeight:800,color:th.ac,marginTop:4}}>{p1.up>p2.up?p1.name:p2.name}</div>
          </div>
        </div>;
      })()}
      {page==="challenges"&&<div>
        <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:14}}>
          <button onClick={goHome} style={{background:"none",border:"none",fontSize:18,cursor:"pointer",color:th.ac}}>←</button>
          <div><div style={{fontSize:16,fontWeight:800,color:th.tx}}>Monthly Challenges</div><div style={{fontSize:11,color:th.t3}}>Join a challenge, earn a badge</div></div>
        </div>
        {CHALLENGES.map(ch=>{const pct=Math.round(ch.current/ch.goal*100);return <div key={ch.id} style={{background:th.gC,borderRadius:Z.r,padding:16,marginBottom:10,border:`1px solid ${th.bd}`,boxShadow:th.glow,backdropFilter:Z.content.blur,animation:"slideUp 0.4s ease"}}>
          <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:10}}>
            <div style={{width:44,height:44,borderRadius:14,background:cg(ch.cat),display:"flex",alignItems:"center",justifyContent:"center",fontSize:22,boxShadow:`0 4px 12px ${(CC[ch.cat]||["#1b6b6b"])[0]}40`}}>{ch.icon}</div>
            <div style={{flex:1}}>
              <div style={{fontSize:15,fontWeight:800,color:th.tx}}>{ch.title}</div>
              <div style={{fontSize:12,color:th.t2}}>{ch.desc}</div>
            </div>
          </div>
          <div style={{marginBottom:8}}>
            <div style={{display:"flex",justifyContent:"space-between",marginBottom:4}}>
              <span style={{fontSize:11,fontWeight:700,color:th.t2}}>{ch.current}/{ch.goal} lists</span>
              <span style={{fontSize:11,fontWeight:800,color:pct>=90?th.ok:th.ac}}>{pct}%</span>
            </div>
            <div style={{height:10,borderRadius:5,background:th.bd2,overflow:"hidden"}}>
              <div style={{width:`${pct}%`,height:"100%",borderRadius:5,background:pct>=90?th.matchG:th.acG,transition:"width 1s ease",boxShadow:pct>=90?`0 0 12px ${th.ok}40`:"none"}}/>
            </div>
          </div>
          <div style={{display:"flex",alignItems:"center",justifyContent:"space-between"}}>
            <span style={{fontSize:11,color:th.t3}}>👥 {ch.participants} participants · Ends {new Date(ch.endDate).toLocaleDateString("en",{month:"short",day:"numeric"})}</span>
            <GBtn th={th} primary small onClick={()=>{if(!loggedIn){authGate();return;}setConfetti(true);setTimeout(()=>setConfetti(false),800);showT("Challenge joined! ✦");}}>Join Challenge</GBtn>
          </div>
        </div>;})}
      </div>}

      {/* ASKS */}
      {page==="asks"&&<div>
        <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:14}}>
          <button onClick={goHome} style={{background:"none",border:"none",fontSize:18,cursor:"pointer",color:th.ac}}>←</button>
          <div><div style={{fontSize:16,fontWeight:800,color:th.tx}}>Ask for a Top 5</div><div style={{fontSize:11,color:th.t3}}>Ask the community for their Top 5</div></div>
        </div>
        <div style={{background:th.gC,borderRadius:Z.r,padding:14,marginBottom:16,border:`1px solid ${th.bd}`,boxShadow:th.glow,backdropFilter:Z.content.blur}}>
          <input placeholder="What do you want recommendations for?" value={newAsk} onChange={e=>setNewAsk(e.target.value)} style={{width:"100%",padding:"10px 14px",borderRadius:Z.rXs,border:`1px solid ${th.inBd}`,background:th.inBg,color:th.tx,fontSize:14,fontFamily:F,outline:"none",boxSizing:"border-box",marginBottom:8}}/>
          <GBtn th={th} primary small onClick={()=>{if(newAsk.trim()){setAsks(p=>[{id:"a"+Date.now(),userId:"u1",cat:"General",q:newAsk,resp:0,date:new Date().toISOString()},...p]);setNewAsk("");setConfetti(true);setTimeout(()=>setConfetti(false),800);showT("Your ask is live! ✦");}}}>Post Ask</GBtn>
        </div>
        {asks.map(ask=>{const au=USERS.find(u=>u.id===ask.userId);return <div key={ask.id} style={{background:th.gC,borderRadius:Z.r,padding:14,marginBottom:10,border:`1px solid ${th.bd}`,boxShadow:th.glow,backdropFilter:Z.content.blur,animation:"slideUp 0.4s ease"}}>
          <div style={{display:"flex",alignItems:"center",gap:6,marginBottom:8}}>
            <div style={{width:28,height:28,borderRadius:14,overflow:"hidden"}}><img src={au?.av} style={{width:"100%",height:"100%",objectFit:"cover"}}/></div>
            <span style={{fontSize:13,fontWeight:600,color:th.tx}}>{au?.name}</span>
            <Tag text={ask.cat} th={th}/>
            <span style={{fontSize:10,color:th.t3,marginLeft:"auto"}}>{timeAgo(ask.date)}</span>
          </div>
          <div style={{fontSize:15,fontWeight:700,color:th.tx,marginBottom:8}}>{ask.q}</div>
          <div style={{display:"flex",alignItems:"center",gap:8}}>
            <span style={{fontSize:12,color:th.t3}}>💬 {ask.resp} responses</span>
            <GBtn th={th} small primary onClick={()=>{if(!loggedIn){authGate();return;}setCreateCat(ask.cat);setShowCreate(true);}}>Answer with a Top 5</GBtn>
          </div>
        </div>;})}
      </div>}
    </div>

    {/* FAB */}
    {loggedIn&&(page==="home"||page==="profile")&&<button onClick={()=>{setCreateCat("");setShowCreate(true);}} style={{position:"fixed",bottom:68,right:16,zIndex:95,width:52,height:52,borderRadius:26,border:"none",background:th.acG,color:th.acT,fontSize:22,fontWeight:800,fontFamily:F,cursor:"pointer",boxShadow:`${th.acSh},0 0 40px ${th.ac}20`,display:"flex",alignItems:"center",justifyContent:"center"}}>✦</button>}

    {/* Bottom bar */}
    <div style={{position:"fixed",bottom:0,left:0,right:0,zIndex:90,background:th.gBg,backdropFilter:Z.bg.blur,borderTop:`1px solid ${th.bd}`,padding:"10px 16px 14px",boxShadow:th.glow}}>
      <div style={{display:"flex",alignItems:"center",justifyContent:"space-between"}}>
        <span style={{fontSize:11,fontWeight:700,color:th.t3,letterSpacing:1}}>SHARE</span>
        <div style={{display:"flex",gap:8}}>{[{i:"f",c:"#1877F2"},{i:"in",c:"#0A66C2"},{i:"𝕏",c:"#000"},{i:"@",c:"#000"}].map((s,i)=> <button key={i} style={{width:28,height:28,borderRadius:14,border:"none",cursor:"pointer",background:s.c,color:"#fff",fontSize:10,fontWeight:800,fontFamily:F,display:"flex",alignItems:"center",justifyContent:"center",boxShadow:`0 2px 8px ${s.c}40`}}>{s.i}</button>)}</div>
      </div>
    </div>

    {/* Modals */}
    {shareCard&&<ShareCard list={shareCard} th={th} onClose={()=>setShareCard(null)}/>}
    {showWrapped&&<WrappedView th={th} onBack={()=>setShowWrapped(false)}/>}
    {showCreate&&<CreateModal th={th} initCat={createCat} onClose={()=>{setShowCreate(false);setCreateCat("");}} onSave={handleCreate}/>}
  </div>;
}
