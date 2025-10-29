import styled, { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  :root {
    /* Dark theme (default) */
    --bg-primary: linear-gradient(135deg, #0c0c0c 0%, #1a1a1a 50%, #0f0f0f 100%);
    --bg-secondary: rgba(0, 0, 0, 0.15);
    --bg-tertiary: rgba(0, 0, 0, 0.2);
    --text-primary: #ffffff;
    --text-secondary: #cccccc;
    --text-tertiary: #eeeeee;
    --border-color: rgba(255, 255, 255, 0.1);
    --border-color-hover: rgba(255, 255, 255, 0.2);
    --shadow-color: rgba(0, 0, 0, 0.2);
    --accent-gradient: linear-gradient(135deg, #ff6b6b, #ff8e53);
    --accent-color: #ff6b6b;
    --input-bg: rgba(0, 0, 0, 0.1);
    --scrollbar-track: rgba(255, 255, 255, 0.05);
    --scrollbar-thumb: rgba(255, 107, 107, 0.5);
  }

  [data-theme="light"] {
    /* Light theme */
    --bg-primary: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 50%, #f1f3f4 100%);
    --bg-secondary: rgba(255, 255, 255, 0.15);
    --bg-tertiary: rgba(255, 255, 255, 0.2);
    --text-primary: #212529;
    --text-secondary: #495057;
    --text-tertiary: #343a40;
    --border-color: rgba(255, 255, 255, 0.2);
    --border-color-hover: rgba(255, 255, 255, 0.3);
    --shadow-color: rgba(0, 0, 0, 0.08);
    --accent-gradient: linear-gradient(135deg, #ff6b6b, #ff8e53);
    --accent-color: #ff6b6b;
    --input-bg: rgba(255, 255, 255, 0.1);
    --scrollbar-track: rgba(0, 0, 0, 0.05);
    --scrollbar-thumb: rgba(255, 107, 107, 0.7);
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    background: var(--bg-primary);
    color: var(--text-primary);
    min-height: 100vh;
    overflow-x: hidden;
    position: relative;
    transition: background 0.3s ease, color 0.3s ease;

    &::before {
      content: '';
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: 
        radial-gradient(circle at 20% 80%, rgba(255, 107, 107, 0.1) 0%, transparent 50%),
        radial-gradient(circle at 80% 20%, rgba(255, 142, 83, 0.1) 0%, transparent 50%);
      pointer-events: none;
      z-index: -1;
      transition: opacity 0.3s ease;
    }

    &::after {
      content: '';
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-image: url('./night_mode.png');
      background-size: cover;
      background-position: center;
      background-repeat: no-repeat;
      opacity: 0.8;
      pointer-events: none;
      z-index: -2;
      transition: opacity 0.3s ease;
      image-rendering: pixelated;
      image-rendering: -moz-crisp-edges;
      image-rendering: crisp-edges;
      filter: none;
      transform: translateZ(0);
      will-change: opacity;
    }
  }

  [data-theme="light"] body::before {
    opacity: 0.3;
  }

  [data-theme="light"] body::after {
    background-image: url('./daymode.png');
    opacity: 0.8;
  }

  #root {
    min-height: 100vh;
  }

  /* Animations */
  @keyframes pulse {
    0%, 100% { 
      opacity: 1; 
      transform: scale(1);
    }
    50% { 
      opacity: 0.7; 
      transform: scale(1.02);
    }
  }
`;

export const AppWrapper = styled.div`
  position: relative;
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 1rem;
`;

export const FloatingTitle = styled.h1`
  font-size: 2.5rem;
  font-weight: 600;
  margin-top: 4rem;
  margin-bottom: 2rem;
  background: var(--accent-gradient);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-shadow: 2px 2px 8px rgba(0, 0, 0, 0.5);
  text-align: center;
  z-index: 10;
  position: relative;
`;

export const TopRightToggle = styled.div`
  position: fixed;
  top: 1rem;
  right: 1rem;
  z-index: 100;
`;

export const Container = styled.div`
  max-width: 500px;
  width: 100%;
  padding: 2rem;
  background: var(--bg-secondary);
  backdrop-filter: blur(30px);
  border-radius: 24px;
  border: 1px solid var(--border-color);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.12);
  position: relative;
  transition: all 0.3s ease;
  
  &::before {
    content: '';
    position: absolute;
    top: -1px;
    left: -1px;
    right: -1px;
    bottom: -1px;
    background: linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05));
    border-radius: 24px;
    z-index: -1;
  }
`;

export const Header = styled.header`
  text-align: center;
  margin-bottom: 2rem;
  position: relative;
  z-index: 10;
`;

export const Title = styled.h1`
  font-size: 2rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  background: var(--accent-gradient);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

export const SessionInfo = styled.div`
  font-size: 0.9rem;
  color: var(--text-secondary);
  transition: color 0.3s ease;
  margin-bottom: 0.5rem;
`;

export const SessionExplanation = styled.div`
  font-size: 0.75rem;
  color: var(--text-secondary);
  opacity: 0.8;
  font-style: italic;
  transition: color 0.3s ease;
`;

export const QuickSettings = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 1.5rem;
  padding: 1rem;
  background: var(--bg-secondary);
  border-radius: 12px;
  border: 1px solid var(--border-color);
  transition: all 0.3s ease;
`;

export const QuickSettingItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

export const QuickLabel = styled.label`
  font-size: 0.8rem;
  color: var(--text-secondary);
  font-weight: 500;
  white-space: nowrap;
`;

export const QuickInput = styled.input`
  width: 60px;
  padding: 0.4rem 0.6rem;
  border-radius: 6px;
  border: 1px solid var(--border-color);
  background: var(--input-bg);
  color: var(--text-primary);
  font-size: 0.9rem;
  text-align: center;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: var(--accent-color);
    box-shadow: 0 0 0 2px rgba(255, 107, 107, 0.2);
  }

  &::-webkit-inner-spin-button,
  &::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`;

export const SettingsHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1rem;
`;

export const SettingsToggle = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background: var(--bg-secondary);
  border: 1px solid var(--border-color);
  border-radius: 8px;
  color: var(--text-primary);
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: var(--bg-tertiary);
    border-color: var(--border-color-hover);
  }

  svg {
    transition: transform 0.3s ease;
  }
`;

export const SettingsIcon = styled.div<{ expanded: boolean }>`
  width: 18px;
  height: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  
  svg {
    transform: ${props => props.expanded ? 'rotate(45deg)' : 'rotate(0deg)'};
    transition: transform 0.3s ease;
  }
`;

export const TimerSection = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const ModeButtons = styled.div`
  display: flex;
  background: var(--bg-secondary);
  border-radius: 12px;
  padding: 4px;
  margin-bottom: 2rem;
  gap: 4px;
  width: 100%;
  transition: background 0.3s ease;
`;

export const ModeButton = styled.button<{ active?: boolean }>`
  flex: 1;
  background: ${props => props.active 
    ? 'var(--accent-gradient)' 
    : 'transparent'};
  border: none;
  color: ${props => props.active ? 'white' : 'var(--text-secondary)'};
  padding: 0.75rem 1rem;
  border-radius: 8px;
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  transform: ${props => props.active ? 'scale(1.02)' : 'scale(1)'};

  &:hover:not(:disabled) {
    color: ${props => props.active ? 'white' : 'var(--text-primary)'};
    background: ${props => props.active 
      ? 'var(--accent-gradient)' 
      : 'var(--bg-tertiary)'};
  }
`;

export const TimerControls = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: center;
  margin: 2rem 0;
`;

export const ControlButton = styled.button<{ variant?: 'primary' | 'secondary' }>`
  padding: 1rem 2rem;
  border: none;
  border-radius: 12px;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  letter-spacing: 1px;
  min-width: 120px;

  ${props => props.variant === 'primary' ? `
    background: var(--accent-gradient);
    color: white;

    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 10px 20px rgba(255, 107, 107, 0.3);
    }
  ` : `
    background: var(--bg-tertiary);
    color: var(--text-secondary);
    border: 1px solid var(--border-color);

    &:hover {
      color: var(--text-primary);
      background: var(--bg-secondary);
      border-color: var(--border-color-hover);
    }
  `}
`;

export const TimeAdjustControls = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  margin: 1rem 0;
`;

export const AdjustButton = styled.button`
  width: 40px;
  height: 40px;
  border: none;
  border-radius: 50%;
  background: var(--bg-secondary);
  color: var(--text-primary);
  font-size: 1.2rem;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid var(--border-color);

  &:hover:not(:disabled) {
    background: var(--accent-gradient);
    transform: scale(1.1);
    box-shadow: 0 4px 12px rgba(255, 107, 107, 0.3);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export const CurrentTimeDisplay = styled.div`
  font-size: 1rem;
  color: var(--text-secondary);
  min-width: 80px;
  text-align: center;
  font-weight: 500;
`;

export const StatsSection = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 2rem 0;
  gap: 1rem;

  @media (max-width: 600px) {
    flex-direction: column;
    gap: 0.5rem;
  }
`;

export const StatItem = styled.div`
  text-align: center;
  flex: 1;
  padding: 1rem;
  background: var(--bg-secondary);
  border-radius: 12px;
  border: 1px solid var(--border-color);
  transition: background 0.3s ease, border-color 0.3s ease;
`;

export const StatNumber = styled.div`
  font-size: 1.5rem;
  font-weight: 600;
  color: var(--accent-color);
  margin-bottom: 0.25rem;
  transition: color 0.3s ease;
`;

export const StatLabel = styled.div`
  font-size: 0.8rem;
  color: var(--text-secondary);
  text-transform: uppercase;
  letter-spacing: 1px;
  transition: color 0.3s ease;
`;

export const SettingsPanel = styled.div`
  background: var(--bg-secondary);
  border-radius: 12px;
  padding: 1.5rem;
  border: 1px solid var(--border-color);
  transition: all 0.3s ease;
  animation: slideIn 0.3s ease-out;
  
  @keyframes slideIn {
    from {
      opacity: 0;
      transform: translateY(-10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

export const SettingsTitle = styled.h3`
  font-size: 1.1rem;
  margin-bottom: 1rem;
  color: var(--accent-color);
  transition: color 0.3s ease;
`;

export const SettingGroup = styled.div`
  margin-bottom: 1rem;

  &:last-child {
    margin-bottom: 0;
  }
`;

export const SettingLabel = styled.label`
  display: block;
  font-size: 0.9rem;
  color: var(--text-tertiary);
  margin-bottom: 0.5rem;
  transition: color 0.3s ease;
`;

export const SettingInput = styled.input`
  width: 100%;
  padding: 0.75rem;
  background: var(--input-bg);
  border: 1px solid var(--border-color);
  border-radius: 8px;
  color: var(--text-primary);
  font-size: 0.9rem;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: var(--accent-color);
    box-shadow: 0 0 0 2px rgba(255, 107, 107, 0.2);
  }

  &::placeholder {
    color: var(--text-secondary);
  }
`;

export const CheckboxLabel = styled.label`
  display: flex;
  align-items: center;
  font-size: 0.9rem;
  color: var(--text-tertiary);
  cursor: pointer;
  transition: color 0.3s ease;

  input[type="checkbox"] {
    margin-right: 0.5rem;
    transform: scale(1.2);
  }

  /* Custom Scrollbar */
  ::-webkit-scrollbar {
    width: 8px;
  }

  ::-webkit-scrollbar-track {
    background: var(--scrollbar-track);
  }

  ::-webkit-scrollbar-thumb {
    background: var(--scrollbar-thumb);
    border-radius: 4px;
    transition: background 0.3s ease;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: var(--accent-color);
  }
`;
