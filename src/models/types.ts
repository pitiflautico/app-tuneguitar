export interface Instrument {
  id: string;
  name: string;
  icon: string;
  strings: InstrumentString[];
  tunings: Tuning[];
}

export interface InstrumentString {
  number: number;
  note: string;
  frequency: number;
  octave: number;
}

export interface Tuning {
  id: string;
  name: string;
  strings: InstrumentString[];
}

export interface Note {
  name: string;
  frequency: number;
  octave: number;
  cents: number; // Deviation from perfect pitch (-50 to +50)
}

export interface Chord {
  id: string;
  name: string;
  root: string;
  type: ChordType;
  fingers: ChordFinger[];
  instrument: string;
}

export interface ChordFinger {
  string: number;
  fret: number;
  finger?: number; // 1-4, undefined for open string
}

export type ChordType =
  | 'major'
  | 'minor'
  | 'seventh'
  | 'major7'
  | 'minor7'
  | 'sus2'
  | 'sus4'
  | 'dim'
  | 'aug';

export interface MetronomeSettings {
  bpm: number;
  timeSignature: TimeSignature;
  volume: number;
  accentFirstBeat: boolean;
}

export type TimeSignature = '4/4' | '3/4' | '6/8' | '2/4' | '5/4' | '7/8';

export interface UserSettings {
  referenceFrequency: number; // Default 440Hz
  microphoneSensitivity: number; // 0-100
  theme: Theme;
  selectedInstrument: string;
  selectedTuning: string;
  hasCompletedOnboarding: boolean;
  isPremium: boolean;
}

export type Theme = 'dark' | 'light' | 'vintage';

export interface EarTrainingExercise {
  id: string;
  level: number;
  notes: string[];
  correctAnswer: string;
  userAnswer?: string;
  isCorrect?: boolean;
}

export interface UserProgress {
  exercisesCompleted: number;
  currentLevel: number;
  correctAnswers: number;
  totalAnswers: number;
  lastPlayedDate: string;
}

export interface TunerReading {
  frequency: number;
  note: string;
  octave: number;
  cents: number;
  isInTune: boolean;
}
