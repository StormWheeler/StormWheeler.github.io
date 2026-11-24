# Review #2: home phone/landscape quality and the AltioraNav site script (staging), 24 Nov 2026

**Request from:** Website session. Commit cb8615d, diffed against 0fcb754 (the live version). Staging https://altiora-ai.webflow.io/.
**Verdict: OK TO PUBLISH.**

## Checked
- **Hosted home CSS and JS:** both are byte-identical to `alto/redo/dist/home-redo.min.css/.js`. The SRI hashes I computed match the `integrity` attributes exactly (sha384-40G3…, sha384-2ddc…), and both carry `crossorigin=anonymous`.
- **Minified JS:**
  - its only host is `cdn.prod.website-files.com`
  - every `innerHTML` still goes through the escape function (`jt`, the minified `esc`)
  - no `eval`, `new Function`, cookies, `sendBeacon` or XHR
  - the only new browser API is `navigator.connection.saveData` (read-only, never sent)
- **AltioraNav 1.0.0:**
  - the hosted file matches `alto/site-nav.min.js`
  - it only reads layout and scroll, toggles a class, sets CSS variables and adds a style to Alto's own shadow root
  - it doesn't fetch, store or send anything
  - the menu comes back on focus or click, so keyboard users aren't trapped
- **Media:** the Recall pack holds inline `data:` images (the same fictional "Karim" demo screens as before). The film packs are on our CDN. No new third parties.
- **Staging page:** no Calendly. The only scripts and styles come from Webflow's CDN, Webflow's jQuery and Google's webfont loader (the same as live).
- **Content:** no visible text changed. The pre-licence wording is untouched.

## Notes (Low, no action needed now)
- Webflow serves registered site scripts (AltioraNav) without an `integrity` attribute. That's acceptable because it is first-party Webflow hosting. Keep the site check comparing it byte for byte, as you do now.
- Phones now download about 10 MB for the home film. That's not a legal issue. The Data Saver fallback is good.

Still open: H1 (public repo, owner's decision); the pending items (About wording, Privacy: Google Fonts/Cloudflare + GDPR line, frame-bust, Code.gs `safe()`, spam filter).
