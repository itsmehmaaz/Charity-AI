const fs = require('fs');
const path = require('path');

const MODEL_PATH = path.join(__dirname, 'model-state.json');

class LinearModel {
  constructor({ featureSize, causeIndex, countryIndex }) {
    this.featureSize = featureSize;
    this.causeIndex = causeIndex;
    this.countryIndex = countryIndex;
    this.state = this.load() || this.defaultState();
    if (!this.state.weights || this.state.weights.length !== featureSize) {
      this.state.weights = Array(featureSize).fill(0.01);
    }
  }

  defaultState() {
    return {
      version: 1,
      weights: [],
      lastLoss: null,
    };
  }

  load() {
    if (!fs.existsSync(MODEL_PATH)) return null;
    try {
      return JSON.parse(fs.readFileSync(MODEL_PATH, 'utf8'));
    } catch (err) {
      console.warn('Model state unreadable, resetting', err);
      return null;
    }
  }

  save() {
    fs.writeFileSync(MODEL_PATH, JSON.stringify(this.state, null, 2), 'utf8');
  }

  // Synthetic target built from trustworthy fields
  target(charity) {
    const safe = (v, def = 0) => Number.isFinite(Number(v)) ? Number(v) : def;
    const repAvg = Array.isArray(charity.historical_reputation) && charity.historical_reputation.length
      ? charity.historical_reputation.reduce((s, r) => s + safe(r.reputation_score, 75), 0) / charity.historical_reputation.length
      : 75;
    const t = safe(charity.trust_score, 0) / 100;
    const p = safe(charity.program_expense_ratio, 0);
    const transparency = safe(charity.transparency_score, 0) / 100;
    const adminGood = 1 - safe(charity.admin_expense_ratio, 0);
    const fundraisingGood = 1 - safe(charity.fundraising_expense_ratio, 0);

    const score = 0.35 * t + 0.3 * p + 0.1 * transparency + 0.15 * adminGood + 0.05 * fundraisingGood + 0.05 * (repAvg / 100);
    return Math.max(0, Math.min(1, score));
  }

  buildFeatures(charity) {
    const safe = (v, def = 0) => Number.isFinite(Number(v)) ? Number(v) : def;
    const features = [];
    // Core numeric features
    features.push(1); // bias
    features.push(safe(charity.trust_score, 0) / 100);
    features.push(safe(charity.transparency_score, 0) / 100);
    features.push(safe(charity.program_expense_ratio, 0));
    features.push(1 - safe(charity.admin_expense_ratio, 0));
    features.push(1 - safe(charity.fundraising_expense_ratio, 0));
    const revenue = Math.max(1, safe(charity.annual_revenue, 1));
    features.push(Math.log10(revenue) / 10);
    features.push((safe(charity.year, 2024) - 2020) / 10);

    // Cause one-hot
    const causeVector = Array(Object.keys(this.causeIndex).length).fill(0);
    if (charity.primary_cause in this.causeIndex) {
      causeVector[this.causeIndex[charity.primary_cause]] = 1;
    }
    features.push(...causeVector);

    // Country one-hot
    const countryVector = Array(Object.keys(this.countryIndex).length).fill(0);
    if (charity.country in this.countryIndex) {
      countryVector[this.countryIndex[charity.country]] = 1;
    }
    features.push(...countryVector);

    return features;
  }

  predict(features) {
    const w = this.state.weights;
    let sum = 0;
    for (let i = 0; i < features.length; i++) sum += features[i] * w[i];
    return sum;
  }

  train(charities, opts = {}) {
    const lr = opts.lr || 0.01;
    const epochs = opts.epochs || 200;
    const decay = opts.decay || 0.98;

    const featureRows = charities.map(c => this.buildFeatures(c));
    const targets = charities.map(c => this.target(c));

    for (let epoch = 0; epoch < epochs; epoch++) {
      let loss = 0;
      const grads = Array(this.featureSize).fill(0);

      for (let i = 0; i < featureRows.length; i++) {
        const y = targets[i];
        const yHat = this.predict(featureRows[i]);
        const err = yHat - y;
        if (!Number.isFinite(err)) continue; // skip bad rows defensively
        loss += err * err;
        for (let j = 0; j < this.featureSize; j++) {
          grads[j] += err * featureRows[i][j];
        }
      }

      // Mean loss
      loss = loss / featureRows.length;
      const step = lr * Math.pow(decay, epoch) / featureRows.length;
      for (let j = 0; j < this.featureSize; j++) {
        this.state.weights[j] -= step * grads[j];
      }

      if ((epoch + 1) % 50 === 0 || epoch === epochs - 1) {
        this.state.lastLoss = loss;
      }
    }

    this.state.version += 1;
    this.save();
    return { loss: this.state.lastLoss, version: this.state.version };
  }

  nudge(charity, outcome = 'positive', magnitude = 0.02) {
    const sign = outcome === 'positive' ? -1 : 1; // reduce error for positive, increase for negative to re-train toward target
    const feat = this.buildFeatures(charity);
    for (let i = 0; i < this.featureSize; i++) {
      this.state.weights[i] += sign * magnitude * feat[i];
    }
    this.state.version += 1;
    this.save();
    return { version: this.state.version };
  }
}

module.exports = { LinearModel };
