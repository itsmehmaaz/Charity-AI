# Changelog

All notable changes to CharityAI will be documented in this file.

## [3.0.0] - 2026-01-21

### 🌟 Major Changes - Elite 50 Exclusive Release

#### Breaking Changes
- **Complete dataset transformation**: Reduced from 264 charities to Top 50 Elite organizations only
- **Exclusivity focus**: Platform now exclusively features the world's highest-rated charities
- **Quality over quantity**: Every charity has proven excellence with trust scores 61-100

#### Dataset Changes
- ✅ **50 Elite Charities**: Hand-curated from global top performers
- ✅ **15+ Countries**: USA, India, Kenya, UK, Canada, Australia, Germany, South Africa, Brazil, France, Nigeria, Mexico, Italy, and more
- ✅ **10 Cause Categories**: Health, Medical Aid, Nutrition, Children, Poverty, Water, Environment, Education, Human Rights
- ✅ **Trust Score Range**: 61-100 (Average: 75.1/100)
- ✅ **Program Efficiency Range**: 71.4%-99.0% (Average: 84.2%)
- ✅ **Revenue Range**: $11.2M - $95.2M

#### Files Updated
1. **assets/js/data.js** - Completely rebuilt with 50 elite charities
2. **package.json** - Version updated to 3.0.0
3. **README.md** - All references to 264 → 50, v2.0 → v3.0
4. **index.html** - Welcome message updated for Top 50
5. **sources.html** - Dataset references updated to 50 elite organizations
6. **admin.html** - Default charity count updated
7. **assets/js/admin.js** - Default count display updated to 50
8. **REPOSITORY_DESCRIPTION.md** - Short and expanded descriptions updated
9. **server/data.js** - Backend parsing compatible with new dataset

#### Features Retained from v2.0
- ✅ Machine Learning backend with linear regression model
- ✅ Express.js REST API with 4 endpoints
- ✅ Model persistence and continuous learning
- ✅ Impact projection calculations
- ✅ Feedback loop for model improvement
- ✅ Admin portal for database management
- ✅ AI chat assistant with context-aware responses
- ✅ Donor DNA profiling system

#### Data Validation
- All 50 charities validated for complete required fields
- Expense ratios confirmed to sum to 1.0 (±0.01 tolerance)
- No duplicate entries
- All financial data verified within reasonable ranges for elite organizations
- Historical reputation data (2022-2024) present for all charities

#### Documentation
- Comprehensive top-50-charities.txt with full profiles
- Updated README with v3.0 specifications
- Backend API documentation updated
- Installation instructions remain unchanged

---

## [2.0.0] - 2026-01-19

### ML Backend & Top 50 Charities Release

#### New Features
- ✅ Machine Learning Backend - Linear regression model with 300 epochs training
- ✅ API Server - Express.js REST API with 4 endpoints
- ✅ Top 50 Charities documentation - Curated elite charity list with detailed profiles
- ✅ Trend Learning - Model adapts based on user feedback
- ✅ Impact Projections - Real-world outcome calculations per donation
- ✅ Model Persistence - Weights saved to JSON for continuous learning

#### Bug Fixes
- ✅ Removed HTML tags from AI responses (clean text output)
- ✅ Fixed typo: "an lean" → "a lean operation"
- ✅ Fixed typo: "Multplier" → "Multiplier"
- ✅ Fixed typo: "lots and lotssss" → "numerous"
- ✅ Fixed grammar: "promote" → "promotes"

#### Data Updates
- ✅ Updated charity count: 250+ → 264 (accurate)
- ✅ Updated audit dates: March 31, 2024 → December 31, 2024
- ✅ Updated data year references: 2023-2024 → 2024-2025
- ✅ Updated historical data range: 2022-2024 → 2022-2025
- ✅ Updated GiveWell reference: 2012-2024 → 2012-2025

---

## [1.0.0] - Initial Release

### Features
- Client-side charity matching platform
- 264 verified global charities
- AI-powered matching algorithm
- Interactive chat assistant
- Donor DNA profiling
- Admin portal with database management
- Material Design 3 UI
- Full transparency with trust scores and financial metrics

---

## Migration Guide: v2.0 → v3.0

### For Users
- No action required - seamless upgrade
- You'll now see only the Top 50 Elite Charities
- Higher quality recommendations with elite organizations

### For Developers
If you've forked or integrated CharityAI:

1. **Update data references**:
   ```javascript
   // Old: Expect 264 charities
   // New: Expect 50 charities
   const charities = window.CHARITY_DATA; // Now contains 50 entries
   ```

2. **Backend API**:
   ```bash
   # Update to v3.0
   npm install
   npm start
   
   # API endpoints remain the same:
   GET /api/charities # Now returns 50 charities
   GET /api/health    # Shows updated model metrics
   ```

3. **Admin Panel**:
   - JSON uploads must contain array of charity objects
   - All 50 charities must include required fields
   - Expense ratios must sum to 1.0

### Breaking Changes
- **Dataset size**: Applications expecting 264 charities will now receive 50
- **Trust score range**: Now 61-100 (was 0-100 in v2.0)
- **Charity IDs**: All charity IDs have changed - do not rely on old IDs

### Non-Breaking Changes
- API endpoint structure unchanged
- Data schema unchanged
- Admin portal functionality unchanged
- ML model architecture unchanged

---

## Upgrade Instructions

### From v2.0 to v3.0

1. **Pull latest changes**:
   ```bash
   git pull origin main
   ```

2. **No npm install required** (dependencies unchanged)

3. **Clear browser cache** (if using admin-uploaded data):
   ```bash
   # Open browser console
   localStorage.removeItem('GCIP_CharityData');
   location.reload();
   ```

4. **Restart backend** (if running):
   ```bash
   npm start
   ```

---

## Support

For questions or issues:
- Open an issue on GitHub
- Check README.md for detailed documentation
- Review top-50-charities.txt for charity details

---

**Built with ❤️ for transparent, data-driven philanthropy**
