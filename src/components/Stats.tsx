import React from 'react';
import {
  StatsSection,
  StatItem,
  StatNumber,
  StatLabel
} from '../styles/GlobalStyles';
import { TimerStats } from '../types/timer';

interface StatsProps {
  stats: TimerStats;
  currentSession: number;
}

const Stats = ({ stats, currentSession }: StatsProps): React.ReactElement => {
  const formatFocusTime = (totalSeconds: number): string => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    return `${hours}h ${minutes}m`;
  };


  return (
    <>
      <StatsSection>
        <StatItem>
          <StatNumber>{stats.completedPomodoros}</StatNumber>
          <StatLabel>Completed</StatLabel>
        </StatItem>
        <StatItem>
          <StatNumber>{formatFocusTime(stats.totalFocusTime)}</StatNumber>
          <StatLabel>Total Focus</StatLabel>
        </StatItem>
        <StatItem>
          <StatNumber>{stats.currentStreak}</StatNumber>
          <StatLabel>Daily Streak</StatLabel>
        </StatItem>
      </StatsSection>
    </>
  );
};

export default Stats;
