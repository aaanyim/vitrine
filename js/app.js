/* ═══════════════════════════════════════════════════════════
   AAANYIM — Main App
   ═══════════════════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', async () => {
  await I18N.init();
  initNavbar();
  initScrollAnimations();
  initContactForm();
  initPhoneAnimation();
});

/* ── Navbar ─────────────────────────────────────────────── */
function initNavbar() {
  const burger = document.querySelector('.nav-burger');
  const links = document.querySelector('.nav-links');

  if (burger && links) {
    burger.addEventListener('click', () => {
      links.classList.toggle('open');
      burger.classList.toggle('open');
    });

    links.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        links.classList.remove('open');
        burger.classList.remove('open');
      });
    });
  }

  // Navbar background on scroll
  const navbar = document.querySelector('.navbar');
  window.addEventListener('scroll', () => {
    navbar.style.background = window.scrollY > 50
      ? 'rgba(10,10,10,0.98)'
      : 'rgba(10,10,10,0.92)';
  });
}

/* ── Scroll Animations ──────────────────────────────────── */
function initScrollAnimations() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, i * 80);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  // Observe initial elements
  observeAll(observer);

  // Re-observe after language switch
  const origApply = I18N.apply.bind(I18N);
  I18N.apply = function() {
    origApply();
    setTimeout(() => observeAll(observer), 50);
  };
}

function observeAll(observer) {
  document.querySelectorAll('.fade-up:not(.visible)').forEach(el => {
    observer.observe(el);
  });
}

/* ── Contact Form ───────────────────────────────────────── */
function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const data = new FormData(form);
    const btn = form.querySelector('.form-submit');
    const success = document.getElementById('form-success');

    btn.disabled = true;
    btn.textContent = '...';

    try {
      // Formspree
      await fetch('https://formspree.io/f/xwpkgjvd', {
        method: 'POST',
        body: data,
        headers: { 'Accept': 'application/json' }
      });

      form.reset();
      success.classList.add('show');
      setTimeout(() => success.classList.remove('show'), 5000);
    } catch {
      // Fallback WhatsApp
      const name = data.get('name') || '';
      const msg = data.get('message') || '';
      const company = data.get('company') || '';
      const text = encodeURIComponent(
        `Bonjour, je suis ${name} de ${company}. ${msg}`
      );
      window.open(`https://wa.me/237658804837?text=${text}`, '_blank');
    }

    btn.disabled = false;
    btn.textContent = I18N.t('contact.form.submit');
  });
}

/* ── Phone Mockup Animation ─────────────────────────────── */
function initPhoneAnimation() {
  const values = [
    { label: 'Solde', value: '180 000', sub: 'XOF', bar: 75 },
    { label: 'Lots actifs', value: '12', sub: '3 expirent bientot', bar: 40 },
    { label: 'Livraisons', value: '8/12', sub: 'Aujourd\'hui', bar: 67 },
    { label: 'Commission', value: '9 315', sub: 'FCFA ce mois', bar: 55 }
  ];

  const screen = document.querySelector('.phone-screen');
  if (!screen) return;

  screen.innerHTML = values.map(v => `
    <div class="phone-stat">
      <div class="phone-stat-label">${v.label}</div>
      <div class="phone-stat-value">${v.value}</div>
      <div class="phone-stat-sub">${v.sub}</div>
      <div class="phone-bar"><div class="phone-bar-fill" style="width:${v.bar}%"></div></div>
    </div>
  `).join('');
}
