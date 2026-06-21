/* ============================================================
   CONTACT PAGE LOGIC
   Lightweight form UX (no backend yet)
   ============================================================ */

(function initContact() {

  const form = document.getElementById('contact-form');
  const status = document.getElementById('form-status');

  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const message = form.message.value.trim();

    if (!name || !email || !message) {
      status.textContent = "Please fill out all fields.";
      return;
    }

    // fake “transmission” effect
    status.textContent = "Transmitting signal...";

    setTimeout(() => {
      status.textContent = "Message sent. I’ll get back to you soon.";
      form.reset();
    }, 900);
  });

})();