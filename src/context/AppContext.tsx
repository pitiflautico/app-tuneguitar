import React, {createContext, useState, useContext, useEffect, ReactNode} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {UserSettings, UserProgress, Instrument, Tuning} from '../models/types';
import {DEFAULT_INSTRUMENT, DEFAULT_TUNING, INSTRUMENTS} from '../constants/instruments';

interface AppContextType {
  settings: UserSettings;
  updateSettings: (newSettings: Partial<UserSettings>) => Promise<void>;
  progress: UserProgress;
  updateProgress: (newProgress: Partial<UserProgress>) => Promise<void>;
  currentInstrument: Instrument;
  currentTuning: Tuning;
  setInstrument: (instrumentId: string) => void;
  setTuning: (tuningId: string) => void;
  isLoading: boolean;
}

const defaultSettings: UserSettings = {
  referenceFrequency: 440,
  microphoneSensitivity: 50,
  theme: 'dark',
  selectedInstrument: 'guitar',
  selectedTuning: 'guitar-standard',
  hasCompletedOnboarding: false,
  isPremium: false,
};

const defaultProgress: UserProgress = {
  exercisesCompleted: 0,
  currentLevel: 1,
  correctAnswers: 0,
  totalAnswers: 0,
  lastPlayedDate: new Date().toISOString(),
};

const AppContext = createContext<AppContextType | undefined>(undefined);

const SETTINGS_KEY = '@guitar_tuna_settings';
const PROGRESS_KEY = '@guitar_tuna_progress';

export const AppProvider: React.FC<{children: ReactNode}> = ({children}) => {
  const [settings, setSettings] = useState<UserSettings>(defaultSettings);
  const [progress, setProgress] = useState<UserProgress>(defaultProgress);
  const [currentInstrument, setCurrentInstrument] = useState<Instrument>(DEFAULT_INSTRUMENT);
  const [currentTuning, setCurrentTuning] = useState<Tuning>(DEFAULT_TUNING);
  const [isLoading, setIsLoading] = useState(true);

  // Load settings and progress on mount
  useEffect(() => {
    loadData();
  }, []);

  // Update instrument when settings change
  useEffect(() => {
    const instrument = INSTRUMENTS.find(i => i.id === settings.selectedInstrument);
    if (instrument) {
      setCurrentInstrument(instrument);
      const tuning = instrument.tunings.find(t => t.id === settings.selectedTuning);
      if (tuning) {
        setCurrentTuning(tuning);
      } else {
        setCurrentTuning(instrument.tunings[0]);
      }
    }
  }, [settings.selectedInstrument, settings.selectedTuning]);

  const loadData = async () => {
    try {
      const [settingsJson, progressJson] = await Promise.all([
        AsyncStorage.getItem(SETTINGS_KEY),
        AsyncStorage.getItem(PROGRESS_KEY),
      ]);

      if (settingsJson) {
        setSettings(JSON.parse(settingsJson));
      }
      if (progressJson) {
        setProgress(JSON.parse(progressJson));
      }
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const updateSettings = async (newSettings: Partial<UserSettings>) => {
    try {
      const updated = {...settings, ...newSettings};
      setSettings(updated);
      await AsyncStorage.setItem(SETTINGS_KEY, JSON.stringify(updated));
    } catch (error) {
      console.error('Error saving settings:', error);
    }
  };

  const updateProgress = async (newProgress: Partial<UserProgress>) => {
    try {
      const updated = {...progress, ...newProgress};
      setProgress(updated);
      await AsyncStorage.setItem(PROGRESS_KEY, JSON.stringify(updated));
    } catch (error) {
      console.error('Error saving progress:', error);
    }
  };

  const setInstrument = (instrumentId: string) => {
    const instrument = INSTRUMENTS.find(i => i.id === instrumentId);
    if (instrument) {
      updateSettings({
        selectedInstrument: instrumentId,
        selectedTuning: instrument.tunings[0].id,
      });
    }
  };

  const setTuning = (tuningId: string) => {
    updateSettings({selectedTuning: tuningId});
  };

  return (
    <AppContext.Provider
      value={{
        settings,
        updateSettings,
        progress,
        updateProgress,
        currentInstrument,
        currentTuning,
        setInstrument,
        setTuning,
        isLoading,
      }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
};
