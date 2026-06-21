/* ============================================================
   WORK PAGE INTERACTIONS
   Subtle polish only — no heavy effects
   ============================================================ */

(function initWorkPage() {

  /* ── CARD HOVER STAGGER EFFECT ── */
  const cards = document.querySelectorAll('.work-card');

  cards.forEach((card, i) => {
    card.style.transitionDelay = `${i * 40}ms`;

    card.addEventListener('mouseenter', () => {
      card.style.transform = 'translateY(-6px)';
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'translateY(0px)';
    });
  });

})();