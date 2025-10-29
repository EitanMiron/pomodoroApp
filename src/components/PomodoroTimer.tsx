import React, { useEffect, useCallback, useState } from 'react';
import useSound from 'use-sound';
import {
  Container,
  Header,
  SessionInfo,
  SessionExplanation,
  TimerSection,
  ModeButtons,
  ModeButton,
  TimerControls,
  ControlButton,
  TimeAdjustControls,
  AdjustButton,
  CurrentTimeDisplay
} from '../styles/GlobalStyles';
import StopwatchTimer from './StopwatchTimer';
import Stats from './Stats';
import { useTimer } from '../hooks/useTimer';

// Custom timer chime sound - plays from 12 seconds to 0
const TIMER_CHIME_SOUND = '/timer-chime.mp3';

const PomodoroTimer = (): React.ReactElement => {
  const {
    timerState,
    settings,
    stats,
    progress,
    timeDisplay,
    setSettings,
    switchMode,
    startTimer,
    pauseTimer,
    resetTimer,
    completeTimer
  } = useTimer();

  // Audio state management
  const [audioEnabled, setAudioEnabled] = useState(false);
  const [isCountdownPlaying, setIsCountdownPlaying] = useState(false);

  const [playTimerChime, { stop: stopTimerChime }] = useSound(TIMER_CHIME_SOUND, {
    volume: 0.8,
    interrupt: true,
    onend: () => setIsCountdownPlaying(false)
  });

  // Toggle audio function - can enable or disable audio
  const toggleAudio = useCallback(() => {
    if (!audioEnabled) {
      // Enable audio - play a brief sound to enable audio context
      playTimerChime();
      setTimeout(() => stopTimerChime(), 100); // Stop immediately after enabling
      setAudioEnabled(true);
    } else {
      // Disable audio - stop any playing sounds
      if (isCountdownPlaying) {
        stopTimerChime();
        setIsCountdownPlaying(false);
      }
      setAudioEnabled(false);
    }
  }, [audioEnabled, playTimerChime, stopTimerChime, isCountdownPlaying]);

  // Start countdown sound when 12 seconds left
  useEffect(() => {
    if (!audioEnabled || !settings.soundEnabled || !timerState.isRunning) {
      if (isCountdownPlaying) {
        stopTimerChime();
        setIsCountdownPlaying(false);
      }
      return;
    }

    // Start playing sound when 12 seconds left
    if (timerState.timeLeft === 12 && !isCountdownPlaying) {
      setIsCountdownPlaying(true);
      playTimerChime();
    }
    
    // Stop playing if timer is reset or goes above 12 seconds
    if (timerState.timeLeft > 12 && isCountdownPlaying) {
      stopTimerChime();
      setIsCountdownPlaying(false);
    }
  }, [timerState.timeLeft, timerState.isRunning, audioEnabled, settings.soundEnabled, isCountdownPlaying, playTimerChime, stopTimerChime]);

  const showNotification = useCallback(() => {
    if ('Notification' in window && Notification.permission === 'granted') {
      const message = timerState.currentMode === 'focus' 
        ? 'Focus session completed! Time for a break.' 
        : 'Break time is over! Ready to focus?';
      
      new Notification('🍅 Pomodoro Timer', {
        body: message,
        icon: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><text y=".9em" font-size="90">🍅</text></svg>'
      });
    }
  }, [timerState.currentMode]);

  // Handle timer completion
  useEffect(() => {
    if (timerState.timeLeft === 0 && progress > 0) {
      // Timer completed - sound should naturally finish
      setIsCountdownPlaying(false);

      // Show browser notification
      showNotification();
      
      // Complete the timer cycle
      completeTimer();
    }
  }, [timerState.timeLeft, progress, showNotification, completeTimer]);

  const requestNotificationPermission = useCallback(() => {
    if ('Notification' in window && Notification.permission === 'default') {
      Notification.requestPermission();
    }
  }, []);

  // Request notification permission on mount
  useEffect(() => {
    requestNotificationPermission();
  }, [requestNotificationPermission]);

  // Time adjustment functions
  const adjustTime = (adjustment: number) => {
    if (timerState.isRunning) return;
    
    const currentMode = timerState.currentMode;
    const currentValue = settings[currentMode];
    const newValue = Math.max(1, Math.min(60, currentValue + adjustment));
    
    setSettings({ ...settings, [currentMode]: newValue });
  };

  const getCurrentModeTime = (): number => {
    return settings[timerState.currentMode];
  };

  const getSessionDisplay = (): string => {
    const completed = Math.floor((timerState.currentSession - 1) / 2);
    const cycle = Math.floor(completed / 4) + 1;
    const sessionInCycle = (completed % 4) + 1;
    
    if (timerState.currentMode === 'focus') {
      return `Pomodoro ${sessionInCycle} • Cycle ${cycle}`;
    } else if (timerState.currentMode === 'longBreak') {
      return `Long Break • Cycle ${cycle}`;
    } else {
      return `Short Break • Cycle ${cycle}`;
    }
  };

  const getSessionExplanation = (): string => {
    const completed = Math.floor((timerState.currentSession - 1) / 2);
    const sessionInCycle = (completed % 4) + 1;
    
    if (timerState.currentMode === 'focus') {
      const remaining = 4 - sessionInCycle;
      if (remaining === 0) {
        return "Complete this focus session for a long break!";
      } else {
        return `${remaining} more focus session${remaining > 1 ? 's' : ''} until long break`;
      }
    } else if (timerState.currentMode === 'longBreak') {
      return "Enjoy your well-earned long break!";
    } else {
      return "Take a short break before the next focus session";
    }
  };

  return (
    <Container>
      <Header>
        <SessionInfo>{getSessionDisplay()}</SessionInfo>
        <SessionExplanation>{getSessionExplanation()}</SessionExplanation>
      </Header>

      <TimerSection>
        <ModeButtons>
          <ModeButton
            active={timerState.currentMode === 'focus'}
            onClick={() => switchMode('focus')}
            disabled={timerState.isRunning}
          >
            Focus
          </ModeButton>
          <ModeButton
            active={timerState.currentMode === 'shortBreak'}
            onClick={() => switchMode('shortBreak')}
            disabled={timerState.isRunning}
          >
            Short Break
          </ModeButton>
          <ModeButton
            active={timerState.currentMode === 'longBreak'}
            onClick={() => switchMode('longBreak')}
            disabled={timerState.isRunning}
          >
            Long Break
          </ModeButton>
        </ModeButtons>

        <StopwatchTimer
          progress={progress}
          timeDisplay={timeDisplay}
          isRunning={timerState.isRunning}
        />

        <TimeAdjustControls>
          <AdjustButton 
            onClick={() => adjustTime(-1)}
            disabled={timerState.isRunning}
            title="Decrease time by 1 minute"
          >
            −
          </AdjustButton>
          <CurrentTimeDisplay>
            {getCurrentModeTime()} min
          </CurrentTimeDisplay>
          <AdjustButton 
            onClick={() => adjustTime(1)}
            disabled={timerState.isRunning}
            title="Increase time by 1 minute"
          >
            +
          </AdjustButton>
        </TimeAdjustControls>
        
        {/* Countdown sound indicator */}
        {isCountdownPlaying && (
          <div style={{
            textAlign: 'center',
            marginTop: '1rem',
            fontSize: '1.2rem',
            color: '#ff6b6b',
            fontWeight: 'bold',
            animation: 'pulse 0.5s infinite'
          }}>
            🎵 Final Countdown! 🎵
          </div>
        )}

        <TimerControls>
          <ControlButton
            variant="primary"
            onClick={timerState.isRunning ? pauseTimer : startTimer}
          >
            {timerState.isRunning ? 'PAUSE' : 'START'}
          </ControlButton>
          <ControlButton
            variant="secondary"
            onClick={resetTimer}
          >
            RESET
          </ControlButton>
          <ControlButton
            variant="secondary"
            onClick={toggleAudio}
            style={{ 
              background: audioEnabled 
                ? 'linear-gradient(135deg, #28a745, #20c997)' 
                : 'var(--bg-tertiary)',
              color: audioEnabled ? 'white' : 'var(--text-secondary)',
              fontSize: '0.8rem'
            }}
          >
            {audioEnabled ? '🔊 DISABLE AUDIO' : '🔇 ENABLE AUDIO'}
          </ControlButton>
        </TimerControls>
      </TimerSection>

      <Stats stats={stats} currentSession={timerState.currentSession} />
    </Container>
  );
};

export default PomodoroTimer;