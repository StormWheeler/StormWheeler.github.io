# 01 Change log: altioraai.com

Every change made to the website, oldest first. Times are Dubai time (GST, UTC+4). "Published" means the change went live on altioraai.com and www.altioraai.com.

**A note on detail:** the work on 15 November was recorded in less detail than later work, because the working session was condensed when it restarted. Those entries list what was done. Later entries give the full detail.

---

## Background (before this work)

- **24 Jan 2026:** the GitHub repository StormWheeler.github.io started life as a personal Hugo portfolio site with a Formspree contact form. It is now used to store the website's code and working files.
- **Before 15 Nov 2026:** altioraai.com existed on Webflow but needed reactivating and repositioning.

---

## 15 November 2026: Reactivation and redesign

**Goal:** reactivate the Webflow site and reposition Altiora AI as AI systems for UAE hospitality, events and venues, with a calm, premium brand and a pre-licence legal identity.

1. **Clean-up.** Removed placeholder testimonials, an empty page and a duplicate script.
2. **Brand theme foundation.** Set up brand colour variables, fonts and global type styles: deep forest green, gold accents and off-white text.
3. **Responsive navigation and layout.** Fixed the menu and layouts across desktop, tablet and phone breakpoints.
4. **Content rewrite.** Rewrote page copy for the new positioning: hotels, holiday homes, venues and event teams in the UAE, with a person approving what matters.
5. **Legal pages.** Privacy notice, website terms of use, cookie notice, and the AI use and disclaimer page, all written for a business that is planned but not yet licensed or trading. No services are offered or sold.
6. **Forms working end to end.**
   - Fixed the Contact page script, which pointed at a misspelt field ("Phone-inout" instead of "Phone-input").
   - Added a safety check, and an Arabic title.
7. **Home page.** Fixed section headings overlapping the card grids.
8. **About page.** Gave it more life with extra sections, accents and better spacing.
9. **"AI Solutions Compared" page.** Rebuilt as a visual with/without-AI comparison that follows one late-night hotel guest enquiry.
10. **Navigation.** Made sure every relevant page can be reached from the menu and footer.
11. **SEO pass.** Page titles, meta descriptions, social sharing tags and structured data (schema) on every page.

### Alto, the website assistant

- **18:38:** added a dark-themed widget snippet for the existing Voiceflow assistant.
- **Problem found:** the Voiceflow agent returned no answers. Visitors saw a widget that never replied.
- **19:33: rebuilt Alto from scratch as a self-hosted assistant.**
  - Scripted answers in English and Arabic, written in advance and reviewed.
  - Runs entirely in the visitor's browser. Nothing typed is sent anywhere or stored.
  - Can hand over to a person by email or the contact form.
  - New Altiora logo and dark theme.
- Fixed the keyword routing so questions like "how much" go to the right answer. A 42-question test passed.

### Language switch

- **19:59: added an English/Arabic switch for the whole site.**
  - Arabic flips the layout to right-to-left.
  - The choice is remembered in the visitor's browser.
- Fixes made along the way:
  - Arabic in the monospace font broke apart, so Arabic now uses an Arabic-friendly font.
  - Aligned the phone menu correctly in Arabic.
  - Fixed a style clash that shrank the page.
  - Reworded the cookie text so it no longer says "switch to Arabic".
  - Removed a duplicate navigation script from the site head.
- **20:35: added Russian, Chinese (Simplified), Hindi and French**, making six languages in total.
  - A language chooser sits in the menu (globe button) and a language list in the footer.
  - Each language has suitable fonts.
  - Legal pages show a note that the English version prevails.
  - Verified on all ten pages × six languages × desktop and phone, with no errors.

### Enquiry pipeline (built, waiting on setup)

- **20:35:** wrote the Google Apps Script and setup guide so every form enquiry:
  - adds a row to a Google Sheet "Altiora AI – Clientele" in the business account (hello@altioraai.com), and
  - sends a short Telegram alert (summary only).
- The script also:
  - ignores duplicates,
  - keeps each enquiry's status and notes,
  - deletes enquiries older than 24 months unless marked "Client", as the Privacy notice promises.
- See 03 Open items: your setup steps are still to do.

### Altiora Labs card on the home page

- **20:39:** added an animation to the Altiora Labs card: a phone unlocking a door with a tick (Tessera). It was replaced on 17 Nov by Labs' own animation.

---

## 16 November 2026: Altiora Labs and the private Tessera showcase

**Goal:** add Altiora Labs as a menu item and page, and build a password-protected Tessera page to present to hotels.

- **06:36–07:05: Tessera showcase page built and tested** before going live.
  - **Hero:** "Tessera. The room is ready before you reach the door." An animated room powers on at check-in: AC cools from 31° to 22°, lights, curtains, and "Welcome, Layla" on the TV.
  - **"Not a card on a phone. A stay that runs itself.":** six Today vs With Tessera comparisons.
  - **Seven animated moments of a stay:**
    1. The hotel messages the guest on arrival day.
    2. Phone check-in, with ID approved by a person at the front desk.
    3. The room wakes up.
    4. One key in the phone's wallet for the lift, the room and the pool.
    5. Presence-based power with eco mode.
    6. Requests on WhatsApp in Arabic or English.
    7. Check-out in a tap.
  - **Hotel team view:** an illustrative dashboard.
  - **Principles:** works with what is there; a person approves; private by design; Arabic and English.
  - **Closing:** a call to action, and a confidentiality notice.
  - **Present mode:**
    - a full-screen 10-slide walkthrough for meetings,
    - arrow keys, swipe and Esc to exit,
    - works on a phone held sideways.
  - English only; excluded from the language switch.
- **Altiora Labs page (/labs):**
  - "Products we build and own", with a Tessera project card and a "View private preview" button.
  - "How Labs works" in three steps, and "More in the lab".
  - Translated into all six languages.
- **Menu:** "Altiora Labs" added after "AI compared" on every page, including phone menus and the password page.
- **Home page:** the Labs card now links to /labs. Its wording changed from "a mobile room key" to "a new guest experience for hotels", in all languages.
- **Password page:** branded as "Private preview", with a note on how to ask for access.
- **Alto:** its Tessera answer now describes the guest experience and links to /labs.
- **Translation files:** updated twice (versions 3 and 4) to add the Labs page text.
- **07:05: published.** The Tessera page was kept as an unpublished draft so it could not go live before it had a password.
- **07:14: fixed a Webflow warning.** The Labs and Tessera pages were missing schema markup; added it.
- **Owner action:** you set the Tessera password and published. Checked: /tessera now asks for a password (HTTP 401).
- **07:25: Tessera room animation improved** after your feedback:
  - redrew the bed (headboard, wooden frame, bedding), the bedside table and a rug,
  - curtains now gather to the sides instead of sliding as blocks,
  - fixed an empty band under the animation in Present mode on wide screens; scenes now keep their exact shape.
  - Published, and the password still applies.

---

## 17 November 2026: Recall, unique product looks, and logs

- **17:46–18:45: Alto now knows about Recall.**
  - New Recall answer in English and Arabic: a daily app for memory and focus, about six minutes a day, a free beta for the web and Android with 100 places, and "a training app, not a medical product".
  - Questions about memory, focus, brain training or the beta go to the Recall answer.
  - Tested with your question "I want to get recall" on the live site.
  - "What will you build?" now names both Labs products. Tessera is no longer called "the first product".
- **Recall added to the website.**
  - A Recall card on the Labs page with a "Join the free beta" button (an email to hello@altioraai.com for now).
  - The Labs intro and "How Labs works" were reworded so they no longer assume every product is for hotels.
  - The home Labs card now reads "Recall, a daily app for memory and focus, and Tessera, a new guest experience for hotels."
  - The Labs page search description and schema were updated.
  - Translation files version 5.
  - Published and checked byte for byte against the live site.
- **18:59–19:03: beta Join/Request switch planned.**
  - Read Recall's database without touching any personal data. Found that Recall already enforces a beta limit, set to 105, with 8 people joined.
  - Wrote a brief for the Recall app session (see 03 Briefs and Handovers).
  - Messaging that session directly was blocked by an account setting, so you were given the message to paste.
- **19:05: Altiora Labs card on the home page got its own animation.**
  - A lab flask where Altiora's circuit tree grows, bubbles rise, and a gold and a green product tile appear above it.
  - Tessera keeps its phone-and-door animation, and Recall has its own.
- **19:13: Recall card restyled in Recall's own look.**
  - Navy, blue and gold, sampled from Recall's real app icon, with Recall's icon beside its name.
  - Its animation now lights up the icon's rising path, bottom to top.
  - Tessera stays in the Altiora palette until it has its own brand.
  - Allowed the project's cloud environment to read Recall's web app (altiora-recall.expo.app) so the real icon and colours could be used. You approved this.
- **19:20: logs and decisions written to Google Drive** (this folder).
