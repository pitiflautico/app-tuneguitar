export class AdsManager {
  private tuneCount = 0;

  constructor() {
    console.log('📺 AdMob Manager initialized (demo mode)');
  }

  onTuneCompleted() {
    this.tuneCount++;
    console.log(`✅ Tune completed: ${this.tuneCount}`);
  }

  showInterstitial() {
    console.log('📺 Showing interstitial ad (demo mode)');
  }

  async showRewarded(): Promise<boolean> {
    console.log('🎁 Showing rewarded ad (demo mode)');
    return true;
  }

  getBannerAdUnitId(): string {
    return 'demo-banner-id';
  }

  getBannerAdSize(): any {
    return 'BANNER';
  }
}

export const adsManager = new AdsManager();
