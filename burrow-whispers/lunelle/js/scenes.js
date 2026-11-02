/* One More Little Step — scenes.js V1.7
   V1.7: Scene 2 (The Silver Light) hotspots and petal placed on the real art.
   V1.6: Scene 1 extra hotspot moved to the far-left lotus so the five spots spread across the pond.
   V1.5: Scene 1 moon hotspot moved to the rocky hill (the moon was too
   bright for the tutorial glow to show).
   Scene data only. No behavior lives here.
   V1.1: Scene 1 tutorial hint text (interface guidance, not story dialogue).
   V1.2: Scene 1 hotspots and petal placed on the real pond art.
   V1.3: Lunelle sprites moved to images/sprites/.
   Hotspot and petal positions are percentages of the stage
   (x, y = left, top; w, h = width, height).
   Scenes 2 to 5 positions are still placeholders until their art is placed.
   Whisper text is deliberately empty: dialogue is written after
   the visual assets exist (project decision).
   V1.4: Lunelle's sprites moved to images/sprites/, the Scene 1 sprite is
   now half size near the shore and fades out after 5 seconds (with the crest
   shimmer scaling to the sprite and skipping once she's gone), and unfound
   hotspots glow again after 15 seconds without a discovery. */

const SCENES = [
  {
    id: "pond",
    title: "Moonroot Pond",
    background: "images/scene-pond.jpg",
     lunelle: { src: "images/sprites/lunelle-pond.png", x: 4, bottom: 4, w: 14, vanishAfter: 5000 },
    courageRequired: 5,
    hint: "Tap what catches your eye",
    hint2: "Each discovery fills your Courage",
    hotspots: [
      /* the silver moon-path on the water */
      { id: "reflection", kind: "wonder", courage: 1,
        x: 46.7, y: 55, w: 8, h: 18, whisper: "" },
      /* the large glowing Moon Lotus, right of centre */
      { id: "lotus",      kind: "watch",  courage: 1,
        x: 62, y: 60, w: 8, h: 16, whisper: "" },
      /* the firefly cluster, upper right */
      { id: "fireflies",  kind: "watch",  courage: 1,
        x: 74, y: 23, w: 13, h: 29, whisper: "" },
      /* the grass tufts along the shoreline */
      { id: "reeds",      kind: "listen", courage: 1,
        x: 57, y: 76, w: 8, h: 18, whisper: "" },
      /* the glowing Moon Lotus on the far left of the pond */
      { id: "lotus-left", kind: "wonder", courage: 1,
        x: 15.7, y: 51.5, w: 9, h: 14, whisper: "" }
    ],
    petal: { x: 77, y: 79 }
  },
  {
    id: "silver-light",
    title: "The Silver Light",
    background: "images/scene-silver-light.jpg",
    lunelle: { src: "images/sprites/lunelle-light.png", x: 10, bottom: 4, w: 28 },
    courageRequired: 5,
    hotspots: [
      /* the glowing silver orb and its trail */
      { id: "orb",      kind: "wonder", courage: 1,
        x: 61, y: 36, w: 11, h: 18, whisper: "" },
      /* the pale glowing flowers, far left */
      { id: "flowers",  kind: "watch",  courage: 1,
        x: 9, y: 55, w: 11, h: 14, whisper: "" },
      /* the fireflies drifting among the trees */
      { id: "fireflies", kind: "watch", courage: 1,
        x: 28, y: 30, w: 12, h: 14, whisper: "" },
      /* the fallen petals along the path */
      { id: "petals",   kind: "wonder", courage: 1,
        x: 40, y: 76, w: 14, h: 16, whisper: "" },
      /* the old mossy roots of the great tree */
      { id: "roots",    kind: "listen", courage: 1,
        x: 68, y: 58, w: 12, h: 18, whisper: "" }
    ],
    /* tucked beside the rock at lower right */
    petal: { x: 82, y: 82 }
  },
  {
    id: "clearing",
    title: "The Clearing",
    background: "images/scene-clearing.jpg",
    lunelle: { src: "images/sprites/lunelle-clearing.png", x: 10, bottom: 4, w: 28 },
    courageRequired: 5,
    hotspots: [],
    petal: { x: 70, y: 60 }
  },
  {
    id: "moth",
    title: "The Moth",
    background: "images/scene-moth.jpg",
    lunelle: { src: "images/sprites/lunelle-moth.png", x: 10, bottom: 4, w: 28 },
    courageRequired: 5,
    hotspots: [],
    petal: { x: 70, y: 60 }
  },
  {
    id: "hilltop",
    title: "Farther From the Burrow",
    background: "images/scene-hilltop.jpg",
    lunelle: { src: "images/sprites/lunelle-hilltop.png", x: 10, bottom: 4, w: 28 },
    courageRequired: 5,
    hotspots: [],
    petal: { x: 70, y: 60 }
  }
];
