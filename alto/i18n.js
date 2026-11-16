/* Altiora language switch (English, Arabic, Russian, Chinese, Hindi, French).
   English is the page as built in Webflow. Other languages swap every text, label and title from one
   translation file per language, flip the layout for Arabic, and remember the choice in this browser only. */
(function () {
  if (window.__altioraI18n) return; window.__altioraI18n = 1;
  var LANG = window.__altioraLang || 'en';
  var d = document.documentElement;

  var LANGS = [
    { c: 'en', n: 'English' }, { c: 'ar', n: 'العربية' }, { c: 'ru', n: 'Русский' },
    { c: 'zh', n: '简体中文' }, { c: 'hi', n: 'हिन्दी' }, { c: 'fr', n: 'Français' }
  ];
  var UI = {
    en: { title: 'Language', close: 'Close' },
    ar: { title: 'اللغة', close: 'إغلاق' },
    ru: { title: 'Язык', close: 'Закрыть' },
    zh: { title: '语言', close: '关闭' },
    hi: { title: 'भाषा', close: 'बंद करें' },
    fr: { title: 'Langue', close: 'Fermer' }
  };
  var LEGAL_NOTE = {
    ar: ['هذه ترجمة مقدَّمة للتيسير. النص الأصلي باللغة الإنجليزية، وفي حال وجود أي اختلاف تكون الغلبة للنسخة الإنجليزية. ', 'عرض النسخة الإنجليزية'],
    ru: ['Это перевод, предоставленный для удобства. Оригинал составлен на английском языке; в случае расхождений преимущественную силу имеет английская версия. ', 'Открыть английскую версию'],
    zh: ['本页为方便阅读而提供的译文。原文为英文，如有任何差异，以英文版本为准。', '查看英文版本'],
    hi: ['यह सुविधा के लिए उपलब्ध कराया गया अनुवाद है। मूल पाठ अंग्रेज़ी में है; किसी भी अंतर की स्थिति में अंग्रेज़ी संस्करण मान्य होगा। ', 'अंग्रेज़ी संस्करण देखें'],
    fr: ['Ceci est une traduction fournie pour votre commodité. L’original est rédigé en anglais ; en cas de divergence, la version anglaise prévaut. ', 'Voir la version anglaise']
  };
  var LEGAL = ['/privacy-policy', '/terms-of-service', '/cookie-policy', '/disclaimer'];
  var TYPE = { 'typewriter-text': 'Welcome to Altiora AI', 'typewriter-text2': "Let's connect" };
  var ICONS = '[class*="w-icon"],[class*="fa-"]';

  function fontRule(l, stack) {
    return 'html.i18n-' + l + ' body,html.i18n-' + l + ' body *:not(' + ICONS.replace(/,/g, '):not(') + '){font-family:' + stack + '!important}'
      + 'html.i18n-' + l + ' body,html.i18n-' + l + ' body *{letter-spacing:0!important;text-transform:none!important}'
      + 'html.i18n-' + l + ' h1,html.i18n-' + l + ' h2,html.i18n-' + l + ' h3,html.i18n-' + l + ' h4{line-height:1.35!important}';
  }
  var CSS = ''
    + fontRule('ar', '"Source Sans 3","SF Arabic","Geeza Pro","Noto Sans Arabic","Segoe UI",Tahoma,system-ui,sans-serif')
    + fontRule('hi', '"Source Sans 3","Kohinoor Devanagari","Noto Sans Devanagari","Nirmala UI",Mangal,system-ui,sans-serif')
    + fontRule('zh', '"Source Sans 3","PingFang SC","Hiragino Sans GB","Noto Sans SC","Microsoft YaHei",system-ui,sans-serif')
    + 'html.i18n-ar p,html.i18n-ar li,html.i18n-hi p,html.i18n-hi li{line-height:1.75}'
    + 'html.i18n-ar a[href^="mailto:"],html.i18n-ar a[href^="tel:"]{direction:ltr;unicode-bidi:isolate}'
    + 'html.i18n-ar input[type=tel],html.i18n-ar input[type=email]{direction:ltr;text-align:right}'
    + 'html.i18n-ar .w-checkbox{padding-left:0;padding-right:20px}html.i18n-ar .w-checkbox-input{float:right;margin-left:0;margin-right:-20px}'
    + 'html.i18n-ar .w-nav-menu a,html.i18n-ar .w-nav-menu .w-nav-link{text-align:right!important}'
    /* Language button and chooser */
    + '.i18n-switch{cursor:pointer;display:inline-flex;align-items:center;gap:6px}'
    + '.i18n-switch svg{width:15px;height:15px;flex:none;opacity:.85}'
    + '.w-nav-menu .i18n-switch{display:flex}'
    + '.i18n-foot{display:flex;flex-wrap:wrap;justify-content:center;gap:6px 14px;width:100%;margin:14px 0 4px;font-size:14px}'
    + '.i18n-foot a{color:inherit;opacity:.75;text-decoration:none}.i18n-foot a:hover{opacity:1;text-decoration:underline}'
    + '.i18n-foot a[aria-current]{opacity:1;color:#D4AF37;font-weight:600}'
    + '.i18n-ov{position:fixed;inset:0;z-index:2147483600;background:rgba(5,12,9,.62);display:flex;align-items:center;justify-content:center;padding:20px;-webkit-backdrop-filter:blur(3px);backdrop-filter:blur(3px)}'
    + '.i18n-pn{width:100%;max-width:360px;background:#0B1A13;color:#EEF0E8;border:1px solid rgba(212,175,55,.45);border-radius:18px;box-shadow:0 24px 70px rgba(0,0,0,.55);padding:18px;font-family:"Source Sans 3",system-ui,-apple-system,"Segoe UI",sans-serif!important}'
    + '.i18n-hd{display:flex;align-items:center;justify-content:space-between;margin:0 2px 12px;font-size:15px;color:#A9B8AF;letter-spacing:.04em}'
    + '.i18n-cl{background:transparent;border:1px solid #24402F;color:#EEF0E8;border-radius:999px;width:34px;height:34px;cursor:pointer;font-size:18px;line-height:1}'
    + '.i18n-ls{display:grid;gap:8px}'
    + '.i18n-ls button{display:flex;justify-content:space-between;align-items:center;width:100%;background:#12261C;color:#EEF0E8;border:1px solid #24402F;border-radius:12px;padding:13px 16px;font-size:17px;cursor:pointer;text-align:start;font-family:"Source Sans 3","SF Arabic","Geeza Pro","Noto Sans Arabic","PingFang SC","Noto Sans SC","Kohinoor Devanagari","Noto Sans Devanagari",system-ui,sans-serif!important;letter-spacing:0!important}'
    + '.i18n-ls button:hover,.i18n-ls button:focus-visible{border-color:#D4AF37;outline:none}'
    + '.i18n-ls button[aria-current]{border-color:#D4AF37;color:#D4AF37}'
    + '.i18n-ls small{font-size:12px;color:#7E8F86;letter-spacing:.08em}';

  function addStyle(css) { var s = document.createElement('style'); s.textContent = css; document.head.appendChild(s); }
  function langOf(c) { for (var i = 0; i < LANGS.length; i++) if (LANGS[i].c === c) return LANGS[i]; return LANGS[0]; }

  function setLang(l) {
    try { localStorage.setItem('altiora-lang', l); } catch (e) {}
    var u = new URL(location.href); u.searchParams.delete('lang'); location.replace(u.toString());
  }

  /* ---------- Chooser ---------- */
  var GLOBE = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c2.5 2.6 3.8 5.6 3.8 9s-1.3 6.4-3.8 9M12 3C9.5 5.6 8.2 8.6 8.2 12s1.3 6.4 3.8 9"/></svg>';
  var lastBtn = null;
  function openChooser(btn) {
    lastBtn = btn || null;
    var ui = UI[LANG] || UI.en;
    var ov = document.createElement('div'); ov.className = 'i18n-ov';
    var pn = document.createElement('div'); pn.className = 'i18n-pn';
    pn.setAttribute('role', 'dialog'); pn.setAttribute('aria-modal', 'true'); pn.setAttribute('aria-label', ui.title);
    var hd = document.createElement('div'); hd.className = 'i18n-hd'; hd.innerHTML = '<span>' + ui.title + (LANG === 'en' ? '' : ' · Language') + '</span>';
    var x = document.createElement('button'); x.className = 'i18n-cl'; x.type = 'button'; x.setAttribute('aria-label', ui.close); x.innerHTML = '&times;';
    hd.appendChild(x);
    var ls = document.createElement('div'); ls.className = 'i18n-ls';
    LANGS.forEach(function (L) {
      var b = document.createElement('button'); b.type = 'button'; b.setAttribute('lang', L.c === 'zh' ? 'zh-CN' : L.c);
      b.innerHTML = '<span></span><small>' + L.c.toUpperCase() + '</small>'; b.firstChild.textContent = L.n;
      if (L.c === LANG) b.setAttribute('aria-current', 'true');
      b.addEventListener('click', function () { if (L.c === LANG) close(); else setLang(L.c); });
      ls.appendChild(b);
    });
    pn.appendChild(hd); pn.appendChild(ls); ov.appendChild(pn); document.body.appendChild(ov);
    function close() { ov.remove(); document.removeEventListener('keydown', key); if (lastBtn) lastBtn.focus(); }
    function key(e) { if (e.key === 'Escape') close(); }
    x.addEventListener('click', close);
    ov.addEventListener('click', function (e) { if (e.target === ov) close(); });
    document.addEventListener('keydown', key);
    (ls.querySelector('[aria-current]') || ls.firstChild).focus();
  }
  window.altioraChooseLanguage = function () { openChooser(); };

  function makeNavButton(likeEl) {
    var a = document.createElement('a');
    a.href = '#'; a.className = (likeEl ? likeEl.className.replace(/\bw--current\b/g, '') : '') + ' i18n-switch';
    a.setAttribute('role', 'button'); a.setAttribute('aria-haspopup', 'dialog');
    var cur = langOf(LANG);
    a.setAttribute('aria-label', (UI[LANG] || UI.en).title + ': ' + cur.n);
    a.innerHTML = GLOBE + '<span></span>'; a.lastChild.textContent = cur.n;
    a.addEventListener('click', function (e) { e.preventDefault(); openChooser(a); });
    return a;
  }
  function makeFooterList() {
    var nav = document.createElement('nav'); nav.className = 'i18n-foot'; nav.setAttribute('aria-label', 'Language');
    LANGS.forEach(function (L) {
      var a = document.createElement('a'); a.href = '?lang=' + L.c; a.textContent = L.n;
      a.setAttribute('lang', L.c === 'zh' ? 'zh-CN' : L.c); a.setAttribute('hreflang', L.c);
      if (L.c === LANG) a.setAttribute('aria-current', 'true');
      a.addEventListener('click', function (e) { e.preventDefault(); if (L.c !== LANG) setLang(L.c); });
      nav.appendChild(a);
    });
    return nav;
  }
  function addSwitches() {
    var navs = document.querySelectorAll('nav.w-nav-menu, nav.ac-nav');
    for (var i = 0; i < navs.length; i++) {
      var like = navs[i].querySelector('a:not(.w--current)') || navs[i].querySelector('a');
      navs[i].appendChild(makeNavButton(like));
    }
    var foots = document.querySelectorAll('footer.footer-pp, footer.ac-footer');
    for (var j = 0; j < foots.length; j++) {
      var idp = foots[j].querySelector('.footer-identity');
      var list = makeFooterList();
      if (idp) foots[j].insertBefore(list, idp); else foots[j].appendChild(list);
    }
  }

  addStyle(CSS);
  if (LANG === 'en') { addSwitches(); return; }

  /* ---------- Translated page ---------- */
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
    if (tag === 'SCRIPT' || tag === 'STYLE' || tag === 'NOSCRIPT' || el.id === 'alto-assistant' || el.hasAttribute('data-i18n-decoy')
      || el.classList.contains('i18n-switch') || el.classList.contains('i18n-foot') || el.classList.contains('i18n-ov')
      || el.hasAttribute('data-i18n-skip')) return;
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
        var full = Array.from(tr(TYPE[cls]) || el.textContent), k = 0;
        el.textContent = '';
        (function step() { if (k <= full.length) { el.textContent = full.slice(0, k).join(''); k++; setTimeout(step, 90); } })();
      })(els[i]);
    });
  }

  function legalNote() {
    if (LEGAL.indexOf(location.pathname.replace(/\/$/, '')) < 0 || !LEGAL_NOTE[LANG]) return;
    var h1 = document.querySelector('h1'); if (!h1) return;
    var p = document.createElement('p');
    p.className = 'i18n-legal-note';
    p.style.cssText = 'margin:12px 0 24px;padding:12px 16px;border:1px solid rgba(212,175,55,.45);border-radius:10px;font-size:15px;line-height:1.7';
    p.textContent = LEGAL_NOTE[LANG][0];
    var a = document.createElement('a'); a.href = '?lang=en'; a.textContent = LEGAL_NOTE[LANG][1];
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
  }

  function start() {
    (window.__i18nP || Promise.reject()).then(run).catch(function () {
      /* Translation file unavailable: fall back to the English page rather than a half-translated one */
      LANG = 'en'; d.setAttribute('lang', 'en'); d.setAttribute('dir', 'ltr');
      d.className = d.className.replace(/\bi18n-\S+/g, '').trim(); addSwitches();
    });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start); else start();
})();
