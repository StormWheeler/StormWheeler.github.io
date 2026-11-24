// Altiora AI site check. Run after every change:  node alto/qa/site-check.js [outDir]
// Visits every page at phone, tablet and desktop sizes (plus Arabic on phone), and reports:
//   page errors, failed requests, sideways scrolling, elements sticking out of the screen,
//   off-centre button text, clipped text, broken images, broken internal links.
// Saves a full-page screenshot of each page and size for a visual review.
const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

const BASE = process.env.SITE_BASE || 'https://altioraai.com'; // SITE_BASE=https://altiora-ai.webflow.io to check staging first
const PAGES = ['/', '/about', '/ai-solutions-compared', '/labs', '/contact', '/connect',
  '/privacy-policy', '/terms-of-service', '/cookie-policy', '/disclaimer', '/tessera', '/this-page-does-not-exist'];
const SIZES = [
  { name: 'phone', width: 390, height: 844, mobile: true },
  { name: 'phone-small', width: 360, height: 740, mobile: true },
  { name: 'tablet', width: 768, height: 1024, mobile: true },
  { name: 'desktop', width: 1366, height: 900, mobile: false },
];
const OUT = process.argv[2] || path.join(process.cwd(), 'site-check-out');
fs.mkdirSync(OUT, { recursive: true });

async function inspect(p) {
  return p.evaluate(() => {
    const vw = document.documentElement.clientWidth;
    const issues = [];
    const label = el => {
      let s = el.tagName.toLowerCase();
      if (el.id) s += '#' + el.id;
      if (el.className && typeof el.className === 'string') s += '.' + el.className.trim().split(/\s+/).slice(0, 3).join('.');
      const t = (el.innerText || el.getAttribute('aria-label') || '').trim().replace(/\s+/g, ' ').slice(0, 50);
      return t ? `${s} "${t}"` : s;
    };
    const visible = el => {
      const cs = getComputedStyle(el);
      if (cs.display === 'none' || cs.visibility === 'hidden' || +cs.opacity === 0) return false;
      const r = el.getBoundingClientRect();
      return r.width > 0 && r.height > 0;
    };
    // Is the element inside something that clips it (overflow hidden/auto) or deliberately off-screen?
    const clipped = el => {
      for (let a = el.parentElement; a && a !== document.body; a = a.parentElement) {
        const cs = getComputedStyle(a);
        if (/(hidden|auto|scroll|clip)/.test(cs.overflowX)) return true;
        if (cs.position === 'fixed' && a.getBoundingClientRect().left >= vw) return true;
      }
      return false;
    };
    // 1. sideways scrolling
    const sw = document.documentElement.scrollWidth;
    if (sw > vw + 1) issues.push({ type: 'sideways-scroll', detail: `page is ${sw}px wide on a ${vw}px screen` });
    // 2. elements sticking out of the screen
    const out = [];
    document.querySelectorAll('body *').forEach(el => {
      if (!visible(el) || clipped(el)) return;
      const r = el.getBoundingClientRect();
      if ((r.right > vw + 2 || r.left < -2) && getComputedStyle(el).position !== 'fixed') out.push(el);
    });
    out.filter(el => !out.includes(el.parentElement)).slice(0, 8)
      .forEach(el => { const r = el.getBoundingClientRect(); issues.push({ type: 'off-screen', detail: `${label(el)} spans ${Math.round(r.left)}..${Math.round(r.right)}px` }); });
    // 3. button text off-centre
    document.querySelectorAll('a.btn, .w-button, button, a[class*="button"], input[type=submit]').forEach(el => {
      if (!visible(el)) return;
      const r = el.getBoundingClientRect();
      const range = document.createRange(); range.selectNodeContents(el);
      const rects = [...range.getClientRects()].filter(x => x.width > 0);
      if (!rects.length) return;
      const left = Math.min(...rects.map(x => x.left)), right = Math.max(...rects.map(x => x.right));
      const off = Math.abs((left + right) / 2 - (r.left + r.width / 2));
      if (r.width - (right - left) > 40 && off > 12) issues.push({ type: 'button-text-off-centre', detail: `${label(el)} text is ${Math.round(off)}px off centre in a ${Math.round(r.width)}px button` });
    });
    // 4. clipped text
    document.querySelectorAll('h1,h2,h3,h4,p,a,span,li,label,button').forEach(el => {
      if (!visible(el) || !el.innerText || !el.innerText.trim()) return;
      const cs = getComputedStyle(el);
      if (/(hidden|clip)/.test(cs.overflowX) && el.scrollWidth > el.clientWidth + 2 && cs.textOverflow !== 'ellipsis')
        issues.push({ type: 'clipped-text', detail: label(el) });
    });
    // 5. text sitting on top of other text (e.g. a menu drawn over the page)
    const texts = [];
    document.querySelectorAll('body *').forEach(el => {
      if (!visible(el) || el.closest('[aria-hidden="true"],svg')) return;
      if (![...el.childNodes].some(n => n.nodeType === 3 && n.textContent.trim())) return;
      let fixed = false;
      for (let a = el; a; a = a.parentElement) if (getComputedStyle(a).position === 'fixed') { fixed = true; break; }
      if (fixed) return;
      const range = document.createRange(); range.selectNodeContents(el);
      const r = range.getBoundingClientRect();
      if (r.width > 2 && r.height > 2) texts.push({ el, r });
    });
    let overlaps = 0;
    for (let i = 0; i < texts.length && overlaps < 6; i++) for (let j = i + 1; j < texts.length && overlaps < 6; j++) {
      const a = texts[i], b = texts[j];
      if (a.el.contains(b.el) || b.el.contains(a.el)) continue;
      const w = Math.min(a.r.right, b.r.right) - Math.max(a.r.left, b.r.left);
      const h = Math.min(a.r.bottom, b.r.bottom) - Math.max(a.r.top, b.r.top);
      if (w <= 0 || h <= 0) continue;
      const small = Math.min(a.r.width * a.r.height, b.r.width * b.r.height);
      if (w * h > 0.3 * small) { overlaps++; issues.push({ type: 'text-overlap', detail: `${label(a.el)} overlaps ${label(b.el)}` }); }
    }
    // 6. text too faint to read against its background (e.g. dark text on a dark button)
    const rgb = c => { const m = c.match(/[\d.]+/g); return m ? m.map(Number) : null; };
    const lum = ([r, g, b]) => { const f = v => { v /= 255; return v <= .03928 ? v / 12.92 : Math.pow((v + .055) / 1.055, 2.4); }; return .2126 * f(r) + .7152 * f(g) + .0722 * f(b); };
    let faint = 0;
    texts.forEach(({ el }) => {
      if (faint >= 6) return;
      const fg = rgb(getComputedStyle(el).color); if (!fg || (fg[3] !== undefined && fg[3] < .5)) return;
      let bg = null;
      for (let a = el; a; a = a.parentElement) {
        const cs = getComputedStyle(a);
        if (cs.backgroundImage !== 'none') return;            // gradient or image: can't judge reliably
        const c = rgb(cs.backgroundColor);
        if (c && (c[3] === undefined || c[3] > .9)) { bg = c; break; }
      }
      if (!bg) bg = [255, 255, 255];
      const [L1, L2] = [lum(fg), lum(bg)].sort((x, y) => y - x);
      const ratio = (L1 + .05) / (L2 + .05);
      if (ratio < 2) { faint++; issues.push({ type: 'unreadable-text', detail: `${label(el)} contrast ${ratio.toFixed(2)}:1` }); }
    });
    // 7. menu links squeezed onto two lines (menu too crowded for the screen)
    document.querySelectorAll('header a, nav a, .w-nav a').forEach(a => {
      if (!visible(a) || !a.innerText.trim() || a.innerText.trim().length > 30) return;
      const tw = document.createTreeWalker(a, NodeFilter.SHOW_TEXT); const tops = new Set();
      for (let t = tw.nextNode(); t; t = tw.nextNode()) {
        if (!t.textContent.trim()) continue;
        const range = document.createRange(); range.selectNodeContents(t);
        [...range.getClientRects()].filter(x => x.width > 1).forEach(x => tops.add(Math.round(x.top / 4)));
      }
      if (tops.size > 1) issues.push({ type: 'menu-link-wraps', detail: label(a) });
    });
    // 8. broken images
    document.querySelectorAll('img').forEach(img => {
      if (img.loading === 'lazy' && !img.complete) return;
      if (img.complete && img.naturalWidth === 0 && img.getAttribute('src')) issues.push({ type: 'broken-image', detail: img.getAttribute('src') });
    });
    const links = [...document.querySelectorAll('a[href]')].map(a => a.href).filter(h => h.startsWith(location.origin) || /^https:\/\/(www\.)?altioraai\.com/.test(h));
    return { issues, links: [...new Set(links.map(h => h.split('#')[0]))] };
  });
}

async function scrollThrough(p) {
  await p.evaluate(async () => {
    const step = innerHeight * 0.8;
    for (let y = 0; y < document.documentElement.scrollHeight; y += step) { scrollTo(0, y); await new Promise(r => setTimeout(r, 250)); }
    scrollTo(0, 0);
  });
  await p.waitForTimeout(1500);
}

(async () => {
  const browser = await chromium.launch();
  const report = [];
  const allLinks = new Set();
  const runs = [];
  for (const s of SIZES) for (const pg of PAGES) runs.push({ s, pg, lang: 'en' });
  for (const pg of PAGES.slice(0, 10)) runs.push({ s: SIZES[0], pg, lang: 'ar' });
  for (const { s, pg, lang } of runs) {
    const ctx = await browser.newContext({ viewport: { width: s.width, height: s.height }, isMobile: s.mobile, hasTouch: s.mobile, deviceScaleFactor: 1 });
    if (lang !== 'en') await ctx.addInitScript(l => { try { localStorage.setItem('altiora-lang', l); } catch (e) {} }, lang);
    const p = await ctx.newPage();
    const errors = [];
    p.on('pageerror', e => errors.push({ type: 'script-error', detail: e.message.slice(0, 160) }));
    p.on('requestfailed', r => { const u = r.url(); if (!/google-analytics|googletagmanager|doubleclick/.test(u)) errors.push({ type: 'failed-request', detail: u.slice(0, 120) + ' ' + (r.failure() || {}).errorText }); });
    let status = 0;
    try {
      const resp = await p.goto(BASE + pg + (lang !== 'en' ? '?lang=' + lang : ''), { waitUntil: 'networkidle', timeout: 45000 });
      status = resp ? resp.status() : 0;
      await scrollThrough(p);
      const { issues, links } = await inspect(p);
      links.forEach(l => allLinks.add(l));
      const tag = `${(pg.replace(/\//g, '_') || '_') || 'home'}-${s.name}-${lang}`.replace(/^_-/, 'home-').replace(/^_/, '');
      await p.screenshot({ path: path.join(OUT, (tag || 'home') + '.png'), fullPage: true });
      report.push({ page: pg, size: s.name, lang, status, issues: [...issues, ...errors] });
    } catch (e) {
      report.push({ page: pg, size: s.name, lang, status, issues: [{ type: 'load-failed', detail: e.message.slice(0, 160) }] });
    }
    await ctx.close();
  }
  // internal links (curl follows the same network route as the browser)
  const { execFileSync } = require('child_process');
  const bad = [];
  for (const l of [...allLinks].map(u => u.replace(/\?lang=[a-z]+$/, '')).filter((v, i, a) => a.indexOf(v) === i)) {
    let code = '000';
    try { code = execFileSync('curl', ['-s', '-o', '/dev/null', '-L', '-w', '%{http_code}', '--max-time', '20', l]).toString(); } catch (e) {}
    if (!/^(200|401)$/.test(code) && !(l.endsWith('/this-page-does-not-exist') && code === '404')) bad.push(`${l} -> ${code}`);
  }
  await browser.close();
  // live custom code must match the copies kept in this repository
  const REPO = path.join(__dirname, '..');
  const rd = f => fs.readFileSync(path.join(REPO, f), 'utf8');
  const liveHtml = u => { try { return execFileSync('curl', ['-s', '--max-time', '30', BASE + u + '?v=' + Date.now()]).toString(); } catch (e) { return ''; } };
  const home = liveHtml('/'), labs = liveHtml('/labs');
  const footer = rd('footer-code.html') + '\n\n<!-- Altiora language switch -->\n<script>\n' + rd('i18n.js').trimEnd() + '\n</script>';
  [['site head code', home, rd('head-code.html')], ['site footer code', home, footer],
   ['home guest animation', home, rd('home/guest-embed.html')], ['home redesign styles', home, rd('redo/dist/page-head.html')], ['home redesign script', home, rd('redo/dist/page-footer.html').match(/<script src=[^]*?<\/script>/)[0]], ['home scroll film', home, rd('redo/dist/hero-embed.html')], ['home Tessera teaser', home, rd('redo/dist/tessera-embed.html')], ['home Recall section', home, rd('redo/dist/recall-embed.html')], ['home team animation', home, rd('home/team-embed.html')], ['home Labs band', home, rd('home/labs-band-embed.html')], ['Labs page', labs, rd('labs/labs-embed.html')]]
    .forEach(([name, live, local]) => { if (!live.includes(local.trim())) bad.push(`${name}: live site differs from the repository copy`); });
  // files the home page and every page load from the Webflow CDN must be byte-identical to the repository builds
  const cdn = u => { try { return execFileSync('curl', ['-s', '--max-time', '30', u]).toString(); } catch (e) { return ''; } };
  const navSrc = (home.match(/<script[^>]+src="([^"]*altioranav[^"]*)"/) || [])[1];
  [['home redesign stylesheet file', (rd('redo/dist/page-head.html').match(/href="([^"]+)"/) || [])[1], rd('redo/dist/home-redo.min.css')],
   ['home redesign script file', (rd('redo/dist/page-footer.html').match(/<script src="([^"]+)"/) || [])[1], rd('redo/dist/home-redo.min.js')],
   ['site menu script (AltioraNav)', navSrc, rd('site-nav.min.js')]]
    .forEach(([name, url, local]) => { if (!url) bad.push(`${name}: not referenced on the live page`); else if (cdn(url).trim() !== local.trim()) bad.push(`${name}: hosted file differs from the repository copy`); });
  const expected = { '/tessera': 401, '/this-page-does-not-exist': 404 };
  let n = 0;
  const lines = [];
  const seenFail = new Set();
  for (const r of report) r.issues = r.issues.filter(i => {
    if (i.type !== 'failed-request') return true;
    if (seenFail.has(i.detail)) return false;
    seenFail.add(i.detail); return true;
  });
  for (const r of report) {
    const want = expected[r.page] || 200;
    if (r.status !== want) r.issues.unshift({ type: 'status', detail: `got ${r.status}, expected ${want}` });
    if (!r.issues.length) continue;
    n += r.issues.length;
    lines.push(`\n${r.page} [${r.size}, ${r.lang}]`);
    r.issues.forEach(i => lines.push(`  - ${i.type}: ${i.detail}`));
  }
  if (bad.length) { n += bad.length; lines.push('\nLinks and live code'); bad.forEach(b => lines.push('  - ' + b)); }
  const summary = `Site check ${new Date().toISOString()}: ${report.length} page views, ${allLinks.size} internal links, ${n} issue(s)`;
  const text = summary + '\n' + lines.join('\n') + '\n';
  fs.writeFileSync(path.join(OUT, 'report.txt'), text);
  fs.writeFileSync(path.join(OUT, 'report.json'), JSON.stringify({ report, bad }, null, 1));
  console.log(text);
})();
