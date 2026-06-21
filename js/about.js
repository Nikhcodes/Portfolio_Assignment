/* ============================================================
   ABOUT PAGE — Nikhiel Lingard
   Subtle enhancements: timeline reveal, quote pulse,
   and soft parallax drift for hero section.
   ============================================================ */

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ── 1. TIMELINE REVEAL (staggered) ─────────────────────── */
(function initTimelineReveal() {
  const items = document.querySelectorAll('.timeline-item');
  if (!items.length) return;

  if (prefersReducedMotion) {
    items.forEach(i => i.classList.add('is-visible'));
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;

      const el = entry.target;
      const index = Array.from(items).indexOf(el);

      setTimeout(() => {
        el.classList.add('is-visible');
      }, index * 120);

      observer.unobserve(el);
    });
  }, {
    threshold: 0.2
  });

  items.forEach(item => observer.observe(item));
})();

/* ── 2. HERO SUBTLE PARALLAX DRIFT ───────────────────────── */
(function initHeroDrift() {
  const hero = document.querySelector('.about-hero');
  if (!hero || prefersReducedMotion) return;

  let ticking = false;

  function onMove(e) {
    if (ticking) return;
    ticking = true;

    requestAnimationFrame(() => {
      const x = (e.clientX / window.innerWidth - 0.5) * 6;
      const y = (e.clientY / window.innerHeight - 0.5) * 6;

      hero.style.transform = `translate(${x}px, ${y}px)`;
      ticking = false;
    });
  }

  window.addEventListener('mousemove', onMove);
})();

/* ── 3. QUOTE PULSE (soft breathing effect) ──────────────── */
(function initQuotePulse() {
  const quote = document.querySelector('.quote-panel');
  if (!quote) return;

  if (prefersReducedMotion) return;

  let scale = 1;
  let direction = 0.0008;

  function animate() {
    scale += direction;

    if (scale > 1.015 || scale < 0.995) {
      direction *= -1;
    }

    quote.style.transform = `scale(${scale})`;
    requestAnimationFrame(animate);
  }

  animate();
})();

/* ── 4. CHIPS MICRO INTERACTION ──────────────────────────── */
(function initChipHover() {
  const chips = document.querySelectorAll('.chip');
  if (!chips.length) return;

  chips.forEach(chip => {
    chip.addEventListener('mouseenter', () => {
      chip.style.transform = 'translateY(-2px)';
      chip.style.transition = 'transform 0.2s ease';
    });

    chip.addEventListener('mouseleave', () => {
      chip.style.transform = 'translateY(0px)';
    });
  });
})();

/* ── 5. SMALL TEXT GLITCH (rare, subtle) ─────────────────── */
(function initMicroGlitch() {
  const title = document.querySelector('.about-title');
  if (!title || prefersReducedMotion) return;

  function glitch() {
    const chance = Math.random();
    if (chance < 0.25) {
      title.style.letterSpacing = `${Math.random() * 2 - 1}px`;

      setTimeout(() => {
        title.style.letterSpacing = 'normal';
      }, 120);
    }

    setTimeout(glitch, 3000 + Math.random() * 5000);
  }

  glitch();
})();