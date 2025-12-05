# Limina

**Smart spending, powered by your peers**

Limina is a mobile budgeting app designed specifically for college students. It provides financial context through anonymous peer spending insights, local student deals, and community-driven savings challenges.

## Features

### MVP (Current Implementation)
- **Smart Expense Tracking**: Auto-categorized transactions with student-specific categories
- **Anonymous Peer Insights**: Compare your spending to other students at your university
- **Local Student Deals**: Curated database of Austin businesses offering student discounts
- **Emergency Fund Builder**: Set goals and track progress toward building emergency savings
- **Onboarding Flow**: Email verification with .edu domain check

### Coming Soon
- **Plaid Integration**: Connect bank accounts for automatic transaction sync
- **Group Savings Challenges**: Compete with friends to save money
- **Push Notifications**: Get alerts for spending insights and challenge updates
- **Semester Budget Planning**: Project your spending for the entire semester

## Tech Stack

- **Frontend**: React Native with Expo
- **Navigation**: React Navigation (Bottom Tabs + Stack)
- **Language**: TypeScript
- **Styling**: StyleSheet (custom theme system)
- **Banking**: Plaid API (planned)
- **Auth**: Firebase Auth with .edu verification (planned)

## Project Structure

```
limina/
├── src/
│   ├── screens/           # Main app screens
│   │   ├── OnboardingScreen.tsx
│   │   ├── HomeScreen.tsx
│   │   ├── InsightsScreen.tsx
│   │   ├── DealsScreen.tsx
│   │   └── ProfileScreen.tsx
│   ├── navigation/        # Navigation config
│   │   └── AppNavigator.tsx
│   ├── components/        # Reusable components (TODO)
│   ├── services/          # API services (TODO)
│   ├── types/             # TypeScript type definitions
│   ├── utils/             # Utility functions (TODO)
│   └── constants/         # Theme and constants
│       └── theme.ts
├── assets/                # Images, fonts, etc.
├── App.tsx               # Root component
└── package.json          # Dependencies
```

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Xcode (for iOS development on Mac)
- Expo Go app (optional, for testing on physical device)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/bruhlol108/limina.git
   cd limina
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

   Or if using yarn:
   ```bash
   yarn install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

4. **Run on iOS Simulator** (requires Mac + Xcode)
   ```bash
   npm run ios
   ```

5. **Run on Android Emulator** (requires Android Studio)
   ```bash
   npm run android
   ```

6. **Run in web browser**
   ```bash
   npm run web
   ```

### Testing on Physical Device

1. Install the **Expo Go** app from App Store or Google Play
2. Run `npm start` in your project directory
3. Scan the QR code with your device's camera
4. The app will open in Expo Go

## Current Screens

### 1. Onboarding
- Email verification (.edu domain check)
- Emergency fund goal setting
- Bank connection prompt (UI only, Plaid not yet integrated)

### 2. Home
- Weekly spending summary with progress bar
- Category breakdown
- Emergency fund tracker with smart suggestions
- Recent transactions list

### 3. Insights
- Peer spending comparisons by category
- Visual bar charts showing user vs. peer spending
- Smart tips for categories where user is overspending
- Success metrics and encouragement

### 4. Deals
- Searchable list of local student deals
- Category filtering
- Distance from campus
- Contextual suggestions based on spending patterns

### 5. Profile
- User stats (total saved, challenges completed, emergency fund)
- Account settings
- Connected bank accounts
- Logout

## Development Roadmap

### Sprint 1 (Week 1-2) - COMPLETED
- [x] Project setup with Expo + TypeScript
- [x] Navigation structure
- [x] Type definitions
- [x] Theme system
- [x] All main screens (UI only with mock data)

### Sprint 2 (Week 3-4) - NEXT
- [ ] Plaid integration for bank connections
- [ ] Firebase authentication with .edu verification
- [ ] Backend API setup (Node.js + Express)
- [ ] Database schema (PostgreSQL)
- [ ] Real transaction categorization logic

### Sprint 3 (Week 5-6)
- [ ] Peer insights calculation algorithm
- [ ] Emergency fund auto-suggestions
- [ ] Group challenges feature
- [ ] Push notifications
- [ ] Beta testing with 20 students

### Sprint 4 (Week 7)
- [ ] Bug fixes and polish
- [ ] Onboarding optimization
- [ ] Marketing materials
- [ ] Soft launch to 50 users

## Mock Data

Currently, the app uses mock data for demonstration:
- Peer insights are static (247 UT Austin students)
- Transactions are hardcoded
- Deals are manually curated for Austin
- Emergency fund progress is simulated

## Design System

### Colors
- **Primary**: Purple (#6C63FF) - Brand color
- **Secondary**: Coral (#FF6584) - Accents
- **Success**: Green (#4CAF50) - Positive actions
- **Warning**: Yellow (#FFC107) - Alerts
- **Error**: Red (#F44336) - Errors

### Typography
- **H1**: 32px, Bold - Screen titles
- **H2**: 24px, Bold - Card titles
- **H3**: 20px, Semibold - Section headers
- **Body**: 16px, Regular - Main text
- **Caption**: 14px, Regular - Secondary text

## Contributing

This is a student project for [competition/class name]. Contributions are welcome!

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Team

**Team 1**
- Krishna Perla
- Meena Ramaswamy
- Santosh Karthik Nandivada
- Vishal Rajkumar
- Maha Sivasubramanian

## License

This project is private and intended for educational purposes.

## Acknowledgments

- Plaid for banking integration
- Expo for React Native tooling
- UT Austin community for inspiration
- Local Austin businesses for student deals

---

**Built with ❤️ by students, for students**
