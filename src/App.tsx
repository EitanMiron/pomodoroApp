import React from 'react';
import { GlobalStyle, AppWrapper, TopRightToggle, FloatingTitle } from './styles/GlobalStyles';
import PomodoroTimer from './components/PomodoroTimer';
import ThemeToggle from './components/ThemeToggle';
import { ThemeProvider } from './contexts/ThemeContext';

const App = (): React.ReactElement => {
  return (
    <ThemeProvider>
      <GlobalStyle />
      <AppWrapper>
        <TopRightToggle>
          <ThemeToggle />
        </TopRightToggle>
        <FloatingTitle>🍅 Pomodoro Timer</FloatingTitle>
        <PomodoroTimer />
      </AppWrapper>
    </ThemeProvider>
  );
};

export default App;
