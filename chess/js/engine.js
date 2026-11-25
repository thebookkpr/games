/*
  PROJECT: Chess: Learn While You Play
  FILE: js/engine.js
  VERSION: 1.0.0
  PART: 1 of 1
  LOCATION: https://thebookkpr.github.io/games/chess/js/engine.js
  NOTES: Shared constants, chess engine (moves, check, castling, en passant,
         promotion, notation) and the computer player.
         No page elements are used here, so this file loads first.
         Load order: engine, guide, pieces-data, rules-data, coach, app.
*/

/* ---------- Constants ---------- */
const FILES='abcdefgh',NAMES={P:'pawn',N:'knight',B:'bishop',R:'rook',Q:'queen',K:'king'};
const G={P:'\u265F\uFE0E',N:'\u265E',B:'\u265D',R:'\u265C',Q:'\u265B',K:'\u265A'};
const V={P:100,N:320,B:330,R:500,Q:900,K:0};
const ND=[[-2,-1],[-2,1],[-1,-2],[-1,2],[1,-2],[1,2],[2,-1],[2,1]];
const KD=[[-1,-1],[-1,0],[-1,1],[0,-1],[0,1],[1,-1],[1,0],[1,1]];
const DD=[[-1,-1],[-1,1],[1,-1],[1,1]],OD=[[-1,0],[1,0],[0,-1],[0,1]];
const ok=(r,c)=>r>=0&&r<8&&c>=0&&c<8,opp=c=>c==='w'?'b':'w',sqn=i=>FILES[i&7]+(8-(i>>3));

/* ---------- Chess engine ---------- */
function start(){const b=Array(64).fill(null),back='RNBQKBNR';
  for(let i=0;i<8;i++){b[i]='b'+back[i];b[8+i]='bP';b[48+i]='wP';b[56+i]='w'+back[i]}
  return{b,t:'w',c:{wK:1,wQ:1,bK:1,bQ:1},ep:-1,hm:0}}

function attacked(b,sq,by){
  const r=sq>>3,c=sq&7,pd=by==='w'?1:-1;
  for(const dc of[-1,1]){const rr=r+pd,cc=c+dc;if(ok(rr,cc)&&b[rr*8+cc]===by+'P')return true}
  for(const[dr,dc]of ND){const rr=r+dr,cc=c+dc;if(ok(rr,cc)&&b[rr*8+cc]===by+'N')return true}
  for(const[dr,dc]of KD){const rr=r+dr,cc=c+dc;if(ok(rr,cc)&&b[rr*8+cc]===by+'K')return true}
  for(const[ds,ps]of[[DD,'B'],[OD,'R']])for(const[dr,dc]of ds){
    let rr=r+dr,cc=c+dc;
    while(ok(rr,cc)){const p=b[rr*8+cc];if(p){if(p[0]===by&&(p[1]===ps||p[1]==='Q'))return true;break}rr+=dr;cc+=dc}}
  return false}

function gen(s,col){
  const b=s.b,out=[];
  for(let f=0;f<64;f++){
    const p=b[f];if(!p||p[0]!==col)continue;
    const r=f>>3,c=f&7,k=p[1],add=(t,x)=>out.push({f,t,...x});
    if(k==='P'){
      const d=col==='w'?-1:1,sr=col==='w'?6:1,pr=col==='w'?0:7;
      const push=(t,x={})=>{if(t>>3===pr)for(const q of'QRBN')add(t,{...x,p:q});else add(t,x)};
      const o=f+d*8;
      if(!b[o]){push(o);if(r===sr&&!b[o+d*8])add(o+d*8,{dp:1})}
      for(const dc of[-1,1]){
        const cc=c+dc;if(!ok(r+d,cc))continue;
        const t=(r+d)*8+cc;
        if(b[t]&&b[t][0]!==col)push(t,{x:1});else if(t===s.ep)add(t,{x:1,e:1})}
    }else if(k==='N'||k==='K'){
      for(const[dr,dc]of k==='N'?ND:KD){
        if(!ok(r+dr,c+dc))continue;
        const t=(r+dr)*8+c+dc;
        if(!b[t]||b[t][0]!==col)add(t,b[t]?{x:1}:{})}
      if(k==='K'){
        const h=col==='w'?60:4,o=opp(col);
        if(f===h&&!attacked(b,h,o)){
          if(s.c[col+'K']&&!b[h+1]&&!b[h+2]&&b[h+3]===col+'R'&&!attacked(b,h+1,o)&&!attacked(b,h+2,o))add(h+2,{ca:'K'});
          if(s.c[col+'Q']&&!b[h-1]&&!b[h-2]&&!b[h-3]&&b[h-4]===col+'R'&&!attacked(b,h-1,o)&&!attacked(b,h-2,o))add(h-2,{ca:'Q'})}}
    }else{
      for(const dd of k==='B'?[DD]:k==='R'?[OD]:[DD,OD])for(const[dr,dc]of dd){
        let rr=r+dr,cc=c+dc;
        while(ok(rr,cc)){
          const t=rr*8+cc;
          if(b[t]){if(b[t][0]!==col)add(t,{x:1});break}
          add(t,{});rr+=dr;cc+=dc}}}}
  return out}

function apply(s,m){
  const b=s.b.slice(),p=b[m.f],col=p[0],c={...s.c};
  b[m.f]=null;
  if(m.e)b[m.t+(col==='w'?8:-8)]=null;
  b[m.t]=m.p?col+m.p:p;
  if(m.ca){const h=m.f;if(m.ca==='K'){b[h+1]=b[h+3];b[h+3]=null}else{b[h-1]=b[h-4];b[h-4]=null}}
  if(p[1]==='K'){c[col+'K']=0;c[col+'Q']=0}
  for(const q of[m.f,m.t]){if(q===63)c.wK=0;if(q===56)c.wQ=0;if(q===7)c.bK=0;if(q===0)c.bQ=0}
  return{b,t:opp(col),c,ep:m.dp?(m.f+m.t)/2:-1,hm:(p[1]==='P'||m.x)?0:s.hm+1}}

const inCheck=s=>attacked(s.b,s.b.indexOf(s.t+'K'),opp(s.t));
const legal=s=>gen(s,s.t).filter(m=>{const n=apply(s,m);return!attacked(n.b,n.b.indexOf(s.t+'K'),opp(s.t))});

function insuff(s){
  const ps=s.b.filter(p=>p&&p[1]!=='K');
  return ps.length===0||(ps.length===1&&(ps[0][1]==='N'||ps[0][1]==='B'))}

function san(s,m,L){
  const p=s.b[m.f],k=p[1];let t;
  if(m.ca)t=m.ca==='K'?'O-O':'O-O-O';
  else if(k==='P')t=(m.x?FILES[m.f&7]+'x':'')+sqn(m.t)+(m.p?'='+m.p:'');
  else{
    const o=L.filter(n=>n!==m&&n.t===m.t&&s.b[n.f]===p);let d='';
    if(o.length){
      const sf=o.some(n=>(n.f&7)===(m.f&7)),sr=o.some(n=>(n.f>>3)===(m.f>>3));
      d=!sf?FILES[m.f&7]:!sr?String(8-(m.f>>3)):sqn(m.f)}
    t=k+d+(m.x?'x':'')+sqn(m.t)}
  const n=apply(s,m);
  if(inCheck(n))t+=legal(n).length?'+':'#';
  return t}

/* ---------- Computer player ---------- */
function evalS(s){
  let v=0;
  for(let i=0;i<64;i++){
    const p=s.b[i];if(!p)continue;
    const r=i>>3,c=i&7,k=p[1],cen=7-Math.abs(3.5-r)*1-Math.abs(3.5-c)*1-0;
    let x=V[k];
    if(k==='P')x+=(p[0]==='w'?6-r:r-1)*6+(cen-4)*3;
    else if(k==='N'||k==='B')x+=(cen-4)*8;
    v+=p[0]==='w'?x:-x}
  return v}
function search(s,d,a,b){
  const L=legal(s);
  if(!L.length)return inCheck(s)?-99999-d:0;
  if(d===0)return(s.t==='w'?1:-1)*evalS(s);
  L.sort((x,y)=>(y.x?1:0)-(x.x?1:0));
  let best=-Infinity;
  for(const m of L){
    const v=-search(apply(s,m),d-1,-b,-a);
    if(v>best)best=v;if(best>a)a=best;if(a>=b)break}
  return best}
function pick(s,d){
  let best=-Infinity,bm=null;
  for(const m of legal(s)){
    const v=-search(apply(s,m),d-1,-Infinity,Infinity)+Math.random()*(d===1?120:8);
    if(v>best){best=v;bm=m}}
  return bm}