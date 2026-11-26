// NusaStat data: published national statistics for Indonesia.
// Every figure carries its source and year. Figures are rounded from the
// publishing body's releases: BPS (Statistics Indonesia), Bank Indonesia
// and the World Bank. Amounts in rupiah are nominal unless marked real.
export const COUNTRY = {
  name: 'Indonesia',
  nameId: 'Republik Indonesia',
  capital: 'Jakarta (Ibu Kota Nusantara under construction)',
  currency: 'Rupiah (IDR)',
  updated: '26 November 2026',
};

export const YEARS = [2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024];

// Real GDP growth, % year on year (BPS).
export const GDP_GROWTH = [4.88, 5.03, 5.07, 5.17, 5.02, -2.07, 3.70, 5.31, 5.05, 5.03];
// Nominal GDP, trillion rupiah (BPS).
export const GDP_NOMINAL = [11526, 12401, 13590, 14838, 15834, 15443, 16977, 19589, 20892, 22139];
// Mid-year population, millions (BPS).
export const POPULATION = [255.6, 258.7, 261.9, 265.0, 268.1, 271.3, 274.0, 276.4, 279.0, 281.6];
// Consumer price inflation, % December on December (BPS).
export const INFLATION = [3.35, 3.02, 3.61, 3.13, 2.72, 1.68, 1.87, 5.51, 2.61, 1.57];
// Open unemployment rate, % August (BPS).
export const UNEMPLOYMENT = [6.18, 5.61, 5.50, 5.34, 5.28, 7.07, 6.49, 5.86, 5.32, 4.91];
// Poverty rate, % September (BPS).
export const POVERTY = [11.13, 10.86, 10.64, 9.82, 9.22, 10.19, 9.71, 9.57, 9.36, 8.57];
// Exports and imports of goods, US$ billion (BPS).
export const EXPORTS = [150.4, 144.4, 168.8, 180.2, 167.7, 163.2, 231.6, 291.9, 258.8, 264.7];
export const IMPORTS = [142.7, 135.7, 156.9, 188.6, 171.3, 141.6, 196.2, 237.4, 221.9, 233.7];

// Headline indicators shown on the overview page.
export const HEADLINES = [
  { label: 'Population', value: '281.6 million', detail: 'Mid-year estimate, 2024', source: 'BPS', change: '+0.9% on 2023', good: true },
  { label: 'GDP', value: 'Rp 22,139 trillion', detail: 'Nominal, 2024 · about US$ 1.40 trillion', source: 'BPS', change: '+5.03% real growth', good: true },
  { label: 'GDP per capita', value: 'Rp 78.6 million', detail: 'About US$ 4,980, 2024', source: 'BPS', change: '+4.0% on 2023', good: true },
  { label: 'Inflation', value: '1.57%', detail: 'December 2024, year on year', source: 'BPS', change: 'Down from 2.61% in 2023', good: true },
  { label: 'Unemployment', value: '4.91%', detail: 'Open unemployment, August 2024', source: 'BPS', change: 'Down from 5.32%', good: true },
  { label: 'Poverty rate', value: '8.57%', detail: '24.06 million people, September 2024', source: 'BPS', change: 'Lowest on record', good: true },
  { label: 'Exports', value: 'US$ 264.7 bn', detail: 'Goods exports, 2024', source: 'BPS', change: 'Trade surplus US$ 31.0 bn', good: true },
  { label: 'Life expectancy', value: '74.2 years', detail: 'At birth, 2024', source: 'BPS', change: 'Up from 73.9 in 2023', good: true },
];

// Age structure, 2024, % of population (BPS).
export const AGE_GROUPS = [
  { group: '0–4', share: 8.1 },
  { group: '5–9', share: 8.4 },
  { group: '10–14', share: 8.5 },
  { group: '15–19', share: 8.4 },
  { group: '20–24', share: 8.3 },
  { group: '25–29', share: 8.1 },
  { group: '30–34', share: 7.9 },
  { group: '35–39', share: 7.6 },
  { group: '40–44', share: 7.0 },
  { group: '45–49', share: 6.3 },
  { group: '50–54', share: 5.5 },
  { group: '55–59', share: 4.7 },
  { group: '60–64', share: 3.9 },
  { group: '65+', share: 7.3 },
];

// GDP by sector, % share of nominal GDP, 2024 (BPS).
export const GDP_SECTORS = [
  { sector: 'Manufacturing', share: 18.98 },
  { sector: 'Wholesale & retail trade', share: 12.89 },
  { sector: 'Agriculture, forestry & fishing', share: 12.10 },
  { sector: 'Mining & quarrying', share: 9.82 },
  { sector: 'Construction', share: 9.71 },
  { sector: 'Transport & storage', share: 5.03 },
  { sector: 'Information & communication', share: 4.41 },
  { sector: 'Finance & insurance', share: 4.20 },
  { sector: 'Public administration', share: 4.06 },
  { sector: 'Real estate', share: 2.71 },
  { sector: 'Accommodation & food', share: 2.62 },
  { sector: 'Other services', share: 13.47 },
];

// Employment by sector, % of workers, August 2024 (BPS).
export const JOBS_SECTORS = [
  { sector: 'Agriculture, forestry & fishing', share: 28.6 },
  { sector: 'Wholesale & retail trade', share: 19.4 },
  { sector: 'Manufacturing', share: 13.8 },
  { sector: 'Construction', share: 8.0 },
  { sector: 'Accommodation & food service', share: 6.9 },
  { sector: 'Transport & storage', share: 4.6 },
  { sector: 'Education', share: 4.2 },
  { sector: 'Public administration', share: 3.7 },
  { sector: 'Other services', share: 10.8 },
];

// Provinces: population 2024 (millions), density (people/km²), GRDP share %.
// BPS mid-year estimates; GRDP shares are 2024 nominal shares.
export const PROVINCES = [
  { name: 'West Java', pop: 50.35, density: 1428, grdp: 14.6, capital: 'Bandung' },
  { name: 'East Java', pop: 41.81, density: 873, grdp: 14.4, capital: 'Surabaya' },
  { name: 'Central Java', pop: 37.89, density: 1162, grdp: 8.4, capital: 'Semarang' },
  { name: 'North Sumatra', pop: 16.36, density: 224, grdp: 4.7, capital: 'Medan' },
  { name: 'Banten', pop: 12.43, density: 1287, grdp: 3.5, capital: 'Serang' },
  { name: 'Jakarta', pop: 10.68, density: 16113, grdp: 16.9, capital: 'Jakarta' },
  { name: 'South Sulawesi', pop: 9.49, density: 203, grdp: 3.3, capital: 'Makassar' },
  { name: 'Lampung', pop: 9.42, density: 272, grdp: 1.7, capital: 'Bandar Lampung' },
  { name: 'South Sumatra', pop: 9.06, density: 99, grdp: 2.6, capital: 'Palembang' },
  { name: 'Riau', pop: 7.01, density: 81, grdp: 4.1, capital: 'Pekanbaru' },
  { name: 'West Sumatra', pop: 5.98, density: 142, grdp: 1.4, capital: 'Padang' },
  { name: 'East Kalimantan', pop: 4.00, density: 31, grdp: 3.9, capital: 'Samarinda' },
  { name: 'Aceh', pop: 5.60, density: 96, grdp: 1.0, capital: 'Banda Aceh' },
  { name: 'Bali', pop: 4.41, density: 763, grdp: 1.3, capital: 'Denpasar' },
  { name: 'Papua', pop: 1.20, density: 4, grdp: 0.7, capital: 'Jayapura' },
];

// Health and education indicators.
export const HEALTH_EDU = [
  { indicator: 'Human Development Index', value: '75.02', unit: 'index 0–100', year: 2024, source: 'BPS' },
  { indicator: 'Life expectancy at birth', value: '74.15', unit: 'years', year: 2024, source: 'BPS' },
  { indicator: 'Infant mortality rate', value: '16.9', unit: 'deaths per 1,000 live births', year: 2024, source: 'BPS / World Bank est.' },
  { indicator: 'Stunting among children under 5', value: '19.8%', unit: 'of children under 5', year: 2024, source: 'Ministry of Health (SSGI)' },
  { indicator: 'Hospital beds', value: '1.2', unit: 'per 1,000 people', year: 2023, source: 'World Bank' },
  { indicator: 'Physicians', value: '0.7', unit: 'per 1,000 people', year: 2023, source: 'World Bank' },
  { indicator: 'Adult literacy (age 15+)', value: '96.0%', unit: 'of adults', year: 2024, source: 'BPS' },
  { indicator: 'Mean years of schooling', value: '9.0', unit: 'years', year: 2024, source: 'BPS' },
  { indicator: 'Net enrolment, primary school', value: '97.9%', unit: 'of children aged 7–12', year: 2024, source: 'BPS' },
  { indicator: 'Net enrolment, junior secondary', value: '81.4%', unit: 'of children aged 13–15', year: 2024, source: 'BPS' },
  { indicator: 'Net enrolment, senior secondary', value: '64.6%', unit: 'of children aged 16–18', year: 2024, source: 'BPS' },
  { indicator: 'Gross enrolment, tertiary', value: '31.5%', unit: 'of the 19–23 age group', year: 2024, source: 'BPS' },
];

// Macro indicator table for the economy page.
export const MACRO_TABLE = [
  { indicator: 'Real GDP growth', unit: '% yoy', values: [4.88, 5.03, 5.07, 5.17, 5.02, -2.07, 3.70, 5.31, 5.05, 5.03] },
  { indicator: 'Nominal GDP', unit: 'Rp trillion', values: [11526, 12401, 13590, 14838, 15834, 15443, 16977, 19589, 20892, 22139] },
  { indicator: 'Inflation (Dec yoy)', unit: '%', values: [3.35, 3.02, 3.61, 3.13, 2.72, 1.68, 1.87, 5.51, 2.61, 1.57] },
  { indicator: 'Unemployment (Aug)', unit: '%', values: [6.18, 5.61, 5.50, 5.34, 5.28, 7.07, 6.49, 5.86, 5.32, 4.91] },
  { indicator: 'Poverty rate (Sep)', unit: '%', values: [11.13, 10.86, 10.64, 9.82, 9.22, 10.19, 9.71, 9.57, 9.36, 8.57] },
  { indicator: 'Exports of goods', unit: 'US$ bn', values: [150.4, 144.4, 168.8, 180.2, 167.7, 163.2, 231.6, 291.9, 258.8, 264.7] },
  { indicator: 'Imports of goods', unit: 'US$ bn', values: [142.7, 135.7, 156.9, 188.6, 171.3, 141.6, 196.2, 237.4, 221.9, 233.7] },
  { indicator: 'Trade balance', unit: 'US$ bn', values: [7.7, 8.7, 11.9, -8.4, -3.6, 21.6, 35.4, 54.5, 36.9, 31.0] },
  { indicator: 'Rupiah per US$ (avg)', unit: 'IDR', values: [13391, 13308, 13381, 14236, 14148, 14577, 14310, 14875, 15236, 15883] },
  { indicator: 'Policy rate (BI-Rate, Dec)', unit: '%', values: [7.50, 4.75, 4.25, 6.00, 5.00, 3.75, 3.50, 5.50, 6.00, 6.00] },
];

// Latest statistical releases.
export const RELEASES = [
  { date: '5 Nov 2026', title: 'GDP grew 5.03% in Q3 2026', body: 'Real GDP rose 5.03% year on year in the third quarter, led by household consumption and investment.', source: 'BPS' },
  { date: '3 Nov 2026', title: 'Inflation eased to 2.1% in October', body: 'Consumer prices rose 2.1% year on year in October 2026, inside Bank Indonesia’s 1.5–3.5% target band.', source: 'BPS' },
  { date: '15 Oct 2026', title: 'Exports reached US$ 24.8 billion in September', body: 'Goods exports rose 6.4% year on year in September 2026; the trade surplus stood at US$ 3.9 billion.', source: 'BPS' },
  { date: '5 Sep 2026', title: 'Unemployment at 4.8% in August 2026', body: 'The open unemployment rate fell to 4.8% in August 2026, with 3.1 million new jobs added over the year.', source: 'BPS' },
  { date: '15 Jul 2026', title: 'Poverty fell to 8.3% in March 2026', body: 'The poverty rate eased to 8.3% in March 2026, the lowest level since records began.', source: 'BPS' },
];

// Flat indicator list for the data explorer (searchable).
export const INDICATORS = [
  ...HEADLINES.map((h) => ({ name: h.label, value: h.value, unit: h.detail, year: 2024, category: 'Overview', source: h.source })),
  ...HEALTH_EDU.map((h) => ({ name: h.indicator, value: h.value, unit: h.unit, year: h.year, category: 'Health & education', source: h.source })),
  { name: 'Gini ratio', value: '0.379', unit: 'index 0–1', year: 2024, category: 'Economy', source: 'BPS' },
  { name: 'Foreign exchange reserves', value: 'US$ 155.7 bn', unit: 'US dollars', year: 2024, category: 'Economy', source: 'Bank Indonesia' },
  { name: 'Government debt', value: '39.0%', unit: 'of GDP', year: 2024, category: 'Economy', source: 'Ministry of Finance' },
  { name: 'Current account balance', value: '-0.6%', unit: 'of GDP', year: 2024, category: 'Economy', source: 'Bank Indonesia' },
  { name: 'Fertility rate', value: '2.0', unit: 'children per woman', year: 2024, category: 'Population', source: 'BPS' },
  { name: 'Urban population', value: '58.6%', unit: 'of total population', year: 2024, category: 'Population', source: 'World Bank' },
  { name: 'Median age', value: '31.2', unit: 'years', year: 2024, category: 'Population', source: 'BPS' },
  { name: 'Labour force participation', value: '70.3%', unit: 'of people aged 15+', year: 2024, category: 'Employment', source: 'BPS' },
  { name: 'Informal employment', value: '57.9%', unit: 'of workers', year: 2024, category: 'Employment', source: 'BPS' },
  { name: 'Minimum wage, Jakarta', value: 'Rp 5,396,761', unit: 'per month', year: 2025, category: 'Employment', source: 'Jakarta provincial government' },
  { name: 'Internet users', value: '79.5%', unit: 'of population', year: 2024, category: 'Society', source: 'APJII / BPS' },
  { name: 'Electricity access', value: '99.7%', unit: 'of households', year: 2024, category: 'Society', source: 'Ministry of Energy' },
  { name: 'Forest cover', value: '49.8%', unit: 'of land area', year: 2023, category: 'Environment', source: 'Ministry of Environment' },
  { name: 'Renewable energy share', value: '18.5%', unit: 'of primary energy', year: 2024, category: 'Environment', source: 'Ministry of Energy' },
];
