/*
  PROJECT: Chess: Learn While You Play
  FILE: js/coach.js
  VERSION: 1.0.0
  PART: 1 of 1
  LOCATION: https://thebookkpr.github.io/games/chess/js/coach.js
  NOTES: Chess Coach messages, achievements (unlock once per session),
         achievement toasts, and the onMove() event handler.
         Needs from other files (used only when called, not at load):
           engine.js  NAMES, V, opp, attacked
           app.js     $, cur, hist, cpuColor, cname
         Load order: engine, guide, pieces-data, rules-data, coach, app.
*/

/* ---------- Achievements ---------- */
const earned=new Set();
const CENTER4=[27,28,35,36];
const ACH={
 capture:{icon:'\u2694',title:'First Capture',msg:'You won material for the first time.',coach:['Winning Material','Every capture changes the balance of the game. Pawn 1, knight 3, bishop 3, rook 5, queen 9. Before capturing, check whether your piece can be recaptured.']},
 check:{icon:'\uD83C\uDFC6',title:'First Check',msg:'The enemy king is under attack.',coach:['Check','A check forces a reply: move, block, or capture. Use checks with a purpose, because a check that gains nothing can waste time.']},
 castle:{icon:'\uD83C\uDFF0',title:'Castled',msg:'Your king is safe and your rook is active.',coach:['Castling','Castling is one of the most important defensive ideas in chess. Keep the pawns in front of your king in place.']},
 center:{icon:'\uD83C\uDFAF',title:'Center Control',msg:'You occupy an important central square.',coach:['Center Control','Pieces in or near the center reach more squares. Pawns on d4, e4, d5 and e5 claim it, and your pieces then support them.']},
 knight:{icon:'\u265E',title:'Knight Developed',msg:'A knight enters the game.',coach:['Knight Development','Knights are usually developed early, because their best squares are toward the center. Bishops follow.']},
 promo:{icon:'\uD83D\uDC51',title:'Promotion',msg:'A pawn completed its journey.',coach:['Promotion','A pawn that completes the journey becomes a new piece. A queen is usually best, but a knight can sometimes win material with a fork.']},
 mate:{icon:'\u265A',title:'Checkmate',msg:'You trapped the enemy king.',coach:['Checkmate','The king is attacked and cannot escape. Look back over the game: which pieces worked together to trap it?']}
};

/* ---------- Coach panel ---------- */
function setCoach(title,msg){
  $('coachTitle').textContent=title;$('coachMsg').textContent=msg;
  const c=$('coach');c.classList.remove('pulse');void c.offsetWidth;c.classList.add('pulse')}
function welcomeCoach(){setCoach('Welcome','Tap any piece to see its lesson. As you play, I will point out useful ideas the moment they come up.')}

/* ---------- Toasts ---------- */
function toast(a){
  if($('gameScreen').hidden)return;
  const box=$('toasts');
  while(box.children.length>=3)box.firstChild.remove();
  const t=document.createElement('div');t.className='toast';
  t.innerHTML=`<span class="ti">${a.icon}</span><div><b>${a.title}</b><div>${a.msg}</div></div>`;
  box.append(t);setTimeout(()=>t.remove(),5000)}

/* ---------- Move events ---------- */
function onMove(h){
  const m=h.m,mover=h.s.t,k=h.s.b[m.f][1],cpu=cpuColor(),human=mover!==cpu;
  const mate=h.t.endsWith('#'),chk=h.t.endsWith('+');
  const mid=sq=>{const r=sq>>3,c=sq&7;return r>=2&&r<=5&&c>=2&&c<=5};
  /* achievements (only for a human player's moves, once per session) */
  const got=[],unlock=key=>{if(human&&!earned.has(key)){earned.add(key);got.push(key)}};
  if(mate)unlock('mate');
  if(m.p)unlock('promo');
  if(m.ca)unlock('castle');
  if(chk)unlock('check');
  if(m.x)unlock('capture');
  if(CENTER4.includes(m.t))unlock('center');
  if(k==='N'&&[57,62,1,6].includes(m.f))unlock('knight');
  got.forEach(key=>toast(ACH[key]));
  if(got.length){const c=ACH[got[0]].coach;setCoach(c[0],c[1]);return}
  /* coach events */
  if(mate){
    if(cpu===null)setCoach('Checkmate',`${cname(mover)} wins. The ${cname(opp(mover)).toLowerCase()} king is attacked and has no escape.`);
    else if(human)setCoach('Checkmate','You trapped the enemy king. It is attacked and has no escape. Well played.');
    else setCoach('Checkmate','The computer trapped your king. Look back: where could the king have found safety, or a piece blocked the attack?');
    return}
  if(m.p){setCoach('Promotion',`A pawn reached the far row and became a ${NAMES[m.p]}.`);return}
  if(m.ca){setCoach('King Safety','Castling protects the king and activates a rook.');return}
  if(chk){
    const tail='It must move, block, or capture the checking piece.';
    if(cpu===null)setCoach('Check',`The ${cname(opp(mover)).toLowerCase()} king is under attack. ${tail}`);
    else if(human)setCoach('Check',`The enemy king is under attack. ${tail}`);
    else setCoach('Check','Your king is under attack. Move it, block the attack, or capture the checking piece.');
    return}
  if(m.x){
    const cp=m.e?'P':h.s.b[m.t][1],pts=V[cp]/100;
    let msg=`A ${NAMES[cp]} worth ${pts} point${pts===1?'':'s'} was captured. Remember: pawn 1, knight and bishop 3, rook 5, queen 9.`;
    if(attacked(cur.b,m.t,opp(mover))&&!attacked(cur.b,m.t,mover))msg+=' The capturing piece is now attacked and unprotected.';
    setCoach('Capture',msg);return}
  if(!human)return;
  if(k==='Q'&&[59,3].includes(m.f)&&hist.length<=10){setCoach('Early Queen','The queen is powerful but valuable. Out early, she can be chased by minor pieces. Bring your knights and bishops out first.');return}
  if(k==='P'&&CENTER4.includes(m.t)){setCoach('Center Control','The center gives your pieces more freedom and influence.');return}
  if(k==='N'&&mid(m.t)&&!mid(m.f)){setCoach('Strong Knight','Knights are strongest near the center, where they reach the most squares.');return}
  if(k==='B'&&[58,61,2,5].includes(m.f)){setCoach('Bishop Development','Bringing pieces into the game improves coordination. Look for the open diagonals your bishop now eyes.');return}}