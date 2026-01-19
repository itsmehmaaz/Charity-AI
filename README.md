# 🌍 Global Charity Recommender

An AI-powered charity recommendation platform that helps users find verified charities matching their values and location.

## 📋 Features

- **Personalized Recommendations**: Get top 5 charity matches based on mission-alignment, efficiency, and trust.
- **Verified Dataset**: 264 hand-vetted global charities with real financial metrics.
- **AI Chat Intelligence**: A dynamic AI assistant for deep-dive charity analysis and context-aware session.
- **Deduplicated & Pruned**: 100% free of synthetic generator data.
- **UN-Themed UI**: Elegant, modern interface following international accessibility standards.

## 🚀 Data Management (Data Engine)

The platform uses a Python-based "Universal Merger" to ensure data integrity.

1. **Add Data**: Update the `new_raw_data` list in `process_data.py` with new research results.
2. **Execute Sync**:
   ```bash
   python process_data.py
   ```
3. **Result**: This will automatically synchronize `charities.json` (Local) and `data.js` (Web).

## 📁 File Structure

```
Charity-AI/
├── index.html              # Main AI Smart Matching Platform
├── charities.json          # Master Dataset (Local)
├── data.js                 # Exported Dataset (Web)
├── process_data.py         # Data Engineering & Consolidation Engine
├── admin.html              # Legacy Admin View
└── README.md               # Documentation
```

## 🔧 Technologies Used

- **Frontend**: Pure HTML5, CSS3 (Glassmorphism), Vanilla JS.
- **Data Engine**: Python 3.x (JSON processing, deduplication).
- **Intelligence**: Custom AIChatEngine with dynamic financial derivation.

## 🎨 Customization

### Changing Admin Password
Edit line 109 in `admin.html`:
```javascript
const ADMIN_PASSWORD = 'your-new-password';
```

### Adding New Charities
Use the admin panel to upload a new `charities.json` file containing updated charity data.

## 📝 License

This project is open source and available for educational purposes.

## 🤝 Contributing

To add new charities:
1. Ensure data follows the JSON structure
2. Upload via admin panel
3. Verify all fields are complete

## 📧 Support

For issues or questions, please refer to the documentation or contact the administrator.

---

**Version**: 1.0  
**Last Updated**: January 2026  
**Theme**: United Nations SDG Aligned
