import Sound from 'react-native-sound';
import {Platform} from 'react-native';

// Enable playback in silent mode (iOS)
Sound.setCategory('Playback');

export class SoundGenerator {
  private sounds: Map<string, Sound> = new Map();
  private currentSound: Sound | null = null;

  constructor() {
    // Pre-load some basic sounds
    // In a real app, you would have actual audio files for each note
  }

  // Play a tone at a specific frequency
  async playTone(frequency: number, duration: number = 1000): Promise<void> {
    return new Promise((resolve, reject) => {
      // In a real implementation, you would either:
      // 1. Have pre-recorded audio files for each note
      // 2. Generate tones programmatically using Web Audio API equivalent
      // 3. Use a native module for tone generation

      // For this offline app, we'll use pre-recorded samples
      const noteName = this.getNoteName(frequency);
      const soundKey = `tone_${noteName}`;

      // Check if we have this sound cached
      if (this.sounds.has(soundKey)) {
        const sound = this.sounds.get(soundKey)!;
        this.playSound(sound, duration, resolve);
      } else {
        // Try to load the sound file
        // Sound files should be in assets/sounds/ folder
        const soundPath = Platform.select({
          ios: `sounds/${noteName}.mp3`,
          android: `sounds_${noteName.toLowerCase()}.mp3`,
        });

        const sound = new Sound(soundPath!, Sound.MAIN_BUNDLE, error => {
          if (error) {
            // If sound file doesn't exist, we'll use a fallback
            console.warn(`Sound file not found: ${soundPath}`, error);
            resolve();
            return;
          }

          this.sounds.set(soundKey, sound);
          this.playSound(sound, duration, resolve);
        });
      }
    });
  }

  private playSound(sound: Sound, duration: number, callback: () => void) {
    // Stop current sound if playing
    if (this.currentSound) {
      this.currentSound.stop();
    }

    this.currentSound = sound;

    sound.play(success => {
      if (success) {
        callback();
      } else {
        console.error('Failed to play sound');
        callback();
      }
    });

    // Auto-stop after duration
    setTimeout(() => {
      sound.stop();
      if (this.currentSound === sound) {
        this.currentSound = null;
      }
    }, duration);
  }

  private getNoteName(frequency: number): string {
    const notes = ['C', 'Cs', 'D', 'Ds', 'E', 'F', 'Fs', 'G', 'Gs', 'A', 'As', 'B'];
    const a4 = 440;
    const c0 = a4 * Math.pow(2, -4.75);
    const halfSteps = Math.round(12 * Math.log2(frequency / c0));
    const octave = Math.floor(halfSteps / 12);
    const note = notes[halfSteps % 12];
    return `${note}${octave}`;
  }

  // Play metronome click
  playClick(isAccent: boolean = false): void {
    const soundFile = isAccent ? 'metronome_accent.mp3' : 'metronome_click.mp3';
    const soundKey = isAccent ? 'metro_accent' : 'metro_click';

    if (this.sounds.has(soundKey)) {
      const sound = this.sounds.get(soundKey)!;
      sound.play();
    } else {
      const sound = new Sound(soundFile, Sound.MAIN_BUNDLE, error => {
        if (!error) {
          this.sounds.set(soundKey, sound);
          sound.play();
        }
      });
    }
  }

  // Release all sounds
  releaseAll(): void {
    if (this.currentSound) {
      this.currentSound.stop();
      this.currentSound = null;
    }

    this.sounds.forEach(sound => {
      sound.release();
    });
    this.sounds.clear();
  }

  stop(): void {
    if (this.currentSound) {
      this.currentSound.stop();
      this.currentSound = null;
    }
  }
}
