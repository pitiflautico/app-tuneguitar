import {
  BannerAd,
  BannerAdSize,
  InterstitialAd,
  RewardedAd,
  TestIds,
  AdEventType,
  RewardedAdEventType,
} from 'react-native-google-mobile-ads';
import {Platform} from 'react-native';

// Test IDs for development
const BANNER_AD_ID = __DEV__
  ? TestIds.BANNER
  : Platform.select({
      ios: 'ca-app-pub-xxxxxxxxxxxxx/xxxxxxxxxxxxx',
      android: 'ca-app-pub-xxxxxxxxxxxxx/xxxxxxxxxxxxx',
    })!;

const INTERSTITIAL_AD_ID = __DEV__
  ? TestIds.INTERSTITIAL
  : Platform.select({
      ios: 'ca-app-pub-xxxxxxxxxxxxx/xxxxxxxxxxxxx',
      android: 'ca-app-pub-xxxxxxxxxxxxx/xxxxxxxxxxxxx',
    })!;

const REWARDED_AD_ID = __DEV__
  ? TestIds.REWARDED
  : Platform.select({
      ios: 'ca-app-pub-xxxxxxxxxxxxx/xxxxxxxxxxxxx',
      android: 'ca-app-pub-xxxxxxxxxxxxx/xxxxxxxxxxxxx',
    })!;

export class AdsManager {
  private interstitialAd: InterstitialAd | null = null;
  private rewardedAd: RewardedAd | null = null;
  private interstitialLoaded = false;
  private rewardedLoaded = false;
  private tuneCount = 0;

  constructor() {
    this.loadInterstitial();
    this.loadRewarded();
  }

  // Load interstitial ad
  private loadInterstitial() {
    this.interstitialAd = InterstitialAd.createForAdRequest(INTERSTITIAL_AD_ID);

    this.interstitialAd.addAdEventListener(AdEventType.LOADED, () => {
      this.interstitialLoaded = true;
    });

    this.interstitialAd.addAdEventListener(AdEventType.CLOSED, () => {
      this.interstitialLoaded = false;
      this.loadInterstitial(); // Reload for next time
    });

    this.interstitialAd.load();
  }

  // Load rewarded ad
  private loadRewarded() {
    this.rewardedAd = RewardedAd.createForAdRequest(REWARDED_AD_ID);

    this.rewardedAd.addAdEventListener(RewardedAdEventType.LOADED, () => {
      this.rewardedLoaded = true;
    });

    this.rewardedAd.addAdEventListener(RewardedAdEventType.EARNED_REWARD, reward => {
      console.log('User earned reward:', reward);
    });

    this.rewardedAd.addAdEventListener(AdEventType.CLOSED, () => {
      this.rewardedLoaded = false;
      this.loadRewarded(); // Reload for next time
    });

    this.rewardedAd.load();
  }

  // Show interstitial ad after X tunes
  onTuneCompleted() {
    this.tuneCount++;

    // Show interstitial every 5 successful tunes
    if (this.tuneCount >= 5) {
      this.showInterstitial();
      this.tuneCount = 0;
    }
  }

  // Show interstitial ad
  showInterstitial() {
    if (this.interstitialLoaded && this.interstitialAd) {
      this.interstitialAd.show();
    }
  }

  // Show rewarded ad
  async showRewarded(): Promise<boolean> {
    return new Promise((resolve) => {
      if (this.rewardedLoaded && this.rewardedAd) {
        // Set up one-time listener for reward
        const unsubscribe = this.rewardedAd.addAdEventListener(
          RewardedAdEventType.EARNED_REWARD,
          () => {
            unsubscribe();
            resolve(true);
          },
        );

        // Also listen for close without reward
        const closeListener = this.rewardedAd.addAdEventListener(
          AdEventType.CLOSED,
          () => {
            closeListener();
            setTimeout(() => resolve(false), 100);
          },
        );

        this.rewardedAd.show();
      } else {
        resolve(false);
      }
    });
  }

  // Get banner ad unit ID
  getBannerAdUnitId(): string {
    return BANNER_AD_ID;
  }

  // Get banner ad size
  getBannerAdSize(): BannerAdSize {
    return BannerAdSize.ANCHORED_ADAPTIVE_BANNER;
  }
}

export const adsManager = new AdsManager();
