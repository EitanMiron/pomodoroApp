import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { StopwatchImageProps } from '../types/timer';

const pulse = keyframes`
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.05); }
`;

const TimerContainer = styled.div<{ isRunning?: boolean }>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 2rem 0;
  animation: ${props => props.isRunning ? pulse : 'none'} 2s infinite;
`;

const StopwatchContainer = styled.div`
  position: relative;
  display: inline-block;
  margin-bottom: 1rem;
`;

const StopwatchImage = styled.img`
  width: 200px;
  height: 200px;
  filter: drop-shadow(0 10px 20px rgba(0, 0, 0, 0.3));
  image-rendering: pixelated;
  image-rendering: -moz-crisp-edges;
  image-rendering: crisp-edges;
`;

const FallbackCircle = styled.div`
  width: 200px;
  height: 200px;
  background: linear-gradient(135deg, #C0C0C0, #808080);
  border-radius: 50%;
  border: 8px solid #404040;
  box-shadow: 
    0 10px 20px rgba(0, 0, 0, 0.3),
    inset 0 0 0 10px #FFFFFF,
    inset 0 0 0 12px #E0E0E0;
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 6px;
    height: 6px;
    background: #FF0000;
    border-radius: 50%;
    z-index: 10;
  }
  
  &::after {
    content: '';
    position: absolute;
    top: 20px;
    left: 50%;
    transform: translateX(-50%);
    width: 20px;
    height: 20px;
    background: #FFA500;
    border-radius: 2px;
    border: 2px solid #404040;
  }
`;

const ProgressOverlay = styled.div<{ progress: number }>`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: conic-gradient(
    from 0deg at 50% 50%,
    rgba(255, 107, 107, 0.3) 0deg,
    rgba(255, 142, 83, 0.3) ${props => props.progress * 360}deg,
    transparent ${props => props.progress * 360}deg
  );
  border-radius: 50%;
  mask: radial-gradient(
    circle at 50% 50%,
    transparent 30%,
    black 31%,
    black 70%,
    transparent 71%
  );
  -webkit-mask: radial-gradient(
    circle at 50% 50%,
    transparent 30%,
    black 31%,
    black 70%,
    transparent 71%
  );
`;

const TimeDisplay = styled.div`
  text-align: center;
  font-size: 2.5rem;
  font-weight: 300;
  letter-spacing: 3px;
  color: var(--text-primary);
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  background: var(--accent-gradient);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-top: 0.5rem;
  padding: 0.5rem;
  border-radius: 12px;
  background-color: var(--bg-secondary);
  border: 1px solid var(--border-color);
  transition: all 0.3s ease;

  @media (max-width: 600px) {
    font-size: 2rem;
    letter-spacing: 2px;
  }
`;

const StopwatchTimer = ({ 
  progress, 
  timeDisplay, 
  isRunning 
}: StopwatchImageProps): React.ReactElement => {
  const [imageLoaded, setImageLoaded] = useState(true);

  return (
    <TimerContainer isRunning={isRunning}>
      <StopwatchContainer>
        {imageLoaded ? (
          <StopwatchImage 
            src="/stopwatch.svg" 
            alt="Pomodoro Timer"
            onError={() => {
              console.log('Failed to load stopwatch image, using fallback');
              setImageLoaded(false);
            }}
          />
        ) : (
          <FallbackCircle />
        )}
        <ProgressOverlay progress={progress} />
      </StopwatchContainer>
      <TimeDisplay>{timeDisplay}</TimeDisplay>
    </TimerContainer>
  );
};

export default StopwatchTimer;
