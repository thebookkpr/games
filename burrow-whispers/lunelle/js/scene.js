/* One More Little Step — scenes.js V1.0
   Scene data only. No behavior lives here.
   Hotspot and petal positions are percentages of the stage
   (x, y = left, top; w, h = width, height).
   Positions below are placeholders: adjust them to match the real art.
   Whisper text is deliberately empty: dialogue is written after
   the visual assets exist (project decision). */

const SCENES = [
  {
    id: "pond",
    title: "Moonroot Pond",
    background: "images/scene-pond.jpg",
    lunelle: { src: "images/lunelle-pond.png", x: 10, bottom: 4, w: 28 },
    courageRequired: 5,
    hotspots: [
      { id: "reflection", kind: "wonder", courage: 1,
        x: 48, y: 35, w: 12, h: 14, whisper: "" },
      { id: "lotus",      kind: "watch",  courage: 1,
        x: 20, y: 55, w: 10, h: 10, whisper: "" },
      { id: "fireflies",  kind: "watch",  courage: 1,
        x: 65, y: 25, w: 12, h: 12, whisper: "" },
      { id: "reeds",      kind: "listen", courage: 1,
        x: 82, y: 50, w: 10, h: 16, whisper: "" },
      { id: "moon",       kind: "wonder", courage: 1,
        x: 40, y: 8,  w: 12, h: 12, whisper: "" }
    ],
    petal: { x: 78, y: 70 }
  },
  {
    id: "silver-light",
    title: "The Silver Light",
    background: "images/scene-silver-light.jpg",
    lunelle: { src: "images/lunelle-light.png", x: 10, bottom: 4, w: 28 },
    courageRequired: 5,
    hotspots: [],   /* fill in when the art exists */
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
