/* ============================================================
   NIKHIEL LINGARD — PORTFOLIO
   main.js — shared behaviour: VHS overlays, mobile nav, reveals.
   ============================================================ */

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ── VHS TIMESTAMP ───────────────────────────────────────── */
(function initTimestamp() {
  const el = document.createElement('div');
  el.className = 'vhs-timestamp';
  document.body.appendChild(el);

  function tick() {
    const now = new Date();
    const pad = n => String(n).padStart(2, '0');
    el.textContent = `${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`;
  }
  tick();
  setInterval(tick, 1000);
})();

/* ── REC INDICATOR ───────────────────────────────────────── */
(function initRec() {
  const el = document.createElement('div');
  el.className = 'rec-indicator';
  el.innerHTML = '<span class="rec-dot"></span>Rec';
  document.body.appendChild(el);
})();

/* ── HERO GLITCH ─────────────────────────────────────────── */
(function initGlitch() {
  if (prefersReducedMotion) return;

  const hero = document.querySelector('.hero-image');
  if (!hero) return;

  let active = false;

  function reset() {
    hero.style.transform = '';
    hero.style.filter = 'saturate(0.7) contrast(0.92)';
    active = false;
  }

  function glitch() {
    if (active) return;
    active = true;

    const shiftX = (Math.random() * 7 + 2) * (Math.random() < 0.5 ? 1 : -1);
    const hue = (Math.random() * 14 - 7).toFixed(1);
    const dur = 40 + Math.random() * 90;
    const doubled = Math.random() < 0.38;

    hero.style.transition = 'none';
    hero.style.transform = `translateX(${shiftX}px)`;
    hero.style.filter = `saturate(0.88) contrast(0.96) hue-rotate(${hue}deg)`;

    setTimeout(() => {
      if (doubled) {
        hero.style.transform = `translateX(${(-shiftX * 0.55).toFixed(1)}px)`;
        setTimeout(reset, Math.round(dur * 0.55));
      } else {
        reset();
      }
    }, dur);

    setTimeout(glitch, 4000 + Math.random() * 9000);
  }

  setTimeout(glitch, 2500 + Math.random() * 2500);
})();

/* ── MOBILE NAV TOGGLE ───────────────────────────────────── */
(function initNav() {
  const panel = document.getElementById('top-panel');
  const toggle = document.getElementById('nav-toggle');
  if (!panel || !toggle) return;

  toggle.addEventListener('click', () => {
    const isOpen = panel.classList.toggle('nav-open');
    toggle.classList.toggle('open', isOpen);
    toggle.setAttribute('aria-expanded', String(isOpen));
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });

  // close menu when a link is tapped
  panel.querySelectorAll('.links a, .socials a').forEach(link => {
    link.addEventListener('click', () => {
      panel.classList.remove('nav-open');
      toggle.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    });
  });
})();

/* ── SCROLL REVEAL ───────────────────────────────────────── */
(function initReveal() {
  const targets = document.querySelectorAll('.reveal');
  if (!targets.length) return;

  if (prefersReducedMotion || !('IntersectionObserver' in window)) {
    targets.forEach(t => t.classList.add('is-visible'));
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });

  targets.forEach(t => observer.observe(t));
})();

