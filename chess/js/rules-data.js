/*
  PROJECT: Chess: Learn While You Play
  FILE: js/rules-data.js
  VERSION: 1.0.0
  PART: 1 of 1
  LOCATION: https://thebookkpr.github.io/games/chess/js/rules-data.js
  NOTES: Data only. Rule lessons (RULE_DEFS) and the finished page list (RULES).
         RULES is built at load time using ruleHTML() from guide.js and
         start() from engine.js, so this file must load after both.
         Load order: engine, guide, pieces-data, rules-data, coach, app.
*/

/* ---------- Rule lessons ---------- */
const RULE_DEFS=[
{k:'check',name:'Check',
 def:'A king is in check when an enemy piece attacks it. You must fix this immediately: move the king to a safe square, block the attack, or capture the attacking piece.',
 pos:{e8:'bK',e1:'wR',h1:'wK'},marks:{e8:'chk',e1:'hl'},
 cap:'The white rook attacks the black king along the open e-file. That is check.',
 mistakes:['Trying to block a knight check. Knights jump, so only moving the king or capturing the knight works.','Moving the king onto another attacked square.','Forgetting that a piece shielding your king cannot step away.'],
 advice:['Before every move, scan for enemy checks.','Capturing the attacker is often best. Blocking can cost you the blocking piece.']},
{k:'checkmate',name:'Checkmate',
 def:'Checkmate is a check with no escape. The game ends at once and the side that is checkmated loses.',
 pos:{g8:'bK',f7:'bP',g7:'bP',h7:'bP',d8:'wR',g1:'wK'},marks:{g8:'chk',d8:'hl'},
 cap:'Back-rank mate: the rook checks along the top row and the king is boxed in by its own pawns.',
 mistakes:['Giving checks with no plan and letting the king escape.','Leaving your own king with no flight square.','Missing a mate in one for yourself or your opponent.'],
 advice:['Give your king room by moving a pawn in front of it.','Look at checks first, then captures, then threats.']},
{k:'castling',name:'Castling',
 def:'The king moves two squares toward a rook, and that rook jumps over to the square beside the king. It is allowed only if neither piece has moved, nothing stands between them, the king is not in check, and it does not pass through or land on an attacked square.',
 pos:{e1:'wK',h1:'wR',e8:'bK'},marks:{g1:'mv',f1:'mv'},
 cap:'Castling kingside: the king goes to g1 and the rook to f1.',
 mistakes:['Moving the king or rook early and losing the right to castle.','Trying to castle through an attacked square.','Castling and then pushing the pawns in front of the king.'],
 advice:['Castle within the first ten moves.','Castling kingside is quicker. Castling queenside puts the rook in the center sooner.']},
{k:'promotion',name:'Promotion',
 def:'When a pawn reaches the far end of the board it must become a queen, rook, bishop or knight of its own color.',
 pos:{e7:'wP',h1:'wK',a8:'bK'},marks:{e8:'mv'},
 cap:'The pawn on e7 steps to e8 and becomes a new piece, usually a queen.',
 mistakes:['Pushing the pawn without checking whether the promotion square is attacked.','Always choosing a queen when a knight would give check or a queen would cause a stalemate.'],
 advice:['Pawns on the seventh row are dangerous. Stop them or support them.','Trade pieces when you have a passed pawn and count how many moves it needs.']},
{k:'enpassant',name:'En Passant',
 def:'French for "in passing." When an enemy pawn jumps two squares and lands right beside your pawn, you may capture it on your very next move as if it had moved only one square.',
 pos:{e5:'wP',d5:'bP',e1:'wK',e8:'bK'},marks:{d6:'cap',d5:'hl'},
 cap:'Black just played d7 to d5. White captures by moving the e5 pawn to d6.',
 mistakes:['Waiting a move. The chance disappears at once.','Using it against a pawn that did not just jump two squares.','Forgetting the captured pawn is removed from beside you, not from the landing square.'],
 advice:['When you advance a pawn two squares past an enemy pawn, expect this capture.','It is optional. Check whether it helps your position.']},
{k:'draw',name:'Draw',
 def:'A draw means nobody wins. This game ends in a draw by stalemate, when neither side has enough pieces to checkmate, or after fifty moves each without a pawn move or capture. Official chess also counts threefold repetition and agreement, which this game does not track.',
 pos:{e1:'wK',c1:'wB',e8:'bK'},marks:{},
 cap:'King and bishop against a lone king cannot force checkmate. It is a draw.',
 mistakes:['Playing on with too little material to ever mate.','Allowing repeated moves when you are ahead.','Resigning in a lost position without looking for a stalemate trick.'],
 advice:['If you are losing, look for a way to force a draw.','If you are winning, keep making progress and avoid repeating positions.']},
{k:'stalemate',name:'Stalemate',
 def:'The player to move is not in check but has no legal move. The game is a draw.',
 pos:{a8:'bK',b6:'wQ',e1:'wK'},marks:{a8:'hl'},
 cap:'Black to move. The king is not in check, but a7, b7 and b8 are all covered.',
 mistakes:['Taking away every square from a king that is not in check.','Chasing a win so fast that you forget your opponent needs a legal move.'],
 advice:['In a won ending, ask before each move: does my opponent still have a legal move?','Either give check or leave the king a square.']},
{k:'opening',name:'Opening Principles',
 def:'The opening is roughly the first ten moves. Its aims are to control the center, develop your pieces, and make your king safe.',
 pos:()=>{const b=start().b;b[si('e2')]=null;b[si('e4')]='wP';b[si('e7')]=null;b[si('e5')]='bP';b[si('g1')]=null;b[si('f3')]='wN';b[si('b8')]=null;b[si('c6')]='bN';b[si('f1')]=null;b[si('c4')]='wB';return b},
 marks:{e4:'hl',e5:'hl'},
 cap:'After 1.e4 e5 2.Nf3 Nc6 3.Bc4: center pawns, a developed knight and a developed bishop. Castling comes next.',
 mistakes:['Moving the same piece several times.','Bringing the queen out early.','Making many pawn moves while pieces stay home.','Ignoring what your opponent threatens.'],
 advice:['Fight for the center with your e and d pawns.','Develop knights and bishops, then castle.','Connect your rooks once your back row is clear.']},
{k:'endgames',name:'Endgames',
 def:'The endgame begins when most pieces have been traded. Kings become active fighters and pawns decide the game.',
 pos:{d4:'wK',d5:'wP',g8:'bK'},marks:{d5:'hl'},
 cap:'A passed pawn supported by its king. The black king is too far away to stop it.',
 mistakes:['Keeping the king at home when the queens are gone.','Pushing a pawn without support.','Trading into a king and pawn ending without counting the race.'],
 advice:['Bring your king toward the center.','Create a passed pawn and support it with your king.','Place rooks behind passed pawns.']}
];

/* ---------- Finished rule pages (Goal & Setup first, then each lesson) ---------- */
const RULES=[
{k:'basics',name:'Goal & Setup',html:`<h2>Goal &amp; Setup</h2>
<h3>The goal</h3><p>Trap the enemy king so it is under attack and has no escape. That is checkmate, and it wins the game. Kings are never actually captured.</p>
<h3>The setup</h3><p>White is at the bottom and always moves first. Each player has a light square in their right-hand corner. The queen starts on her own color: the white queen on light d1, the black queen on dark d8. The back row, from the corner, is rook, knight, bishop, queen, king, bishop, knight, rook, with eight pawns in front.</p>
<h3>Piece values</h3><p>Pawn 1, Knight 3, Bishop 3, Rook 5, Queen 9. Use these to judge whether a trade is good for you.</p>
<h3>Capturing</h3><p>You capture by moving onto an enemy piece's square. The captured piece is removed. Pawns are the only pieces that capture differently from how they move.</p>`},
...RULE_DEFS.map(r=>({k:r.k,name:r.name,html:ruleHTML(r)}))
];