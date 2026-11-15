/* Altiora language switch (English / Arabic).
   English is the page as built in Webflow. Arabic swaps every text, label and title from one translation file,
   flips the layout right to left and remembers the choice in this browser only. */
(function () {
  if (window.__altioraI18n) return; window.__altioraI18n = 1;
  var AR = (window.__altioraLang === 'ar');
  var d = document.documentElement;

  var LEGAL = ['/privacy-policy', '/terms-of-service', '/cookie-policy', '/disclaimer'];
  var TYPE = { 'typewriter-text': ['Welcome to Altiora AI', 1000], 'typewriter-text2': ["Let's connect", 4500] };

  var CSS = ''
    /* Arabic script must never be letter-spaced or upper-cased */
    + 'html.i18n-ar body,html.i18n-ar body *{letter-spacing:0!important;text-transform:none!important}'
    /* Brand fonts have no Arabic letters; use a proper Arabic face everywhere (monospace labels would break the script apart) */
    + 'html.i18n-ar body,html.i18n-ar body *:not([class*="w-icon"]):not([class*="fa-"]){font-family:"Source Sans 3","SF Arabic","Geeza Pro","Noto Sans Arabic","Segoe UI",Tahoma,system-ui,sans-serif!important}'
    + 'html.i18n-ar h1,html.i18n-ar h2,html.i18n-ar h3,html.i18n-ar h4{line-height:1.35!important}'
    + 'html.i18n-ar p,html.i18n-ar li{line-height:1.75}'
    + 'html.i18n-ar a[href^="mailto:"],html.i18n-ar a[href^="tel:"]{direction:ltr;unicode-bidi:isolate}'
    + 'html.i18n-ar input[type=tel],html.i18n-ar input[type=email]{direction:ltr;text-align:right}'
    + 'html.i18n-ar .w-checkbox{padding-left:0;padding-right:20px}html.i18n-ar .w-checkbox-input{float:right;margin-left:0;margin-right:-20px}'
    + 'html.i18n-ar .w-nav-menu a,html.i18n-ar .w-nav-menu .w-nav-link{text-align:right!important}'
    + '.i18n-switch{cursor:pointer}'
    + '.i18n-switch[lang=ar]{font-family:"SF Arabic","Geeza Pro","Noto Sans Arabic","Segoe UI",Tahoma,sans-serif}';

  function addStyle(css) { var s = document.createElement('style'); s.textContent = css; document.head.appendChild(s); }

  /* ---------- Switch links in the nav and the footer ---------- */
  function setLang(l) {
    try { localStorage.setItem('altiora-lang', l); } catch (e) {}
    var u = new URL(location.href); u.searchParams.delete('lang'); location.replace(u.toString());
  }
  function makeSwitch(likeEl) {
    var a = document.createElement('a');
    a.href = '#'; a.className = (likeEl ? likeEl.className.replace(/\bw--current\b/g, '') : '') + ' i18n-switch';
    if (AR) { a.textContent = 'English'; a.setAttribute('lang', 'en'); a.setAttribute('dir', 'ltr'); a.setAttribute('aria-label', 'View this site in English'); }
    else { a.textContent = 'العربية'; a.setAttribute('lang', 'ar'); a.setAttribute('dir', 'rtl'); a.setAttribute('aria-label', 'عرض الموقع باللغة العربية'); }
    a.setAttribute('hreflang', AR ? 'en' : 'ar');
    a.addEventListener('click', function (e) { e.preventDefault(); setLang(AR ? 'en' : 'ar'); });
    return a;
  }
  function addSwitches() {
    var navs = document.querySelectorAll('nav.w-nav-menu, nav.ac-nav');
    for (var i = 0; i < navs.length; i++) {
      var like = navs[i].querySelector('a:not(.w--current)') || navs[i].querySelector('a');
      navs[i].appendChild(makeSwitch(like));
    }
    var foots = document.querySelectorAll('footer.footer-pp, footer.ac-footer');
    for (var j = 0; j < foots.length; j++) {
      var links = foots[j].querySelectorAll('a'), last = links[links.length - 1];
      var sw = makeSwitch(last);
      if (last && last.nextSibling) last.parentNode.insertBefore(sw, last.nextSibling); else foots[j].appendChild(sw);
    }
  }

  if (!AR) { addStyle(CSS); addSwitches(); return; }

  /* ---------- Arabic ---------- */
  addStyle(CSS);
  var DICT = null;
  function tr(s) { if (!DICT || !s) return null; var k = s.replace(/\s+/g, ' ').trim(); return k && DICT.hasOwnProperty(k) ? DICT[k] : null; }

  function textNode(n) {
    var v = n.nodeValue, t = tr(v);
    if (t != null && t !== v.trim()) { var lead = v.match(/^\s*/)[0], tail = v.match(/\s*$/)[0]; n.nodeValue = lead + t + tail; }
  }
  var ATTRS = ['placeholder', 'aria-label', 'alt', 'title', 'data-wait'];
  function element(el) {
    if (el.nodeType !== 1) return;
    var tag = el.tagName;
    if (tag === 'SCRIPT' || tag === 'STYLE' || tag === 'NOSCRIPT' || el.id === 'alto-assistant' || el.hasAttribute('data-i18n-decoy') || el.classList.contains('i18n-switch')) return;
    for (var i = 0; i < ATTRS.length; i++) { var a = el.getAttribute(ATTRS[i]); if (a) { var t = tr(a); if (t != null) el.setAttribute(ATTRS[i], t); } }
    if (tag === 'INPUT' && (el.type === 'submit' || el.type === 'button') && el.value) { var tv = tr(el.value); if (tv != null) el.value = tv; }
    var c = el.firstChild;
    while (c) { var nx = c.nextSibling; if (c.nodeType === 3) textNode(c); else if (c.nodeType === 1) element(c); c = nx; }
  }

  function head() {
    var t = tr(document.title); if (t) document.title = t;
    var metas = document.querySelectorAll('meta[name=description],meta[property="og:title"],meta[property="og:description"],meta[name="twitter:title"],meta[name="twitter:description"]');
    for (var i = 0; i < metas.length; i++) { var m = tr(metas[i].getAttribute('content')); if (m) metas[i].setAttribute('content', m); }
  }

  function typewriters() {
    Object.keys(TYPE).forEach(function (cls) {
      var els = document.querySelectorAll('.' + cls + ':not([data-i18n-decoy])');
      for (var i = 0; i < els.length; i++) (function (el) {
        var full = tr(TYPE[cls][0]) || el.textContent, k = 0;
        el.textContent = '';
        (function step() { if (k <= full.length) { el.textContent = full.slice(0, k); k++; setTimeout(step, 90); } })();
      })(els[i]);
    });
  }

  function legalNote() {
    if (LEGAL.indexOf(location.pathname.replace(/\/$/, '')) < 0) return;
    var h1 = document.querySelector('h1'); if (!h1) return;
    var p = document.createElement('p');
    p.className = 'i18n-legal-note';
    p.style.cssText = 'margin:12px 0 24px;padding:12px 16px;border:1px solid rgba(212,175,55,.45);border-radius:10px;font-size:15px;line-height:1.7';
    p.textContent = 'هذه ترجمة عربية مقدَّمة للتيسير. النص الأصلي باللغة الإنجليزية، وفي حال وجود أي اختلاف تكون الغلبة للنسخة الإنجليزية. ';
    var a = document.createElement('a'); a.href = '#'; a.textContent = 'عرض النسخة الإنجليزية';
    a.addEventListener('click', function (e) { e.preventDefault(); setLang('en'); });
    p.appendChild(a);
    h1.parentNode.insertBefore(p, h1.nextSibling);
  }

  function run(dict) {
    DICT = dict;
    head();
    element(document.body);
    addSwitches();
    legalNote();
    typewriters();
    new MutationObserver(function (ms) {
      for (var i = 0; i < ms.length; i++) {
        var m = ms[i];
        if (m.type === 'characterData') textNode(m.target);
        else for (var j = 0; j < m.addedNodes.length; j++) { var n = m.addedNodes[j]; if (n.nodeType === 3) textNode(n); else element(n); }
      }
    }).observe(document.body, { subtree: true, childList: true, characterData: true });
    d.classList.remove('i18n-wait');
    if (window.altoSetLang) window.altoSetLang('ar');
  }

  function start() {
    (window.__i18nP || Promise.reject()).then(run).catch(function () {
      /* Translation file unavailable: fall back to the English page rather than a half-flipped one */
      AR = false; d.setAttribute('lang', 'en'); d.setAttribute('dir', 'ltr'); d.classList.remove('i18n-ar', 'i18n-wait'); addSwitches();
    });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start); else start();
})();
