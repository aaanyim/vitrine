/* ═══════════════════════════════════════════════════════════
   AAANYIM — i18n (Internationalization)
   Supporte: FR, EN. Extensible facilement.
   ═══════════════════════════════════════════════════════════ */

const I18N = {
  locales: {},
  current: 'fr',

  async init() {
    const saved = localStorage.getItem('aaanyim-lang') || navigator.language.slice(0, 2);
    this.current = ['fr', 'en'].includes(saved) ? saved : 'en';

    await Promise.all([
      this.load('fr'),
      this.load('en')
    ]);

    this.apply();
    this.bindLangButtons();
  },

  async load(lang) {
    try {
      const res = await fetch(`/locales/${lang}.json`);
      this.locales[lang] = await res.json();
    } catch (e) {
      console.warn(`Failed to load locale: ${lang}`, e);
    }
  },

  t(key) {
    const keys = key.split('.');
    let val = this.locales[this.current];
    for (const k of keys) {
      if (val == null) return key;
      val = Array.isArray(val) ? val[parseInt(k)] : val[k];
    }
    return val ?? key;
  },

  switch(lang) {
    if (!this.locales[lang]) return;
    this.current = lang;
    localStorage.setItem('aaanyim-lang', lang);
    this.apply();
    this.bindLangButtons();
  },

  apply() {
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      const val = this.t(key);
      if (typeof val === 'string') {
        if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
          el.placeholder = val;
        } else {
          el.textContent = val;
        }
      }
    });

    document.querySelectorAll('[data-i18n-html]').forEach(el => {
      const key = el.getAttribute('data-i18n-html');
      const val = this.t(key);
      if (typeof val === 'string') el.innerHTML = val;
    });

    // Dynamic sections
    this.renderProblemCards();
    this.renderFeatureCards();
    this.renderSectorCards();
    this.renderSteps();
    this.renderPricing();
    this.renderSectorOptions();

    document.documentElement.lang = this.current;
  },

  bindLangButtons() {
    document.querySelectorAll('.nav-lang button').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.lang === this.current);
      btn.onclick = () => this.switch(btn.dataset.lang);
    });
  },

  renderProblemCards() {
    const container = document.getElementById('problem-cards');
    if (!container) return;
    const cards = this.t('problem.cards');
    if (!Array.isArray(cards)) return;
    container.innerHTML = cards.map(c => `
      <div class="problem-card fade-up">
        ${c.lottie
          ? `<lottie-player src="${c.lottie}" background="transparent" speed="1" loop autoplay style="width:120px;height:120px;margin-bottom:16px"></lottie-player>`
          : `<span class="icon">${c.icon}</span>`
        }
        <h3>${c.title}</h3>
        <p>${c.desc}</p>
      </div>
    `).join('');
  },

  renderFeatureCards() {
    const container = document.getElementById('feature-cards');
    if (!container) return;
    const features = this.t('solution.features');
    if (!Array.isArray(features)) return;
    container.innerHTML = features.map(f => `
      <div class="feature-card fade-up">
        ${f.lottie
          ? `<lottie-player src="${f.lottie}" background="transparent" speed="1" loop autoplay style="width:64px;height:64px;margin-bottom:16px"></lottie-player>`
          : `<div class="icon">${f.icon}</div>`
        }
        <h3>${f.title}</h3>
        <p>${f.desc}</p>
      </div>
    `).join('');
  },

  renderSteps() {
    const container = document.getElementById('steps-container');
    if (!container) return;
    const steps = this.t('how.steps');
    if (!Array.isArray(steps)) return;
    container.innerHTML = steps.map(s => `
      <div class="step fade-up">
        <div class="step-num">${s.num}</div>
        <h3>${s.title}</h3>
        <p>${s.desc}</p>
      </div>
    `).join('');
  },

  renderPricing() {
    const container = document.getElementById('pricing-cards');
    if (!container) return;
    const plans = this.t('pricing.plans');
    const monthly = this.t('pricing.monthly');
    const cta = this.t('pricing.cta');
    const ctaEnterprise = this.t('pricing.cta_enterprise');
    const popularLabel = this.t('pricing.popular');
    if (!Array.isArray(plans)) return;
    container.innerHTML = plans.map(p => `
      <div class="pricing-card fade-up ${p.popular ? 'popular' : ''}">
        ${p.popular ? `<span class="pricing-badge">${popularLabel}</span>` : ''}
        <div class="pricing-name">${p.name}</div>
        <div class="pricing-desc">${p.desc}</div>
        <div class="pricing-price">
          ${p.price} <span class="currency">${p.currency}</span>
          <span class="period">${monthly}</span>
        </div>
        <ul class="pricing-features">
          ${p.features.map(f => `<li>${f}</li>`).join('')}
        </ul>
        <button class="pricing-cta" onclick="document.getElementById('contact').scrollIntoView({behavior:'smooth'})">
          ${p.name === 'Enterprise' ? ctaEnterprise : cta}
        </button>
      </div>
    `).join('');
  },

  renderSectorCards() {
    const container = document.getElementById('sectors-cards');
    if (!container) return;
    const sectors = this.t('sectors.list');
    if (!Array.isArray(sectors)) return;
    container.innerHTML = sectors.map((s, i) => `
      <div class="sector-card fade-up ${i === sectors.length - 1 ? 'more' : ''}">
        <span class="sector-icon">${s.icon}</span>
        <h3>${s.name}</h3>
        <p>${s.desc}</p>
      </div>
    `).join('');
  },

  renderSectorOptions() {
    const select = document.getElementById('sector-select');
    if (!select) return;
    const sectors = this.t('contact.form.sectors');
    if (!Array.isArray(sectors)) return;
    select.innerHTML = '<option value="">' + this.t('contact.form.sector') + '</option>' +
      sectors.map(s => `<option value="${s}">${s}</option>`).join('');
  }
};
