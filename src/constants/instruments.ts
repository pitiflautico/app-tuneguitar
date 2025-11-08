import {Instrument, Tuning} from '../models/types';
import {getFrequency} from './notes';

// Guitar tunings
const GUITAR_STANDARD: Tuning = {
  id: 'guitar-standard',
  name: 'Standard',
  strings: [
    {number: 1, note: 'E', frequency: getFrequency('E', 4), octave: 4},
    {number: 2, note: 'B', frequency: getFrequency('B', 3), octave: 3},
    {number: 3, note: 'G', frequency: getFrequency('G', 3), octave: 3},
    {number: 4, note: 'D', frequency: getFrequency('D', 3), octave: 3},
    {number: 5, note: 'A', frequency: getFrequency('A', 2), octave: 2},
    {number: 6, note: 'E', frequency: getFrequency('E', 2), octave: 2},
  ],
};

const GUITAR_DROP_D: Tuning = {
  id: 'guitar-drop-d',
  name: 'Drop D',
  strings: [
    {number: 1, note: 'E', frequency: getFrequency('E', 4), octave: 4},
    {number: 2, note: 'B', frequency: getFrequency('B', 3), octave: 3},
    {number: 3, note: 'G', frequency: getFrequency('G', 3), octave: 3},
    {number: 4, note: 'D', frequency: getFrequency('D', 3), octave: 3},
    {number: 5, note: 'A', frequency: getFrequency('A', 2), octave: 2},
    {number: 6, note: 'D', frequency: getFrequency('D', 2), octave: 2},
  ],
};

const GUITAR_OPEN_G: Tuning = {
  id: 'guitar-open-g',
  name: 'Open G',
  strings: [
    {number: 1, note: 'D', frequency: getFrequency('D', 4), octave: 4},
    {number: 2, note: 'B', frequency: getFrequency('B', 3), octave: 3},
    {number: 3, note: 'G', frequency: getFrequency('G', 3), octave: 3},
    {number: 4, note: 'D', frequency: getFrequency('D', 3), octave: 3},
    {number: 5, note: 'G', frequency: getFrequency('G', 2), octave: 2},
    {number: 6, note: 'D', frequency: getFrequency('D', 2), octave: 2},
  ],
};

const GUITAR_HALF_STEP_DOWN: Tuning = {
  id: 'guitar-half-step-down',
  name: 'Half Step Down',
  strings: [
    {number: 1, note: 'D#', frequency: getFrequency('D#', 4), octave: 4},
    {number: 2, note: 'A#', frequency: getFrequency('A#', 3), octave: 3},
    {number: 3, note: 'F#', frequency: getFrequency('F#', 3), octave: 3},
    {number: 4, note: 'C#', frequency: getFrequency('C#', 3), octave: 3},
    {number: 5, note: 'G#', frequency: getFrequency('G#', 2), octave: 2},
    {number: 6, note: 'D#', frequency: getFrequency('D#', 2), octave: 2},
  ],
};

// Bass tunings
const BASS_STANDARD: Tuning = {
  id: 'bass-standard',
  name: 'Standard (4-string)',
  strings: [
    {number: 1, note: 'G', frequency: getFrequency('G', 2), octave: 2},
    {number: 2, note: 'D', frequency: getFrequency('D', 2), octave: 2},
    {number: 3, note: 'A', frequency: getFrequency('A', 1), octave: 1},
    {number: 4, note: 'E', frequency: getFrequency('E', 1), octave: 1},
  ],
};

const BASS_5STRING: Tuning = {
  id: 'bass-5string',
  name: 'Standard (5-string)',
  strings: [
    {number: 1, note: 'G', frequency: getFrequency('G', 2), octave: 2},
    {number: 2, note: 'D', frequency: getFrequency('D', 2), octave: 2},
    {number: 3, note: 'A', frequency: getFrequency('A', 1), octave: 1},
    {number: 4, note: 'E', frequency: getFrequency('E', 1), octave: 1},
    {number: 5, note: 'B', frequency: getFrequency('B', 0), octave: 0},
  ],
};

// Ukulele tunings
const UKULELE_STANDARD: Tuning = {
  id: 'ukulele-standard',
  name: 'Standard (GCEA)',
  strings: [
    {number: 1, note: 'A', frequency: getFrequency('A', 4), octave: 4},
    {number: 2, note: 'E', frequency: getFrequency('E', 4), octave: 4},
    {number: 3, note: 'C', frequency: getFrequency('C', 4), octave: 4},
    {number: 4, note: 'G', frequency: getFrequency('G', 4), octave: 4},
  ],
};

const UKULELE_BARITONE: Tuning = {
  id: 'ukulele-baritone',
  name: 'Baritone (DGBE)',
  strings: [
    {number: 1, note: 'E', frequency: getFrequency('E', 4), octave: 4},
    {number: 2, note: 'B', frequency: getFrequency('B', 3), octave: 3},
    {number: 3, note: 'G', frequency: getFrequency('G', 3), octave: 3},
    {number: 4, note: 'D', frequency: getFrequency('D', 3), octave: 3},
  ],
};

// Violin tuning
const VIOLIN_STANDARD: Tuning = {
  id: 'violin-standard',
  name: 'Standard',
  strings: [
    {number: 1, note: 'E', frequency: getFrequency('E', 5), octave: 5},
    {number: 2, note: 'A', frequency: getFrequency('A', 4), octave: 4},
    {number: 3, note: 'D', frequency: getFrequency('D', 4), octave: 4},
    {number: 4, note: 'G', frequency: getFrequency('G', 3), octave: 3},
  ],
};

// Mandolin tuning
const MANDOLIN_STANDARD: Tuning = {
  id: 'mandolin-standard',
  name: 'Standard',
  strings: [
    {number: 1, note: 'E', frequency: getFrequency('E', 5), octave: 5},
    {number: 2, note: 'A', frequency: getFrequency('A', 4), octave: 4},
    {number: 3, note: 'D', frequency: getFrequency('D', 4), octave: 4},
    {number: 4, note: 'G', frequency: getFrequency('G', 3), octave: 3},
  ],
};

// All instruments
export const INSTRUMENTS: Instrument[] = [
  {
    id: 'guitar',
    name: 'Guitar',
    icon: '🎸',
    strings: GUITAR_STANDARD.strings,
    tunings: [GUITAR_STANDARD, GUITAR_DROP_D, GUITAR_OPEN_G, GUITAR_HALF_STEP_DOWN],
  },
  {
    id: 'bass',
    name: 'Bass',
    icon: '🎸',
    strings: BASS_STANDARD.strings,
    tunings: [BASS_STANDARD, BASS_5STRING],
  },
  {
    id: 'ukulele',
    name: 'Ukulele',
    icon: '🎻',
    strings: UKULELE_STANDARD.strings,
    tunings: [UKULELE_STANDARD, UKULELE_BARITONE],
  },
  {
    id: 'violin',
    name: 'Violin',
    icon: '🎻',
    strings: VIOLIN_STANDARD.strings,
    tunings: [VIOLIN_STANDARD],
  },
  {
    id: 'mandolin',
    name: 'Mandolin',
    icon: '🎸',
    strings: MANDOLIN_STANDARD.strings,
    tunings: [MANDOLIN_STANDARD],
  },
];

export const DEFAULT_INSTRUMENT = INSTRUMENTS[0];
export const DEFAULT_TUNING = GUITAR_STANDARD;
