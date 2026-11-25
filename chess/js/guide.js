/*
  PROJECT: Chess: Learn While You Play
  FILE: js/guide.js
  VERSION: 1.0.0
  PART: 1 of 1
  LOCATION: https://thebookkpr.github.io/games/chess/js/guide.js
  NOTES: Mini-board diagrams, lesson page builders, and the render
         functions for the guide panel, move history and piece summary.
         Needs from other files (used only when called, not at load):
           engine.js      G, NAMES, FILES, gen, legal, attacked, opp, sqn
           pieces-data.js PI, TACTIC
           rules-data.js  RULES
           app.js         $, guidePanel, cur, hist, info, gTab, gPiece, gRule, cname
         Click handlers for the guide live in app.js.
         Load order: engine, guide, pieces-data, rules-data, coach, app.
*/

/* ---------- Mini boards ---------- */
const si=n=>(8-+n[1])*8+FILES.indexOf(n[0]);
function boardFrom(o){const b=Array(64).fill(null);for(const[k,v]of Object.entries(o))b[si(k)]=v;return b}
function miniHTML(b,mk={}){
  let h='<div class="mini" aria-hidden="true">';
  for(let i=0;i<64;i++){
    const p=b[i],t=mk[i];
    h+=`<div class="mq ${((i>>3)+(i&7))%2?'d':'l'}${t==='mv'||t==='cap'?' mv':''}${t==='cap'?' cap':''}${t==='chk'?' chk':''}${t==='hl'?' hl':''}">${p?`<span class="gl ${p[0]}">${G[p[1]]}</span>`:''}</div>`}
  return h+'</div>'}

function diagram(k){
  const b=Array(64).fill(null),st={b,t:'w',c:{},ep:-1,hm:0};
  let from;
  if(k==='P'){from=52;b[52]='wP';b[43]='bP';b[45]='bP'}
  else if(k==='K'){from=60;b[60]='wK';b[63]='wR';b[56]='wR';st.c={wK:1,wQ:1}}
  else{from=35;b[35]='w'+k}
  const mk={};
  for(const m of gen(st,'w'))if(m.f===from)mk[m.t]=m.x?'cap':'mv';
  return miniHTML(b,mk)}

/* ---------- Lesson pages ---------- */
const list=a=>a.length?'<ul>'+a.map(x=>'<li>'+x+'</li>').join('')+'</ul>':'';

function pieceGuide(k){
  const P=PI[k],T=TACTIC[k];
  return `<h2>${P.name}</h2><p><b>Value:</b> ${P.val}</p>
    <div class="guideDiagram">${diagram(k)}<small>${P.cap}</small></div>
    <h3>How it moves</h3><p>${P.short}</p>${list(P.how)}
    ${P.special.length?'<h3>Special rules</h3>'+list(P.special):''}
    <h3>Common tactic: ${T[0]}</h3><p>${T[1]}</p>
    <h3>Tips</h3>${list(P.tips)}`}

function ruleHTML(r){
  const pos=typeof r.pos==='function'?r.pos():boardFrom(r.pos);
  const mk={};for(const[k,v]of Object.entries(r.marks||{}))mk[si(k)]=v;
  return `<h2>${r.name}</h2>
    <h3>Definition</h3><p>${r.def}</p>
    <h3>Visual example</h3><div class="guideDiagram">${miniHTML(pos,mk)}<small>${r.cap}</small></div>
    <h3>Common mistakes</h3>${list(r.mistakes)}
    <h3>Practical advice</h3>${list(r.advice)}`}

/* ---------- Guide panel ---------- */
function renderGuide(){
  for(const t of guidePanel.querySelectorAll('.tab'))t.classList.toggle('active',t.dataset.tab===gTab);
  const nav=$('pieceList'),gc=$('guideContent'),mh=$('moveHistory');
  nav.hidden=gTab==='moves';gc.hidden=gTab==='moves';mh.hidden=gTab!=='moves';
  if(gTab==='pieces'){
    nav.innerHTML=Object.keys(PI).map(k=>`<button type="button" data-p="${k}" class="${k===gPiece?'on':''}">${G[k]} ${PI[k].name}</button>`).join('');
    gc.innerHTML=pieceGuide(gPiece)}
  else if(gTab==='rules'){
    nav.innerHTML=RULES.map(r=>`<button type="button" data-r="${r.k}" class="${r.k===gRule?'on':''}">${r.name}</button>`).join('');
    gc.innerHTML=RULES.find(r=>r.k===gRule).html}
  else renderMoves()}

/* ---------- Move history ---------- */
function renderMoves(){
  if(gTab!=='moves')return;
  const mh=$('moveHistory');
  if(!hist.length){mh.innerHTML='<p class="hint">No moves yet. White moves first.</p>';return}
  let h='';
  for(let i=0;i<hist.length;i+=2)h+=`<div><span>${i/2+1}.</span><b>${hist[i].t}</b><b>${hist[i+1]?hist[i+1].t:''}</b></div>`;
  mh.innerHTML=h;
  guidePanel.scrollTop=guidePanel.scrollHeight}

/* ---------- Piece summary ---------- */
function renderSummary(){
  const el=$('pieceSummary');
  if(!info){el.innerHTML='<span class="hint">Tap any piece to see its lesson in the guide.</span>';return}
  const P=PI[info.t],here=cur.b[info.s]===info.c+info.t;
  let live='';
  if(here){
    const mv=legal({...cur,t:info.c,ep:info.c===cur.t?cur.ep:-1}).filter(m=>m.f===info.s);
    const n=new Set(mv.map(m=>m.t)).size;
    const att=attacked(cur.b,info.s,opp(info.c)),def=attacked(cur.b,info.s,info.c);
    live=`<div>${info.c===cur.t?'Can move to':'Would be able to move to'} ${n} square${n===1?'':'s'}${n?'':' (currently stuck)'}.</div>`+
      (info.t==='K'?(att?'<span class="tag bad">In check</span>':'<span class="tag good">Safe</span>'):
       (att?'<span class="tag bad">Under attack</span>':'<span class="tag good">Not attacked</span>')+(def?'<span class="tag good">Protected</span>':'<span class="tag bad">Unprotected</span>'))}
  el.innerHTML=`<div class="pc"><span class="chip gl ${info.c}">${G[info.t]}</span><div><b>${cname(info.c)} ${P.name}${here?' on '+sqn(info.s):''}</b><div>${P.short}</div></div></div>${live}<div class="more">Tap for the full ${P.name.toLowerCase()} guide &rarr;</div>`}