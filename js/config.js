var WA = {
  CM: { num: "237689158764", display: "+237 689 158 764" },
  TG: { num: "22890897972", display: "+228 90 89 79 72" }
};

function waHydrate() {
  document.querySelectorAll('[data-wa]').forEach(function(el) {
    var code = el.getAttribute('data-wa');
    if (!WA[code]) return;
    if (el.tagName === 'A') el.href = 'https://wa.me/' + WA[code].num;
    if (el.hasAttribute('data-wa-display')) el.textContent = WA[code].display;
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', waHydrate);
} else {
  waHydrate();
}
