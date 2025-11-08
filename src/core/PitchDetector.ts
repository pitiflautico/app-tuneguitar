import {TunerReading} from '../models/types';
import {getNoteFromFrequency} from '../constants/notes';

export class PitchDetector {
  private isRecording: boolean = false;
  private callback: ((reading: TunerReading) => void) | null = null;
  private referenceFrequency: number = 440;
  private intervalId: NodeJS.Timeout | null = null;

  constructor() {}

  async start(
    callback: (reading: TunerReading) => void,
    sensitivity: number = 50,
    refFreq: number = 440,
  ) {
    this.callback = callback;
    this.referenceFrequency = refFreq;

    if (this.isRecording) {
      return;
    }

    this.isRecording = true;

    // Simulación para demo - genera lecturas aleatorias
    // En producción con Expo, usarías expo-av para audio real
    this.intervalId = setInterval(() => {
      if (this.callback) {
        const randomFreq = 80 + Math.random() * 800;
        const {note, octave, cents} = getNoteFromFrequency(
          randomFreq,
          this.referenceFrequency,
        );

        const reading: TunerReading = {
          frequency: randomFreq,
          note,
          octave,
          cents,
          isInTune: Math.abs(cents) < 10,
        };

        this.callback(reading);
      }
    }, 200);
  }

  async stop() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
    this.isRecording = false;
    this.callback = null;
  }

  isActive(): boolean {
    return this.isRecording;
  }
}
