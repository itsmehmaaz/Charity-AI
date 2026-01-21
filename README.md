# CharityAI

> AI-powered charity recommendation engine matching donors with 50 elite global charities using machine learning and data-driven efficiency metrics.

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Version](https://img.shields.io/badge/Version-3.0-green.svg)](https://github.com)

## Features

- **ML-Powered Matching** - Linear regression model with user alignment scoring (+10% cause match, +8% location match)
- **50 Elite Charities** - Curated database with trust scores 61-100, program efficiency 71-99%
- **AI Chat Assistant** - Context-aware responses for deep charity analysis
- **Donor DNA Profiling** - Persona assessment for personalized recommendations
- **Impact Projections** - Calculate real donation outcomes based on expense ratios
- **Admin Portal** - Database management with JSON upload/reset
- **Backend API** - Express.js REST endpoints for recommendations and feedback


## Quick Start

### Frontend Only
```bash
# Clone and open in browser
git clone https://github.com/yourusername/Charity-AI.git
cd Charity-AI
start index.html  # or 'open' on Mac, 'xdg-open' on Linux
```

### With Backend API (Optional)
```bash
npm install
npm start  # Starts server on http://localhost:4000
```

**API Endpoints:**
- `GET /api/health` - Server status
- `GET /api/charities` - All 50 charities
- `POST /api/recommendations` - Get personalized rankings
- `POST /api/feedback` - Submit feedback to improve model


## Data Structure

**Charity Object:**
```javascript
{
  "id": "uuid",
  "name": "Charity Name",
  "country": "Primary Country",
  "operating_regions": ["Country1", "Country2"],
  "primary_cause": "Health|Education|Poverty|...",
  "program_expense_ratio": 0.862,
  "admin_expense_ratio": 0.083,
  "fundraising_expense_ratio": 0.055,
  "transparency_score": 95,
  "trust_score": 95,
  "annual_revenue": 31251466,
  "year": 2024,
  "official_website": "https://example.org"
}
```

**Database Stats:**
- 50 elite charities across 15+ countries
- Trust scores: 61-100 (avg 75.1)
- Program efficiency: 71.4-99.0% (avg 84.2%)
- Revenue range: $11.2M-$95.2M


## ML Model

**Architecture:** Linear regression with gradient descent
- 300 epochs, adaptive learning rate (0.05 → decay 0.985)
- Features: Trust score, program/admin/fundraising ratios, revenue, cause, country
- One-hot encoding for categorical features
- Loss: MSE, weights persist to `server/model-state.json`

**Scoring:**
```javascript
score = (ML_prediction + cause_match*0.1 + location_match*0.08 + persona*0.02) * 100
// Clamped to 5-99 range
```


## Admin Panel

Access at `admin.html` with password `123123`
- Upload JSON to update charity database
- Changes persist in LocalStorage
- Reset to restore default dataset


## Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/NewFeature`)
3. Commit changes (`git commit -m 'Add NewFeature'`)
4. Push to branch (`git push origin feature/NewFeature`)
5. Open Pull Request

**Requirements for new charities:**
- Complete financial ratios (must sum to 1.0)
- Valid scores (0-100)
- Verified website
- Historical data (3+ years)


## Tech Stack

- **Frontend:** HTML5, CSS3, Vanilla JavaScript
- **Backend:** Node.js + Express
- **ML:** Custom linear regression (no external libraries)
- **Design:** Material Design 3, Glassmorphism UI
- **Storage:** LocalStorage for admin overrides

## Data Sources

Methodologies from: GiveWell, Charity Navigator, GuideStar, BBB Wise Giving Alliance, GlobalGiving, IATI Standard. See [sources.html](sources.html) for details.

## License

MIT License - see [LICENSE](LICENSE)

---

**Version 3.0** | Updated Jan 21, 2026 | 50 Elite Charities | Custom ML Model

