const fs = require('fs');
const path = require('path');

const DATA_PATH = path.join(__dirname, '..', 'assets', 'js', 'data.js');

function parseDataset() {
  const raw = fs.readFileSync(DATA_PATH, 'utf8');
  const jsonReady = raw
    .replace(/^window\.CHARITY_DATA\s*=\s*/m, '')
    .trim()
    .replace(/;\s*$/, '');
  const charities = JSON.parse(jsonReady);
  return normalize(charities);
}

function normalize(charities) {
  return charities.map(c => ({
    ...c,
    program_expense_ratio: Number(c.program_expense_ratio || 0),
    admin_expense_ratio: Number(c.admin_expense_ratio || 0),
    fundraising_expense_ratio: Number(c.fundraising_expense_ratio || 0),
    trust_score: Number(c.trust_score || 0),
    transparency_score: Number(c.transparency_score || 0),
    annual_revenue: Number(c.annual_revenue || 0),
    year: Number(c.year || 0),
    primary_cause: c.primary_cause || 'Unknown',
    country: c.country || 'Unknown',
    operating_regions: Array.isArray(c.operating_regions) ? c.operating_regions : []
  }));
}

function buildIndexes(charities) {
  const causeIndex = {};
  const countryIndex = {};

  charities.forEach(c => {
    if (!(c.primary_cause in causeIndex)) {
      causeIndex[c.primary_cause] = Object.keys(causeIndex).length;
    }
    if (!(c.country in countryIndex)) {
      countryIndex[c.country] = Object.keys(countryIndex).length;
    }
  });

  return { causeIndex, countryIndex };
}

module.exports = {
  parseDataset,
  buildIndexes,
};
