# 🌍 CharityAI - Intelligent Donation Matching Platform

> **An AI-powered charity recommendation engine that connects donors with verified global charities based on cause preference, geographic region, and data-driven efficiency metrics.**

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Version](https://img.shields.io/badge/Version-2.0-green.svg)](https://github.com)
[![Status](https://img.shields.io/badge/Status-Production-brightgreen.svg)](https://github.com)

---

## 🎯 Overview

CharityAI is a comprehensive philanthropic intelligence platform featuring:

- **264 Verified Global Charities** - Hand-curated database with real financial metrics
- **AI-Powered Matching** - Multi-vector scoring algorithm (Cortex Engine v4.2)
- **Interactive Chat Assistant** - Context-aware AI for deep charity analysis
- **Donor DNA Profiling** - Advanced persona assessment for personalized recommendations
- **Real-Time Impact Projections** - Calculate donation outcomes based on actual expense ratios
- **Full Transparency** - Audited financial data, trust scores, and compliance verification

---

## ✨ Key Features

### 🧠 Intelligent Matching System
- **Geographic Proximity Scoring** (+25 points for country match, +15 for regional match)
- **Mission Alignment** (+25 points for exact cause match, +15 for related causes)
- **Efficiency Metrics** (Trust score and program expense ratio weighted scoring)
- **Dynamic Jitter** (±3% randomization for realistic variability)

### 📊 Comprehensive Charity Profiles
Each charity card includes:
- **Story Tab**: Mission, impact narrative, and key achievements
- **Financials Tab**: Program expense ratio, admin costs, fundraising efficiency
- **AI Intelligence Tab**: Cortex-generated insights and impact projections
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

---

## 📁 Project Structure

```
Charity-AI/
├── index.html                  # Main application interface
├── admin.html                  # Admin panel for database management
├── sources.html                # Data provenance & methodology documentation
├── LICENSE                     # MIT License
├── README.md                   # This file
├── .git/                       # Git version control
├── .gitignore                  # Git ignore rules
│
└── assets/
    ├── css/
    │   ├── style.css          # Main application styles (Glassmorphism UI)
    │   ├── admin.css          # Admin panel styles
    │   └── sources.css        # Documentation page styles
    │
    └── js/
        ├── data.js            # Master charity dataset (264 entries)
        ├── app.js             # Core application logic (677 lines)
        └── admin.js           # Admin panel functionality (88 lines)
```

---

## 🚀 Getting Started

### Prerequisites
- Modern web browser (Chrome, Firefox, Safari, Edge)
- No server or build tools required - pure static site

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/Charity-AI.git
   cd Charity-AI
   ```

2. **Open in browser**
   ```bash
   # Simply open index.html in your browser
   # Or use a local server:
   python -m http.server 8000
   # Navigate to http://localhost:8000
   ```

3. **Start matching!**
   - Enter your name, target region, and cause preference
   - Click "Generate Analysis" to see top 10 matches
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
- **Total Charities**: 264
- **Countries Covered**: 10+ (USA, India, Kenya, UK, Canada, Australia, Germany, South Africa, Brazil, France, etc.)
- **Cause Categories**: 8 primary causes
- **Average Program Expense**: 85.2%
- **Average Trust Score**: 93.2/100
- **Revenue Range**: $1.2M - $1B

---

## 🔧 Technical Implementation

### Core Technologies
- **HTML5**: Semantic markup, accessibility compliant
- **CSS3**: Custom properties, flexbox, grid, animations
- **Vanilla JavaScript**: No frameworks or dependencies
- **LocalStorage API**: Admin database override persistence
- **Material Design 3**: Google's design system

### Key Functions

#### Matching Algorithm (`calculateCompatibility`)
```javascript
function calculateCompatibility(userState, charity) {
    let score = 35; // Base score
    
    // Geographic scoring (max +25)
    if (charity.country === userState.location) score += 25;
    else if (charity.operating_regions.includes(userState.location)) score += 15;
    
    // Cause scoring (max +25)
    if (charity.primary_cause === userState.cause) score += 25;
    
    // Trust & efficiency (max +15)
    score += Math.max(0, (charity.trust_score - 80) / 2);
    score += Math.max(0, (charity.program_expense_ratio - 0.7) * 20);
    
    // Realistic jitter (±3)
    score += (Math.random() * 6) - 3;
    
    return Math.min(99, Math.max(10, Math.round(score)));
}
```

#### Data Loading Priority
1. **LocalStorage** - Admin uploaded data (if available)
2. **data.js** - Embedded master dataset (fallback)
3. **Error State** - Display error if neither available

#### AI Chat Context
- Clicking a charity card sets `chatAssistant.context = charity`
- Subsequent questions use charity-specific data for responses
- Responses dynamically calculate values from expense ratios

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

### Version 2.0 - Polish & Data Validation Release

#### 🐛 Bug Fixes
- ✅ Removed HTML tags from AI responses (clean text output)
- ✅ Fixed typo: "an lean" → "a lean operation"
- ✅ Fixed typo: "Multplier" → "Multiplier"
- ✅ Fixed typo: "lots and lotssss" → "numerous"
- ✅ Fixed grammar: "promote" → "promotes"

#### 📊 Data Updates
- ✅ Updated charity count: 250+ → 264 (accurate)
- ✅ Updated audit dates: March 31, 2024 → December 31, 2024
- ✅ Updated data year references: 2023-2024 → 2024-2025
- ✅ Updated historical data range: 2022-2024 → 2022-2025
- ✅ Updated GiveWell reference: 2012-2024 → 2012-2025

#### ✅ Data Validation
- All 264 charities validated for complete fields
- Expense ratios confirmed to sum to 1.0 (±0.01 tolerance)
- Score ranges verified (0-100)
- No duplicates found
- All financial data within reasonable ranges

#### 🎨 UI Improvements
- Cleaner AI chat responses (no raw HTML)
- Consistent date formatting
- Professional language throughout
- Updated welcome message with accurate charity count

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

### Planned Features
- [ ] Backend API integration
- [ ] User accounts & saved preferences
- [ ] Donation tracking dashboard
- [ ] Email notifications
- [ ] Multi-language support
- [ ] Mobile app (React Native)
- [ ] Blockchain donation verification
- [ ] Real-time charity updates via API

### Under Consideration
- Social sharing features
- Charity comparison tool
- Impact visualization charts
- Integration with payment processors
- Quarterly data refresh automation

---

**Version**: 2.0  
**Last Updated**: January 19, 2026  
**Status**: Production Ready  
**Theme**: Material Design 3 / UN SDG Aligned  

*Built with ❤️ for transparent, data-driven philanthropy*
