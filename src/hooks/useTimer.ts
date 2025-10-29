import { useState, useEffect, useRef, useCallback } from 'react';
import { TimerMode, TimerSettings, TimerStats, TimerState } from '../types/timer';

const DEFAULT_SETTINGS: TimerSettings = {
  focus: 25,
  shortBreak: 5,
  longBreak: 15,
  soundEnabled: true
};

const DEFAULT_STATS: TimerStats = {
  completedPomodoros: 0,
  totalFocusTime: 0,
  currentStreak: 0,
  lastUsed: new Date().toDateString()
};

export const useTimer = () => {
  const [settings, setSettings] = useState<TimerSettings>(DEFAULT_SETTINGS);
  const [stats, setStats] = useState<TimerStats>(DEFAULT_STATS);
  const [timerState, setTimerState] = useState<TimerState>({
    currentMode: 'focus',
    isRunning: false,
    timeLeft: DEFAULT_SETTINGS.focus * 60,
    totalTime: DEFAULT_SETTINGS.focus * 60,
    currentSession: 1
  });

  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const onCompleteRef = useRef<(() => void) | null>(null);

  // Load settings and stats from localStorage on mount
  useEffect(() => {
    const savedSettings = localStorage.getItem('pomodoroSettings');
    const savedStats = localStorage.getItem('pomodoroStats');

    if (savedSettings) {
      const parsed = JSON.parse(savedSettings);
      setSettings(parsed);
      setTimerState(prev => ({
        ...prev,
        timeLeft: parsed.focus * 60,
        totalTime: parsed.focus * 60
      }));
    }

    if (savedStats) {
      const parsed = JSON.parse(savedStats);
      const today = new Date().toDateString();
      const lastUsed = new Date(parsed.lastUsed);
      const todayDate = new Date();
      
      // Calculate days difference
      const timeDiff = todayDate.getTime() - lastUsed.getTime();
      const daysDiff = Math.floor(timeDiff / (1000 * 3600 * 24));
      
      // Reset streak only if more than 1 day has passed
      if (daysDiff > 1) {
        setStats({
          ...parsed,
          currentStreak: 0,
          lastUsed: today
        });
      } else {
        setStats({
          ...parsed,
          lastUsed: daysDiff === 1 ? today : parsed.lastUsed
        });
      }
    }
  }, []);

  // Save settings and stats to localStorage
  useEffect(() => {
    localStorage.setItem('pomodoroSettings', JSON.stringify(settings));
  }, [settings]);

  useEffect(() => {
    localStorage.setItem('pomodoroStats', JSON.stringify(stats));
  }, [stats]);

  const getCurrentModeTime = useCallback((mode: TimerMode): number => {
    switch (mode) {
      case 'focus': return settings.focus;
      case 'shortBreak': return settings.shortBreak;
      case 'longBreak': return settings.longBreak;
      default: return settings.focus;
    }
  }, [settings]);

  const formatTime = useCallback((seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }, []);

  const switchMode = useCallback((mode: TimerMode) => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    const newTime = getCurrentModeTime(mode) * 60;
    setTimerState(prev => ({
      ...prev,
      currentMode: mode,
      isRunning: false,
      timeLeft: newTime,
      totalTime: newTime
    }));
  }, [getCurrentModeTime]);

  const startTimer = useCallback(() => {
    if (intervalRef.current) return;

    setTimerState(prev => ({ ...prev, isRunning: true }));
    
    intervalRef.current = setInterval(() => {
      setTimerState(prev => {
        const newTimeLeft = prev.timeLeft - 1;
        
        if (newTimeLeft <= 0) {
          // Timer completed
          if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
          }

          // Call completion callback
          if (onCompleteRef.current) {
            onCompleteRef.current();
          }

          return { ...prev, timeLeft: 0, isRunning: false };
        }

        return { ...prev, timeLeft: newTimeLeft };
      });
    }, 1000);
  }, []);

  const pauseTimer = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    setTimerState(prev => ({ ...prev, isRunning: false }));
  }, []);

  const resetTimer = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    
    const newTime = getCurrentModeTime(timerState.currentMode) * 60;
    setTimerState(prev => ({
      ...prev,
      isRunning: false,
      timeLeft: newTime,
      totalTime: newTime
    }));
  }, [getCurrentModeTime, timerState.currentMode]);

  const completeTimer = useCallback(() => {
    if (timerState.currentMode === 'focus') {
      // Focus session completed
      const newCompletedCount = stats.completedPomodoros + 1;
      
      setStats(prev => ({
        ...prev,
        completedPomodoros: newCompletedCount,
        totalFocusTime: prev.totalFocusTime + (settings.focus * 60),
        currentStreak: prev.currentStreak + 1,
        lastUsed: new Date().toDateString()
      }));

      setTimerState(prev => ({ ...prev, currentSession: prev.currentSession + 1 }));

      // Auto switch to break - use the new count
      if (newCompletedCount % 4 === 0) {
        switchMode('longBreak');
      } else {
        switchMode('shortBreak');
      }
    } else {
      // Break completed, switch back to focus
      switchMode('focus');
    }
  }, [timerState.currentMode, settings.focus, stats.completedPomodoros, switchMode]);

  // Set the completion callback
  onCompleteRef.current = completeTimer;

  const progress = timerState.totalTime > 0 
    ? (timerState.totalTime - timerState.timeLeft) / timerState.totalTime 
    : 0;

  const timeDisplay = formatTime(timerState.timeLeft);

  // Update document title
  useEffect(() => {
    document.title = timerState.isRunning 
      ? `${timeDisplay} - Pomodoro Timer`
      : '🍅 Pomodoro Timer';
  }, [timeDisplay, timerState.isRunning]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'Space') {
        e.preventDefault();
        if (timerState.isRunning) {
          pauseTimer();
        } else {
          startTimer();
        }
      } else if (e.code === 'KeyR') {
        e.preventDefault();
        resetTimer();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [timerState.isRunning, startTimer, pauseTimer, resetTimer]);

  // Cleanup interval on unmount
  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  return {
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
  };
};
