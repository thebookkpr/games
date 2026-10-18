/* Games menu: screen switching and a soft click tone (no audio file needed) */
(function () {
  'use strict';

  /* ---------- Screens ---------- */
  var screens = document.querySelectorAll('.screen');
  var firstLoad = true;

  function showScreen() {
    var id = location.hash.slice(1);
    var target = document.getElementById(id);
    if (!target || !target.classList.contains('screen')) {
      target = document.getElementById('games');
    }
    screens.forEach(function (s) { s.hidden = (s !== target); });

    var heading = target.querySelector('h1');
    document.title = heading.textContent;

    // Move focus to the new menu's title so keyboard and screen reader users land in the right place
    if (!firstLoad) heading.focus({ preventScroll: true });
    firstLoad = false;
  }

  window.addEventListener('hashchange', showScreen);
  showScreen();

  /* ---------- Click tone ---------- */
  var ctx = null;

  function playClick() {
    try {
      var AC = window.AudioContext || window.webkitAudioContext;
      if (!AC) return;
      if (!ctx) ctx = new AC();
      if (ctx.state === 'suspended') ctx.resume();

      var now = ctx.currentTime;
      var osc = ctx.createOscillator();
      var gain = ctx.createGain();

      // A soft, short "tock" that settles downward
      osc.type = 'sine';
      osc.frequency.setValueAtTime(660, now);
      osc.frequency.exponentialRampToValueAtTime(440, now + 0.12);

      gain.gain.setValueAtTime(0.0001, now);
      gain.gain.exponentialRampToValueAtTime(0.18, now + 0.01);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.16);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.18);
    } catch (e) {
      /* Sound is a nicety; never block the menu */
    }
  }

  document.addEventListener('click', function (e) {
    var link = e.target.closest('.btn, .back');
    if (!link) return;

    playClick();

    // Give the tone a moment to play before leaving for the game
    var leavingPage = link.hasAttribute('data-external') &&
      !(e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0);
    if (leavingPage) {
      e.preventDefault();
      setTimeout(function () { window.location.href = link.href; }, 170);
    }
  });
})();
