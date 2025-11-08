export class SoundGenerator {
  constructor() {}

  async playTone(frequency: number, duration: number = 1000): Promise<void> {
    // Versión demo - en producción usarías expo-av o Web Audio API
    console.log(`🎵 Playing tone: ${frequency.toFixed(1)}Hz for ${duration}ms`);
    return new Promise((resolve) => {
      setTimeout(resolve, duration);
    });
  }

  playClick(isAccent: boolean = false): void {
    console.log(`🥁 Click: ${isAccent ? 'ACCENT' : 'normal'}`);
  }

  releaseAll(): void {}

  stop(): void {}
}
