// Musical notes and frequencies
export const NOTE_NAMES = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];

export const A4_FREQUENCY = 440;

// Calculate frequency for any note
export const getFrequency = (note: string, octave: number, a4Freq: number = A4_FREQUENCY): number => {
  const noteIndex = NOTE_NAMES.indexOf(note);
  if (noteIndex === -1) return 0;

  // A4 is at index 9, octave 4
  const semitonesFromA4 = (octave - 4) * 12 + (noteIndex - 9);
  return a4Freq * Math.pow(2, semitonesFromA4 / 12);
};

// Get note name from frequency
export const getNoteFromFrequency = (frequency: number, a4Freq: number = A4_FREQUENCY): {
  note: string;
  octave: number;
  cents: number;
} => {
  const semitonesFromA4 = 12 * Math.log2(frequency / a4Freq);
  const roundedSemitones = Math.round(semitonesFromA4);
  const cents = Math.round((semitonesFromA4 - roundedSemitones) * 100);

  const noteIndex = (9 + roundedSemitones) % 12;
  const octave = 4 + Math.floor((9 + roundedSemitones) / 12);

  return {
    note: NOTE_NAMES[noteIndex < 0 ? noteIndex + 12 : noteIndex],
    octave,
    cents,
  };
};

// Common chord types
export const CHORD_TYPES = [
  { id: 'major', name: 'Major', suffix: '' },
  { id: 'minor', name: 'Minor', suffix: 'm' },
  { id: 'seventh', name: 'Dominant 7th', suffix: '7' },
  { id: 'major7', name: 'Major 7th', suffix: 'maj7' },
  { id: 'minor7', name: 'Minor 7th', suffix: 'm7' },
  { id: 'sus2', name: 'Suspended 2nd', suffix: 'sus2' },
  { id: 'sus4', name: 'Suspended 4th', suffix: 'sus4' },
  { id: 'dim', name: 'Diminished', suffix: 'dim' },
  { id: 'aug', name: 'Augmented', suffix: 'aug' },
];
