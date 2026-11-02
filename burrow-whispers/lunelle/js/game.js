/* One More Little Step — game.js V1.2
   V1.1: gentle first-time tutorial (Scene 1 only)
   V1.2: missing Lunelle sprite files are hidden instead of showing a broken image */

const Game = (() => {
  const stage = document.getElementById("game");
  const TOTAL = SCENES.length;
  let current = -1;
  let courage = 0;
  let found = 0;
  let petalsGot = new Array(TOTAL).fill(false);
  let moving = false;

  /* Optional modules (effects.js, save.js) may not exist yet */
  const fx = (fn, ...a) => { if (typeof Effects !== "undefined") Effects[fn](...a); };
  const sv = () => { if (typeof Save !== "undefined") Save.save(); };

  /* Fade overlay, created once */
  const fade = document.createElement("div");
  fade.className = "fade-overlay";
  stage.appendChild(fade);

  /* ---------- Build ---------- */
  function buildScene(s, i) {
    const slots = SCENES.map(() => '<span class="petal-slot"></span>').join("");
    const L = s.lunelle;
    const el = document.createElement("section");
    el.id = "scene-" + s.id;
    el.className = "screen scene";
    el.innerHTML =
      `<div class="bg" style="background-image:url('${s.background}')"></div>
       <div class="fx-layer"></div>
       <div class="scene-name">${s.title}</div>
       <div class="hud">
         <div class="courage"><span>Courage</span>
           <div class="courage-bar"><div class="courage-fill"></div></div></div>
         <div class="petals">${slots}</div>
       </div>
       <img class="lunelle" src="${L.src}" alt="Lunelle"
            onerror="this.style.display='none';this.nextElementSibling.style.display='none'"
            style="left:${L.x}%;bottom:${L.bottom}%;width:${L.w}%">
       <div class="crest" style="left:${L.x + L.w * 0.4}%;bottom:${L.bottom + 30}%"></div>
       <p class="whisper"></p>
       <p class="hint"></p>
       <button class="next-btn">${i === TOTAL - 1 ? "One more little step" : "Next"}</button>`;

    s.hotspots.forEach(h => {
      const b = document.createElement("button");
      b.className = "hotspot";
      b.setAttribute("aria-label", h.id);
      b.style.cssText = `left:${h.x}%;top:${h.y}%;width:${h.w}%;height:${h.h}%`;
      b.addEventListener("click", e => onHotspot(s, h, b, e));
      el.appendChild(b);
    });

    const p = document.createElement("button");
    p.className = "petal";
    p.setAttribute("aria-label", "Silver petal");
    p.style.cssText = `left:${s.petal.x}%;top:${s.petal.y}%`;
    p.addEventListener("click", () => onPetal(i, p));
    el.appendChild(p);

    el.querySelector(".next-btn").addEventListener("click", () => {
      i === TOTAL - 1 ? goTitle() : goTo(i + 1);
    });
    stage.appendChild(el);
    return el;
  }

  const sceneEls = SCENES.map(buildScene);
  const titleEl = document.getElementById("title-screen");

  /* ---------- Helpers ---------- */
  const scene = () => SCENES[current];
  const el = () => sceneEls[current];

  function whisper(text) {
    if (!text) return;
    const w = el().querySelector(".whisper");
    w.textContent = text;
    w.classList.add("show");
    clearTimeout(whisper.t);
    whisper.t = setTimeout(() => w.classList.remove("show"), 3500);
  }

  function updateMeter() {
    const pct = Math.min(100, (courage / scene().courageRequired) * 100);
    el().querySelector(".courage-fill").style.width = pct + "%";
    const full = courage >= scene().courageRequired;
    el().querySelector(".courage").classList.toggle("full", full);
    el().querySelector(".next-btn").classList.toggle("ready", full);
  }

  function updatePetals() {
    sceneEls.forEach(s => s.querySelectorAll(".petal-slot").forEach((slot, n) =>
      slot.classList.toggle("got", petalsGot[n])));
  }

  function shimmer() {
    const c = el().querySelector(".crest");
    c.classList.remove("shimmer");
    void c.offsetWidth;            /* restart the animation */
    c.classList.add("shimmer");
  }

  /* ---------- Tutorial (Scene 1 only, once per session) ---------- */
  let tutorialDone = false, hintTimer, glowTimer, hintHide;

  function showHint(text, ms) {
    const h = el().querySelector(".hint");
    h.textContent = text;
    h.classList.add("show");
    clearTimeout(hintHide);
    if (ms) hintHide = setTimeout(() => h.classList.remove("show"), ms);
  }

  function stopTutorialTimers() {
    clearTimeout(hintTimer);
    clearTimeout(glowTimer);
  }

  function startTutorial() {
    stopTutorialTimers();
    const s = scene();
    if (!s.hint || tutorialDone) return;
    hintTimer = setTimeout(() => showHint(s.hint), 2500);
    glowTimer = setTimeout(() => {
      el().querySelectorAll(".hotspot:not(.found)")
        .forEach(b => b.classList.add("hint-glow"));
    }, 8000);
  }

  function endTutorial() {
    if (tutorialDone || !scene().hint) return;
    tutorialDone = true;
    stopTutorialTimers();
    el().querySelectorAll(".hint-glow")
      .forEach(b => b.classList.remove("hint-glow"));
    showHint(scene().hint2, 4500);
  }

  /* ---------- Interaction ---------- */
  function onHotspot(s, h, btn, e) {
    if (btn.classList.contains("found")) return;
    btn.classList.add("found");
    const r = stage.getBoundingClientRect();
    const rip = document.createElement("div");
    rip.className = "hotspot-ripple";
    rip.style.left = ((e.clientX - r.left) / r.width * 100) + "%";
    rip.style.top = ((e.clientY - r.top) / r.height * 100) + "%";
    el().appendChild(rip);
    setTimeout(() => rip.remove(), 1300);
    courage += h.courage;
    updateMeter();
    whisper(h.whisper);
    endTutorial();
    shimmer();
    sv();
  }

  function onPetal(i, btn) {
    if (petalsGot[i]) return;
    petalsGot[i] = true;
    btn.classList.add("collected");
    updatePetals();
    shimmer();
    sv();
  }

  /* ---------- Navigation ---------- */
  function swap(fn) {
    if (moving) return;
    moving = true;
    fade.classList.add("on");
    setTimeout(() => {
      fn();
      fade.classList.remove("on");
      moving = false;
    }, 1200);
  }

  function goTo(i) {
    swap(() => {
      titleEl.classList.remove("active");
      sceneEls.forEach(s => s.classList.remove("active"));
      current = i;
      courage = 0;
      el().classList.add("active");
      updateMeter();
      updatePetals();
      fx("start", el());
      startTutorial();
      sv();
    });
  }

  function goTitle() {
    swap(() => {
      stopTutorialTimers();
      sceneEls.forEach(s => s.classList.remove("active"));
      current = -1;
      titleEl.classList.add("active");
    });
  }

  /* ---------- Panels ---------- */
  function panel(title, body) {
    const p = document.createElement("div");
    p.className = "panel";
    p.innerHTML = `<div class="panel-card"><h2>${title}</h2><p>${body}</p>
      <button class="menu-btn">Close</button></div>`;
    p.querySelector("button").addEventListener("click", () => p.classList.remove("show"));
    stage.appendChild(p);
    return p;
  }
  const settingsPanel = panel("Settings", "Sound and display options are coming soon.");
  const creditsPanel = panel("Credits", "One More Little Step<br>A Burrow Whispers Story");

  /* ---------- Menu wiring ---------- */
  document.getElementById("btn-start").addEventListener("click", () => goTo(0));
  document.getElementById("btn-settings").addEventListener("click", () => settingsPanel.classList.add("show"));
  document.getElementById("btn-credits").addEventListener("click", () => creditsPanel.classList.add("show"));

  /* Public hooks for save.js and effects.js (later Parts) */
  return {
    goTo,
    getState: () => ({ current, courage, petalsGot: [...petalsGot] }),
    setState: s => { courage = s.courage; petalsGot = s.petalsGot; }
  };
})();
