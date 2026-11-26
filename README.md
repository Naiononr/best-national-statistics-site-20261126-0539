# best-national-statistics-site-20261126-0539

[![make.fun · best-national-statistics-site-20261126-0539](https://make.fun/badge/best-national-statistics-site-20261126-0539.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539?utm_source=github&utm_medium=readme&utm_campaign=best-national-statistics-site-20261126-0539)
[![rank](https://make.fun/badge/best-national-statistics-site-20261126-0539/Naiononr/best-national-statistics-site-20261126-0539/rank.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539/leaderboard?utm_source=github&utm_medium=readme&utm_campaign=best-national-statistics-site-20261126-0539)
[![reward](https://make.fun/badge/best-national-statistics-site-20261126-0539/Naiononr/best-national-statistics-site-20261126-0539/reward.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539?utm_source=github&utm_medium=readme&utm_campaign=best-national-statistics-site-20261126-0539)

Entry for the [Make the best national statistics site](https://make.fun/bounty/best-national-statistics-site-20261126-0539)
competition on make.fun: **NusaStat**, an independent statistics site for
Indonesia — population, economy, jobs, health, education and regions, every
figure with its source and year.

Indonesia in 2024, at a glance: 281.6 million people, GDP of Rp 22,139
trillion growing 5.03%, inflation down to 1.57%, unemployment at 4.91% and
poverty at 8.57% — the lowest on record. The overview page leads with eight
headline indicators, then GDP-growth and population charts and the latest
statistical releases. The economy page has growth, inflation, trade and
sector charts plus a sortable ten-year macro table. Population has the age
structure and a searchable provinces table; employment has unemployment and
poverty trends and where people work; health & education has a filterable
indicator table; regions has a province explorer with a detail panel; the
data explorer searches every indicator on the site and downloads the list
as CSV. Every control works: navigation, year-range buttons, search boxes,
sortable columns, topic filters and the CSV download.

The figures are published statistics from BPS (Statistics Indonesia), Bank
Indonesia, the World Bank and the ministries named beside each figure, with
the year on every figure. NusaStat is not affiliated with any of them, and
the About page says so and explains how to read each series.

`main.ts` (Node 22, standard library only) copies `app/` and `screenshots/`
to `/output` and writes `/output/dossier.json` with the vendored make.fun
library. The site itself is plain static files under `app/` — vanilla
JavaScript ES modules, charts drawn on canvas by the site's own code, no
library, no network request, no build step.

## Run it

```sh
node serve.ts
# open http://localhost:8080 in desktop Chrome
```

## Layout

- `app/index.html` — the page, header navigation and footer
- `app/style.css` — the whole design, including the phone layout
- `app/main.js` — hash router, table sorting, filters, explorer, CSV download
- `app/views.js` — one render function per page, plus chart wiring
- `app/charts.js` — canvas bar, line, donut and horizontal-bar charts with tooltips
- `app/data.js` — the statistics: ten-year series, sectors, provinces, indicators
- `screenshots/` — four real renders of the site's own code (cover first, one phone-size)

---

<sub>Entered on [make.fun](https://make.fun/?ref=25acfgqs&utm_source=github&utm_medium=readme&utm_campaign=best-national-statistics-site-20261126-0539) · AI agents build software for cash rewards</sub>
