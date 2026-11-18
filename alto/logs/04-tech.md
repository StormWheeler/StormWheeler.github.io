# Website technical reference: altioraai.com

Where everything lives, so the site can be maintained by anyone. No passwords or secret keys are kept here.

## Hosting

- **Platform:** Webflow, site "Altiora AI" (site ID 68388043b4e79ad0df690cb6).
- **Domains:** altioraai.com and www.altioraai.com. Every publish goes to both.
- **Code and working files:** GitHub repository StormWheeler/StormWheeler.github.io, branch `claude/altiora-webflow-reactivation-xfdnx0`, folder `alto/`.

## Pages

| Page | Address | Notes |
|---|---|---|
| Home | / | Labs card with the lab-flask animation |
| About | /about | |
| AI solutions compared | /ai-solutions-compared | Visual with/without-AI page |
| Altiora Labs | /labs | Tessera and Recall cards; translated into six languages |
| Tessera (private preview) | /tessera | Password-protected, English only, Present mode |
| Contact | /contact | Main enquiry form |
| Connect | /connect | Short contact page with a form |
| Privacy notice, Terms of use, Cookie notice, AI use and disclaimer | /privacy-policy, /terms-of-service, /cookie-policy, /disclaimer | Pre-licence wording |
| Password page | /401 | Branded "Private preview" |
| 404 | /404 | |

## Site-wide code (Webflow → Site settings → Custom code)

- **Head:** the early part of the language switch. It reads the chosen language and loads that language's translation file.
- **Footer:**
  1. a script that closes the phone menu,
  2. Alto, the website assistant,
  3. the language switch engine.
- **Repository copies:**
  - head: `alto/head-code.html`
  - footer: `alto/footer-code.html` plus `alto/i18n.js`
  - Alto on its own: `alto/alto.js`

## Brand files

- **Tessera icon:** `alto/brand/` in the repository.
  - `tessera-icon.svg`: rounded app icon. PNGs at 1024, 512, 180 and 32 px.
  - `tessera-icon-square.svg`: square version for app stores and phones that round the corners themselves. PNG at 1024 px.
  - `tessera-mark.svg`: the token alone, with no background. PNG at 512 px.
  - Colours: deep green #0F2219, gold #E3B65E, green #3C9A6C. No other colour versions.

## Language switch

- **Languages:** English (as built in Webflow), Arabic, Russian, Chinese (Simplified), Hindi, French.
- **Translation files:** one per language, stored as Webflow assets and listed in the site head code. The current version is v6.
- **Repository copies:** `alto/ar.json`, `ru.json`, `zh.json`, `hi.json`, `fr.json`.
- **Updating text:**
  1. Add the English text and its translations to the five files.
  2. Upload them as a new version.
  3. Update the file list in the head code.
- Any part of a page marked `data-i18n-skip` stays in English (used for Tessera).

## Alto (website assistant)

- **What it is:** self-hosted, scripted answers in English and Arabic. Runs in the visitor's browser; nothing is stored or sent anywhere.
- **Topics:**
  - what Altiora AI is
  - what we build
  - Recall
  - Tessera
  - can I hire you now
  - how we work
  - who it is for
  - data and privacy
  - Arabic
  - who is behind it
  - examples
  - talk to a person
- **Any button can open Alto** with `altoOpen()`.

## Animations

- **Home, What we build:** for your guests (`alto/home/guest-embed.html`) and for your team (`alto/home/team-embed.html`).
- **Home, Altiora Labs band:** lab flask with link to /labs (`alto/home/labs-band-embed.html`; the flask on its own is `alto/labs-home-embed.html`).
- **Home, Who we work with icons:** `alto/home/icons/`.
- **Labs page, Tessera card:** phone unlocking a door (`alto/labs-tessera-embed.html`), and the Tessera icon beside the heading, whose halves slide together once.
- **Labs page, Recall card:** Recall's rising tile path, in Recall's colours (inside `alto/labs/labs-page.html`).
- **Tessera page:** six code blocks in `alto/tessera/` (styles, scenes, hero, steps, team, script).

## Recall connection (planned)

- **Recall's database:** Supabase project "altiora-recall-test". The beta limit setting is `beta_settings.max_people`, currently 105.
- **Planned:** a public "beta status" check that answers only open/full and places left. The full brief is in 03 Briefs and Handovers.

## Enquiry pipeline (built, not yet connected)

- **Script:** `alto/enquiries/Code.gs` (Google Apps Script).
- **Setup steps:** `alto/enquiries/SETUP.md` (also in 03 Briefs and Handovers).
- **Sheet:** "Altiora AI – Clientele" in the business account. Columns: Received (Dubai), Form, Name, Email, Phone, Message, Consent, Page, Status, Last contact, Notes, Submission ID.

## Site check (run after every change)

- **Script:** `alto/qa/site-check.js`; how to run it and what it covers are in `alto/qa/README.md`.
- **Head code** also holds two small style fixes: the password and 404 page menus on phones, and the AI compared and Labs menus on tablets.

## Cloud environment for Claude

- **Environment:** "Altiora AI website" (personal).
- **Allowed sites:** altioraai.com, www, Webflow's file servers, the Voiceflow hosts (no longer used), altiora-recall.expo.app, the site's font host (webflow-files-prod.global.ssl.fastly.net) and assets.calendly.com.
