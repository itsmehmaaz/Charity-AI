const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const { parseDataset, buildIndexes } = require('./data');
const { LinearModel } = require('./model');

const PORT = process.env.PORT || 4000;
const app = express();
app.use(cors());
app.use(express.json());

// --- Load data and prepare model ---
const charities = parseDataset();
const { causeIndex, countryIndex } = buildIndexes(charities);
const featureSize = 1 // bias
  + 6 // numeric features
  + Object.keys(causeIndex).length
  + Object.keys(countryIndex).length;

const model = new LinearModel({ featureSize, causeIndex, countryIndex });
const trained = model.train(charities, { lr: 0.05, epochs: 300, decay: 0.985 });
console.log('Model trained', trained);

function clamp(val, min, max) {
  return Math.min(max, Math.max(min, val));
}

function projectImpact(charity, amount) {
  const efficiency = charity.program_expense_ratio || 0.8;
  const netAid = amount * efficiency;
  const cause = (charity.primary_cause || '').toLowerCase();
  let metric = 'lives improved';
  let factor = 1.5;

  if (cause.includes('medical') || cause.includes('health')) {
    metric = 'medical treatments delivered';
    factor = 2.2;
  } else if (cause.includes('child') || cause.includes('education')) {
    metric = 'months of schooling funded';
    factor = 4.1;
  } else if (cause.includes('water')) {
    metric = 'years of clean water access provided';
    factor = 0.5;
  } else if (cause.includes('nutrition') || cause.includes('hunger')) {
    metric = 'nutritional meals provided';
    factor = 8.8;
  }

  return {
    netAid: Number(netAid.toFixed(2)),
    impactValue: Math.round(netAid * factor),
    metric,
  };
}

function scoreCharity(user, charity) {
  // Base prediction from the trained model
  const base = model.predict(model.buildFeatures(charity));

  // User alignment heuristics layered on top
  let bonus = 0;
  if (charity.primary_cause === user.cause) bonus += 0.1;
  if ((charity.operating_regions || []).includes(user.location) || charity.country === user.location) bonus += 0.08;

  const personaBoost = user.persona ? 0.02 : 0;
  const finalScore = clamp((base + bonus + personaBoost) * 100, 5, 99);
  return Math.round(finalScore);
}

function reasoning(user, charity, score) {
  return `${charity.name} scored ${score}% based on learned weights (trust, program efficiency, transparency) plus alignment with ${user.cause} in ${user.location}.`;
}

// --- Routes ---
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', charities: charities.length, modelVersion: model.state.version, lastLoss: model.state.lastLoss });
});

app.get('/api/charities', (req, res) => {
  res.json({ source: 'ml-backend', data: charities });
});

app.post('/api/recommendations', (req, res) => {
  const { name = 'Friend', location, cause, persona } = req.body || {};
  if (!location || !cause) return res.status(400).json({ error: 'location and cause are required' });

  const ranked = charities
    .map(c => {
      const s = scoreCharity({ name, location, cause, persona }, c);
      return { ...c, _aiScore: s, reasoning: reasoning({ name, location, cause }, c, s), projection: projectImpact(c, 1000) };
    })
    .sort((a, b) => b._aiScore - a._aiScore)
    .slice(0, 12);

  res.json({ results: ranked, meta: { count: ranked.length, modelVersion: model.state.version, lastLoss: model.state.lastLoss } });
});

app.post('/api/feedback', (req, res) => {
  const { charityId, outcome = 'positive' } = req.body || {};
  const charity = charities.find(c => c.id === charityId);
  if (!charity) return res.status(404).json({ error: 'charity not found' });
  if (!['positive', 'negative'].includes(outcome)) return res.status(400).json({ error: 'outcome must be positive|negative' });

  const updated = model.nudge(charity, outcome);
  res.json({ status: 'ok', modelVersion: updated.version });
});

app.listen(PORT, () => {
  console.log(`CharityAI ML backend running on http://localhost:${PORT}`);
});

