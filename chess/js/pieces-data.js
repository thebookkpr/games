/*
  PROJECT: Chess: Learn While You Play
  FILE: js/pieces-data.js
  VERSION: 1.0.0
  PART: 1 of 1
  LOCATION: https://thebookkpr.github.io/games/chess/js/pieces-data.js
  NOTES: Data only. Piece lessons (PI) and common tactics (TACTIC).
         Read by guide.js when a lesson is drawn.
         Load order: engine, guide, pieces-data, rules-data, coach, app.
*/

/* ---------- Piece lessons ---------- */
const PI={
P:{name:'Pawn',val:'1 point',
  short:'Steps forward one square (two from its starting row) and captures one square diagonally forward.',
  cap:'Pawn on e2 with two enemy pawns nearby. Dots are forward moves, rings are captures.',
  how:['Moves straight forward one square, if that square is empty.','From its starting row it may move two squares forward, if both squares are empty.','Captures one square diagonally forward, never straight ahead.','Never moves backward. A pawn blocked head-on cannot move at all.'],
  special:['En passant: a special pawn capture. See Rules.','Promotion: a pawn that reaches the far row becomes a queen, rook, bishop or knight.'],
  tips:['Fight for the center early with pawns such as e4 and d4.','Pawns cannot go back, so think before pushing them.','Doubled or isolated pawns are weaknesses. Pawns side by side or in a chain protect each other.','A passed pawn, with no enemy pawn ahead of it or beside its path, can win an endgame.']},
N:{name:'Knight',val:'3 points',
  short:'Jumps in an L shape: two squares one way, then one square sideways. It can hop over other pieces.',
  cap:'Knight on d4. All eight L-shaped squares it can reach on an empty board.',
  how:['Moves two squares in one direction and one square at a right angle, an L shape with up to eight destinations.','It is the only piece that can jump over other pieces.','Always lands on a square of the opposite color to the one it left.'],
  special:[],
  tips:['Knights are strongest near the center. On the edge they control far fewer squares.','Bring your knights out early in the opening.','Look for forks: a knight attacking two valuable pieces at once.','A knight on an outpost, a square enemy pawns can no longer attack, is very strong.']},
B:{name:'Bishop',val:'3 points',
  short:'Slides any number of squares diagonally. It stays on the same color of square for the whole game.',
  cap:'Bishop on d4. It slides along all four diagonals until the edge of the board.',
  how:['Moves any number of squares along a diagonal.','Cannot jump over other pieces. It stops before a friendly piece, or can capture an enemy piece and stop there.','Each bishop is stuck on one square color forever: one on light squares, one on dark.'],
  special:[],
  tips:['Two bishops working together cover both colors and are very strong, especially in open positions.','Keep your pawns off the same color as your bishop so it is not blocked.','Long open diagonals are where bishops shine.','Watch for pins: a bishop attacking a piece that cannot move without exposing something more valuable.']},
R:{name:'Rook',val:'5 points',
  short:'Slides any number of squares in a straight line: forwards, backwards, or sideways.',
  cap:'Rook on d4. It slides along its row and column until blocked or the edge.',
  how:['Moves any number of squares horizontally or vertically.','Cannot jump over other pieces.','Takes part in castling together with the king.'],
  special:['Castling: the king moves two squares toward a rook and that rook jumps to the other side. See Rules.'],
  tips:['Rooks need open files, columns with no pawns. Place them there.','Connect your rooks by clearing the back row between them.','A rook on the seventh row, the enemy pawn row, can be devastating.','In the endgame, keep rooks active and behind passed pawns.']},
Q:{name:'Queen',val:'9 points',
  short:'The most powerful piece. Moves like a rook and a bishop combined: any distance in a straight line or diagonal.',
  cap:'Queen on d4. Every straight and diagonal line open to her.',
  how:['Moves any number of squares horizontally, vertically or diagonally.','Cannot jump over other pieces.','She starts on her own color: the white queen on a light square, the black queen on a dark square.'],
  special:[],
  tips:['Do not bring the queen out too early. Enemy minor pieces can attack her and gain tempo.','Always check that she is protected before moving her to an attacked area.','The queen is great at forks, attacking two things at once.','Trading your queen for a rook and a bishop is usually fine; losing her for one minor piece is a disaster.']},
K:{name:'King',val:'Priceless',
  short:'Moves one square in any direction. Protect it: if it cannot escape attack, you lose.',
  cap:'King on e1 with both rooks at home. Dots on g1 and c1 are the castling moves.',
  how:['Moves one square in any direction.','Can never move onto a square attacked by an enemy piece.','When attacked you are in check and must immediately escape, block, or capture the attacker.','Two kings can never stand next to each other.'],
  special:['Castling: allowed only if neither the king nor the rook has moved, nothing is between them, the king is not in check, and the king does not pass through or land on an attacked square. In this game, move the king two squares toward the rook.'],
  tips:['Castle early to tuck the king away and bring a rook into play.','Keep the pawns in front of a castled king in place.','Avoid walking the king out in the middlegame.','In the endgame the king becomes a strong fighting piece. Bring it toward the center.']}
};

/* ---------- Common tactics (one per piece) ---------- */
const TACTIC={
P:['Pawn Fork','A pawn steps forward and attacks two enemy pieces at once. Because pawns are worth the least, the attacked pieces must run, and one is often lost.'],
N:['Knight Fork','A knight jumps to a square from which it attacks two valuable pieces, often the king and a rook or queen. Knights jump, so forks are hard to block.'],
B:['Pin','A bishop attacks a piece that cannot move without exposing a more valuable piece behind it, such as the king or queen.'],
R:['Back-Rank Mate','A rook or queen checks the king on its home row while its own pawns block every escape. Give your king a flight square early.'],
Q:['Queen Fork','The queen attacks two pieces along different lines at the same time. Check that her landing square is safe before you move her.'],
K:['Opposition','In king and pawn endings, when two kings face each other with one square between them, the player who does not have to move holds the opposition and can push the other king back.']
};