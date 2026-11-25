/*
  PROJECT: Chess: Learn While You Play
  FILE: js/app.js
  VERSION: 1.0.0
  PART: 1 of 1
  LOCATION: https://thebookkpr.github.io/games/chess/js/app.js
  NOTES: Game state, board squares, screens and menus, board play,
         button wiring, full screen, guide click handlers, and startup.
         Loads last because it uses every other file.
         Load order: engine, guide, pieces-data, rules-data, coach, app.
*/

/* ---------- State ---------- */
let cur=start(),hist=[],sel=null,flipped=false,LM=[],over=false,thinking=false,pendingPromo=null;
let info=null,gTab='pieces',gPiece='P',gRule='basics';
const $=id=>document.getElementById(id),bd=$('board'),sqs=[],guidePanel=$('guidePanel');

/* ---------- Board squares ---------- */
for(let i=0;i<64;i++){
  const e=document.createElement('button');e.className='sq';e.type='button';
  e.innerHTML='<span class="g"></span><span class="rk"></span><span class="fl"></span>';
  e.addEventListener('click',()=>click(+e.dataset.s));
  bd.append(e);sqs.push(e)}

/* ---------- Helpers ---------- */
const cpuColor=()=>{const m=$('opponent').value;return m==='w'?'b':m==='b'?'w':null};
const cpuTurn=()=>cpuColor()===cur.t;
const cname=c=>c==='w'?'White':'Black';

/* ---------- Screens and menu ---------- */
function show(name){
  for(const id of['mainMenu','gameScreen','guideScreen'])$(id).hidden=id!==name;
  const inGame=$('gameLayout');
  if(name==='guideScreen'){$('guideSlot').append(guidePanel)}
  else if(guidePanel.parentElement!==inGame){inGame.append(guidePanel)}
  $('playBtn').textContent=hist.length&&!over?'Resume Game':'Play Game';
  closeMenu();window.scrollTo(0,0)}

function setMenu(on){
  $('gameMenu').classList.toggle('open',on);
  $('menuBackdrop').classList.toggle('open',on);
  $('menuToggle').setAttribute('aria-expanded',on)}
const closeMenu=()=>setMenu(false);

function setGuideOpen(on){
  document.body.classList.toggle('gopen',on);
  $('guideToggle').innerHTML='Guide '+(on?'&#9650;':'&#9660;');
  $('guideToggle').setAttribute('aria-expanded',on)}

/* ---------- Board play ---------- */
function render(){
  LM=legal(cur);
  const ch=inCheck(cur),last=hist.length?hist[hist.length-1].m:null,
        tg=sel!==null?LM.filter(m=>m.f===sel):[],n=cname(cur.t);
  let msg;over=true;
  if(!LM.length)msg=ch?`Checkmate. ${cur.t==='w'?'Black':'White'} wins.`:'Stalemate. The game is a draw.';
  else if(cur.hm>=100)msg='Draw by the 50-move rule.';
  else if(insuff(cur))msg='Draw. Neither side has enough material to mate.';
  else{over=false;msg=thinking?'Computer is thinking…':n+' to move'+(ch?'. You are in check.':'')}
  const st=$('gameStatus');st.textContent=msg;st.className=over?'over':'';
  const ksq=ch?cur.b.indexOf(cur.t+'K'):-1;
  for(let i=0;i<64;i++){
    const s=flipped?63-i:i,e=sqs[i],p=cur.b[s],dr=i>>3,dc=i&7;
    e.dataset.s=s;
    let cl='sq '+(((s>>3)+(s&7))%2?'d':'l');
    if(p)cl+=' '+p[0];
    if(last&&(s===last.f||s===last.t))cl+=' last';
    if(s===sel)cl+=' sel';
    if(s===ksq)cl+=' chk';
    const t=tg.find(m=>m.t===s);
    if(t)cl+=' mv'+(t.x?' cap':'');
    e.className=cl;
    e.children[0].textContent=p?G[p[1]]:'';
    e.children[1].textContent=dc===0?8-(s>>3):'';
    e.children[2].textContent=dr===7?FILES[s&7]:'';
    e.setAttribute('aria-label',(p?(p[0]==='w'?'white ':'black ')+NAMES[p[1]]:'empty')+' '+sqn(s))}
  renderSummary();renderMoves()}

function click(s){
  const p=cur.b[s],blocked=over||thinking||pendingPromo||cpuTurn();
  const isMove=!blocked&&sel!==null&&LM.some(m=>m.f===sel&&m.t===s);
  if(p&&!isMove){
    info={t:p[1],c:p[0],s};
    if(gTab!=='moves'){
      const changed=gTab!=='pieces'||gPiece!==p[1];
      gTab='pieces';gPiece=p[1];
      if(changed){renderGuide();guidePanel.scrollTop=0}}}
  if(blocked){renderSummary();return}
  if(sel!==null){
    const ms=LM.filter(m=>m.f===sel&&m.t===s);
    if(ms.length){
      if(ms[0].p){askPromo(ms)}else doMove(ms[0]);
      return}}
  sel=(p&&p[0]===cur.t&&s!==sel)?s:null;
  render()}

function askPromo(ms){
  pendingPromo=ms;
  const box=$('promo').firstElementChild;box.innerHTML='';
  for(const q of'QRBN'){
    const b=document.createElement('button');b.type='button';b.className=cur.t;
    b.textContent=G[q];b.setAttribute('aria-label','Promote to '+NAMES[q]);
    b.onclick=()=>{const m=ms.find(x=>x.p===q);pendingPromo=null;$('promo').classList.remove('on');doMove(m)};
    box.append(b)}
  $('promo').classList.add('on')}

function doMove(m){
  const t=san(cur,m,LM),h={s:cur,m,t};
  hist.push(h);
  cur=apply(cur,m);sel=null;
  onMove(h);
  render();maybeCpu()}

function maybeCpu(){
  if(over||!cpuTurn())return;
  thinking=true;render();
  setTimeout(()=>{
    const m=pick(cur,+$('difficulty').value);
    thinking=false;
    if(m)doMove(m);else render()},60)}

function reset(){
  cur=start();hist=[];sel=null;info=null;pendingPromo=null;thinking=false;
  $('promo').classList.remove('on');
  flipped=cpuColor()==='w';
  welcomeCoach();
  render();maybeCpu()}

/* ---------- Button wiring ---------- */
$('playBtn').onclick=()=>show('gameScreen');
$('guideBtn').onclick=()=>show('guideScreen');
$('guideBack').onclick=()=>show('mainMenu');
$('settingsBtn').onclick=()=>$('settingsDialog').showModal();
$('aboutBtn').onclick=()=>$('aboutDialog').showModal();
$('closeSettings').onclick=()=>$('settingsDialog').close();
$('closeAbout').onclick=()=>$('aboutDialog').close();
$('menuToggle').onclick=()=>setMenu(!$('gameMenu').classList.contains('open'));
$('menuBackdrop').onclick=closeMenu;
$('guideToggle').onclick=()=>setGuideOpen(!document.body.classList.contains('gopen'));
document.addEventListener('keydown',e=>{if(e.key==='Escape')closeMenu()});

$('newGame').onclick=()=>{closeMenu();reset()};
$('flipBoard').onclick=()=>{closeMenu();flipped=!flipped;render()};
$('undoMove').onclick=()=>{
  closeMenu();
  if(thinking||!hist.length)return;
  pendingPromo=null;$('promo').classList.remove('on');
  cur=hist.pop().s;
  if(cpuColor()&&cpuTurn()&&hist.length)cur=hist.pop().s;
  sel=null;setCoach('Move undone','Try a different idea. Ask what your opponent threatens before you choose.');render();maybeCpu()};
$('openSettings').onclick=()=>{closeMenu();$('settingsDialog').showModal()};
$('returnMainMenu').onclick=()=>show('mainMenu');
$('opponent').onchange=()=>reset();

/* ---------- Full screen ---------- */
const root=document.documentElement,fsBtn=$('fullscreen');
let apiFs=false;
const fsEl=()=>document.fullscreenElement||document.webkitFullscreenElement;
function syncFs(){fsBtn.textContent=document.body.classList.contains('fs')?'Exit Full Screen':'Full Screen'}
function setFs(on){document.body.classList.toggle('fs',on);syncFs()}
fsBtn.onclick=()=>{
  closeMenu();
  if(!document.body.classList.contains('fs')){
    setFs(true);
    const req=root.requestFullscreen||root.webkitRequestFullscreen;
    const blocked=()=>toast({icon:'\u2139\uFE0F',title:'Full screen is limited here',msg:'This view cannot hide the status bar. Open the page in your phone browser for true full screen.'});
    if(req)try{Promise.resolve(req.call(root)).catch(blocked)}catch(e){blocked()}else blocked();
  }else{
    setFs(false);
    const ex=document.exitFullscreen||document.webkitExitFullscreen;
    if(fsEl()&&ex)try{Promise.resolve(ex.call(document)).catch(()=>{})}catch(e){}}};
function onFsChange(){
  if(fsEl())apiFs=true;
  else if(apiFs){apiFs=false;setFs(false)}}
document.addEventListener('fullscreenchange',onFsChange);
document.addEventListener('webkitfullscreenchange',onFsChange);

/* ---------- Guide click handlers ---------- */
guidePanel.addEventListener('click',e=>{
  const t=e.target.closest('[data-tab],[data-p],[data-r]');if(!t)return;
  if(t.dataset.tab)gTab=t.dataset.tab;
  if(t.dataset.p)gPiece=t.dataset.p;
  if(t.dataset.r)gRule=t.dataset.r;
  renderGuide();
  if(!t.dataset.tab)guidePanel.scrollTop=0});

$('pieceSummary').onclick=()=>{
  if(!info)return;
  gTab='pieces';gPiece=info.t;renderGuide();
  setGuideOpen(true);guidePanel.scrollTop=0};

/* ---------- Startup ---------- */
renderGuide();
setGuideOpen(false);
syncFs();
reset();