/* AAANYIM — comportement du site.
 * - Langue (fr / en), rendu des listes a partir de js/i18n.js.
 * - « Installer l'application » : sur telephone, ouvre AAANYIM avec ?installer=1 (l'application montre alors comment
 *   l'installer sur CE telephone) ; sur ordinateur, amene au QR code a scanner.
 * - Les nombres et les commerces montres viennent du serveur (marketplace et tarifs publics). Sans reponse, on ne
 *   montre pas de nombre : jamais un chiffre invente (AZ 21/11 : « plus vrai »). */
(function () {
  "use strict";

  var APP = "https://app.aaanyim.net";
  var API = "https://api.aaanyim.net/api/v1";
  var INSTALL_URL = APP + "/marketplace?installer=1";

  var lang = "fr";
  var live = { total: null, cities: null, shops: [], trial: null };

  // ── Langue ─────────────────────────────────────────────────
  function readLang() {
    try {
      var saved = localStorage.getItem("aaanyim-lang");
      if (saved === "fr" || saved === "en") return saved;
    } catch (e) { /* stockage indisponible */ }
    var nav = (navigator.language || "fr").toLowerCase();
    return nav.indexOf("en") === 0 ? "en" : "fr";
  }

  function T(path) {
    var parts = path.split(".");
    var v = SITE_TEXT[lang];
    for (var i = 0; i < parts.length; i++) {
      if (v == null) return "";
      v = v[parts[i]];
    }
    return v == null ? "" : v;
  }

  function fill(text, vars) {
    return String(text).replace(/\{(\w+)\}/g, function (_, k) { return vars[k] != null ? vars[k] : ""; });
  }

  function el(tag, cls, text) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (text != null) n.textContent = text;
    return n;
  }

  // Texte avec *gras* et retours a la ligne (messages de l'assistant), sans HTML injecte
  function rich(node, text) {
    String(text).split("\n").forEach(function (line, i) {
      if (i) node.appendChild(document.createElement("br"));
      line.split(/\*([^*]+)\*/).forEach(function (part, j) {
        if (!part) return;
        if (j % 2) node.appendChild(el("strong", null, part));
        else node.appendChild(document.createTextNode(part));
      });
    });
  }

  // ── Icones (trait, comme l'application) ────────────────────
  var ICONS = {
    bell: '<path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/>',
    tap: '<path d="M9 11V6a2 2 0 0 1 4 0v5"/><path d="M13 10a2 2 0 0 1 4 0v2"/><path d="M17 11a2 2 0 0 1 4 0v3a8 8 0 0 1-8 8h-1a8 8 0 0 1-6.5-3.3L3 15a2 2 0 0 1 3.4-2L9 15"/>',
    store: '<path d="M3 9l1.5-5h15L21 9"/><path d="M3 9h18v2a3 3 0 0 1-6 0 3 3 0 0 1-6 0 3 3 0 0 1-6 0z"/><path d="M5 13v8h14v-8"/><path d="M10 21v-5h4v5"/>',
    chat: '<path d="M21 11.5a8.4 8.4 0 0 1-12.3 7.4L3 21l2.1-5.7A8.4 8.4 0 1 1 21 11.5z"/>',
    search: '<circle cx="11" cy="11" r="7"/><path d="m21 21-4.3-4.3"/>',
    bag: '<path d="M6 7h12l1 14H5z"/><path d="M9 7a3 3 0 0 1 6 0"/>',
    calendar: '<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M16 3v4M8 3v4M3 10h18"/>',
    wallet: '<path d="M19 7V5a2 2 0 0 0-2-2H5a2 2 0 0 0 0 4h14v13H5a2 2 0 0 1-2-2V5"/><circle cx="16" cy="14" r="1.2"/>',
    inbox: '<path d="M22 12h-6l-2 3h-4l-2-3H2"/><path d="M5.5 5h13L22 12v6a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-6z"/>',
    card: '<rect x="2" y="5" width="20" height="14" rx="2"/><path d="M2 10h20M6 15h4"/>',
    box: '<path d="M21 8l-9-5-9 5 9 5z"/><path d="M3 8v8l9 5 9-5V8"/><path d="M12 13v8"/>',
    team: '<circle cx="9" cy="8" r="3.5"/><path d="M2.5 20a6.5 6.5 0 0 1 13 0"/><circle cx="17.5" cy="9" r="2.5"/><path d="M16 14.2A5 5 0 0 1 21.5 19"/>'
  };

  function icon(name) {
    var wrap = el("span", "ico");
    wrap.setAttribute("aria-hidden", "true");
    wrap.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">' + (ICONS[name] || "") + "</svg>";
    return wrap;
  }

  // ── Appareil ───────────────────────────────────────────────
  function platform() {
    var ua = navigator.userAgent || "";
    if (/iPhone|iPad|iPod/i.test(ua) || (/Macintosh/i.test(ua) && navigator.maxTouchPoints > 1)) return "iphone";
    if (/Android/i.test(ua)) return "android";
    return "desktop";
  }

  // Pays de l'assistant WhatsApp d'apres le fuseau du telephone ; inconnu = les deux
  function waCountry() {
    try {
      var tz = Intl.DateTimeFormat().resolvedOptions().timeZone || "";
      if (tz === "Africa/Douala") return "CM";
      if (tz === "Africa/Lome") return "TG";
    } catch (e) { /* ancien navigateur */ }
    return null;
  }

  // ── Rendu ──────────────────────────────────────────────────
  function applyTexts() {
    document.documentElement.lang = lang;
    document.title = T("meta.title");
    var md = document.querySelector('meta[name="description"]');
    if (md) md.setAttribute("content", T("meta.description"));
    document.querySelectorAll("[data-t]").forEach(function (n) {
      var v = T(n.getAttribute("data-t"));
      if (typeof v !== "string") return;
      if (n.tagName === "INPUT" || n.tagName === "TEXTAREA") n.placeholder = v;
      else n.textContent = v;
    });
    document.querySelectorAll("[data-t-aria]").forEach(function (n) {
      n.setAttribute("aria-label", T(n.getAttribute("data-t-aria")));
    });
    document.querySelectorAll(".lang-switch button").forEach(function (b) {
      b.setAttribute("aria-pressed", String(b.getAttribute("data-lang") === lang));
    });
  }

  function renderCards(id, list) {
    var c = document.getElementById(id);
    if (!c) return;
    c.textContent = "";
    (list || []).forEach(function (item) {
      var card = el("article", "card reveal");
      card.appendChild(icon(item.icon));
      card.appendChild(el("h3", null, item.title));
      card.appendChild(el("p", null, item.text));
      c.appendChild(card);
    });
  }

  function renderBenefits() {
    var c = document.getElementById("install-benefits");
    if (!c) return;
    c.textContent = "";
    T("install.benefits").forEach(function (b) {
      var li = el("li", "benefit");
      li.appendChild(icon(b.icon));
      var tx = el("div");
      tx.appendChild(el("strong", null, b.title));
      tx.appendChild(el("span", null, b.text));
      li.appendChild(tx);
      c.appendChild(li);
    });
  }

  function renderSteps(id, list) {
    var c = document.getElementById(id);
    if (!c) return;
    c.textContent = "";
    list.forEach(function (s, i) {
      var li = el("li", "step");
      li.appendChild(el("span", "step-num", String(i + 1)));
      li.appendChild(el("span", "step-text", typeof s === "string" ? s : s.title));
      if (typeof s !== "string" && s.text) li.appendChild(el("span", "step-sub", s.text));
      c.appendChild(li);
    });
  }

  function renderActivities() {
    var c = document.getElementById("activities-grid");
    if (!c) return;
    c.textContent = "";
    T("activities.list").forEach(function (a) {
      var card = el("article", "activity reveal");
      var e = el("span", "activity-emoji", a.icon);
      e.setAttribute("aria-hidden", "true");
      card.appendChild(e);
      var tx = el("div");
      tx.appendChild(el("h3", null, a.name));
      tx.appendChild(el("p", null, a.text));
      card.appendChild(tx);
      c.appendChild(card);
    });
  }

  function renderChats() {
    var c = document.getElementById("chats");
    if (!c) return;
    c.textContent = "";
    T("whatsapp.chats").forEach(function (ch) {
      var card = el("article", "chat reveal");
      var head = el("div", "chat-head");
      head.appendChild(el("span", "chat-tag", T("whatsapp.example")));
      head.appendChild(el("span", "chat-title", ch.label));
      card.appendChild(head);
      var body = el("div", "chat-body");
      ch.msgs.forEach(function (m) {
        var mine = m.me != null;
        var b = el("div", "bubble " + (mine ? "me" : "bot"));
        rich(b, mine ? m.me : m.bot);
        body.appendChild(b);
        if (m.btn) {
          var row = el("div", "bubble-btns");
          m.btn.forEach(function (l) { row.appendChild(el("span", null, l)); });
          body.appendChild(row);
        }
      });
      card.appendChild(body);
      c.appendChild(card);
    });
  }

  function renderServices() {
    var c = document.getElementById("services-grid");
    if (!c) return;
    c.textContent = "";
    T("services.list").forEach(function (s) {
      var a = el("a", "service reveal");
      a.href = s.url;
      a.target = "_blank";
      a.rel = "noopener";
      a.appendChild(el("span", "service-group", s.group));
      a.appendChild(el("span", "service-name", s.name));
      a.appendChild(el("span", "service-text", s.text));
      c.appendChild(a);
    });
  }

  function renderFaq() {
    var c = document.getElementById("faq-list");
    if (!c) return;
    c.textContent = "";
    T("faq.list").forEach(function (f) {
      var d = el("details", "faq-item reveal");
      d.appendChild(el("summary", null, f.q));
      d.appendChild(el("p", null, f.a));
      c.appendChild(d);
    });
  }

  function renderSectors() {
    var sel = document.getElementById("sector-select");
    if (!sel) return;
    sel.textContent = "";
    T("contact.sectors").forEach(function (s) { var o = el("option", null, s); o.value = s; sel.appendChild(o); });
  }

  function renderWhatsAppButtons() {
    var c = document.getElementById("hero-wa");
    if (!c) return;
    c.textContent = "";
    var country = waCountry();
    var list = country ? [country] : ["CM", "TG"];
    list.forEach(function (code) {
      var a = el("a", "btn btn-wa");
      a.setAttribute("data-wa", code);
      a.href = "https://wa.me/" + WA[code].num;
      a.target = "_blank";
      a.rel = "noopener";
      a.innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.77-1.66-2.07-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48 0 1.46 1.07 2.88 1.21 3.07.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.69.63.71.22 1.36.19 1.87.12.57-.09 1.76-.72 2.01-1.41.25-.7.25-1.29.17-1.41-.07-.12-.27-.2-.57-.35M12.05 21.8h-.01a9.87 9.87 0 0 1-5.03-1.38l-.36-.21-3.74.98 1-3.65-.24-.37a9.86 9.86 0 0 1-1.51-5.26c0-5.45 4.44-9.88 9.89-9.88 2.64 0 5.12 1.03 6.99 2.9a9.82 9.82 0 0 1 2.89 6.99c0 5.45-4.43 9.88-9.88 9.88m8.41-18.3A11.81 11.81 0 0 0 12.05 0C5.5 0 .16 5.34.16 11.89c0 2.1.55 4.14 1.59 5.95L.06 24l6.3-1.65a11.88 11.88 0 0 0 5.68 1.45h.01c6.55 0 11.89-5.34 11.89-11.89a11.82 11.82 0 0 0-3.48-8.41"/></svg>';
      a.appendChild(document.createTextNode(country ? T("hero.whatsapp") : T(code === "CM" ? "hero.waCM" : "hero.waTG")));
      c.appendChild(a);
    });
  }

  function renderLiveLine() {
    var n = document.getElementById("live-line");
    if (!n) return;
    if (!live.total) { n.hidden = true; return; }
    n.hidden = false;
    var txt = live.cities > 1 ? fill(T("hero.live"), { n: live.total, c: live.cities }) : fill(T("hero.liveOne"), { n: live.total });
    n.querySelector(".live-text").textContent = txt;
  }

  function shopCard(s, compact) {
    var a = el("a", compact ? "pshop" : "shop reveal");
    a.href = APP + "/" + encodeURIComponent(s.slug);
    a.target = "_blank";
    a.rel = "noopener";
    var pic = el("span", compact ? "pshop-pic" : "shop-pic");
    if (s.coverImageUrl || s.logoUrl) {
      var img = el("img");
      img.src = s.coverImageUrl || s.logoUrl;
      img.alt = "";
      img.loading = "lazy";
      img.onerror = function () { img.remove(); pic.textContent = (s.name || "?").charAt(0).toUpperCase(); };
      pic.appendChild(img);
    } else {
      pic.textContent = (s.name || "?").charAt(0).toUpperCase();
    }
    a.appendChild(pic);
    var info = el("span", compact ? "pshop-info" : "shop-info");
    info.appendChild(el("span", compact ? "pshop-name" : "shop-name", s.name));
    var meta = [s.sector, s.city].filter(Boolean).join(" · ");
    if (meta) info.appendChild(el("span", compact ? "pshop-meta" : "shop-meta", meta));
    a.appendChild(info);
    if (s.isOpenNow === true || s.onDuty === true) a.appendChild(el("span", compact ? "pshop-open" : "shop-open", T("shops.openNow")));
    return a;
  }

  // Le telephone du haut montre de vrais commerces quand le serveur repond ;
  // sinon les rayons de l'application (jamais un chiffre ni un commerce invente)
  function renderPhone() {
    var list = document.getElementById("phone-shops");
    var title = document.getElementById("phone-title");
    if (!list) return;
    var shops = live.shops.slice(0, 4);
    list.textContent = "";
    if (shops.length >= 2) {
      list.className = "papp-shops";
      if (title) title.textContent = T("phone.near");
      shops.forEach(function (s) { list.appendChild(shopCard(s, true)); });
      return;
    }
    list.className = "papp-rayons";
    if (title) title.textContent = T("phone.rayonsTitle");
    T("phone.rayons").forEach(function (r) {
      var tile = el("span", "prayon");
      tile.appendChild(el("span", "prayon-emoji", r[0]));
      tile.appendChild(el("span", "prayon-label", r[1]));
      list.appendChild(tile);
    });
  }

  function renderShops() {
    var sec = document.getElementById("pres-de-vous");
    var grid = document.getElementById("shops-grid");
    if (!sec || !grid) return;
    // Des rangees pleines : 8 ou 4 commerces (4 par ligne sur ordinateur, 2 sur telephone)
    var shops = live.shops.slice(0, live.shops.length >= 8 ? 8 : 4);
    if (shops.length < 4) { sec.hidden = true; return; }
    sec.hidden = false;
    grid.textContent = "";
    shops.forEach(function (s) { grid.appendChild(shopCard(s, false)); });
  }

  function renderTrial() {
    var t = document.getElementById("trial-title");
    if (!t) return;
    t.textContent = live.trial ? fill(T("pricing.trialTitle"), { d: live.trial }) : T("pricing.trialTitleNoNumber");
  }

  function renderAll() {
    applyTexts();
    renderBenefits();
    renderSteps("steps-android", T("install.android"));
    renderSteps("steps-iphone", T("install.iphone"));
    renderSteps("wa-steps", T("whatsapp.steps"));
    renderCards("clients-grid", T("clients.cards"));
    renderCards("merchants-grid", T("merchants.cards"));
    renderActivities();
    renderChats();
    renderServices();
    renderFaq();
    renderSectors();
    renderWhatsAppButtons();
    renderLiveLine();
    renderPhone();
    renderShops();
    renderTrial();
    if (typeof waHydrate === "function") waHydrate();
    observeReveal();
  }

  // ── Installer ──────────────────────────────────────────────
  function selectTab(name) {
    document.querySelectorAll("[data-tab]").forEach(function (b) {
      var on = b.getAttribute("data-tab") === name;
      b.setAttribute("aria-selected", String(on));
      b.tabIndex = on ? 0 : -1;
    });
    document.querySelectorAll("[data-panel]").forEach(function (p) {
      p.hidden = p.getAttribute("data-panel") !== name;
    });
  }

  function wireInstall() {
    var p = platform();
    selectTab(p);
    document.querySelectorAll("[data-tab]").forEach(function (b) {
      b.addEventListener("click", function () { selectTab(b.getAttribute("data-tab")); });
    });
    // Sur telephone : ouvrir AAANYIM qui montre l'installation ; sur ordinateur : aller au QR code
    document.querySelectorAll("[data-install]").forEach(function (a) {
      if (p === "desktop" && a.getAttribute("data-install") !== "go") {
        a.href = "#installer";
        a.removeAttribute("target");
        a.addEventListener("click", function () { selectTab("desktop"); });
      } else {
        a.href = INSTALL_URL;
      }
    });
    // Deja ouvert comme application installee : on le dit au lieu de proposer d'installer
    var standalone = window.matchMedia && window.matchMedia("(display-mode: standalone)").matches;
    if (standalone) document.documentElement.classList.add("is-standalone");
    wireInstallBar();
  }

  // Telephone : « Installer » reste a portee une fois le haut de page passe,
  // et s'efface quand la partie Installer est a l'ecran (jamais deux fois le meme geste)
  function wireInstallBar() {
    var bar = document.getElementById("install-bar");
    var hero = document.querySelector(".hero");
    var section = document.getElementById("installer");
    if (!bar || !hero || !section || !("IntersectionObserver" in window)) return;
    var heroSeen = true;
    var sectionSeen = false;
    var update = function () { bar.classList.toggle("show", !heroSeen && !sectionSeen); };
    new IntersectionObserver(function (e) { heroSeen = e[0].isIntersecting; update(); }, { threshold: 0 }).observe(hero);
    new IntersectionObserver(function (e) { sectionSeen = e[0].isIntersecting; update(); }, { threshold: 0.15 }).observe(section);
  }

  // ── Donnees du serveur (jamais un chiffre invente) ─────────
  function getJson(url) {
    var ctrl = typeof AbortController !== "undefined" ? new AbortController() : null;
    var timer = setTimeout(function () { if (ctrl) ctrl.abort(); }, 8000);
    return fetch(url, { headers: { Accept: "application/json" }, signal: ctrl ? ctrl.signal : undefined })
      .then(function (r) { clearTimeout(timer); if (!r.ok) throw new Error(String(r.status)); return r.json(); })
      .then(function (j) { return j && j.data != null ? j.data : j; });
  }

  function loadLive() {
    getJson(API + "/public/marketplace").then(function (d) {
      if (!d) return;
      var total = Number(d.visibleTotal);
      live.total = total > 0 ? total : null;
      live.cities = Array.isArray(d.cities) ? d.cities.length : null;
      live.shops = (Array.isArray(d.tenants) ? d.tenants : []).filter(function (s) { return s && s.slug && s.name; });
      renderLiveLine();
      renderPhone();
      renderShops();
      observeReveal();
    }).catch(function () { /* pas de reponse : rien n'est montre plutot qu'un chiffre faux */ });

    var country = waCountry() || "CM";
    getJson(API + "/public/pricing?country=" + country).then(function (d) {
      var days = d && d.commission ? Number(d.commission.trialFreeDays) : NaN;
      live.trial = days > 0 ? days : null;
      renderTrial();
    }).catch(function () { /* le titre sans nombre reste */ });
  }

  // ── Apparition au defilement ───────────────────────────────
  var revealObs = null;
  function observeReveal() {
    var nodes = document.querySelectorAll(".reveal:not(.in)");
    if (!("IntersectionObserver" in window) || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      nodes.forEach(function (n) { n.classList.add("in"); });
      return;
    }
    if (!revealObs) {
      revealObs = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add("in"); revealObs.unobserve(e.target); } });
      }, { rootMargin: "0px 0px -40px 0px", threshold: 0.05 });
    }
    nodes.forEach(function (n) { revealObs.observe(n); });
  }

  // ── Barre du haut, menu, formulaire ────────────────────────
  function wireNav() {
    var bar = document.querySelector(".topbar");
    var onScroll = function () { if (bar) bar.classList.toggle("scrolled", window.scrollY > 24); };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    var burger = document.querySelector(".burger");
    var menu = document.getElementById("menu");
    if (burger && menu) {
      burger.addEventListener("click", function () {
        var open = menu.classList.toggle("open");
        burger.setAttribute("aria-expanded", String(open));
      });
      menu.querySelectorAll("a").forEach(function (a) {
        a.addEventListener("click", function () { menu.classList.remove("open"); burger.setAttribute("aria-expanded", "false"); });
      });
    }
    document.querySelectorAll(".lang-switch button").forEach(function (b) {
      b.addEventListener("click", function () {
        lang = b.getAttribute("data-lang");
        try { localStorage.setItem("aaanyim-lang", lang); } catch (e) { /* stockage indisponible */ }
        renderAll();
      });
    });
    // wa.me : meme onglet sur telephone (WhatsApp s'ouvre), nouvel onglet sur ordinateur
    var mobile = platform() !== "desktop";
    document.addEventListener("click", function (e) {
      var a = e.target.closest && e.target.closest('a[href*="wa.me"]');
      if (a && mobile) { e.preventDefault(); window.location.href = a.href; }
    });
  }

  function wireForm() {
    var form = document.getElementById("contact-form");
    if (!form) return;
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var data = new FormData(form);
      var btn = form.querySelector("button[type=submit]");
      var ok = document.getElementById("form-success");
      btn.disabled = true;
      fetch("https://formspree.io/f/mqenjvkv", { method: "POST", body: data, headers: { Accept: "application/json" } })
        .then(function (r) {
          if (!r.ok) throw new Error(String(r.status));
          form.reset();
          ok.hidden = false;
          setTimeout(function () { ok.hidden = true; }, 6000);
        })
        .catch(function () {
          // Le formulaire n'est pas parti : on ouvre WhatsApp avec le message deja ecrit (jamais « envoye » a tort)
          var text = (data.get("name") || "") + " — " + (data.get("company") || "") + "\n" + (data.get("message") || "");
          window.location.href = "https://wa.me/" + WA.CM.num + "?text=" + encodeURIComponent(text);
        })
        .then(function () { btn.disabled = false; });
    });
  }

  function start() {
    lang = readLang();
    wireNav();
    wireInstall();
    wireForm();
    renderAll();
    loadLive();
    document.documentElement.classList.add("js");
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", start);
  else start();
})();
