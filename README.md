# Holiday Island's Future

A plain-language, resident-built website explaining the proposed transition of city services (water, sewer, roads, fire, public safety, parks & recreation) from the Holiday Island Suburban Improvement District (HISID) to the City of Holiday Island, Arkansas — built from two public presentations by Mayor Kees in 2026.

This is a plain static site: HTML, CSS, and vanilla JavaScript only, with no build step and no framework.

## Previewing locally

Every page works by simply double-clicking the `.html` file and opening it in a browser — there's no fetch-based include or build step to worry about.

The one exception is `calculator.html`, which loads `assets/js/data.js` and `assets/js/calculator.js` via `<script>` tags. These work fine over `file://` in every modern browser, so no local server is required either. If you ever add features that do need a local server (e.g. testing `fetch()` calls), run one from the repo root, for example `python -m http.server 8000`, then browse to `http://localhost:8000/`.

## Project structure

```
index.html, why-transition.html, budget-today.html, services.html,
public-safety.html, funding.html, growth-plan.html, calculator.html,
timeline.html, faq.html, about-this-site.html      — the 11 site pages
favicon.svg
assets/css/base.css                 — design tokens, reset, typography
assets/css/components.css           — nav, cards, tables, callouts, calculator widget
assets/js/data.js                   — single source of truth for every shared dollar figure
assets/js/calculator.js             — cost-impact calculator logic
assets/fonts/                       — self-hosted Montserrat & Source Serif 4 (variable fonts, no CDN)
docs/sources/                       — raw extracted text of the two source PDFs, for fact-checking
```

## Visual theme

The palette (forest green + gold), typography (bold uppercase Montserrat headings/nav, Source Serif 4 body), and header/footer layout deliberately echo [holidayisland.us](https://holidayisland.us/), the HISID community site — so this project reads as visually part of the same community, not a jarring outside site. The logo mark is an original pine-tree/sun design inspired by, but not copied from, HISID's actual (trademarked) logo.

## Updating figures

If the feasibility study is revised (a "Session 3" is plausible), update the constants in `assets/js/data.js` first, then search the HTML pages for the old figures and update the matching prose — the calculator reads `data.js` directly, but the static prose on other pages is hand-written to match it and won't update automatically.

## Source presentations

- *"Can the City Do It All?" — A Feasibility Study*, presented May 2, 2026 (updated May 6, 2026).
- *"The Future Holiday Island — Session 2: Protecting Our Citizens"*, presented July 11, 2026 (revised July 13, 2026).

Both PDFs are in the repo root; their extracted text is in `docs/sources/`.
