/* =========================================================
   CONFIG — edit these two lines to personalize the site
   ========================================================= */

   if ("scrollRestoration" in history){
  history.scrollRestoration = "manual";
}
window.scrollTo(0, 0);
const CONFIG = {
  name: "Dewi Shinta Naibaho",                      // her name
  startDate: "2008-07-15T00:00:00",  // origin date for the timer
};

document.getElementById("heroName").textContent = CONFIG.name;
document.getElementById("introName").textContent = CONFIG.name;
document.title = `Happy Birthday, ${CONFIG.name}`;


(function ambientPetals(){
  const field = document.getElementById("ambientPetals");
  const glyphs = ["&#10047;", "&#10022;", "&#9825;"];
  const count = window.innerWidth < 600 ? 10 : 18;
  for (let i = 0; i < count; i++){
    const el = document.createElement("span");
    el.innerHTML = glyphs[Math.floor(Math.random() * glyphs.length)];
    el.style.left = Math.random() * 100 + "%";
    el.style.fontSize = 10 + Math.random() * 12 + "px";
    const duration = 14 + Math.random() * 16;
    el.style.animationDuration = duration + "s";
    el.style.animationDelay = -Math.random() * duration + "s";
    field.appendChild(el);
  }
})();

(function timeSince(){
  const start = new Date(CONFIG.startDate);
  const els = {
    y: document.getElementById("tYears"),
    mo: document.getElementById("tMonths"),
    d: document.getElementById("tDays"),
    h: document.getElementById("tHours"),
    mi: document.getElementById("tMinutes"),
    s: document.getElementById("tSeconds"),
  };
  const pad = n => String(n).padStart(2, "0");

  function diffParts(from, to){
    let years = to.getFullYear() - from.getFullYear();
    let months = to.getMonth() - from.getMonth();
    let days = to.getDate() - from.getDate();
    let hours = to.getHours() - from.getHours();
    let minutes = to.getMinutes() - from.getMinutes();
    let seconds = to.getSeconds() - from.getSeconds();

    if (seconds < 0){ seconds += 60; minutes--; }
    if (minutes < 0){ minutes += 60; hours--; }
    if (hours < 0){ hours += 24; days--; }
    if (days < 0){
      const prevMonth = new Date(to.getFullYear(), to.getMonth(), 0);
      days += prevMonth.getDate();
      months--;
    }
    if (months < 0){ months += 12; years--; }
    return { years, months, days, hours, minutes, seconds };
  }

  function tick(){
    const now = new Date();
    const p = diffParts(start, now);
    els.y.textContent = pad(p.years);
    els.mo.textContent = pad(p.months);
    els.d.textContent = pad(p.days);
    els.h.textContent = pad(p.hours);
    els.mi.textContent = pad(p.minutes);
    els.s.textContent = pad(p.seconds);
  }
  tick();
  setInterval(tick, 1000);
})();


(function scrollReveal(){
  const targets = document.querySelectorAll(
    ".section__eyebrow, .section__title, .section__name, .section__sub, .ornament, " +
    ".timer, .timer__since, .timer__foot, .letter, .traits, .gallery, .hope, .hope__signoff"
  );
  targets.forEach(el => el.classList.add("reveal"));

  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting){
        entry.target.classList.add("is-visible");
      }
    });
  }, { threshold: 0.18 });

  targets.forEach(el => io.observe(el));
})();

/* =========================================================
   MUSIC PLAYER
   ========================================================= */
const audio = document.getElementById("bgAudio");
const player = document.getElementById("player");
const playerBtn = document.getElementById("playerBtn");
const iconPlay = document.getElementById("iconPlay");
const iconPause = document.getElementById("iconPause");
const barFill = document.getElementById("playerBarFill");

function setPlayingUI(isPlaying){
  player.classList.toggle("is-playing", isPlaying);
  player.classList.add("is-active");
  iconPlay.style.display = isPlaying ? "none" : "block";
  iconPause.style.display = isPlaying ? "block" : "none";
}

function playAudio(){
  const p = audio.play();
  if (p !== undefined){
    p.then(() => setPlayingUI(true)).catch(() => setPlayingUI(false));
  }
}

playerBtn.addEventListener("click", () => {
  if (audio.paused){
    playAudio();
  } else {
    audio.pause();
    setPlayingUI(false);
  }
});

audio.addEventListener("timeupdate", () => {
  if (audio.duration){
    barFill.style.width = (audio.currentTime / audio.duration) * 100 + "%";
  }
});
audio.addEventListener("play", () => setPlayingUI(true));
audio.addEventListener("pause", () => setPlayingUI(false));

/* =========================================================
   GIFT BOX -> FLOWER BLOOM -> REVEAL CONTENT
   ========================================================= */
(function giftBox(){
  const box = document.getElementById("giftbox");
  const overlay = document.getElementById("bloomOverlay");
  const flowerLayer = document.getElementById("bloomFlowers");
  const scrollNote = document.getElementById("scrollNote");
  const hero = document.getElementById("hero");

  const FLOWER_GLYPHS = ["&#10047;", "&#127801;", "&#127802;", "&#127804;", "&#10022;", "&#9825;"];

  document.body.classList.add("no-scroll");

  function spawnFlowers(){
    const total = window.innerWidth < 600 ? 34 : 60;
    for (let i = 0; i < total; i++){
      const f = document.createElement("span");
      f.classList.add("bloom-flower");
      f.innerHTML = FLOWER_GLYPHS[Math.floor(Math.random() * FLOWER_GLYPHS.length)];

      const startX = 42 + Math.random() * 16; // vw, near box (bottom-center-ish)
      const travelX = (Math.random() - 0.5) * 90; // vw spread
      const travelY = -(70 + Math.random() * 55); // vh upward
      const rotate = (Math.random() - 0.5) * 720;
      const scale = 0.7 + Math.random() * 1.1;

      f.style.left = startX + "vw";
      f.style.fontSize = (16 + Math.random() * 20) + "px";
      f.style.color = Math.random() > 0.5 ? "#ff8fb3" : "#f4c9d8";
      f.style.setProperty(
        "--fly-transform",
        `translate(${travelX}vw, ${travelY}vh) rotate(${rotate}deg) scale(${scale})`
      );
      f.style.animationDuration = (1.3 + Math.random() * 1.1) + "s";
      f.style.animationDelay = (Math.random() * 0.5) + "s";
      flowerLayer.appendChild(f);
    }
  }

  box.addEventListener("click", () => {
    if (box.classList.contains("is-opened")) return;
    box.classList.add("is-opened");

    playAudio();

    setTimeout(() => {
      overlay.classList.add("is-blooming");
      spawnFlowers();
    }, 320);

    setTimeout(() => {
      hero.style.display = "none";
      document.body.classList.remove("no-scroll");
      window.scrollTo({ top: 0, behavior: "instant" in window ? "instant" : "auto" });
      document.getElementById("s1").scrollIntoView({ behavior: "smooth" });
    }, 1500);

    setTimeout(() => {
      overlay.classList.add("is-fading");
    }, 1700);

    setTimeout(() => {
      overlay.classList.remove("is-blooming", "is-fading");
      flowerLayer.innerHTML = "";
      scrollNote.classList.remove("is-visible");
    }, 2500);
  });
})();
