// Strict phone/tablet/desktop layout check for the home page scenes (portrait + landscape).
// Usage: URL=https://altiora-ai.webflow.io/ node alto/qa/layout-check.js   (optional LNG=ar, ONLY=i13,galL)
// Flags: text clipped by the menu or screen edge, overlaps (text, phone, Alto button), sudden phone size jumps.
const { chromium, devices } = require('playwright');
const URL = process.env.URL || 'https://altiora-ai.webflow.io/';
const ONLY = process.env.ONLY ? process.env.ONLY.split(',') : null;
const OUT = require('os').tmpdir() + '/altiora-layout-' + (process.env.TAG || 'run'); require('fs').mkdirSync(OUT, { recursive: true });
const D = devices;
const CASES = [
  ['i13', D['iPhone 13']], ['se', D['iPhone SE']], ['px7', D['Pixel 7']], ['s9', D['Galaxy S9+']],
  ['i13L', D['iPhone 13 landscape']], ['px7L', D['Pixel 7 landscape']], ['s9L', D['Galaxy S9+ landscape']],
  ['galL', { viewport: { width: 838, height: 330 }, deviceScaleFactor: 2.6, isMobile: true, hasTouch: true, userAgent: D['Pixel 7'].userAgent }],
  ['ipad', D['iPad (gen 7)']], ['ipadL', D['iPad (gen 7) landscape']],
  ['lap', { viewport: { width: 1280, height: 680 } }], ['net', { viewport: { width: 1024, height: 600 } }], ['desk', { viewport: { width: 1366, height: 768 } }], ['fhd', { viewport: { width: 1920, height: 1080 } }]
].filter(c => !ONLY || ONLY.includes(c[0]));
const BLOCKS = ['#rx-home .rx-beat .rx-inner > *', '#rx-home .rx-cue', '#rx-ttitle', '#rx-panel', '#rx-tend > *', '#rx-recall .rx-rbeat .rx-inner > *', '#rx-pzone', '#rx-mark svg', '#rx-mark .rx-lbl', '#rx-recall .rx-dots span', '#rx-ribbon'];
(async () => {
  const b = await chromium.launch();
  await Promise.all(CASES.map(async ([name, opt]) => {
    const ctx = await b.newContext(opt); if (process.env.LNG) await ctx.addInitScript(l => { try { localStorage.setItem('altiora-lang', l); } catch (e) {} }, process.env.LNG); const p = await ctx.newPage(); const errs = [];
    p.on('pageerror', e => errs.push(e.message));
    await p.goto(URL, { waitUntil: 'networkidle', timeout: 120000 }); await p.waitForTimeout(1500);
    const issues = new Map(); let shots = 0; let lastPw = null; const pwJumps = [];
    const H = await p.evaluate(() => document.documentElement.scrollHeight - innerHeight);
    const ih = await p.evaluate(() => innerHeight);
    const sec = await p.evaluate(() => ['rx-home', 'rx-tessera', 'rx-recall'].map(id => { const e = document.getElementById(id); const t = e.getBoundingClientRect().top + scrollY; return [t, t + e.offsetHeight]; }));
    const inSec = y => sec.some(([a, z]) => y >= a - ih && y <= z);
    for (let y = 0; y <= H; y += inSec(y) ? Math.round(ih * .12) : Math.round(ih * .5)) {
      await p.evaluate(y => scrollTo(0, y), y); await p.waitForTimeout(inSec(y) ? 520 : 150);
      const r = await p.evaluate(BLOCKS => {
        const op = el => { let o = 1; for (let e = el; e && e !== document.documentElement; e = e.parentElement) { const cs = getComputedStyle(e); if (cs.visibility === 'hidden' || cs.display === 'none') return 0; o *= +cs.opacity; } return o; };
        const nav = document.querySelector('.navbar-4, .w-nav'); const nr = nav.getBoundingClientRect();
        const navBottom = (getComputedStyle(nav).position === 'fixed' || getComputedStyle(nav).position === 'sticky') && nr.bottom > 0 ? nr.bottom : 0;
        const items = [];
        BLOCKS.forEach(s => document.querySelectorAll(s).forEach(el => { const o = op(el); const rr = el.getBoundingClientRect(); if (o > .1 && rr.width > 2 && rr.height > 2 && rr.bottom > 0 && rr.top < innerHeight) items.push({ el, s, r: rr, o }); }));
        const out = [];
        const lab = it => it.s.replace(/ .*>.*$/, '') + '[' + (it.el.id || (it.el.textContent || '').trim().replace(/\s+/g, ' ').slice(0, 24)) + ']';
        const stickyOf = el => el.closest('.rx-sticky');
        items.forEach(it => {
          if (it.s === '#rx-ribbon') return;
          const st = stickyOf(it.el); if (!st) return; const sr = st.getBoundingClientRect();
          const pinned = Math.abs(sr.top - (parseFloat(getComputedStyle(st).top) || 0)) < 2;
          if (!pinned) return;
          const rib = document.getElementById('rx-ribbon'); const rbr = rib && !rib.hidden ? rib.getBoundingClientRect() : null;
          const topLimit = Math.max(navBottom, sr.top, rbr && rbr.bottom > 0 && rbr.top < 200 ? rbr.bottom : 0);
          if (it.r.top < topLimit - 3) out.push(`CLIP-TOP ${lab(it)} by ${Math.round(topLimit - it.r.top)}px`);
          if (it.r.bottom > Math.min(innerHeight, sr.bottom) + 3) out.push(`CLIP-BOTTOM ${lab(it)} by ${Math.round(it.r.bottom - Math.min(innerHeight, sr.bottom))}px`);
          if (it.r.left < -2 || it.r.right > innerWidth + 2) out.push(`CLIP-SIDE ${lab(it)}`);
        });
        const host = document.getElementById('alto-assistant'); let alto = null;
        if (host && host.shadowRoot) { const l = [...host.shadowRoot.querySelectorAll('*')].find(e => getComputedStyle(e).position === 'fixed' && e.offsetWidth > 40 && e.offsetWidth < 130 && op(e) > .1); if (l) alto = l.getBoundingClientRect(); }
        if (alto) items.forEach(it => { if (it.s === '#rx-ribbon' || it.s === '#rx-pzone' || !stickyOf(it.el)) return; { const st = stickyOf(it.el), sr = st.getBoundingClientRect(); if (Math.abs(sr.top - (parseFloat(getComputedStyle(st).top) || 0)) >= 2) return; } const rg = document.createRange(); rg.selectNodeContents(it.el); const rs = [...rg.getClientRects()].concat([...it.el.querySelectorAll('a,button,svg,img,canvas')].map(e => e.getBoundingClientRect())); for (const q of rs) { const w = Math.min(q.right, alto.right - 6) - Math.max(q.left, alto.left + 6), h = Math.min(q.bottom, alto.bottom - 6) - Math.max(q.top, alto.top + 6); if (w > 2 && h > 2) { out.push(`ALTO-COVERS ${lab(it)} ${Math.round(w)}x${Math.round(h)}`); break; } } });
        for (let i = 0; i < items.length; i++) for (let j = i + 1; j < items.length; j++) {
          const A = items[i], B = items[j]; if (A.el.contains(B.el) || B.el.contains(A.el)) continue;
          if (A.s === B.s && A.el.parentElement === B.el.parentElement) continue;
          const w = Math.min(A.r.right, B.r.right) - Math.max(A.r.left, B.r.left), h = Math.min(A.r.bottom, B.r.bottom) - Math.max(A.r.top, B.r.top);
          if (w > 4 && h > 4 && w * h > 80) out.push(`OVERLAP ${lab(A)} x ${lab(B)} ${Math.round(w)}x${Math.round(h)}`);
        }
        const pz = document.getElementById('rx-pzone'); const pzr = pz.getBoundingClientRect();
        return { out, pw: pzr.width, pvis: op(pz) > .1 && pzr.bottom > 0 && pzr.top < innerHeight, navBottom };
      }, BLOCKS);
      if (r.pvis) { if (lastPw && Math.abs(r.pw - lastPw) / lastPw > .06) pwJumps.push(`${Math.round(lastPw)}->${Math.round(r.pw)} @${y}`); lastPw = r.pw; } else lastPw = null;
      for (const o of r.out) { const k = o.replace(/ by \d+px| \d+x\d+$/, ''); if (!issues.has(k)) { issues.set(k, `${o} @y=${y}`); if (shots < 6) { shots++; await p.screenshot({ path: `${OUT}/${name}_${shots}.png` }); issues.set(k, issues.get(k) + ` shot#${shots}`); } } }
    }
    // URL-bar collapse simulation in Recall (phones only)
    let barJump = '';
    if (false) {
      const rc = sec[2]; await p.evaluate(y => scrollTo(0, y), rc[0] + 40); await p.waitForTimeout(700);
      const w1 = await p.evaluate(() => document.getElementById('rx-pzone').getBoundingClientRect().width);
      const vp = p.viewportSize(); await p.setViewportSize({ width: vp.width, height: vp.height + 56 }); await p.waitForTimeout(700);
      const w2 = await p.evaluate(() => document.getElementById('rx-pzone').getBoundingClientRect().width);
      await p.setViewportSize(vp);
      if (Math.abs(w2 - w1) / w1 > .03) barJump = `phone ${Math.round(w1)}->${Math.round(w2)} on address-bar hide`;
    }
    const navInfo = await p.evaluate(() => { const n = document.querySelector('.navbar-4, .w-nav'); return Math.round(n.offsetHeight) + 'px/' + innerHeight; });
    console.log(`${name} nav ${navInfo}: ${issues.size} issues${pwJumps.length ? ', phone jumps ' + pwJumps.slice(0, 3).join(' ') : ''}${barJump ? ', ' + barJump : ''}${errs.length ? ' ERR ' + errs.slice(0, 2).join('|') : ''}`);
    [...issues.values()].slice(0, 12).forEach(v => console.log('   ', v));
    await ctx.close();
  }));
  await b.close();
})();
