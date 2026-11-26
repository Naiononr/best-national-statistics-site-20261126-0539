// main.js — router and page behaviour for NusaStat.
// Hash routes: #/ overview, #/economy, #/population, #/employment,
// #/health-education, #/regions, #/data, #/about.
import { INDICATORS, PROVINCES } from './data.js';
import {
  drawPageCharts, viewAbout, viewData, viewEconomy, viewEmployment,
  viewHealthEdu, viewOverview, viewPopulation, viewRegions,
} from './views.js';

const ROUTES = {
  '/': { title: 'Indonesia in numbers', render: viewOverview },
  '/economy': { title: 'Economy', render: viewEconomy },
  '/population': { title: 'Population', render: viewPopulation },
  '/employment': { title: 'Employment', render: viewEmployment },
  '/health-education': { title: 'Health & education', render: viewHealthEdu },
  '/regions': { title: 'Regions', render: viewRegions },
  '/data': { title: 'Data explorer', render: viewData },
  '/about': { title: 'About', render: viewAbout },
};

const app = document.getElementById('app');
const navLinks = [...document.querySelectorAll('.nav-link')];
let chartRange = 10;

function currentRoute() {
  const hash = window.location.hash.replace(/^#/, '') || '/';
  return ROUTES[hash] ? hash : '/';
}

function render() {
  const route = currentRoute();
  const page = ROUTES[route];
  document.title = `${page.title} · NusaStat — Indonesia in numbers`;
  app.innerHTML = page.render();
  navLinks.forEach((a) => {
    const href = a.getAttribute('href');
    a.classList.toggle('active', href === `#${route}`);
    if (href === `#${route}`) a.setAttribute('aria-current', 'page');
    else a.removeAttribute('aria-current');
  });
  drawPageCharts(route, chartRange).catch((error) => {
    console.error('chart draw failed', error);
  });
  wirePage(route);
  window.scrollTo(0, 0);
}

// Sortable tables: click a <th data-sort> to sort that table by the column.
function makeSortable(table) {
  const headCells = [...table.querySelectorAll('th[data-sort]')];
  headCells.forEach((th) => {
    th.style.cursor = 'pointer';
    th.addEventListener('click', () => {
      const index = Number(th.dataset.sort);
      const body = table.querySelector('tbody');
      const rows = [...body.querySelectorAll('tr')];
      const ascending = th.dataset.dir !== 'asc';
      headCells.forEach((cell) => delete cell.dataset.dir);
      th.dataset.dir = ascending ? 'asc' : 'desc';
      const numeric = rows.every((row) => {
        const text = row.children[index].textContent.trim().replace(/,/g, '');
        return text !== '' && !Number.isNaN(Number(text));
      });
      rows.sort((a, b) => {
        const ta = a.children[index].textContent.trim();
        const tb = b.children[index].textContent.trim();
        const cmp = numeric
          ? Number(ta.replace(/,/g, '')) - Number(tb.replace(/,/g, ''))
          : ta.localeCompare(tb);
        return ascending ? cmp : -cmp;
      });
      body.append(...rows);
    });
  });
}

function filterRows(input, table, countEl, total, label) {
  const query = input.value.trim().toLowerCase();
  let shown = 0;
  table.querySelectorAll('tbody tr').forEach((row) => {
    const match = row.textContent.toLowerCase().includes(query);
    row.style.display = match ? '' : 'none';
    if (match) shown += 1;
  });
  if (countEl) countEl.textContent = `${shown} of ${total} ${label} shown`;
}

function showProvinceDetail(index) {
  const p = PROVINCES[index];
  const totalPop = PROVINCES.reduce((sum, prov) => sum + prov.pop, 0);
  const body = document.getElementById('province-detail-body');
  if (!body || !p) return;
  body.innerHTML = `
    <h3>${p.name}</h3>
    <dl class="facts">
      <div><dt>Capital</dt><dd>${p.capital}</dd></div>
      <div><dt>Population, 2024</dt><dd>${p.pop.toFixed(2)} million (${((p.pop / totalPop) * 100).toFixed(1)}% of Indonesia)</dd></div>
      <div><dt>Population density</dt><dd>${p.density.toLocaleString('en-US')} people per km²</dd></div>
      <div><dt>Share of national GDP</dt><dd>${p.grdp.toFixed(1)}%</dd></div>
    </dl>
    <p class="source">Source: BPS, 2024 mid-year estimates.</p>`;
  document.getElementById('province-detail').scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

function renderIndicators(filterText, category) {
  const body = document.getElementById('indicator-body');
  const count = document.getElementById('indicator-count');
  if (!body) return;
  const query = (filterText || '').trim().toLowerCase();
  const rows = INDICATORS.filter((item) => {
    const matchesText = !query || `${item.name} ${item.value} ${item.source}`.toLowerCase().includes(query);
    const matchesCategory = !category || item.category === category;
    return matchesText && matchesCategory;
  });
  body.innerHTML = rows.map((item) => `<tr><td>${item.name}</td><td><strong>${item.value}</strong></td><td>${item.unit}</td><td>${item.year}</td><td>${item.category}</td><td>${item.source}</td></tr>`).join('')
    || '<tr><td colspan="6">No indicators match that search. Try a different word.</td></tr>';
  if (count) count.textContent = `${rows.length} of ${INDICATORS.length} indicators shown`;
  return rows;
}

function downloadCsv(rows) {
  const header = 'Indicator,Value,Unit,Year,Topic,Source';
  const escape = (value) => `"${String(value).replace(/"/g, '""')}"`;
  const lines = rows.map((item) => [item.name, item.value, item.unit, item.year, item.category, item.source].map(escape).join(','));
  const blob = new Blob([[header, ...lines].join('\n')], { type: 'text/csv;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'nusastat-indicators.csv';
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

function wirePage(route) {
  document.querySelectorAll('.data-table').forEach(makeSortable);

  if (route === '/economy') {
    document.querySelectorAll('.range-btn[data-range]').forEach((button) => {
      button.addEventListener('click', () => {
        document.querySelectorAll('.range-btn[data-range]').forEach((b) => b.classList.remove('active'));
        button.classList.add('active');
        chartRange = Number(button.dataset.range);
        drawPageCharts(route, chartRange);
      });
    });
  }

  if (route === '/population') {
    const search = document.getElementById('province-search');
    const table = document.getElementById('province-table');
    const count = document.getElementById('province-count');
    if (search && table) search.addEventListener('input', () => filterRows(search, table, count, PROVINCES.length, 'provinces'));
  }

  if (route === '/health-education') {
    document.querySelectorAll('.range-btn[data-group]').forEach((button) => {
      button.addEventListener('click', () => {
        document.querySelectorAll('.range-btn[data-group]').forEach((b) => b.classList.remove('active'));
        button.classList.add('active');
        const group = button.dataset.group;
        document.querySelectorAll('#health-table tbody tr').forEach((row) => {
          row.style.display = group === 'all' || row.dataset.group === group ? '' : 'none';
        });
      });
    });
  }

  if (route === '/regions') {
    const search = document.getElementById('region-search');
    const table = document.getElementById('region-table');
    const count = document.getElementById('region-count');
    if (search && table) search.addEventListener('input', () => filterRows(search, table, count, PROVINCES.length, 'provinces'));
    table.querySelectorAll('[data-province]').forEach((button) => {
      button.addEventListener('click', () => showProvinceDetail(Number(button.dataset.province)));
    });
  }

  if (route === '/data') {
    const search = document.getElementById('indicator-search');
    const category = document.getElementById('category-filter');
    const apply = () => renderIndicators(search.value, category.value);
    search.addEventListener('input', apply);
    category.addEventListener('change', apply);
    const shown = renderIndicators('', '');
    document.getElementById('download-csv').addEventListener('click', () => {
      downloadCsv(renderIndicators(search.value, category.value) || shown);
    });
  }
}

document.getElementById('menu-toggle').addEventListener('click', () => {
  const nav = document.getElementById('main-nav');
  const open = nav.classList.toggle('open');
  document.getElementById('menu-toggle').setAttribute('aria-expanded', String(open));
});

window.addEventListener('hashchange', render);
render();
