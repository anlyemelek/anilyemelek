/* =========================================================
   Anıl Yemelek — SPA (hash router)
   Rotalar: #/  #/work  #/work/:slug  #/about  #/contact
   ========================================================= */

const $ = (sel, el = document) => el.querySelector(sel);
const $$ = (sel, el = document) => Array.from(el.querySelectorAll(sel));
const app = $("#app");

const esc = (s = "") =>
  String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

const bySlug = (slug) => PROJECTS.find((p) => p.slug === slug);

// vumbnail.com kapaklarında ana sayfa için büyük boy
const coverLarge = (p) => p.cover.replace(/vumbnail\.com\/(\d+)\.jpg$/, "vumbnail.com/$1_large.jpg");

const vimeoPlayer = (id) =>
  `https://player.vimeo.com/video/${id}?title=0&byline=0&portrait=0&color=ffffff&dnt=1`;

const ICONS = {
  instagram:
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4.2"/><circle cx="17.4" cy="6.6" r="1" fill="currentColor" stroke="none"/></svg>',
  vimeo:
    '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M23.977 6.416c-.105 2.338-1.739 5.543-4.894 9.609-3.268 4.247-6.026 6.37-8.29 6.37-1.409 0-2.578-1.294-3.553-3.881L5.322 11.4C4.603 8.816 3.834 7.522 3.01 7.522c-.179 0-.806.378-1.881 1.132L0 7.197c1.185-1.044 2.351-2.084 3.501-3.128C5.08 2.701 6.266 1.984 7.055 1.91c1.867-.18 3.016 1.1 3.447 3.838.465 2.953.789 4.789.971 5.507.539 2.45 1.131 3.674 1.776 3.674.502 0 1.256-.796 2.265-2.385 1.004-1.589 1.54-2.797 1.612-3.628.144-1.371-.395-2.061-1.614-2.061-.574 0-1.167.121-1.777.391 1.186-3.868 3.434-5.757 6.762-5.637 2.473.06 3.628 1.664 3.493 4.797l-.013.01z"/></svg>'
};

// Dev başlıklar için harf harf animasyon
const split = (text) =>
  `<span class="split" aria-label="${esc(text)}">${[...text]
    .map((c, i) => `<span style="--i:${i}" aria-hidden="true">${c === " " ? "&nbsp;" : esc(c)}</span>`)
    .join("")}</span>`;

const logoHTML = () => `
  <a href="#/" class="logo" aria-label="${esc(SITE.name)}">
    <span class="logo-name">ANIL<br />YEMELEK</span>
    <span class="logo-tag">DIRECTOR OF PHOTOGRAPHY</span>
<!--    <i class="logo-dot" aria-hidden="true"></i>-->
<!--    <i class="logo-corner" aria-hidden="true"></i>-->
  </a>`;

const telHref = (t) => "tel:" + t.replace(/[^\d+]/g, "");

/* ---------------------------------------------------------
   Router
   --------------------------------------------------------- */
let cleanup = null;

function router() {
  if (cleanup) { cleanup(); cleanup = null; }
  resetCardPreviews();
  closeMenu();
  closeLightbox();

  const [, route = "", param] = (location.hash || "#/").split("/");

  // Eski linkler: #/project/slug → #/work/slug
  if (route === "project" && param) {
    location.replace(`#/work/${param}`);
    return;
  }

  const page = route === "work" && param ? "project" : route || "home";
  document.body.classList.remove("page-home", "page-work", "page-project", "page-about", "page-contact", "page-notfound");
  document.body.classList.add(`page-${page}`);
  $$("[data-route]").forEach((a) => a.classList.toggle("active", a.dataset.route === route));
  window.scrollTo(0, 0);

  if (page === "home") renderHome();
  else if (page === "project") renderProject(param);
  else if (page === "work") renderWork();
  else if (page === "about") renderAbout();
  else if (page === "contact") renderContact();
  else renderNotFound();

  fitGiants();
}

// Dev başlıklar (WORK, CONTACT, isim) ekrana sığmıyorsa yazıyı küçült — asla yana taşmasın
function fitGiants() {
  $$(".giant").forEach((el) => {
    el.style.fontSize = "";
    const cs = getComputedStyle(el);
    const pad = parseFloat(cs.paddingLeft) + parseFloat(cs.paddingRight);
    const avail = el.clientWidth - pad;
    const need = el.scrollWidth - pad;
    if (need > avail) el.style.fontSize = `${(parseFloat(cs.fontSize) * avail) / need * 0.98}px`;
  });
}
let fitRaf = 0;
window.addEventListener("resize", () => {
  cancelAnimationFrame(fitRaf);
  fitRaf = requestAnimationFrame(fitGiants);
});
if (document.fonts) document.fonts.ready.then(fitGiants);

function setTitle(t) {
  document.title = t ? `${t} | ${SITE.name}` : `${SITE.name} | ${SITE.role}`;
}

/* ---------------------------------------------------------
   Ana sayfa — tam ekran video + sekmeler
   --------------------------------------------------------- */
const SLIDE_FALLBACK_MS = 8000; // klip yoksa / oynamazsa kapak süresi
const SLIDE_WAIT_MS = 6000;     // klip bu sürede başlamazsa kapağa geç
// Dikey telefonda videolar alt alta, kaydırmalı (referans gibi); diğer ekranlarda tek video + sekmeler
const HOME_SCROLL_MQ = "(max-width: 767px)";

function renderHome() {
  setTitle("");
  const items = SITE.home.map(bySlug).filter(Boolean);

  const metaHTML = (p) => `
    <span class="home-tab-title" lang="tr">${esc(p.title)}</span>
    <span class="home-tab-meta">
      <span>${esc(p.category)}</span>
    </span>`;

  app.innerHTML = `
    <section class="home page" aria-label="Featured works">
      <div class="home-media">
        ${items.map((p) => `
          <div class="home-slide">
            ${p.clip ? `<video class="home-video" src="${esc(p.clip)}" muted playsinline preload="none" disablepictureinpicture></video>` : ""}
            <img class="home-poster" src="${esc(p.clip ? p.clip.replace(/\.mp4$/, ".jpg") : coverLarge(p))}" alt="" />
            <a class="home-caption" href="#/work/${p.slug}">${metaHTML(p)}</a>
          </div>`).join("")}
      </div>
      <div class="home-tabs" style="--n:${items.length}">
        ${items.map((p) => `
          <a class="home-tab" href="#/work/${p.slug}">
            ${metaHTML(p)}
            <span class="home-tab-bar"><i></i></span>
          </a>`).join("")}
      </div>
    </section>`;

  const home = $(".home");
  const slides = $$(".home-slide");
  const tabs = $$(".home-tab");
  if (!slides.length) return;

  const mq = matchMedia(HOME_SCROLL_MQ);
  let stop = null;
  const setup = () => {
    if (stop) stop();
    stop = mq.matches ? startScrollMode(home, slides) : startTabMode(slides, tabs);
  };
  setup();
  mq.addEventListener("change", setup);

  cleanup = () => {
    mq.removeEventListener("change", setup);
    if (stop) stop();
    slides.forEach((s) => { const v = s.querySelector("video"); if (v) { v.pause(); v.removeAttribute("src"); v.load(); } });
  };
}

// Masaüstü: tek tam ekran video, altta sekmeler, süre bitince sıradakine geçer
function startTabMode(slides, tabs) {
  const n = slides.length;
  const events = new AbortController();
  let cur = -1;
  let raf = 0;
  let startedAt = 0;
  let fallback = false; // bu slaytta video yerine zamanlayıcı mı kullanılıyor

  const setBar = (i, v) => (tabs[i].querySelector(".home-tab-bar i").style.transform = `scaleX(${v})`);

  function useFallback() {
    fallback = true;
    startedAt = performance.now();
  }

  function go(i) {
    i = (i + n) % n;
    if (i === cur) return;

    if (cur >= 0) {
      slides[cur].classList.remove("active");
      const pv = slides[cur].querySelector("video");
      if (pv) pv.pause();
    }
    tabs.forEach((t, k) => {
      t.classList.toggle("active", k === i);
      setBar(k, 0);
    });

    cur = i;
    slides[i].classList.add("active");
    startedAt = performance.now();
    fallback = false;

    const v = slides[i].querySelector("video");
    if (!v) {
      useFallback();
    } else {
      v.muted = true;
      v.preload = "auto";
      try { v.currentTime = 0; } catch (e) {}
      const p = v.play();
      if (p) p.then(() => v.classList.add("ready")).catch(() => useFallback());
    }

    // sıradaki klibi önceden yükle
    const nv = slides[(i + 1) % n].querySelector("video");
    if (nv && nv.preload === "none") { nv.preload = "auto"; nv.load(); }
  }

  slides.forEach((s) => {
    const v = s.querySelector("video");
    if (v) v.addEventListener("error", () => { if (slides[cur] === s) useFallback(); }, { signal: events.signal });
  });

  function tick(now) {
    const v = slides[cur].querySelector("video");
    let prog = 0;

    if (fallback || !v) {
      prog = (now - startedAt) / SLIDE_FALLBACK_MS;
    } else if (v.classList.contains("ready") && v.duration) {
      prog = v.ended ? 1 : v.currentTime / v.duration;
    } else if (now - startedAt > SLIDE_WAIT_MS) {
      useFallback();
    }

    setBar(cur, Math.min(prog, 1));
    if (prog >= 1) go(cur + 1);
    raf = requestAnimationFrame(tick);
  }

  // Masaüstünde sekmenin üstüne gelince o işe geç
  if (matchMedia("(hover: hover)").matches) {
    tabs.forEach((t, k) => t.addEventListener("mouseenter", () => go(k), { signal: events.signal }));
  }

  go(0);
  raf = requestAnimationFrame(tick);

  return () => {
    cancelAnimationFrame(raf);
    events.abort();
    slides.forEach((s) => { s.classList.remove("active"); const v = s.querySelector("video"); if (v) v.pause(); });
    tabs.forEach((t, k) => { t.classList.remove("active"); setBar(k, 0); });
  };
}

// Dikey telefon: videolar alt alta tam ekran, sayfa sayfa kayar; sadece ekrandaki video oynar
function startScrollMode(home, slides) {
  home.classList.add("home-scroll");
  document.documentElement.classList.add("home-snap");
  const vids = slides.map((s) => s.querySelector("video"));
  vids.forEach((v) => { if (v) v.loop = true; });

  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      const i = slides.indexOf(e.target);
      const v = vids[i];
      if (!v) return;
      if (e.isIntersecting) {
        v.muted = true;
        v.preload = "auto";
        v.play().then(() => v.classList.add("ready")).catch(() => {});
        // sıradaki klibi önceden yükle
        const nv = vids[i + 1];
        if (nv && nv.preload === "none") { nv.preload = "auto"; nv.load(); }
      } else {
        v.pause();
      }
    });
  }, { threshold: 0.5 });
  slides.forEach((s) => io.observe(s));

  return () => {
    io.disconnect();
    vids.forEach((v) => { if (v) { v.pause(); v.loop = false; } });
    home.classList.remove("home-scroll");
    document.documentElement.classList.remove("home-snap");
  };
}

/* ---------------------------------------------------------
   Work — filtreli grid
   --------------------------------------------------------- */
let currentCat = SITE.categories[0];

function cardHTML(p, i = 0) {
  return `
    <a class="card" href="#/work/${p.slug}" style="animation-delay:${Math.min(i, 12) * 40}ms" ${p.clip ? `data-clip="${esc(p.clip)}"` : ""}>
      <img class="card-media${p.coverFit === "contain" ? " is-contain" : ""}" loading="lazy" src="${esc(p.cover)}" alt="${esc(p.title)}" />
      <span class="card-info">
        <span class="card-title" lang="tr">${esc(p.title)}</span>
        <span class="card-meta"><span>${esc(p.director || p.category)}</span><span>${esc(p.production || "")}</span></span>
      </span>
    </a>`;
}

// Klibi olan kartlarda video önizleme:
// masaüstünde fareyle üstüne gelince, dokunmatik cihazlarda kart ekrana gelince oynar
let previewObservers = [];

function resetCardPreviews() {
  previewObservers.forEach((o) => o.disconnect());
  previewObservers = [];
}

function cardVideo(card) {
  if (card._preview) return card._preview;
  const v = document.createElement("video");
  v.className = "card-media";
  v.muted = true;
  v.loop = true;
  v.playsInline = true;
  v.setAttribute("muted", "");
  v.setAttribute("playsinline", "");
  v.preload = "auto";
  v.src = card.dataset.clip;
  // görselin tam üstüne oturur (mobilde altındaki yazıyı örtmez)
  v.style.cssText = "position:absolute;left:0;top:0;opacity:0;transition:opacity .4s";
  v.addEventListener("playing", () => (v.style.opacity = 1));
  card.insertBefore(v, card.querySelector(".card-info"));
  card._preview = v;
  return v;
}

function stopPreview(card) {
  const v = card._preview;
  if (!v) return;
  v.pause();
  v.style.opacity = 0;
}

function bindCardPreviews(root) {
  const cards = $$(".card[data-clip]", root);
  if (!cards.length) return;

  if (matchMedia("(hover: hover)").matches) {
    cards.forEach((card) => {
      card.addEventListener("mouseenter", () => cardVideo(card).play().catch(() => {}));
      card.addEventListener("mouseleave", () => stopPreview(card));
    });
    return;
  }

  // Dokunmatik: kartın en az %60'ı görünürken oynat, çıkınca durdur; video ancak ekrana gelince yüklenir
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) cardVideo(e.target).play().catch(() => {});
      else stopPreview(e.target);
    });
  }, { threshold: 0.6 });
  cards.forEach((c) => io.observe(c));
  previewObservers.push(io);
}

function renderWork() {
  setTitle("Work");
  app.innerHTML = `
    <div class="page">
      <div class="work-head"><h1 class="giant ghost">${split("Work")}</h1></div>
      <div class="filters">
        <span>Category</span>
        <ul>
          ${SITE.categories.map((c) => `<li><button class="filter${c === currentCat ? " active" : ""}" data-cat="${esc(c)}">${esc(c)}</button></li>`).join("")}
        </ul>
      </div>
      <section class="grid" id="workGrid" aria-live="polite"></section>
    </div>`;

  const grid = $("#workGrid");
  const redraw = () => {
    const list = PROJECTS.filter((p) => p.category === currentCat);
    grid.className = list.length ? "grid" : "empty";
    grid.innerHTML = list.length ? list.map(cardHTML).join("") : "Coming soon.";
    resetCardPreviews();
    bindCardPreviews(grid);
  };
  redraw();

  $$(".filter").forEach((btn) =>
    btn.addEventListener("click", () => {
      currentCat = btn.dataset.cat;
      $$(".filter").forEach((b) => b.classList.toggle("active", b === btn));
      redraw();
    })
  );
}

/* ---------------------------------------------------------
   Proje detay
   --------------------------------------------------------- */
function renderProject(slug) {
  const p = bySlug(slug);
  if (!p) return renderNotFound();
  setTitle(p.title);

  const block = (label, value) =>
    value ? `<div class="meta-block"><div class="label">${esc(label)}</div><div lang="tr">${esc(value)}</div></div>` : "";

  // Credits: Director / Production / Producer / Agency + ek satırlar (credits: { role, name } ya da düz yazı)
  const creditLines = [["Director", p.director], ["Production", p.production], ["Producer", p.producer], ["Agency", p.agency], ...(p.credits || []).map((c) => (typeof c === "string" ? [null, c] : [c.role, c.name]))]
    .filter(([, v]) => v);
  const credits = creditLines.length
    ? `<div class="meta-block"><div class="label">Credits</div>${creditLines.map(([role, v]) => `<p>${role ? `<span class="credit-role">${esc(role)}:</span> ` : ""}<span lang="tr">${esc(v)}</span></p>`).join("")}</div>`
    : "";

  const stills = p.stills || [];
  const idx = PROJECTS.indexOf(p);
  const others = [1, 2, 3].map((k) => PROJECTS[(idx + k) % PROJECTS.length]).filter((o) => o !== p);
  const marqueeText = Array(4).fill(`<span lang="tr">${esc(p.title)}</span>`).join("");

  app.innerHTML = `
    <article class="page project">
      <header class="project-head">
        <div class="marquee" aria-hidden="true"><div class="marquee-track">${marqueeText}${marqueeText}</div></div>
        <div class="meta">
          <div class="meta-col">${block("Category", p.category)}${block("Year", p.year)}</div>
          <div class="meta-col${creditLines.length > 4 ? " is-long" : ""}">${credits}</div>
          <div class="meta-col">
            <div class="meta-block">
              <h1 class="label" lang="tr">${esc(p.title)}</h1>
              ${p.description ? `<p lang="tr">${esc(p.description)}</p>` : ""}
            </div>
          </div>
        </div>
      </header>

      ${p.vimeo ? `<div class="player"><iframe src="${vimeoPlayer(p.vimeo)}" title="${esc(p.title)}" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen></iframe></div>` : ""}

      ${(p.gallery || []).length ? galleryHTML(p) : ""}

      ${stills.length ? `<section class="stills">${stills.map((s, i) => `<button class="still" data-i="${i}" aria-label="Still ${i + 1}"><img loading="lazy" src="${esc(s)}" alt="" /></button>`).join("")}</section>` : ""}

      <section class="others">
        <div class="others-title">Other Works</div>
        <div class="grid">${others.map(cardHTML).join("")}</div>
      </section>
    </article>`;

  bindCardPreviews(app);
  $$(".still").forEach((b) => b.addEventListener("click", () => openLightbox(stills, Number(b.dataset.i))));
  const gal = $(".gallery", app);
  if (gal) bindGallery(gal, p.gallery);
}

/* ---------------------------------------------------------
   Galeri — kaydırmalı kareler (romainlacourbas.com tarzı)
   Kareler yana kayar, görsel çerçevenin içinde ters yöne hafif kayar (parallax).
   Oklar, sürükleme/kaydırma, klavye ve alttaki noktalarla gezilir; tıklayınca lightbox açılır.
   --------------------------------------------------------- */
const GALLERY_PARALLAX = 0.3;   // komşu karede görselin kayma oranı
const CHEVRON_PATH = "M5.275 29.46a1.61 1.61 0 0 0 1.456 1.077c1.018 0 1.772-.737 1.772-1.737 0-.526-.277-1.186-.449-1.62l-4.68-11.912L8.05 3.363c.172-.442.45-1.116.45-1.625A1.7 1.7 0 0 0 6.728.002a1.6 1.6 0 0 0-1.456 1.09L.675 12.774c-.301.775-.677 1.744-.677 2.495 0 .754.376 1.705.677 2.498L5.272 29.46Z";
const mobileSrc = (src) => src.replace(/\.jpg$/, "-m.jpg");

function galleryHTML(p) {
  const chevron = (dir) => `
    <button class="gallery-chevron gallery-${dir}" aria-label="${dir === "prev" ? "Previous" : "Next"} image">
      <svg width="9" height="31" viewBox="0 0 9 31" fill="currentColor" aria-hidden="true"${dir === "next" ? ' style="transform:scaleX(-1)"' : ""}><path d="${CHEVRON_PATH}"/></svg>
    </button>`;
  return `
    <section class="gallery" tabindex="0" aria-roledescription="carousel" aria-label="${esc(p.title)} gallery">
      <div class="gallery-track">
        ${p.gallery.map((src, i) => `
          <div class="gallery-slide" aria-label="${i + 1} / ${p.gallery.length}">
            <img class="gallery-img" src="${esc(src)}" srcset="${esc(mobileSrc(src))} 1080w, ${esc(src)} 1920w" sizes="100vw"
              alt="" draggable="false" decoding="async" ${i ? 'fetchpriority="low"' : ""} />
          </div>`).join("")}
      </div>
      ${chevron("prev")}${chevron("next")}
      <div class="gallery-dots"><div class="gallery-dots-track">
        ${p.gallery.map((_, i) => `<button class="gallery-dot" aria-label="Go to image ${i + 1}"></button>`).join("")}
      </div></div>
    </section>`;
}

function bindGallery(root, list) {
  const track = $(".gallery-track", root);
  const imgs = $$(".gallery-img", root);
  const dots = $$(".gallery-dot", root);
  const dotsTrack = $(".gallery-dots-track", root);
  const prev = $(".gallery-prev", root);
  const next = $(".gallery-next", root);
  const last = list.length - 1;
  let index = 0;

  // pos: kesirli konum (sürüklerken 2.4 gibi); animate: yumuşak geçiş
  const render = (pos, animate) => {
    root.classList.toggle("is-dragging", !animate);
    track.style.transform = `translate3d(${-pos * 100}%, 0, 0)`;
    imgs.forEach((img, i) => {
      const d = Math.max(-1, Math.min(1, i - pos));
      img.style.transform = `translate3d(${-d * GALLERY_PARALLAX * 100}%, 0, 0)`;
    });
  };

  const go = (i) => {
    index = Math.max(0, Math.min(last, i));
    render(index, true);
    prev.classList.toggle("is-off", index === 0);
    next.classList.toggle("is-off", index === last);
    dots.forEach((d, k) => d.classList.toggle("active", k === index));
    // Noktalar dar pencereye sığmazsa aktif nokta ortada kalacak şekilde kaydır
    const win = dotsTrack.parentElement.clientWidth;
    const a = dots[index];
    const max = Math.max(0, dotsTrack.scrollWidth - win);
    const x = Math.max(0, Math.min(max, a.offsetLeft + 8 - win / 2));
    dotsTrack.style.transform = `translateX(${-x}px)`;
  };

  prev.addEventListener("click", () => go(index - 1));
  next.addEventListener("click", () => go(index + 1));
  dots.forEach((d, k) => d.addEventListener("click", () => go(k)));
  root.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft") { e.preventDefault(); go(index - 1); }
    if (e.key === "ArrowRight") { e.preventDefault(); go(index + 1); }
  });

  // Sürükleme / parmakla kaydırma (dikey sayfa kaydırması bozulmaz: touch-action: pan-y)
  let startX = 0, startT = 0, dx = 0, dragging = false, moved = false;
  track.addEventListener("pointerdown", (e) => {
    if (e.button !== 0) return;
    dragging = true; moved = false; dx = 0;
    startX = e.clientX; startT = performance.now();
    track.setPointerCapture(e.pointerId);
  });
  track.addEventListener("pointermove", (e) => {
    if (!dragging) return;
    dx = e.clientX - startX;
    if (Math.abs(dx) > 6) moved = true;
    if (!moved) return;
    let pos = index - dx / root.clientWidth;
    if (pos < 0 || pos > last) pos = index - (dx / root.clientWidth) * 0.3; // uçlarda direnç
    render(pos, false);
  });
  const end = () => {
    if (!dragging) return;
    dragging = false;
    if (!moved) return;
    const w = root.clientWidth;
    const fast = Math.abs(dx) / (performance.now() - startT) > 0.5; // hızlı fiske
    if (Math.abs(dx) > w * 0.15 || (fast && Math.abs(dx) > 30)) go(index + (dx < 0 ? 1 : -1));
    else go(index);
  };
  track.addEventListener("pointerup", end);
  track.addEventListener("pointercancel", end);
  // Sürükleme değil de tıklamaysa büyük görüntüle
  track.addEventListener("click", () => { if (!moved) openLightbox(list, index); });

  // Sayfadan çıkınca dinleyici kendini kaldırır
  const onResize = () => (root.isConnected ? go(index) : window.removeEventListener("resize", onResize));
  window.addEventListener("resize", onResize, { passive: true });
  go(0);
}

/* ---------------------------------------------------------
   About
   --------------------------------------------------------- */
function renderAbout() {
  setTitle("About");
  const a = SITE.about || {};
  const [first, ...rest] = SITE.name.split(" ");

  app.innerHTML = `
    <div class="page">
      <div class="about-head">
        <h1 class="giant">${split(first)}<br />${split(rest.join(" "))}</h1>
      </div>
      <div class="about-body">
        <div class="about-bio">
          ${a.bio ? a.bio.split(/\n\s*\n/).map((t) => `<p>${esc(t)}</p>`).join("") : `<p class="label">Biography coming soon.</p>`}
          ${a.closing ? `<p class="about-closing"><a class="u" href="#/contact">${esc(a.closing)}</a></p>` : ""}
          ${a.cv ? `<p class="label" style="margin-top:2em">About</p><p>Download CV [<a class="u" href="${esc(a.cv)}" target="_blank" rel="noopener">here</a>]</p>` : ""}
        </div>
        ${(a.languages || []).length ? `
          <div class="about-side">
            <div class="label">Languages</div>
            <ul>${a.languages.map((l) => `<li>${esc(l)}</li>`).join("")}</ul>
          </div>` : ""}
        ${(a.awards || []).length ? `
          <div class="awards">
            <div class="label">Awards</div>
            ${a.awards.map((w) => `<div class="award"><span>${esc(w.title)}</span><span>${esc(w.award)}</span><span>${esc(w.year)}</span></div>`).join("")}
          </div>` : ""}
      </div>
    </div>`;
}

/* ---------------------------------------------------------
   Contact
   --------------------------------------------------------- */
function renderContact() {
  setTitle("Contact");
  const mail = `mailto:${SITE.email}?subject=${encodeURIComponent("Work Inquiry")}&body=${encodeURIComponent("Hello Anıl,\n\nAre you available between __ - __ for our project?\n")}`;

  app.innerHTML = `
    <div class="page">
      <div class="contact-head"><h1 class="giant">${split("Contact")}</h1></div>
      <div class="contact-body">
        <div class="contact-col">
          <h2>Direct</h2>
          <div class="label">E-mail</div>
          <p><a class="u" href="mailto:${esc(SITE.email)}">${esc(SITE.email)}</a></p>
          <div class="label" style="margin-top:32px">Telephone</div>
          <p><a class="u" href="${telHref(SITE.phone)}">${esc(SITE.phone)}</a></p>
        </div>
        <div class="contact-col">
          <h2>Social</h2>
          <p><a class="u" href="${esc(SITE.instagram)}" target="_blank" rel="noopener">Instagram</a></p>
          <p><a class="u" href="${esc(SITE.vimeo)}" target="_blank" rel="noopener">Vimeo</a></p>
        </div>
        <div class="contact-col">
          <h2>Inquiries</h2>
          <p class="label">For collaboration, projects and representation.</p>
          <p><a class="u" href="${esc(mail)}">Send e-mail</a></p>
        </div>
      </div>
    </div>`;
}

function renderNotFound() {
  setTitle("Not found");
  app.innerHTML = `
    <div class="page">
      <h1 class="giant ghost">${split("404")}</h1>
      <p class="empty" style="padding-top:40px"><a class="u" href="#/">← Home</a></p>
    </div>`;
}

/* ---------------------------------------------------------
   Footer (bir kez çizilir, ana sayfada gizli)
   --------------------------------------------------------- */
function renderFooter() {
  $("#siteFooter").innerHTML = `
    ${logoHTML()}
    <div class="footer-grid">
      <div class="footer-col">
        <div class="label">Direct contact</div>
        <p><a class="u" href="mailto:${esc(SITE.email)}">${esc(SITE.email)}</a></p>
        <p><a class="u" href="${telHref(SITE.phone)}">${esc(SITE.phone)}</a></p>
      </div>
      <div class="footer-col">
        <div class="label">Social</div>
        <p><a class="u" href="${esc(SITE.instagram)}" target="_blank" rel="noopener">Instagram</a></p>
        <p><a class="u" href="${esc(SITE.vimeo)}" target="_blank" rel="noopener">Vimeo</a></p>
      </div>
      <div class="footer-col footer-links">
        <a class="u" href="#/">Home</a>
        <a class="u" href="#/work">Work</a>
        <a class="u" href="#/about">About</a>
        <a class="u" href="#/contact">Contact</a>
      </div>
    </div>
    <div class="footer-bottom">© ${new Date().getFullYear()} ${esc(SITE.name)} • All rights reserved • No part of this site may be reproduced without permission.</div>`;
}

/* ---------------------------------------------------------
   Mobil menü
   --------------------------------------------------------- */
const menuToggle = $("#menuToggle");

function openMenu() {
  document.body.classList.add("menu-open");
  menuToggle.setAttribute("aria-label", "Close menu");
  menuToggle.setAttribute("aria-expanded", "true");
  $("#mobileMenu").setAttribute("aria-hidden", "false");
}
function closeMenu() {
  document.body.classList.remove("menu-open");
  menuToggle.setAttribute("aria-label", "Open menu");
  menuToggle.setAttribute("aria-expanded", "false");
  $("#mobileMenu").setAttribute("aria-hidden", "true");
}
menuToggle.addEventListener("click", () =>
  document.body.classList.contains("menu-open") ? closeMenu() : openMenu()
);
// Aynı sayfanın linkine tıklanınca hashchange olmaz — menüyü yine de kapat
$$("#mobileMenu a").forEach((a) => a.addEventListener("click", closeMenu));

/* ---------------------------------------------------------
   Lightbox (stills)
   --------------------------------------------------------- */
const lb = $("#lightbox");
const lbImg = $("#lbImg");
let lbList = [];
let lbIndex = 0;

function showLb(i) {
  lbIndex = (i + lbList.length) % lbList.length;
  lbImg.src = lbList[lbIndex];
}
function openLightbox(list, i) {
  lbList = list;
  showLb(i);
  lb.classList.add("open");
  lb.setAttribute("aria-hidden", "false");
}
function closeLightbox() {
  lb.classList.remove("open");
  lb.setAttribute("aria-hidden", "true");
}
$("#lbClose").addEventListener("click", closeLightbox);
$("#lbPrev").addEventListener("click", () => showLb(lbIndex - 1));
$("#lbNext").addEventListener("click", () => showLb(lbIndex + 1));
lb.addEventListener("click", (e) => { if (e.target === lb) closeLightbox(); });

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") { closeLightbox(); closeMenu(); }
  if (!lb.classList.contains("open")) return;
  if (e.key === "ArrowRight") showLb(lbIndex + 1);
  if (e.key === "ArrowLeft") showLb(lbIndex - 1);
});

/* ---------------------------------------------------------
   Başlat
   --------------------------------------------------------- */
$$("[data-icon]").forEach((el) => (el.innerHTML = ICONS[el.dataset.icon]));
renderFooter();
window.addEventListener("hashchange", router);
router();
