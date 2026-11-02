/* One More Little Step — scenes.js V1.2
   Scene data only. No behavior lives here.
   V1.1: Scene 1 tutorial hint text (interface guidance, not story dialogue).
   V1.2: Scene 1 hotspots and petal placed on the real pond art.
   Hotspot and petal positions are percentages of the stage
   (x, y = left, top; w, h = width, height).
   Scenes 2 to 5 positions are still placeholders until their art is placed.
   Whisper text is deliberately empty: dialogue is written after
   the visual assets exist (project decision). */

const SCENES = [
  {
    id: "pond",
    title: "Moonroot Pond",
    background: "images/scene-pond.jpg",
    lunelle: { src: "images/lunelle-pond.png", x: 10, bottom: 4, w: 28 },
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
      /* the full moon */
      { id: "moon",       kind: "wonder", courage: 1,
        x: 45.8, y: 3, w: 9, h: 20, whisper: "" }
    ],
    petal: { x: 77, y: 79 }
  },
  {
    id: "silver-light",
    title: "The Silver Light",
    background: "images/scene-silver-light.jpg",
    lunelle: { src: "images/lunelle-light.png", x: 10, bottom: 4, w: 28 },
    courageRequired: 5,
    hotspots: [],   /* fill in when the art is placed */
    petal: { x: 70, y: 60 }
  },
  {
    id: "clearing",
    title: "The Clearing",
    background: "images/scene-clearing.jpg",
    lunelle: { src: "images/lunelle-clearing.png", x: 10, bottom: 4, w: 28 },
    courageRequired: 5,
    hotspots: [],
    petal: { x: 70, y: 60 }
  },
  {
    id: "moth",
    title: "The Moth",
    background: "images/scene-moth.jpg",
    lunelle: { src: "images/lunelle-moth.png", x: 10, bottom: 4, w: 28 },
    courageRequired: 5,
    hotspots: [],
    petal: { x: 70, y: 60 }
  },
  {
    id: "hilltop",
    title: "Farther From the Burrow",
    background: "images/scene-hilltop.jpg",
    lunelle: { src: "images/lunelle-hilltop.png", x: 10, bottom: 4, w: 28 },
    courageRequired: 5,
    hotspots: [],
    petal: { x: 70, y: 60 }
  }
];
