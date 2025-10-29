export type TimerMode = 'focus' | 'shortBreak' | 'longBreak';

export interface TimerSettings {
  focus: number;
  shortBreak: number;
  longBreak: number;
  soundEnabled: boolean;
}

export interface TimerStats {
  completedPomodoros: number;
  totalFocusTime: number; // in seconds
  currentStreak: number;
  lastUsed: string;
}

export interface TimerState {
  currentMode: TimerMode;
  isRunning: boolean;
  timeLeft: number; // in seconds
  totalTime: number; // in seconds
  currentSession: number;
}

export interface StopwatchImageProps {
  progress: number; // 0 to 1
  timeDisplay: string;
  isRunning: boolean;
}
