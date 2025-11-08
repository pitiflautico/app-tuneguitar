import {Theme} from '../models/types';

export interface ThemeColors {
  primary: string;
  secondary: string;
  background: string;
  surface: string;
  text: string;
  textSecondary: string;
  border: string;
  success: string;
  warning: string;
  error: string;
  tunerNeedle: string;
  tunerBackground: string;
  cardBackground: string;
  shadow: string;
}

export const DARK_THEME: ThemeColors = {
  primary: '#4A9EFF',
  secondary: '#7B61FF',
  background: '#0A0E27',
  surface: '#1A1F3A',
  text: '#FFFFFF',
  textSecondary: '#A0AEC0',
  border: '#2D3748',
  success: '#48BB78',
  warning: '#F6AD55',
  error: '#FC8181',
  tunerNeedle: '#4A9EFF',
  tunerBackground: '#1A1F3A',
  cardBackground: '#1E2640',
  shadow: 'rgba(0, 0, 0, 0.5)',
};

export const LIGHT_THEME: ThemeColors = {
  primary: '#3182CE',
  secondary: '#805AD5',
  background: '#F7FAFC',
  surface: '#FFFFFF',
  text: '#1A202C',
  textSecondary: '#718096',
  border: '#E2E8F0',
  success: '#38A169',
  warning: '#DD6B20',
  error: '#E53E3E',
  tunerNeedle: '#3182CE',
  tunerBackground: '#FFFFFF',
  cardBackground: '#FFFFFF',
  shadow: 'rgba(0, 0, 0, 0.1)',
};

export const VINTAGE_THEME: ThemeColors = {
  primary: '#D4A574',
  secondary: '#8B6F47',
  background: '#2C2416',
  surface: '#3D3426',
  text: '#F5E6D3',
  textSecondary: '#B8A894',
  border: '#5C4E3A',
  success: '#7A9D54',
  warning: '#C68642',
  error: '#A04747',
  tunerNeedle: '#D4A574',
  tunerBackground: '#3D3426',
  cardBackground: '#4A3F2E',
  shadow: 'rgba(0, 0, 0, 0.6)',
};

export const getTheme = (themeName: Theme): ThemeColors => {
  switch (themeName) {
    case 'light':
      return LIGHT_THEME;
    case 'vintage':
      return VINTAGE_THEME;
    case 'dark':
    default:
      return DARK_THEME;
  }
};
