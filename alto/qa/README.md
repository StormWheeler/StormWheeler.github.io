# Site check: run after every change

Every change to altioraai.com ends with a full site check, before the change is reported as done. Decided 17 Nov 2026, after a fix on one page broke the look of another.

## How to run

```
node alto/qa/site-check.js <output-folder>
```

It takes about four minutes. It writes `report.txt`, `report.json`, and a full-page screenshot of every page at every size into the output folder.

## What it covers

- **Pages:** all 10 public pages, the password page (/tessera, expected 401) and the 404 page.
- **Sizes:** phone (390 px), small phone (360 px), tablet (768 px), desktop (1366 px), plus Arabic on phone.
- **Checks on every page and size:**
  - the page loads with the right status; no script errors or failed requests
  - no sideways scrolling, and nothing sticking out past the screen edge
  - button text centred in its button
  - no clipped text
  - no text drawn on top of other text (for example a menu over the page)
  - no text too faint to read against its background (contrast below 2:1)
  - no menu links squeezed onto two lines
  - no broken images
- **Whole site:**
  - every internal link works
  - the live head code, footer code, home page animations and Labs band, and Labs page match the copies in this repository

## After the automated check

Look through the phone screenshots, and the Arabic ones, for anything a script cannot judge: wrong colours, mirrored graphics, awkward spacing, wording. Fix, publish, and run the check again until it reports 0 issues.

## Network note

The cloud environment must allow `webflow-files-prod.global.ssl.fastly.net` (site fonts) and `assets.calendly.com`. Otherwise the screenshots use fallback fonts and the report lists failed requests that visitors never see.
