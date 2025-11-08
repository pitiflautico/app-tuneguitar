import AudioRecorderPlayer from 'react-native-audio-recorder-player';
import {getNoteFromFrequency} from '../constants/notes';
import {TunerReading} from '../models/types';

export class PitchDetector {
  private audioRecorder: AudioRecorderPlayer;
  private isRecording: boolean = false;
  private callback: ((reading: TunerReading) => void) | null = null;
  private referenceFrequency: number = 440;

  constructor() {
    this.audioRecorder = new AudioRecorderPlayer();
  }

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

    try {
      this.isRecording = true;

      // Start recording with metering enabled
      await this.audioRecorder.startRecorder(undefined, {
        SampleRate: 22050,
        Channels: 1,
        AudioQuality: 'High',
        AudioEncoding: 'pcm_16bit',
        MeteringEnabled: true,
      });

      // Set up metering callback
      this.audioRecorder.addRecordBackListener(result => {
        if (result.currentMetering) {
          // Simulate pitch detection from metering
          // In a real implementation, you would process the audio buffer with FFT
          const simulatedPitch = this.simulatePitchDetection(result.currentMetering, sensitivity);

          if (simulatedPitch > 0 && this.callback) {
            const {note, octave, cents} = getNoteFromFrequency(
              simulatedPitch,
              this.referenceFrequency,
            );

            const reading: TunerReading = {
              frequency: simulatedPitch,
              note,
              octave,
              cents,
              isInTune: Math.abs(cents) < 10, // Within 10 cents is considered in tune
            };

            this.callback(reading);
          }
        }
      });
    } catch (error) {
      console.error('Error starting pitch detection:', error);
      this.isRecording = false;
    }
  }

  async stop() {
    if (!this.isRecording) {
      return;
    }

    try {
      await this.audioRecorder.stopRecorder();
      this.audioRecorder.removeRecordBackListener();
      this.isRecording = false;
      this.callback = null;
    } catch (error) {
      console.error('Error stopping pitch detection:', error);
    }
  }

  // Simulated pitch detection (placeholder for real FFT-based detection)
  private simulatePitchDetection(metering: number, sensitivity: number): number {
    // This is a simplified simulation
    // In a real app, you would:
    // 1. Get PCM audio buffer
    // 2. Apply window function (Hamming/Hann)
    // 3. Perform FFT
    // 4. Find peak frequency using autocorrelation or HPS
    // 5. Refine pitch with parabolic interpolation

    // For now, we'll use the metering to simulate detection
    // Metering is typically in dB (negative values)
    const normalizedMetering = Math.max(0, metering + 100) / 100; // Normalize to 0-1

    if (normalizedMetering < sensitivity / 100) {
      return 0; // Too quiet
    }

    // Simulate detecting frequencies in common guitar range (82-1318 Hz)
    // This is just a placeholder - real implementation would analyze actual audio
    const baseFreq = 82 + Math.random() * 400;
    return baseFreq;
  }

  isActive(): boolean {
    return this.isRecording;
  }
}
