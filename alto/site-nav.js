/* Altiora site-wide (registered site script "AltioraNav"): on phones and tablets the menu bar slides away while
   scrolling down and returns on scroll up; Alto's button docks into the bar beside the menu icon and moves with it,
   so nothing floats over the page. Desktop is unchanged. No data is collected or sent. */
(function () {
  var bar = document.querySelector('.navbar-4') || document.querySelector('.ac-header');
  if (!bar || !/sticky|fixed/.test(getComputedStyle(bar).position)) return;
  var mq = matchMedia('(max-width:991px),(max-height:560px)'), root = document.documentElement, lastY = scrollY, hidden = false, queued = false, styled = null;
  var CSS = ':host([data-dock]) .lb{top:var(--ad-top);right:var(--ad-right);bottom:auto;transform:translateY(var(--ad-shift));transition:transform .32s ease}'
    + ':host([data-dock]) .lbtn{width:var(--ad-size);height:var(--ad-size)}:host([data-dock]) .lbtn img{width:66%;height:66%}:host([data-dock]) .tag{display:none}'
    + '@media (min-width:481px){:host([data-dock]) .p{top:var(--ad-ptop);bottom:auto;height:min(620px,calc(100vh - var(--ad-ptop) - 12px))}}';
  function dock() {
    var host = document.getElementById('alto-assistant'); if (!host) return;
    if (host.shadowRoot && styled !== host) { var st = document.createElement('style'); st.textContent = CSS; host.shadowRoot.appendChild(st); styled = host; }
    var b = bar.querySelector('.w-nav-button, .ac-burger'), on = mq.matches && b && b.offsetWidth > 0;
    if (!on) { host.removeAttribute('data-dock'); return; }
    var h = bar.offsetHeight, size = Math.min(42, h - 12), s = host.style;
    s.setProperty('--ad-size', size + 'px');
    s.setProperty('--ad-top', Math.round((h - size) / 2) + 'px'); s.setProperty('--ad-right', Math.round(innerWidth - b.getBoundingClientRect().left + 4) + 'px');
    s.setProperty('--ad-shift', hidden ? -(h + 6) + 'px' : '0px'); s.setProperty('--ad-ptop', (h + 8) + 'px');
    host.setAttribute('data-dock', '');
  }
  function vis() { root.style.setProperty('--navvis', hidden ? '0px' : bar.offsetHeight + 'px'); dock(); }
  function set(h) { if (h === hidden) return; hidden = h; root.classList.toggle('alt-nav-up', h); vis(); }
  function menuOpen() { return !!bar.querySelector('.w--open') || bar.classList.contains('ac-open') || bar.contains(document.activeElement); }
  function check() {
    queued = false; var y = scrollY;
    if (!mq.matches || menuOpen() || y < bar.offsetHeight) { set(false); lastY = y; return; }
    if (y > lastY + 8) { set(true); lastY = y; } else if (y < lastY - 8) { set(false); lastY = y; }
  }
  addEventListener('scroll', function () { if (!queued) { queued = true; requestAnimationFrame(check); } }, { passive: true });
  addEventListener('resize', function () { vis(); check(); });
  addEventListener('load', vis); setTimeout(vis, 1500);
  bar.addEventListener('focusin', function () { set(false); });
  bar.addEventListener('click', function () { set(false); });
  vis();
})();
