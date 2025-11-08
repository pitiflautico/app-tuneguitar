// Format frequency for display
export const formatFrequency = (freq: number): string => {
  return `${freq.toFixed(1)} Hz`;
};

// Format cents for display
export const formatCents = (cents: number): string => {
  const sign = cents > 0 ? '+' : '';
  return `${sign}${cents}`;
};

// Get tuning accuracy percentage
export const getTuningAccuracy = (cents: number): number => {
  const maxCents = 50;
  const accuracy = Math.max(0, 100 - (Math.abs(cents) / maxCents) * 100);
  return Math.round(accuracy);
};

// Get color for tuning indicator
export const getTuningColor = (cents: number, theme: any): string => {
  const absCents = Math.abs(cents);

  if (absCents < 10) {
    return theme.success;
  } else if (absCents < 25) {
    return theme.warning;
  } else {
    return theme.error;
  }
};

// Format time signature
export const formatTimeSignature = (ts: string): {beats: number; noteValue: number} => {
  const [beats, noteValue] = ts.split('/').map(Number);
  return {beats, noteValue};
};

// Calculate interval between beats (milliseconds)
export const calculateBeatInterval = (bpm: number): number => {
  return (60 / bpm) * 1000;
};

// Debounce function
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number,
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null;

  return function executedFunction(...args: Parameters<T>) {
    const later = () => {
      timeout = null;
      func(...args);
    };

    if (timeout) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(later, wait);
  };
}

// Generate unique ID
export const generateId = (): string => {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};
