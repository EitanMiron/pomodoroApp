import React from 'react';
import {
  SettingsPanel,
  SettingsTitle,
  SettingGroup,
  SettingLabel,
  SettingInput,
  CheckboxLabel
} from '../styles/GlobalStyles';
import { TimerSettings } from '../types/timer';

interface SettingsProps {
  settings: TimerSettings;
  onSettingsChange: (settings: TimerSettings) => void;
}

const Settings = ({ settings, onSettingsChange }: SettingsProps): React.ReactElement => {
  const handleChange = (key: keyof TimerSettings, value: number | boolean) => {
    onSettingsChange({
      ...settings,
      [key]: value
    });
  };

  return (
    <SettingsPanel>
      <SettingsTitle>Settings</SettingsTitle>
      
      <SettingGroup>
        <SettingLabel htmlFor="focusTime">
          Focus Time (minutes)
        </SettingLabel>
        <SettingInput
          type="number"
          id="focusTime"
          value={settings.focus}
          min="1"
          max="60"
          onChange={(e) => handleChange('focus', parseInt(e.target.value) || 25)}
        />
      </SettingGroup>

      <SettingGroup>
        <SettingLabel htmlFor="shortBreakTime">
          Short Break (minutes)
        </SettingLabel>
        <SettingInput
          type="number"
          id="shortBreakTime"
          value={settings.shortBreak}
          min="1"
          max="30"
          onChange={(e) => handleChange('shortBreak', parseInt(e.target.value) || 5)}
        />
      </SettingGroup>

      <SettingGroup>
        <SettingLabel htmlFor="longBreakTime">
          Long Break (minutes)
        </SettingLabel>
        <SettingInput
          type="number"
          id="longBreakTime"
          value={settings.longBreak}
          min="1"
          max="60"
          onChange={(e) => handleChange('longBreak', parseInt(e.target.value) || 15)}
        />
      </SettingGroup>

      <SettingGroup>
        <CheckboxLabel>
          <input
            type="checkbox"
            checked={settings.soundEnabled}
            onChange={(e) => handleChange('soundEnabled', e.target.checked)}
          />
          Sound Notifications
        </CheckboxLabel>
      </SettingGroup>
    </SettingsPanel>
  );
};

export default Settings;
