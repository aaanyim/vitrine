/* ═══════════════════════════════════════════════════════════
   AAANYIM — Main App (v2.0)
   Animations, i18n, contact form
   ═══════════════════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', async () => {
  await I18N.init();
  initNavbar();
  initScrollAnimations();
  initCounterAnimations();
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
      const spans = burger.querySelectorAll('span');
      if (links.classList.contains('open')) {
        spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
      } else {
        spans[0].style.transform = '';
        spans[1].style.opacity = '';
        spans[2].style.transform = '';
      }
    });

    links.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        links.classList.remove('open');
        const spans = burger.querySelectorAll('span');
        spans[0].style.transform = '';
        spans[1].style.opacity = '';
        spans[2].style.transform = '';
      });
    });
  }

  // Navbar shrink on scroll
  const navbar = document.querySelector('.navbar');
  let lastScroll = 0;
  window.addEventListener('scroll', () => {
    const y = window.scrollY;
    navbar.style.background = y > 50 ? 'rgba(10,10,10,0.98)' : 'rgba(10,10,10,0.92)';

    // Auto-hide on scroll down, show on scroll up
    if (y > 400) {
      navbar.style.transform = y > lastScroll ? 'translateY(-100%)' : 'translateY(0)';
      navbar.style.transition = 'transform 0.3s, background 0.3s';
    } else {
      navbar.style.transform = 'translateY(0)';
    }
    lastScroll = y;
  });
}

/* ── Scroll Animations ──────────────────────────────────── */
function initScrollAnimations() {
  // Progressive enhancement: animations only if JS loaded
  document.body.classList.add('js-ready');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.05, rootMargin: '0px 0px 0px 0px' });

  observeAll(observer);

  // Re-observe after language switch (I18N.apply rebuilds DOM via innerHTML)
  const origApply = I18N.apply.bind(I18N);
  I18N.apply = function() {
    origApply();
    setTimeout(() => observeAll(observer), 50);
  };

  // Safety net: if observer fails, force all visible after 2s
  setTimeout(() => {
    document.querySelectorAll('.fade-up:not(.visible)').forEach(el => {
      el.classList.add('visible');
    });
  }, 2000);
}

function observeAll(observer) {
  document.querySelectorAll('.fade-up:not(.visible)').forEach(el => observer.observe(el));
}

/* ── Counter Animations ─────────────────────────────────── */
function initCounterAnimations() {
  const counters = document.querySelectorAll('.stat-number');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(el => observer.observe(el));
}

function animateCounter(el) {
  const text = el.textContent.trim();
  const match = text.match(/^(\d+)/);
  if (!match) return;

  const target = parseInt(match[1]);
  const suffix = text.replace(match[1], '');
  const duration = 1500;
  const start = performance.now();

  function update(now) {
    const elapsed = now - start;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
    const current = Math.round(target * eased);
    el.textContent = current + suffix;
    if (progress < 1) requestAnimationFrame(update);
  }
  requestAnimationFrame(update);
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
    const originalText = btn.textContent;

    btn.disabled = true;
    btn.textContent = '...';
    btn.style.opacity = '0.6';

    try {
      await fetch('https://formspree.io/f/mqenjvkv', {
        method: 'POST',
        body: data,
        headers: { 'Accept': 'application/json' }
      });

      form.reset();
      success.classList.add('show');
      setTimeout(() => success.classList.remove('show'), 5000);
    } catch {
      const name = data.get('name') || '';
      const msg = data.get('message') || '';
      const company = data.get('company') || '';
      const text = encodeURIComponent(`Bonjour, je suis ${name} de ${company}. ${msg}`);
      window.open(`https://wa.me/22890897972?text=${text}`, '_blank');
    }

    btn.disabled = false;
    btn.textContent = originalText;
    btn.style.opacity = '';
  });
}

/* ── Phone Mockup (replaced by Lottie) ──────────────────── */
function initPhoneAnimation() {
  // Hero now uses lottie-player directly in HTML
}
