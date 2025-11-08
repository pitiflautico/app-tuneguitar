import {Chord} from '../models/types';

// Common guitar chords
export const GUITAR_CHORDS: Chord[] = [
  // C chords
  {
    id: 'c-major',
    name: 'C',
    root: 'C',
    type: 'major',
    instrument: 'guitar',
    fingers: [
      {string: 1, fret: 0},
      {string: 2, fret: 1, finger: 1},
      {string: 3, fret: 0},
      {string: 4, fret: 2, finger: 2},
      {string: 5, fret: 3, finger: 3},
    ],
  },
  {
    id: 'c-minor',
    name: 'Cm',
    root: 'C',
    type: 'minor',
    instrument: 'guitar',
    fingers: [
      {string: 2, fret: 4, finger: 3},
      {string: 3, fret: 5, finger: 4},
      {string: 4, fret: 5, finger: 4},
      {string: 5, fret: 3, finger: 1},
    ],
  },
  // D chords
  {
    id: 'd-major',
    name: 'D',
    root: 'D',
    type: 'major',
    instrument: 'guitar',
    fingers: [
      {string: 1, fret: 2, finger: 2},
      {string: 2, fret: 3, finger: 3},
      {string: 3, fret: 2, finger: 1},
      {string: 4, fret: 0},
    ],
  },
  {
    id: 'd-minor',
    name: 'Dm',
    root: 'D',
    type: 'minor',
    instrument: 'guitar',
    fingers: [
      {string: 1, fret: 1, finger: 1},
      {string: 2, fret: 3, finger: 3},
      {string: 3, fret: 2, finger: 2},
      {string: 4, fret: 0},
    ],
  },
  // E chords
  {
    id: 'e-major',
    name: 'E',
    root: 'E',
    type: 'major',
    instrument: 'guitar',
    fingers: [
      {string: 1, fret: 0},
      {string: 2, fret: 0},
      {string: 3, fret: 1, finger: 1},
      {string: 4, fret: 2, finger: 3},
      {string: 5, fret: 2, finger: 2},
      {string: 6, fret: 0},
    ],
  },
  {
    id: 'e-minor',
    name: 'Em',
    root: 'E',
    type: 'minor',
    instrument: 'guitar',
    fingers: [
      {string: 1, fret: 0},
      {string: 2, fret: 0},
      {string: 3, fret: 0},
      {string: 4, fret: 2, finger: 2},
      {string: 5, fret: 2, finger: 1},
      {string: 6, fret: 0},
    ],
  },
  // G chords
  {
    id: 'g-major',
    name: 'G',
    root: 'G',
    type: 'major',
    instrument: 'guitar',
    fingers: [
      {string: 1, fret: 3, finger: 3},
      {string: 2, fret: 0},
      {string: 3, fret: 0},
      {string: 4, fret: 0},
      {string: 5, fret: 2, finger: 1},
      {string: 6, fret: 3, finger: 2},
    ],
  },
  // A chords
  {
    id: 'a-major',
    name: 'A',
    root: 'A',
    type: 'major',
    instrument: 'guitar',
    fingers: [
      {string: 1, fret: 0},
      {string: 2, fret: 2, finger: 1},
      {string: 3, fret: 2, finger: 2},
      {string: 4, fret: 2, finger: 3},
      {string: 5, fret: 0},
    ],
  },
  {
    id: 'a-minor',
    name: 'Am',
    root: 'A',
    type: 'minor',
    instrument: 'guitar',
    fingers: [
      {string: 1, fret: 0},
      {string: 2, fret: 1, finger: 1},
      {string: 3, fret: 2, finger: 3},
      {string: 4, fret: 2, finger: 2},
      {string: 5, fret: 0},
    ],
  },
  // F chords
  {
    id: 'f-major',
    name: 'F',
    root: 'F',
    type: 'major',
    instrument: 'guitar',
    fingers: [
      {string: 1, fret: 1, finger: 1},
      {string: 2, fret: 1, finger: 1},
      {string: 3, fret: 2, finger: 2},
      {string: 4, fret: 3, finger: 4},
      {string: 5, fret: 3, finger: 3},
      {string: 6, fret: 1, finger: 1},
    ],
  },
];

// Ukulele chords
export const UKULELE_CHORDS: Chord[] = [
  {
    id: 'uke-c-major',
    name: 'C',
    root: 'C',
    type: 'major',
    instrument: 'ukulele',
    fingers: [
      {string: 1, fret: 0},
      {string: 2, fret: 0},
      {string: 3, fret: 0},
      {string: 4, fret: 3, finger: 3},
    ],
  },
  {
    id: 'uke-g-major',
    name: 'G',
    root: 'G',
    type: 'major',
    instrument: 'ukulele',
    fingers: [
      {string: 1, fret: 0},
      {string: 2, fret: 2, finger: 1},
      {string: 3, fret: 3, finger: 2},
      {string: 4, fret: 2, finger: 1},
    ],
  },
  {
    id: 'uke-f-major',
    name: 'F',
    root: 'F',
    type: 'major',
    instrument: 'ukulele',
    fingers: [
      {string: 1, fret: 0},
      {string: 2, fret: 1, finger: 1},
      {string: 3, fret: 0},
      {string: 4, fret: 2, finger: 2},
    ],
  },
];

export const ALL_CHORDS = [...GUITAR_CHORDS, ...UKULELE_CHORDS];
