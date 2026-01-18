# 🌍 Global Charity Recommender

An AI-powered charity recommendation platform that helps users find verified charities matching their values and location.

## 📋 Features

- **Personalized Recommendations**: Get top 5 charity matches based on your location and cause interest
- **Verified Data**: 2000+ charities with real financial data and transparency scores
- **Detailed Insights**: Comprehensive information about each charity's mission, impact, and financial efficiency
- **UN-Themed UI**: Professional, modern interface following UN design principles
- **Admin Panel**: Secure admin access for updating charity database

## 🚀 Quick Start

1. **Open the Application**
   - Simply open `index.html` in your web browser
   - No installation or setup required!

2. **Using the App**
   - Answer 3 simple questions (name, location, cause)
   - Get instant personalized charity recommendations
   - Click on charities to view detailed information

3. **Admin Access**
   - Access admin panel via the 🔐 button
   - Default password: `admin123` (change this in admin.html)
   - Upload new charity data as JSON files

## 📁 File Structure

```
Main EL/
├── index.html              # Main application
├── admin.html              # Admin panel for database updates
├── charities.json          # Charity database (2000+ entries)
└── README.md               # This file
```

## 🔧 Technologies Used

- Pure HTML, CSS, and JavaScript (no frameworks)
- Client-side data processing
- Responsive design
- UN color scheme (#009EDB)

## 📊 Data Structure

Each charity contains:
- Basic info (name, country, cause)
- Financial metrics (program %, admin %, fundraising %)
- Trust and transparency scores
- Historical reputation data
- Mission statement
- Official website

## 🔐 Admin Features

- Upload updated charity JSON files
- Download database backups
- View current charity count
- Secure password protection

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
