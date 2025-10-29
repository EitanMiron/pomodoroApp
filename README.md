# 🍅 Pomodoro Timer - React/TypeScript App

A beautiful, modern Pomodoro Timer built with React, TypeScript, and styled-components. Features a pixel art stopwatch design, use-sound hook for notifications, and comprehensive timer functionality.

## ✨ Features

### Core Functionality
- **25-minute focus sessions** with 5-minute short breaks and 15-minute long breaks
- **Play, Pause, and Reset controls** with keyboard shortcuts (Spacebar to play/pause, 'R' to reset)
- **Automatic cycle management** - switches to breaks after focus sessions and back to focus after breaks
- **Session tracking** - every 4 focus sessions triggers a long break
- **Pixel art stopwatch design** with animated progress indicator

### Visual Design
- **Modern glass-morphism UI** with dark theme and gradient backgrounds
- **Pixel art stopwatch timer** with progress overlay animation
- **Styled-components** for component-scoped styling
- **Smooth animations** and hover effects throughout the interface
- **Responsive design** that works on desktop and mobile devices

### Smart Features
- **use-sound hook** for high-quality audio notifications
- **Browser notifications** for when you're in other tabs
- **Statistics tracking** - completed pomodoros, total focus time, daily streak
- **Persistent settings** - preferences saved in localStorage
- **TypeScript** for type safety and better development experience

### Settings Panel
- Adjust focus time (1-60 minutes)
- Adjust short break time (1-30 minutes)  
- Adjust long break time (1-60 minutes)
- Toggle sound notifications on/off

## 🚀 Quick Start

### Prerequisites
- Node.js 16+ and npm/yarn

### Installation & Setup
```bash
# Install dependencies
npm install

# Start development server
npm start

# Build for production
npm run build
```

The app will open at `http://localhost:3000`

## 📱 Usage

### Timer Controls
- **START/PAUSE**: Click the button or press Spacebar
- **RESET**: Click reset button or press 'R' key
- **Mode Switch**: Click Focus/Short Break/Long Break buttons to manually switch modes

### Keyboard Shortcuts
- `Spacebar`: Start/Pause timer
- `R`: Reset current timer

### Statistics
- **Completed**: Number of focus sessions completed today
- **Total Focus**: Total time spent in focus sessions
- **Daily Streak**: Consecutive days with completed sessions

## 🎯 The Pomodoro Technique

The Pomodoro Technique is a time management method:

1. **Focus for 25 minutes** on a single task
2. **Take a 5-minute break**
3. **Repeat 3 more times**
4. **Take a longer 15-30 minute break**
5. **Start the cycle again**

This app automatically manages these cycles for you!

## 🛠️ Technical Stack

- **React 18** with hooks and functional components
- **TypeScript** for type safety and better DX
- **Styled-components** for component-scoped styling
- **use-sound** hook for audio notifications
- **Local Storage** for settings and statistics persistence
- **Browser Notifications API** for background notifications
- **Custom hooks** for timer logic separation

## 🎨 Key Components

### Components Structure
```
src/
├── components/
│   ├── PomodoroTimer.tsx    # Main timer component
│   ├── StopwatchTimer.tsx   # Pixel art timer display
│   ├── Settings.tsx         # Settings panel
│   └── Stats.tsx           # Statistics display
├── hooks/
│   └── useTimer.ts         # Custom timer logic hook
├── styles/
│   └── GlobalStyles.ts     # Styled-components & global styles
├── types/
│   └── timer.ts           # TypeScript interfaces
├── App.tsx                # Main app component
└── index.tsx              # React entry point
```

### Key Features
- **Custom useTimer hook** - Encapsulates all timer logic
- **TypeScript interfaces** - Type-safe props and state
- **Styled-components** - Modern CSS-in-JS styling
- **Pixel art stopwatch** - Retro-style timer with smooth progress animation
- **use-sound integration** - High-quality audio notifications

## 📦 Dependencies

```json
{
  "react": "^18.2.0",
  "typescript": "^5.3.3",
  "styled-components": "^6.1.6",
  "use-sound": "^4.0.1"
}
```

## 🌟 Browser Support

Works in all modern browsers that support:
- React 18+ features
- ES6+ JavaScript
- CSS Grid and Flexbox
- Web Audio API
- Local Storage
- Notifications API

## 🔧 Development

### Available Scripts
- `npm start` - Start development server
- `npm run build` - Build for production
- `npm test` - Run tests
- `npm run eject` - Eject from Create React App (not recommended)

### Project Structure
The app follows React best practices with:
- Functional components with hooks
- Custom hooks for logic separation
- TypeScript for type safety
- Styled-components for styling
- Clean component architecture

---

**Happy Focusing with React! 🍅**
