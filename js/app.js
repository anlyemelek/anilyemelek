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

function renderHome() {
  setTitle("");
  const items = SITE.home.map(bySlug).filter(Boolean);

  app.innerHTML = `
    <section class="home page" aria-label="Featured works">
      <div class="home-media">
        ${items.map((p) => `
          <div class="home-slide">
            ${p.clip ? `<video class="home-video" src="${esc(p.clip)}" muted playsinline preload="none" disablepictureinpicture></video>` : ""}
            <img class="home-poster" src="${esc(p.clip ? p.clip.replace(/\.mp4$/, ".jpg") : coverLarge(p))}" alt="" />
          </div>`).join("")}
      </div>
      <div class="home-tabs" style="--n:${items.length}">
        ${items.map((p) => `
          <a class="home-tab" href="#/work/${p.slug}">
            <span class="home-tab-title" lang="tr">${esc(p.title)}</span>
            <span class="home-tab-meta">
              <span>${esc(p.director || p.category)}</span>
              <span>${esc(p.production || "")}</span>
            </span>
            <span class="home-tab-bar"><i></i></span>
          </a>`).join("")}
      </div>
    </section>`;

  const slides = $$(".home-slide");
  const tabs = $$(".home-tab");
  const n = slides.length;
  if (!n) return;

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
    if (v) v.addEventListener("error", () => { if (slides[cur] === s) useFallback(); });
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
    tabs.forEach((t, k) => t.addEventListener("mouseenter", () => go(k)));
  }

  go(0);
  raf = requestAnimationFrame(tick);

  cleanup = () => {
    cancelAnimationFrame(raf);
    slides.forEach((s) => { const v = s.querySelector("video"); if (v) { v.pause(); v.removeAttribute("src"); v.load(); } });
  };
}

/* ---------------------------------------------------------
   Work — filtreli grid
   --------------------------------------------------------- */
let currentCat = SITE.categories[0];

function cardHTML(p, i = 0) {
  return `
    <a class="card" href="#/work/${p.slug}" style="animation-delay:${Math.min(i, 12) * 40}ms" ${p.clip ? `data-clip="${esc(p.clip)}"` : ""}>
      <img class="card-media" loading="lazy" src="${esc(p.cover)}" alt="${esc(p.title)}" />
      <span class="card-info">
        <span class="card-title" lang="tr">${esc(p.title)}</span>
        <span class="card-meta"><span>${esc(p.director || p.category)}</span><span>${esc(p.production || "")}</span></span>
      </span>
    </a>`;
}

// Klibi olan kartlarda hover ile video önizleme
function bindCardPreviews(root) {
  if (!matchMedia("(hover: hover)").matches) return;
  $$(".card[data-clip]", root).forEach((card) => {
    let v = null;
    card.addEventListener("mouseenter", () => {
      if (!v) {
        v = document.createElement("video");
        v.className = "card-media";
        Object.assign(v, { src: card.dataset.clip, muted: true, loop: true, playsInline: true });
        v.style.cssText = "position:absolute;inset:0;height:100%;opacity:0;transition:opacity .4s";
        v.addEventListener("playing", () => (v.style.opacity = 1));
        card.insertBefore(v, card.querySelector(".card-info"));
      }
      v.play().catch(() => {});
    });
    card.addEventListener("mouseleave", () => {
      if (!v) return;
      v.pause();
      v.style.opacity = 0;
    });
  });
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

  const credits = (p.credits || []).length
    ? `<div class="meta-block"><div class="label">Credits</div>${p.credits.map((c) => `<p>${esc(c)}</p>`).join("")}</div>`
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
          <div class="meta-col">${block("Director", p.director)}${block("Production", p.production)}${credits}</div>
          <div class="meta-col">
            <div class="meta-block">
              <h1 class="label" lang="tr">${esc(p.title)}</h1>
              ${p.description ? `<p lang="tr">${esc(p.description)}</p>` : ""}
            </div>
          </div>
        </div>
      </header>

      ${p.vimeo ? `<div class="player"><iframe src="${vimeoPlayer(p.vimeo)}" title="${esc(p.title)}" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen></iframe></div>` : ""}

      ${stills.length ? `<section class="stills">${stills.map((s, i) => `<button class="still" data-i="${i}" aria-label="Still ${i + 1}"><img loading="lazy" src="${esc(s)}" alt="" /></button>`).join("")}</section>` : ""}

      <section class="others">
        <div class="others-title">Other Works</div>
        <div class="grid">${others.map(cardHTML).join("")}</div>
      </section>
    </article>`;

  bindCardPreviews(app);
  $$(".still").forEach((b) => b.addEventListener("click", () => openLightbox(stills, Number(b.dataset.i))));
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
