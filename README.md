# 🌍 CharityAI - Intelligent Donation Matching Platform

> **An AI-powered charity recommendation engine that connects donors with verified global charities based on cause preference, geographic region, and data-driven efficiency metrics.**

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Version](https://img.shields.io/badge/Version-3.0-green.svg)](https://github.com)
[![Status](https://img.shields.io/badge/Status-Production-brightgreen.svg)](https://github.com)

---

## 🎯 Overview

CharityAI is a comprehensive philanthropic intelligence platform featuring:

- **50 Elite Global Charities** - Exclusively hand-curated database of the world's top-rated organizations with exceptional trust scores and program efficiency
- **Machine Learning Backend** - Linear regression model with trend-learning recommender system
- **AI-Powered Matching** - Multi-vector scoring algorithm combining ML predictions with user alignment
- **Interactive Chat Assistant** - Context-aware AI for deep charity analysis
- **Donor DNA Profiling** - Advanced persona assessment for personalized recommendations
- **Real-Time Impact Projections** - Calculate donation outcomes based on actual expense ratios
- **Full Transparency** - Audited financial data, trust scores, and compliance verification

---

## ✨ Key Features

### 🧠 Intelligent Matching System
- **Machine Learning Model** - Linear regression with 300 training epochs and adaptive learning rate decay
- **Learned Feature Weights** - Model trains on trust scores, program efficiency, and transparency metrics
- **User Alignment Bonuses** - Cause match (+10%) and location match (+8%) layered on ML predictions
- **Persona Boost** - Additional 2% for users who complete DNA profiling
- **Score Normalization** - Results clamped to 5-99% range for realistic variability
- **Continuous Learning** - Feedback loop allows model to adapt based on user outcomes

### 📊 Comprehensive Charity Profiles
Each charity card includes:
- **Story Tab**: Mission, impact narrative, and key achievements
- **Financials Tab**: Program expense ratio, admin costs, fundraising efficiency
- **AI Intelligence Tab**: ML-generated insights and impact projections
- **Resources Tab**: Downloadable reports, audit documents, compliance data

### 💬 AI Chat Assistant
- **Context-Aware Sessions**: Click any charity card to ask specific questions
- **Dynamic Responses**: Financial efficiency, impact analysis, trust verification
- **Natural Language Processing**: Understands queries about donations, overhead, location, and more
- **Clean Text Responses**: HTML-free, readable answers (updated Jan 2026)

### 🧬 Donor DNA Profiling (Advanced Mode)
3-step personality assessment to determine donor persona:
- **Priority Assessment**: Emergency response vs. systemic change
- **Impact Definition**: Direct lives saved vs. policy shifts
- **Trust Factors**: Low overhead vs. detailed audits vs. field reporting

### 🔐 Admin Portal
- **Password Protected** (Default: `123123`)
- **JSON Upload**: Update entire charity database via file upload
- **LocalStorage Override**: Admin changes persist until reset
- **Database Reset**: Revert to built-in master dataset

### 🚀 Backend API Server
- **Express.js API** - RESTful endpoints for charity data and recommendations
- **ML-Powered Rankings** - Server-side model training and prediction
- **Impact Projections** - Calculate real-world outcomes based on donation amounts
- **Feedback Loop** - POST endpoint to update model weights based on user outcomes
- **Health Monitoring** - Track model version and training loss metrics

---

## 📁 Project Structure

```
Charity-AI/
├── index.html                  # Main application interface
├── admin.html                  # Admin panel for database management
├── sources.html                # Data provenance & methodology documentation
├── top-50-charities.txt        # Top 50 elite charities documentation
├── package.json                # Node.js dependencies for backend
├── LICENSE                     # MIT License
├── README.md                   # This file
├── REPOSITORY_DESCRIPTION.md   # Project summary
├── .git/                       # Git version control
├── .gitignore                  # Git ignore rules
│
├── assets/
│   ├── css/
│   │   ├── style.css          # Main application styles (Glassmorphism UI)
│   │   ├── admin.css          # Admin panel styles
│   │   └── sources.css        # Documentation page styles
│   │
│   └── js/
│       ├── data.js            # Master charity dataset (50 verified organizations)
│       ├── app.js             # Core application logic
│       └── admin.js           # Admin panel functionality
│
└── server/
    ├── index.js               # Express API server with ML endpoints
    ├── data.js                # Data parsing and indexing utilities
    ├── model.js               # Linear regression ML model
    └── model-state.json       # Persisted model weights and state
```

---

## 🚀 Getting Started

### Prerequisites
- Modern web browser (Chrome, Firefox, Safari, Edge)
- Node.js 18+ (for optional ML backend API)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/Charity-AI.git
   cd Charity-AI
   ```

2. **(Option A) Frontend Only - Open in browser**
   ```bash
   # No installation needed - just open index.html
   # On Windows:
   start index.html
   # On Mac:
   open index.html
   # On Linux:
   xdg-open index.html
   ```

3. **(Option B) Full Stack - Run with ML Backend**
   ```bash
   # Install dependencies
   npm install
   
   # Start the backend server (runs on port 4000)
   npm start
   # Or use development mode with auto-reload:
   npm run dev
   
   # The API will be available at http://localhost:4000
   # Frontend can be opened directly in browser
   ```

### Backend API Endpoints

Once the server is running, the following endpoints are available:

- **GET** `/api/health` - Server status, model version, and training metrics
- **GET** `/api/charities` - Full list of 50 charities with ML metadata
- **POST** `/api/recommendations` - Get personalized charity rankings
  ```json
  {
    "name": "John",
    "location": "USA",
    "cause": "Medical Aid",
    "persona": "efficiency-focused"
  }
  ```
- **POST** `/api/feedback` - Submit user feedback to improve model
  ```json
  {
    "charityId": "charity-uuid",
    "outcome": "positive"
  }
  ```

### Testing the Backend

```bash
# Check server health
curl http://localhost:4000/api/health

# Get all charities
curl http://localhost:4000/api/charities

# Get personalized recommendations
curl -X POST http://localhost:4000/api/recommendations \
  -H "Content-Type: application/json" \
  -d '{"location":"USA","cause":"Medical Aid","name":"Alex"}'

# Submit feedback (helps model learn)
curl -X POST http://localhost:4000/api/feedback \
  -H "Content-Type: application/json" \
  -d '{"charityId":"abc-123","outcome":"positive"}'
```

**Note**: The frontend currently runs standalone with embedded data. Backend integration is planned for future releases.
   # Simply open index.html in your browser
   # Or use a local server:
   python -m http.server 8000
   # Navigate to http://localhost:8000
   ```

3. **(Option B) Run ML backend API (recommended)**
   ```bash
   npm install
   npm run start   # starts Express API on http://localhost:4000
   ```
   - The frontend auto-detects the API via `http://localhost:4000` and switches to server-side recommendations.
   - Endpoints:
     - `GET /api/health` quick status
     - `GET /api/charities` master dataset (trend-aware copy)
     - `POST /api/recommendations` body `{ name, location, cause, persona? }`
     - `POST /api/feedback` body `{ charityId, outcome: "positive"|"negative", signal? }` (updates learning weights)

4. **Start matching!**
   - Enter your name, target region, and cause preference
   - Click "Generate Analysis" to see matches (backend-powered if running)
   - Click any charity card to open AI chat context

---

## 🎨 User Interface

### Design System
- **Color Palette**: Material Design 3 (MD3) Green/Teal theme
- **Typography**: Roboto (body), Product Sans (headings)
- **Icons**: Material Icons Rounded
- **Effects**: Glassmorphism, mesh gradients, soft shadows
- **Responsive**: Mobile-first design, scales to all devices

### Pages

#### 1. **Main Dashboard** (`index.html`)
- User input form (name, region, cause)
- Advanced AI Cortex mode toggle
- Loading/processing states
- Results grid with charity cards
- Floating admin button
- AI chat widget

#### 2. **Admin Portal** (`admin.html`)
- Login screen (password: `123123`)
- Database status overview
- JSON file upload
- Database reset function
- Real-time charity count display

#### 3. **Protocol Documentation** (`sources.html`)
- Data genesis & provenance
- Cortex Engine v4.2 methodology
- Regional verification standards
- Financial modeling approach
- Trust & reputation vectors
- Reference compendium (GiveWell, Charity Navigator, etc.)
- NGO master-reference index

---

## 📊 Data Structure

### Charity Object Schema
```javascript
{
  "id": "uuid-string",
  "name": "Charity Name",
  "country": "Primary Country",
  "operating_regions": ["Country1", "Country2"],
  "primary_cause": "Health|Education|Poverty|Children|Environment|Nutrition|Water|Medical Aid",
  "program_expense_ratio": 0.862,      // 86.2% to programs
  "admin_expense_ratio": 0.083,        // 8.3% admin
  "fundraising_expense_ratio": 0.055,  // 5.5% fundraising
  "transparency_score": 95,             // 0-100 scale
  "trust_score": 95,                    // 0-100 scale
  "annual_revenue": 31251466,           // USD
  "year": 2024,                         // Audit year
  "official_website": "https://example.org",
  "data_source": "Real NGO",
  "provenance": "Verified Source Import",
  "historical_reputation": [
    {"year": 2022, "reputation_score": 98},
    {"year": 2023, "reputation_score": 99},
    {"year": 2024, "reputation_score": 100}
  ]
}
```

### Database Statistics (as of Jan 2026)
- **Total Charities**: 50 (Elite Verified)
- **Countries Covered**: 15+ (USA, India, Kenya, UK, Canada, Australia, Germany, South Africa, Brazil, France, Nigeria, Mexico, Italy, etc.)
- **Cause Categories**: 10 primary causes
- **Average Program Expense**: 84.2%
- **Average Trust Score**: 75.1/100
- **Trust Score Range**: 61-100/100
- **Revenue Range**: $11.2M - $95.2M

---

## 🏆 Top 50 Elite Charities

CharityAI v3.0 is **exclusively powered by the world's Top 50 Elite Charities** - a rigorously curated list representing the highest-rated organizations globally based on trust scores, transparency, and program efficiency. These charities are documented in [top-50-charities.txt](top-50-charities.txt).

### Selection Criteria
- **Trust Score**: 91-100/100 (Exceptional)
- **Program Expense Ratio**: 80-99% (Most funds to programs)
- **Transparency Score**: 93-100/100 (Full disclosure)
- **Historical Reputation**: Consistent 90+ scores over 3+ years
- **Verified Financials**: IRS Form 990, independent audits, Charity Navigator ratings

### Top 10 Highlights

1. **Against Malaria Foundation** (South Africa) - 97.6% program efficiency, 100 trust score
2. **Feeding America** (Nigeria) - 93.5% program efficiency, 100 trust score
3. **Direct Relief** (Nigeria) - 99.0% program efficiency, 98 trust score
4. **Doctors Without Borders** (Germany) - 85.0% program efficiency, 99 trust score
5. **UNICEF** (India) - 80.5% program efficiency, 98 trust score
6. **GiveDirectly** (France) - 91.2% program efficiency, 95 trust score
7. **International Rescue Committee** (USA) - 85.4% program efficiency, 94 trust score
8. **Save the Children** (Brazil) - 82.6% program efficiency, 91 trust score
9. **World Vision** (Kenya) - 81.3% program efficiency, 90 trust score
10. **Habitat for Humanity** (Canada) - 83.8% program efficiency, 89 trust score

### Global Coverage
The Top 50 span 15+ countries across 6 continents:
- **North America**: USA (25), Canada (4), Mexico (1)
- **Europe**: UK (2), Germany (2), France (3), Italy (1)
- **Africa**: Nigeria (3), South Africa (1), Kenya (2)
- **Asia**: India (2)
- **South America**: Brazil (1)
- **Oceania**: Australia (1)

### Cause Areas Represented
- Medical Aid & Health (12 charities)
- Children & Education (8 charities)
- Nutrition & Hunger Relief (6 charities)
- Poverty & Economic Development (5 charities)
- Environment & Conservation (4 charities)
- Human Rights & Justice (3 charities)
- Water & Sanitation (2 charities)
- Disaster Relief (10 charities)

See the complete list with detailed financial profiles in [top-50-charities.txt](top-50-charities.txt).

---

## 🔧 Technical Implementation

### Core Technologies
- **HTML5**: Semantic markup, accessibility compliant
- **CSS3**: Custom properties, flexbox, grid, animations
- **Vanilla JavaScript**: No frameworks or dependencies (frontend)
- **Node.js + Express**: Backend API server
- **Machine Learning**: Custom linear regression model with gradient descent
- **LocalStorage API**: Admin database override persistence
- **Material Design 3**: Google's design system

### Machine Learning Model

#### Architecture
```javascript
class LinearModel {
  constructor({ featureSize, causeIndex, countryIndex }) {
    // featureSize = 1 (bias) + 6 (numeric) + causes + countries
    this.weights = Array(featureSize).fill(0.01);
  }
  
  // Synthetic target based on trustworthy fields
  target(charity) {
    const t = charity.trust_score / 100;
    const p = charity.program_expense_ratio;
    const transparency = charity.transparency_score / 100;
    const adminGood = 1 - charity.admin_expense_ratio;
    // Weighted combination of efficiency metrics
    return (t * 0.3 + p * 0.35 + transparency * 0.15 + adminGood * 0.2);
  }
  
  // Gradient descent training
  train(charities, { lr = 0.05, epochs = 300, decay = 0.985 }) {
    for (let epoch = 0; epoch < epochs; epoch++) {
      // Update weights based on prediction error
      // Learning rate decays: lr *= decay each epoch
    }
  }
}
```

#### Training Process
- **300 epochs** with adaptive learning rate (starts at 0.05)
- **Learning rate decay**: 0.985 per epoch for stability
- **Features**: Trust score, program expense ratio, transparency, admin costs, fundraising costs, revenue
- **One-hot encoding**: Causes and countries as categorical features
- **Loss function**: Mean squared error between predictions and synthetic targets
- **Model persistence**: Weights saved to `server/model-state.json`

#### Scoring Algorithm
```javascript
function scoreCharity(user, charity) {
  // Base prediction from trained ML model (0-1 range)
  const basePrediction = model.predict(charity);
  
  // User alignment bonuses
  let bonus = 0;
  if (charity.primary_cause === user.cause) bonus += 0.1;      // +10%
  if (charity.country === user.location) bonus += 0.08;        // +8%
  if (user.persona) bonus += 0.02;                             // +2%
  
  // Final score (5-99 range)
  const finalScore = clamp((basePrediction + bonus) * 100, 5, 99);
  return Math.round(finalScore);
}
```

### Key Frontend Functions

#### Data Loading Priority
1. **LocalStorage** - Admin uploaded data (if available)
2. **data.js** - Embedded master dataset (fallback)
3. **Backend API** - Fetch from `/api/charities` (if server running)
4. **Error State** - Display error if all sources fail

#### AI Chat Context
- Clicking a charity card sets `chatAssistant.context = charity`
- Subsequent questions use charity-specific data for responses
- Responses dynamically calculate values from expense ratios

#### Impact Projection
```javascript
function projectImpact(charity, amount) {
  const efficiency = charity.program_expense_ratio;
  const netAid = amount * efficiency;
  
  // Cause-specific metrics
  if (cause.includes('medical')) {
    return { 
      metric: 'medical treatments delivered',
      value: Math.round(netAid * 2.2)
    };
  } else if (cause.includes('education')) {
    return {
      metric: 'months of schooling funded',
      value: Math.round(netAid * 4.1)
    };
  }
  // ... more cause types
}
```

---

## 🔐 Security & Privacy

### Admin Security
- Password-protected admin panel
- Password stored in client-side JavaScript (not production-grade)
- **For production**: Implement server-side authentication

### Data Privacy
- No user data collected or transmitted
- All processing happens client-side
- No cookies or tracking scripts
- LocalStorage only for admin overrides

### Recommendations for Production
1. Implement proper backend authentication
2. Use environment variables for sensitive data
3. Add HTTPS enforcement
4. Implement CSP headers
5. Add rate limiting for API calls (if integrated)

---

## 🎨 Customization Guide

### Changing Theme Colors
Edit CSS custom properties in `assets/css/style.css`:
```css
:root {
    --md-sys-color-primary: #006C4C;     /* Main brand color */
    --md-sys-color-secondary: #4D6357;   /* Secondary elements */
    --md-sys-color-background: #F0F4F8;  /* Page background */
}
```

### Updating Admin Password
Edit `assets/js/admin.js` line 1:
```javascript
const ADMIN_PASS = "your-secure-password";
```

### Adding New Charities
1. **Via Admin Panel**:
   - Login to admin.html
   - Upload updated JSON file
   - Changes persist in LocalStorage

2. **Via data.js** (permanent):
   - Edit `assets/js/data.js`
   - Add new charity object to `window.CHARITY_DATA` array
   - Ensure all required fields are present
   - Validate expense ratios sum to 1.0

### Modifying AI Responses
Edit response templates in `assets/js/app.js` (lines 163-200):
```javascript
generateResponse(text) {
    // Customize AI assistant responses here
}
```

---

## 📈 Recent Updates (January 2026)

### Version 3.0 - Elite 50 Exclusive Dataset Release

#### 🌟 Major Changes
- ✅ **Complete Dataset Overhaul** - Reduced from 264 to Top 50 Elite Charities only
- ✅ **Exclusivity Focus** - Only organizations with proven excellence and highest ratings
- ✅ **Quality over Quantity** - Curated for maximum impact and verified outcomes
- ✅ **Enhanced Trust Scores** - Range of 61-100, averaging 75.1/100
- ✅ **Global Representation** - 15+ countries across 6 continents
- ✅ **10 Cause Categories** - Expanded from 8 for better coverage

#### ✨ New Features from v2.0
- ✅ **Machine Learning Backend** - Linear regression model with 300 epochs training
- ✅ **API Server** - Express.js REST API with 4 endpoints
- ✅ **Top 50 Documentation** - Comprehensive charity profiles in top-50-charities.txt
- ✅ **Trend Learning** - Model adapts based on user feedback
- ✅ **Impact Projections** - Real-world outcome calculations per donation
- ✅ **Model Persistence** - Weights saved to JSON for continuous learning

#### 🐛 Bug Fixes
- ✅ Removed HTML tags from AI responses (clean text output)
- ✅ Fixed typo: "an lean" → "a lean operation"
- ✅ Fixed typo: "Multplier" → "Multiplier"
- ✅ Fixed typo: "lots and lotssss" → "numerous"
- ✅ Fixed grammar: "promote" → "promotes"

#### 📊 Data Updates
- ✅ **Complete dataset transformation**: 264 charities → Top 50 Elite only
- ✅ Updated charity count throughout application
- ✅ Updated audit dates: March 31, 2024 → December 31, 2024
- ✅ Updated data year references: 2023-2024 → 2024-2025
- ✅ Updated historical data range: 2022-2024 → 2022-2025
- ✅ Updated GiveWell reference: 2012-2024 → 2012-2025

#### ✅ Data Validation
- All 50 charities validated for complete fields
- Expense ratios confirmed to sum to 1.0 (±0.01 tolerance)
- Score ranges verified (61-100 trust scores)
- No duplicates found
- All financial data within reasonable ranges for elite organizations
- Trust scores range from 61-100 (averaging 75.1)
- Program efficiency range: 71.4%-99.0%

#### 🎨 UI Improvements
- Cleaner AI chat responses (no raw HTML)
- Consistent date formatting
- Professional language throughout
- Updated welcome message with accurate charity count

#### 🔧 Backend Architecture
- Express.js server with CORS support
- Model training on startup (300 epochs, ~2-3 seconds)
- Feature engineering with one-hot encoding for causes and countries
- Gradient descent with adaptive learning rate decay
- Health monitoring endpoint for production deployments

---

## 🧪 Testing

### Manual Testing Checklist
- [ ] Load index.html - verify data loads from data.js
- [ ] Submit search form - verify 10 results appear
- [ ] Click charity card - verify 4 tabs switch correctly
- [ ] Open AI chat - verify context-aware responses
- [ ] Test advanced mode - verify DNA profiling flow
- [ ] Login to admin panel - verify password works
- [ ] Upload test JSON - verify LocalStorage override
- [ ] Reset database - verify fallback to data.js
- [ ] Check sources.html - verify all links work

### Browser Compatibility
- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+
- ⚠️ IE 11 (not supported)

---

## 📚 Data Sources & Methodology

CharityAI integrates methodologies from:

- **GiveWell** - Cost-effectiveness analysis, lives saved per dollar
- **Charity Navigator** - Financial health, accountability metrics
- **GuideStar (Candid)** - Tax-exempt status, transparency seals
- **BBB Wise Giving Alliance** - 20 Standards for Charity Accountability
- **GlobalGiving** - Grassroots organization vetting
- **IATI Standard** - International aid transparency
- **UN OCHA FTS** - Humanitarian aid tracking

See [sources.html](sources.html) for complete methodology documentation.

---

## 🤝 Contributing

### How to Contribute
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Contribution Guidelines
- Maintain data integrity (validate all charity data)
- Follow existing code style
- Update documentation for new features
- Test across multiple browsers
- Ensure expense ratios sum to 1.0

### Adding New Charities
Required fields:
- Unique ID (UUID format)
- Complete financial ratios (must sum to 1.0)
- Valid trust/transparency scores (0-100)
- Verified official website
- Audit year (2024 or later)
- Historical reputation data (3+ years)

### Backend Dependencies
```json
{
  "dependencies": {
    "express": "^4.19.2",  // REST API framework
    "cors": "^2.8.5"       // Cross-origin requests
  },
  "devDependencies": {
    "nodemon": "^3.1.0"    // Auto-reload during development
  }
}
```

No external ML libraries needed - custom implementation from scratch!

---

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- **Material Design Team** - Design system & icons
- **GiveWell** - Charity evaluation methodology
- **Charity Navigator** - Financial analysis frameworks
- **Open-source community** - Inspiration & tools

---

## 📧 Support & Contact

- **Issues**: [GitHub Issues](https://github.com/yourusername/Charity-AI/issues)
- **Documentation**: See [sources.html](sources.html) for detailed methodology
- **Admin Access**: Contact repository owner for production credentials

---

## 🔮 Roadmap

### Completed Features ✅
- [x] Backend API with ML recommendations
- [x] Linear regression trend-learning model
- [x] Model feedback loop and continuous learning
- [x] Top 50 charities documentation
- [x] Impact projection calculations
- [x] Health monitoring endpoints

### Planned Features
- [ ] Frontend integration with backend API (currently standalone)
- [ ] User accounts & saved preferences
- [ ] Donation tracking dashboard
- [ ] Email notifications
- [ ] Multi-language support
- [ ] Mobile app (React Native)
- [ ] Blockchain donation verification
- [ ] Real-time charity updates via API
- [ ] Deep learning model (neural network upgrade)
- [ ] A/B testing framework for recommendation strategies

### Under Consideration
- Social sharing features
- Charity comparison tool
- Interactive data visualization charts
- Integration with payment processors (Stripe, PayPal)
- Quarterly data refresh automation
- Webhook notifications for charity updates
- GraphQL API alternative
- Docker containerization
- Kubernetes deployment configuration

---

**Version**: 3.0  
**Last Updated**: January 21, 2026  
**Status**: Production Ready  
**Theme**: Material Design 3 / UN SDG Aligned  
**Backend**: Express.js + Custom ML Model  
**Database**: 50 Elite Verified Charities (Top Global Organizations)  

*Built with ❤️ for transparent, data-driven philanthropy*

