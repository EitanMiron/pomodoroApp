import React from 'react';
import styled from 'styled-components';
import { useTheme } from '../contexts/ThemeContext';

const ToggleContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem;
  background: var(--bg-secondary);
  border-radius: 12px;
  border: 1px solid var(--border-color);
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
`;

const IconContainer = styled.div<{ active?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  opacity: ${props => props.active ? 1 : 0.5};
  transition: opacity 0.3s ease;
  border-radius: 50%;
  overflow: hidden;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
    image-rendering: pixelated;
    image-rendering: -moz-crisp-edges;
    image-rendering: crisp-edges;
  }
`;

const ToggleSwitch = styled.div<{ checked: boolean }>`
  position: relative;
  width: 48px;
  height: 28px;
  background: ${props => props.checked 
    ? 'var(--accent-gradient)' 
    : 'var(--bg-tertiary)'};
  border-radius: 16px;
  cursor: pointer;
  transition: all 0.3s ease;
  border: 1px solid ${props => props.checked 
    ? 'var(--accent-color)' 
    : 'var(--border-color)'};
  box-shadow: ${props => props.checked 
    ? '0 0 10px rgba(255, 107, 107, 0.3)' 
    : 'none'};

  &:hover {
    transform: scale(1.05);
  }
`;

const ToggleHandle = styled.div<{ checked: boolean }>`
  position: absolute;
  top: 2px;
  left: ${props => props.checked ? '22px' : '2px'};
  width: 22px;
  height: 22px;
  background: white;
  border-radius: 50%;
  transition: all 0.3s ease;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
`;

const HiddenCheckbox = styled.input.attrs({ type: 'checkbox' })`
  position: absolute;
  opacity: 0;
  cursor: pointer;
  height: 0;
  width: 0;
`;

const ToggleLabel = styled.span`
  font-size: 0.9rem;
  color: var(--text-secondary);
  font-weight: 500;
  transition: color 0.3s ease;
`;

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();
  const isDarkMode = theme === 'dark';

  return (
    <ToggleContainer>
      <IconContainer active={!isDarkMode}>
        <img src="/sun-icon.svg" alt="Light mode" />
      </IconContainer>
      
      <ToggleSwitch checked={isDarkMode} onClick={toggleTheme}>
        <HiddenCheckbox
          checked={isDarkMode}
          onChange={toggleTheme}
          aria-label="Toggle dark mode"
        />
        <ToggleHandle checked={isDarkMode} />
      </ToggleSwitch>
      
      <IconContainer active={isDarkMode}>
        <img src="/moon-pixel.jpg" alt="Dark mode" />
      </IconContainer>
    </ToggleContainer>
  );
};

export default ThemeToggle;
