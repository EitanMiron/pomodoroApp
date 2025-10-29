import React, { createContext, useContext, useState, useEffect } from 'react';

export type Theme = 'light' | 'dark';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface ThemeProviderProps {
  children: React.ReactNode;
}

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const [theme, setTheme] = useState<Theme>(() => {
    // Check localStorage for saved theme preference
    const savedTheme = localStorage.getItem('pomodoro-theme') as Theme;
    if (savedTheme) {
      return savedTheme;
    }
    
    // Default to dark theme (matches current design)
    return 'dark';
  });

  const toggleTheme = () => {
    setTheme((prevTheme: Theme) => {
      const newTheme = prevTheme === 'dark' ? 'light' : 'dark';
      localStorage.setItem('pomodoro-theme', newTheme);
      return newTheme;
    });
  };

  // Apply theme to document root for CSS variables
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const value = {
    theme,
    toggleTheme
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
