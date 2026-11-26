// views.js — one render function per page of the site. Each returns HTML
// for the main content area; main.js mounts it and calls drawPageCharts()
// after mount so canvases have layout size.
import {
  AGE_GROUPS, COUNTRY, EXPORTS, GDP_GROWTH, GDP_NOMINAL, GDP_SECTORS,
  HEADLINES, HEALTH_EDU, IMPORTS, INFLATION, JOBS_SECTORS, MACRO_TABLE,
  POPULATION, POVERTY, PROVINCES, RELEASES, UNEMPLOYMENT, YEARS,
} from './data.js';

function sourceNote(source, year) {
  return `<p class="source">Source: ${source} · ${year}</p>`;
}

function kpiCards() {
  return `<div class="kpi-grid">${HEADLINES.map((h) => `
    <article class="kpi">
      <h3>${h.label}</h3>
      <p class="kpi-value">${h.value}</p>
      <p class="kpi-detail">${h.detail}</p>
      <p class="kpi-change ${h.good ? 'good' : ''}">${h.change}</p>
      <p class="kpi-source">Source: ${h.source}</p>
    </article>`).join('')}</div>`;
}

export function viewOverview() {
  return `
  <section class="hero">
    <p class="eyebrow">Official statistics · ${COUNTRY.name}</p>
    <h1>Indonesia in numbers</h1>
    <p class="lede">Population, economy, jobs, health and education — the figures a
    visitor needs, each with its source and year, kept up to date from
    Statistics Indonesia (BPS), Bank Indonesia and the World Bank.</p>
    <p class="hero-links"><a class="btn" href="#/economy">Explore the economy</a>
    <a class="btn ghost" href="#/data">Search all indicators</a></p>
  </section>
  ${kpiCards()}
  <div class="grid-2">
    <section class="card chart-card">
      <h2>Real GDP growth, 2015–2024</h2>
      <p class="card-sub">Percent change year on year. The 2020 bar is the pandemic contraction.</p>
      <div class="chart-wrap"><canvas id="chart-gdp" height="260" role="img" aria-label="Bar chart of real GDP growth 2015 to 2024"></canvas></div>
      ${sourceNote('BPS', '2024')}
      <p><a href="#/economy">Full economy page →</a></p>
    </section>
    <section class="card chart-card">
      <h2>Population, 2015–2024</h2>
      <p class="card-sub">Mid-year population in millions — 281.6 million people in 2024.</p>
      <div class="chart-wrap"><canvas id="chart-pop" height="260" role="img" aria-label="Line chart of population 2015 to 2024"></canvas></div>
      ${sourceNote('BPS', '2024')}
      <p><a href="#/population">Population and regions →</a></p>
    </section>
  </div>
  <section class="card">
    <h2>Latest releases</h2>
    <ul class="releases">${RELEASES.map((r) => `
      <li><time>${r.date}</time><div><strong>${r.title}</strong><p>${r.body}</p><span class="source">Source: ${r.source}</span></div></li>`).join('')}
    </ul>
  </section>`;
}

export function viewEconomy() {
  return `
  <section class="page-head">
    <h1>Economy</h1>
    <p class="lede">Growth, prices, trade and the structure of the economy — ten years of
    headline macroeconomics for Indonesia, all from BPS unless noted.</p>
    <div class="range" role="group" aria-label="Chart year range">
      <span>Chart range:</span>
      <button data-range="5" class="range-btn">Last 5 years</button>
      <button data-range="10" class="range-btn active">All 10 years</button>
    </div>
  </section>
  <div class="grid-2">
    <section class="card chart-card">
      <h2>Real GDP growth</h2>
      <p class="card-sub">Percent, year on year.</p>
      <div class="chart-wrap"><canvas id="chart-gdp" height="260"></canvas></div>
      ${sourceNote('BPS', '2015–2024')}
    </section>
    <section class="card chart-card">
      <h2>Inflation</h2>
      <p class="card-sub">Consumer prices, December on December, percent.</p>
      <div class="chart-wrap"><canvas id="chart-inflation" height="260"></canvas></div>
      ${sourceNote('BPS', '2015–2024')}
    </section>
    <section class="card chart-card">
      <h2>Trade in goods</h2>
      <p class="card-sub">Exports and imports, US$ billion.</p>
      <div class="chart-wrap"><canvas id="chart-trade" height="260"></canvas></div>
      ${sourceNote('BPS', '2015–2024')}
    </section>
    <section class="card chart-card">
      <h2>What makes up GDP</h2>
      <p class="card-sub">Share of nominal GDP by sector, 2024.</p>
      <div class="chart-wrap"><canvas id="chart-sectors" height="260"></canvas></div>
      ${sourceNote('BPS', '2024')}
    </section>
  </div>
  <section class="card">
    <h2>Macroeconomic indicators, 2015–2024</h2>
    <p class="card-sub">Click a column heading to sort by that year. Figures as published; trade balance is exports minus imports.</p>
    <div class="table-scroll"><table class="data-table" id="macro-table">
      <thead><tr><th data-sort="0">Indicator</th><th data-sort="1">Unit</th>${YEARS.map((y, i) => `<th data-sort="${i + 2}">${y}</th>`).join('')}</tr></thead>
      <tbody>${MACRO_TABLE.map((row) => `<tr><td>${row.indicator}</td><td>${row.unit}</td>${row.values.map((v) => `<td>${v.toLocaleString('en-US')}</td>`).join('')}</tr>`).join('')}</tbody>
    </table></div>
    ${sourceNote('BPS and Bank Indonesia', '2015–2024')}
  </section>`;
}

export function viewPopulation() {
  return `
  <section class="page-head">
    <h1>Population</h1>
    <p class="lede">281.6 million people in 2024 — the world's fourth-largest population,
    spread across 38 provinces and more than 17,000 islands.</p>
  </section>
  <div class="grid-2">
    <section class="card chart-card">
      <h2>Population growth</h2>
      <p class="card-sub">Mid-year population, millions, 2015–2024.</p>
      <div class="chart-wrap"><canvas id="chart-pop" height="260"></canvas></div>
      ${sourceNote('BPS', '2015–2024')}
    </section>
    <section class="card chart-card">
      <h2>Age structure, 2024</h2>
      <p class="card-sub">Share of the population in each age group. Median age 31.2 years.</p>
      <div class="chart-wrap"><canvas id="chart-age" height="260"></canvas></div>
      ${sourceNote('BPS', '2024')}
    </section>
  </div>
  <section class="card">
    <h2>Provinces by population</h2>
    <p class="card-sub">Type to filter the table. Click a column heading to sort.</p>
    <label class="filter-label">Search provinces
      <input type="search" id="province-search" placeholder="e.g. Java, Bali, Papua" autocomplete="off">
    </label>
    <div class="table-scroll"><table class="data-table" id="province-table">
      <thead><tr><th data-sort="0">Province</th><th data-sort="1">Capital</th><th data-sort="2">Population 2024 (m)</th><th data-sort="3">Density (per km²)</th><th data-sort="4">Share of GDP (%)</th></tr></thead>
      <tbody>${PROVINCES.map((p) => `<tr><td>${p.name}</td><td>${p.capital}</td><td>${p.pop.toFixed(2)}</td><td>${p.density.toLocaleString('en-US')}</td><td>${p.grdp.toFixed(1)}</td></tr>`).join('')}</tbody>
    </table></div>
    <p id="province-count" class="table-note">${PROVINCES.length} of ${PROVINCES.length} provinces shown</p>
    ${sourceNote('BPS', '2024')}
    <p><a href="#/regions">Open the full regions explorer →</a></p>
  </section>`;
}

export function viewEmployment() {
  return `
  <section class="page-head">
    <h1>Employment</h1>
    <p class="lede">4.91% of the labour force was unemployed in August 2024 — the lowest
    rate in the series — while 57.9% of workers were in informal jobs.</p>
  </section>
  <div class="grid-2">
    <section class="card chart-card">
      <h2>Unemployment rate</h2>
      <p class="card-sub">Open unemployment, August each year, percent. 2020 is the pandemic peak.</p>
      <div class="chart-wrap"><canvas id="chart-unemp" height="260"></canvas></div>
      ${sourceNote('BPS', '2015–2024')}
    </section>
    <section class="card chart-card">
      <h2>Poverty rate</h2>
      <p class="card-sub">Share of people below the poverty line, September each year, percent.</p>
      <div class="chart-wrap"><canvas id="chart-poverty" height="260"></canvas></div>
      ${sourceNote('BPS', '2015–2024')}
    </section>
  </div>
  <section class="card chart-card">
    <h2>Where people work</h2>
    <p class="card-sub">Share of all workers by sector, August 2024.</p>
    <div class="chart-wrap"><canvas id="chart-jobs" height="300"></canvas></div>
    ${sourceNote('BPS', 'August 2024')}
  </section>
  <section class="card">
    <h2>Labour market in brief</h2>
    <dl class="facts">
      <div><dt>Labour force</dt><dd>152.1 million people (Aug 2024)</dd></div>
      <div><dt>Labour force participation</dt><dd>70.3% of people aged 15 and over</dd></div>
      <div><dt>Unemployed</dt><dd>7.47 million people</dd></div>
      <div><dt>Informal workers</dt><dd>57.9% of all workers</dd></div>
      <div><dt>Average monthly wage</dt><dd>Rp 3.27 million (Aug 2024)</dd></div>
      <div><dt>Minimum wage, Jakarta</dt><dd>Rp 5,396,761 per month (2025)</dd></div>
    </dl>
    ${sourceNote('BPS and Jakarta provincial government', '2024–2025')}
  </section>`;
}

export function viewHealthEdu() {
  return `
  <section class="page-head">
    <h1>Health &amp; education</h1>
    <p class="lede">Life expectancy reached 74.2 years in 2024 and the Human Development
    Index 75.02 — both the highest on record — while stunting fell below 20%.</p>
  </section>
  <section class="card">
    <h2>Health and education indicators</h2>
    <p class="card-sub">Use the buttons to show one group at a time.</p>
    <div class="range" role="group" aria-label="Indicator group">
      <button data-group="all" class="range-btn active">All</button>
      <button data-group="health" class="range-btn">Health</button>
      <button data-group="education" class="range-btn">Education</button>
    </div>
    <div class="table-scroll"><table class="data-table" id="health-table">
      <thead><tr><th>Indicator</th><th>Value</th><th>Unit</th><th>Year</th><th>Source</th></tr></thead>
      <tbody>${HEALTH_EDU.map((h, i) => `<tr data-group="${i < 6 ? 'health' : 'education'}"><td>${h.indicator}</td><td><strong>${h.value}</strong></td><td>${h.unit}</td><td>${h.year}</td><td>${h.source}</td></tr>`).join('')}</tbody>
    </table></div>
  </section>
  <div class="grid-2">
    <section class="card">
      <h2>What has improved</h2>
      <ul class="bullets">
        <li><strong>Life expectancy</strong> rose from 71.7 years (2015) to 74.2 years (2024).</li>
        <li><strong>Stunting</strong> among under-5s fell from 37.2% (2013) to 19.8% (2024).</li>
        <li><strong>Mean years of schooling</strong> rose from 8.3 years (2015) to 9.0 years (2024).</li>
        <li><strong>Infant mortality</strong> fell from 22.9 per 1,000 (2015) to 16.9 (2024).</li>
      </ul>
      ${sourceNote('BPS, Ministry of Health and World Bank', '2015–2024')}
    </section>
    <section class="card">
      <h2>Still to watch</h2>
      <ul class="bullets">
        <li><strong>Doctors:</strong> 0.7 per 1,000 people — below the 1.0 benchmark many countries aim for.</li>
        <li><strong>Senior secondary enrolment:</strong> 64.6% — a third of teenagers are not in school.</li>
        <li><strong>Stunting:</strong> still 19.8% of young children, concentrated in eastern provinces.</li>
      </ul>
      ${sourceNote('BPS and World Bank', '2023–2024')}
    </section>
  </div>`;
}

export function viewRegions() {
  return `
  <section class="page-head">
    <h1>Regions</h1>
    <p class="lede">Java holds 55% of the population on 7% of the land. Pick a province
    below to see its figures, or search and sort the table.</p>
  </section>
  <section class="card">
    <h2>Province explorer</h2>
    <label class="filter-label">Search provinces
      <input type="search" id="region-search" placeholder="e.g. Sumatra, Kalimantan, Sulawesi" autocomplete="off">
    </label>
    <div class="table-scroll"><table class="data-table" id="region-table">
      <thead><tr><th data-sort="0">Province</th><th data-sort="1">Capital</th><th data-sort="2">Population 2024 (m)</th><th data-sort="3">Density (per km²)</th><th data-sort="4">Share of GDP (%)</th></tr></thead>
      <tbody>${PROVINCES.map((p, i) => `<tr data-index="${i}"><td><button class="linklike" data-province="${i}">${p.name}</button></td><td>${p.capital}</td><td>${p.pop.toFixed(2)}</td><td>${p.density.toLocaleString('en-US')}</td><td>${p.grdp.toFixed(1)}</td></tr>`).join('')}</tbody>
    </table></div>
    <p id="region-count" class="table-note">${PROVINCES.length} of ${PROVINCES.length} provinces shown</p>
  </section>
  <section class="card" id="province-detail" aria-live="polite">
    <h2>Province detail</h2>
    <p class="card-sub">Select a province from the table above.</p>
    <div id="province-detail-body"><p>Click a province name to see its population, density, share of national GDP and its share of the national population.</p></div>
  </section>`;
}

export function viewData() {
  return `
  <section class="page-head">
    <h1>Data explorer</h1>
    <p class="lede">Every headline figure on this site in one searchable list. Filter by
    topic, search by name, and download the list as a CSV file.</p>
  </section>
  <section class="card">
    <div class="explorer-tools">
      <label class="filter-label grow">Search indicators
        <input type="search" id="indicator-search" placeholder="e.g. inflation, literacy, exports" autocomplete="off">
      </label>
      <label class="filter-label">Topic
        <select id="category-filter">
          <option value="">All topics</option>
          <option>Overview</option><option>Economy</option><option>Population</option>
          <option>Employment</option><option>Health &amp; education</option><option>Society</option><option>Environment</option>
        </select>
      </label>
      <button class="btn" id="download-csv" type="button">Download CSV</button>
    </div>
    <p id="indicator-count" class="table-note"></p>
    <div class="table-scroll"><table class="data-table" id="indicator-table">
      <thead><tr><th>Indicator</th><th>Value</th><th>Unit</th><th>Year</th><th>Topic</th><th>Source</th></tr></thead>
      <tbody id="indicator-body"></tbody>
    </table></div>
    <p class="source">Figures as published by the source named in each row. Rounding may make shares not sum to exactly 100%.</p>
  </section>`;
}

export function viewAbout() {
  return `
  <section class="page-head">
    <h1>About NusaStat</h1>
    <p class="lede">NusaStat is an independent, original statistics site for Indonesia. It
    is not affiliated with Statistics Indonesia (BPS), Bank Indonesia or the
    World Bank — it republishes their published figures with the source and
    year on every figure.</p>
  </section>
  <div class="grid-2">
    <section class="card">
      <h2>Sources</h2>
      <ul class="bullets">
        <li><strong>BPS — Statistics Indonesia</strong> (bps.go.id): population, GDP, inflation, unemployment, poverty, trade, education and health figures.</li>
        <li><strong>Bank Indonesia</strong> (bi.go.id): policy rate, foreign exchange reserves, current account.</li>
        <li><strong>Ministry of Finance</strong>: government debt.</li>
        <li><strong>Ministry of Health</strong>: stunting survey (SSGI) 2024.</li>
        <li><strong>World Bank</strong>: hospital beds, physicians, urban population.</li>
        <li><strong>APJII</strong>: internet users 2024.</li>
      </ul>
    </section>
    <section class="card">
      <h2>How to read the figures</h2>
      <ul class="bullets">
        <li>GDP growth is real (inflation-adjusted) unless the figure says nominal.</li>
        <li>Inflation is the consumer price index, December on December.</li>
        <li>Unemployment is the open unemployment rate for August each year.</li>
        <li>Poverty uses the national poverty line, measured each March and September.</li>
        <li>Provincial populations are BPS mid-year estimates for 2024.</li>
        <li>Figures are rounded; shares may not sum to exactly 100%.</li>
      </ul>
    </section>
  </div>
  <section class="card">
    <h2>About this site</h2>
    <p>NusaStat is a static site: plain HTML, CSS and JavaScript, no build step
    and no network request — every figure is in its own files. Charts are drawn
    with the site's own canvas code. The site works on a desktop and on a phone.</p>
    <p>Figures were last checked on ${COUNTRY.updated}. If a figure looks wrong,
    the source named beside it is the place to check first.</p>
  </section>`;
}

// Chart drawing per page, called after the page HTML is mounted.
export function drawPageCharts(route, rangeYears = 10) {
  const labels = rangeYears === 5 ? YEARS.slice(5) : YEARS;
  const slice = (arr) => (rangeYears === 5 ? arr.slice(5) : arr);
  return import('./charts.js').then(({ drawBarChart, drawLineChart, drawDonut, drawHorizontalBars }) => {
    const byId = (id) => document.getElementById(id);
    if (route === '/' || route === '/economy') {
      const gdp = byId('chart-gdp');
      if (gdp) drawBarChart(gdp, labels, slice(GDP_GROWTH), { format: (v) => `${v.toFixed(2)}%`, min: -3 });
    }
    if (route === '/' || route === '/population') {
      const pop = byId('chart-pop');
      if (pop) drawLineChart(pop, labels, slice(POPULATION), { format: (v) => `${v.toFixed(1)}m`, min: 240, max: 290 });
    }
    if (route === '/economy') {
      const inf = byId('chart-inflation');
      if (inf) drawLineChart(inf, labels, slice(INFLATION), { format: (v) => `${v.toFixed(2)}%`, min: 0, color: '#d97706' });
      const trade = byId('chart-trade');
      if (trade) drawBarChart(trade, labels, slice(EXPORTS), { format: (v) => `$${v.toFixed(0)}bn`, color: '#2563eb' });
      const sectors = byId('chart-sectors');
      if (sectors) drawDonut(sectors, GDP_SECTORS.slice(0, 8).map((s) => ({ label: s.sector, value: s.share })), { centre: '100%', centreSub: 'of GDP' });
    }
    if (route === '/population') {
      const age = byId('chart-age');
      if (age) drawHorizontalBars(age, AGE_GROUPS.map((a) => ({ label: a.group, value: a.share })), { labelWidth: 70 });
    }
    if (route === '/employment') {
      const unemp = byId('chart-unemp');
      if (unemp) drawLineChart(unemp, YEARS, UNEMPLOYMENT, { format: (v) => `${v.toFixed(2)}%`, min: 4, max: 8, color: '#dc2626' });
      const pov = byId('chart-poverty');
      if (pov) drawLineChart(pov, YEARS, POVERTY, { format: (v) => `${v.toFixed(2)}%`, min: 8, max: 12 });
      const jobs = byId('chart-jobs');
      if (jobs) drawHorizontalBars(jobs, JOBS_SECTORS.map((j) => ({ sector: j.sector, value: j.share })).map((j) => ({ label: j.sector, value: j.value })), { labelWidth: 190 });
    }
  });
}

export { EXPORTS, GDP_NOMINAL, IMPORTS, INFLATION };
