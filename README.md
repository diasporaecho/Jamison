# Agnes Jamison — Teaching Abroad Guide

A static, mobile-friendly website comparing Greece, Italy, Thailand, the UAE, Spain, Portugal, Mexico and Panama for a licensed U.S. teacher. Research date: **November 8, 2026**.

No backend, database or API key. It runs on GitHub Pages as plain HTML, CSS and JavaScript.

## Files

```
index.html          Page structure and the written guide sections
assets/data.js      ALL facts, numbers, schools, links and sources (edit this to update)
assets/app.js       Rendering, filters, calculator, checklist, print view
assets/styles.css   Design (light and dark themes, print styles)
.nojekyll           Tells GitHub Pages to serve files as-is
```

## Deploy on GitHub Pages (about 5 minutes)

1. Sign in to GitHub and click **New repository**. Name it, for example, `teaching-abroad-guide`. Choose **Public** (free GitHub Pages needs a public repo on free accounts).
2. On the new repo page, click **uploading an existing file**. Drag in `index.html`, `README.md`, `.nojekyll` and the whole `assets` folder (keep the folder name). Click **Commit changes**.
   - If `.nojekyll` does not upload because it is hidden, create it: **Add file → Create new file**, name it `.nojekyll`, leave it empty, commit.
3. Go to **Settings → Pages**. Under **Build and deployment**, set **Source** to *Deploy from a branch*, **Branch** to `main` and folder `/ (root)`. Click **Save**.
4. Wait 1–2 minutes and refresh. The live address appears at the top of the Pages screen, in the form `https://YOUR-USERNAME.github.io/teaching-abroad-guide/`.

Using the command line instead:

```bash
cd agnes-site
git init && git add . && git commit -m "Teaching abroad guide"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/teaching-abroad-guide.git
git push -u origin main
```
Then do step 3 above.

## Updating the research

Everything numeric lives in `assets/data.js`. Edit it in GitHub's web editor (pencil icon) and commit; the site updates in a minute or two.

- **Research date:** change `RESEARCH_DATE` at the top.
- **Exchange rates:** change `FX` (units of local currency per 1 USD) and `FX_DATE`. Free official source: the European Central Bank or Banque de France daily reference rates.
- **Salaries:** edit the `PAY` list. Use `lo`/`hi` numbers in local currency and `per: "mo"` or `"yr"`. Add a source id in `src`.
- **Budgets:** each country has a `budget` block (USD per month). The modest and higher-comfort tiers are calculated from it automatically.
- **Representative offers:** each country's `salary` block feeds the scenario table, the calculator presets and the final recommendation.
- **Upfront costs:** each country's `upfront` block feeds the "money needed before the first paycheck" table.
- **Schools and links:** each country's `schools` list. Set `urlType` honestly (for example "Official careers page (verified)" or "Official site (not verified)") and update `opening` when you confirm a live vacancy, with the date.
- **Visas and residency:** each country's `visas` and `residency` blocks.
- **Rankings:** each country's `scores.job` and `scores.indep` (1–5). Criteria and weights are in `CRITERIA`.
- **Sources:** add to `SOURCES` with a new id (for example `s70`), then reference it in any `src: ["s70"]`. Numbering on the page updates automatically.
- **Checklist:** edit `CHECKLIST`. Ticks are saved by item position, so reordering items can move existing ticks.

Re-check before relying on anything: visa income thresholds change every January, advisory levels change without notice, and school vacancies change weekly.

## Privacy

The site is public. Do not add passport numbers, exact savings, account details, contact information or health details. Budget figures are scenarios. Checklist ticks and calculator inputs are stored only in the visitor's own browser (localStorage) and are never sent anywhere.

## Features

- Country filter (top bar) and teaching-role filter (Teaching Abroad section)
- Ranking table with two tracks: moving with a teaching job, or on independent income
- Budget and savings calculator with employer housing/insurance toggles and an upfront-cost breakdown
- Relocation checklist saved in the browser
- Mobile menu, light and dark themes
- "Print view" button plus print styles (use your browser's Print command on the live GitHub Pages site)

## Disclaimer

General information only, not legal, tax or immigration advice. Confirm requirements with official authorities or licensed professionals.
