# Holiday Island's Future

A plain-language, resident-built website explaining the transition of city services (roads, water, sewer, fire, public safety, parks & recreation) from the Holiday Island Suburban Improvement District (HISID) to the City of Holiday Island, Arkansas.

The site's foundation is the **September 22, 2026 City/HISID Long Range Plan**, endorsed by the City Council and the HISID Board of Commissioners. Detailed cost estimates that the plan does not restate come from two earlier public feasibility presentations by Mayor Kees (May and July 2026) and are labeled on the site as earlier feasibility-study estimates.

This is an independent community education project, not an official publication of the City or HISID.

This is a plain static site: HTML and CSS only, with no build step and no framework. It deploys through GitHub Pages from the root of `main`.

## Previewing locally

Every page works by simply double-clicking the `.html` file and opening it in a browser — there's no fetch-based include or build step to worry about.

No page currently loads any JavaScript. If you ever add features that need a local server (e.g. testing `fetch()` calls), run one from the repo root, for example `python -m http.server 8000`, then browse to `http://localhost:8000/`.

## Project structure

```
index.html, why-transition.html, long-range-plan.html, budget-today.html,
services.html, public-safety.html, funding.html, growth-plan.html,
tax-comparison.html, timeline.html, faq.html,
about-this-site.html
                                     — the 12 site pages
favicon.svg
assets/css/base.css                 — design tokens, reset, typography
assets/css/components.css           — nav, cards, tables, callouts, bar charts,
                                       phase timeline, status badges, assessment flow
assets/fonts/                       — self-hosted Montserrat & Source Serif 4 (variable fonts, no CDN)
docs/sources/                       — extracted text of the source documents, for fact-checking
```

The header navigation and footer are repeated by hand in every page. When adding a page, add its link to the `<nav>` and footer of all of them.

## Editorial conventions

- **Three kinds of content, kept visibly separate:** official facts (cited to the Long Range Plan or another official source), independent analysis, and the author's recommendations. Analysis and recommendations are labeled where they appear.
- **Status badges** (`.badge--decided`, `.badge--planned`, `.badge--condition`, `.badge--future`) mark how settled each phase or revenue source is.
- **Source labels** (`<p class="source-note">`) sit under major financial and timeline claims.
- **Numbered citations.** Mark a figure with `<sup class="cite" data-src="lrp"></sup>` (one or more source keys), then run `perl tools/build-citations.pl *.html` from the repo root. The script numbers the citations and rebuilds each page's "Sources cited on this page" list. Source keys and their links live at the top of that script.
- **Don't overstate certainty.** The plan calls itself "not a binding contract but rather a good faith projection." Prefer "planned," "expected," "would," and "not yet determined" unless an official source states an exact fact.
- **Current vs. assumed rates.** The City levies 4 mills today; 5 mills is the plan's planning assumption. The 2.5% sales tax is a proposed ballot measure until voters approve it.
- **No personal records.** Never publish real tax or parcel records.

## Visual theme

The palette (forest green + gold), typography (bold uppercase Montserrat headings/nav, Source Serif 4 body), and header/footer layout deliberately echo [holidayisland.us](https://holidayisland.us/), the HISID community site — so this project reads as visually part of the same community, not a jarring outside site. The logo mark is an original pine-tree/sun design inspired by, but not copied from, HISID's actual (trademarked) logo.

## Updating figures

When the plan, a budget, or a rate changes, search the HTML pages for the old figures and update the matching prose; figures are hand-written on each page. Update the "Last updated" line in the footer of every page at the same time.

## Sources

- **Primary:** City of Holiday Island & HISID *Long Range Plan*, September 22, 2026 (Resolution 2026-015). Linked from the "View Long Range Plan" button on [cityofholidayisland.com](https://www.cityofholidayisland.com/). Extracted text: `docs/sources/long-range-plan-2026-09-22.txt`.
- **Earlier (historical):** *"Can the City Do It All?" — A Feasibility Study*, presented May 2, 2026 (updated May 6, 2026).
- **Earlier (historical):** *"The Future Holiday Island — Session 2: Protecting Our Citizens"*, presented July 11, 2026 (revised July 13, 2026).

The two presentation PDFs are in the repo root; their extracted text is in `docs/sources/`.
