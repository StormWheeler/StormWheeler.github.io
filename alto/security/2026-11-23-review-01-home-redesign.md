# Review #1: home page redesign (staging), 23 Nov 2026

**Request from:** Website session. Staging https://altiora-ai.webflow.io/, commit 78b3416 (`alto/redo/dist/*`, `home-redo.js/.css`, `head-code.html` v7, `i18n-redo.json`).
**Verdict: APPROVED WITH FIXES.** The code is clean. Six wording and notice fixes must be published together with the redesign, not after it.

## Cyber: pass
- **XSS:** every dynamic `innerHTML` goes through `esc()` (escapes & < > "). Translation strings are escaped too. No `eval`, no `new Function`, no `postMessage`.
- **localStorage:** `altiora-path` is written only from fixed buttons and read back only if it matches a known `PATHS` key. `altiora-lang` is unchanged.
- **Network:** fetches go only to `cdn.prod.website-files.com/68388043…` (our Webflow assets); video blobs come from URLs in our own manifest. No new third parties.
- **External link:** `target=_blank rel=noopener` to https://altiora-recall.expo.app/. The QR decodes exactly to https://altiora-recall.expo.app/ (verified by rendering and decoding).
- **Head v7:** only the five translation-file URLs changed, all on our CDN.
- **CSP and framing:** the redesign adds no inline handlers that would block a future CSP. Staging sends `frame-ancestors` (webflow.io); the live domain still has no frame protection (baseline L1, still open).
- **Accessibility:** one H1, canvases `aria-hidden`, buttons use `aria-pressed`, the game area is `aria-live`, reduced motion is respected, and the decorative QR is `aria-hidden` with a text alternative link. Good.

## Fixes before publishing to altioraai.com

1. **(Medium) Hero lede, pre-licence.** `hero-embed`: "Altiora AI designs and runs AI systems for UAE hotels…" → "Altiora AI is preparing to design and run AI systems for UAE hotels, holiday homes, venues and event teams. Keep scrolling: the lights come on as you go." Update the 5 translation files.
2. **(Medium) Timeline reads as live results.** Under the three `rx-tick` rows add `<p class="rx-note">Illustrative examples of what our systems are designed to do. Not client results.</p>`. Optional: "Answered in Arabic, in seconds" → "Answered in Arabic, straight away".
3. **(Medium) Tessera claims existing properties.** `tessera-embed`: "in private preview with a small number of properties." → "in private preview." "Request access" to /contact is fine.
4. **(Medium) Cookie notice, same publish.** Yes, it needs a line. Under "Chat assistant and language" add: "If you answer 'What brings you here?' on the home page, your browser keeps that choice on your device (local storage, 'altiora-path') so the page stays arranged for you; the language choice is kept the same way ('altiora-lang'). Neither is sent to us, and clearing your browser data removes them." The Privacy notice §2 can point to it in one line. No consent banner is needed: both are storage the visitor asked for.
5. **(Medium) Calendly is still on the home page** (staging still loads assets.calendly.com widget.js and css, plus `openCalendly`). Remove it in this publish (baseline M3).
6. **(Medium) Recall status conflict.** The home page now says "Live now / out now", but /labs still says "Free beta soon" and Alto says "getting ready… 100 places". Update Labs and Alto (EN and AR) in the same publish (baseline M5).

## Recommended (Low, can follow)
- **AI imagery note** in the home footer or under the films: "Some images and films on this site are AI-generated; people shown are fictional." (baseline L5)
- **Recall copy** is acceptable. "train attention", "adapts", "results build up" make no health claims, and "A training app, not a medical product" sits by the CTA. Don't add "improve", "sharper" or "brain".
- **Google Fonts and Cloudflare** in the Privacy notice, or self-host the fonts (baseline M4).
- **Frame-bust snippet** in the head code (baseline L1).

## Still open from baseline
H1: the public repo exposes the Tessera page and internal handovers. This is the owner's decision. The Website session should not add Tessera or Recall internals to the repo meanwhile.

## Addendum: Labs Recall card (commit d5b48a8)
**APPROVED WITH FIXES.** The chip "Live now · Free beta" and the app link (`target=_blank rel=noopener`) are fine, and the "training app, not a medical product" line and the not-for-sale footer stay.
- **(Medium) Place count.** "100 free places in the first beta" doesn't match the actual cap of 105. And once the beta is full, a direct link breaks decisions 23 and 25 (nobody should be sent to a sign-up that turns them away). Fix: "Free places in the first beta are limited. A training app, not a medical product." Until the open/full beta check exists, the owner keeps an eye on numbers and switches the button back to the mailto when the beta is full.
- **(Medium) Alto still out of date** (fix 6 above). The EN and AR Recall answers say "getting ready for a free beta… 100 places", list the old exercises (Sequence, N-back, Hold) and link "Ask to join the beta" by mailto. Update them to: live free beta on web and Android; Settle, Lane, Watch, Words; link "Join the free beta" to https://altiora-recall.expo.app/; keep "a training app, not a medical product".

## Re-check after fixes (commit 80bf3a4, staging), 23 Nov 2026
**APPROVED to publish to altioraai.com**, with one small change in the same publish.

Confirmed on staging:
- Fix 1: the new hero lede is in place.
- Fix 2: the illustrative note is there. "In seconds" is fine with the note.
- Fix 3: Tessera says "in private preview."
- Fix 4: Cookie notice v1.1 has the `altiora-path`/`altiora-lang` paragraph.
- Fix 5: no Calendly. The only scripts come from the Webflow CDN, Webflow's jQuery and Google's webfont loader.
- Fix 6: Labs says "Live now", with no place count and no "soon".
- L5: the AI-imagery line is in place.

**Include in this publish (Medium):** the home page **meta description, Open Graph description and Twitter description** still say "Altiora AI designs and runs quiet AI systems…". These are what Google results and link previews show. Change them to "Altiora AI is preparing to design and run quiet AI systems for UAE hotels, holiday homes, venues and event teams…" (Page settings → SEO and Open Graph). The old hidden hero (`.hero-description`) still holds the same sentence in the HTML. Update it the same way or delete the hidden block.

**Next pass (Medium):** About statement "Altiora AI designs and runs AI systems…" → "is preparing to design and run…"; "every client interaction" → "every interaction". Then the remaining Low items: Google Fonts/Cloudflare in the Privacy notice, frame-bust, Code.gs `safe()`, spam filter, GDPR line.

## Final spot-check (commit 02c7355, staging), 23 Nov 2026
The Labs note reads "Free places in the first beta are limited." **GO for altioraai.com** once the meta, OG and Twitter descriptions and the hidden `.hero-description` no longer say "designs and runs". They were still unchanged on staging at this check. No other blockers.

## Post-publish check, live altioraai.com (commit 0fcb754), 23 Nov 2026
**PASS.**
- No "designs and runs" anywhere on home, Labs or the Cookie notice. The meta description and hero say "preparing to design and run".
- The illustrative note, the Tessera "in private preview" line and the AI-imagery line are present.
- Labs reads "Free places… are limited". The Cookie notice includes `altiora-path`.
- No Calendly. Scripts load only from Webflow's CDN, Webflow's jQuery and Google's webfont loader.
- /tessera returns 401 and the password page contains no protected content.

Still open: H1 (public repo, owner's decision); the Review #2 items (About wording, Privacy notice: Google Fonts/Cloudflare + GDPR line, frame-bust, Code.gs `safe()`, spam filter).
