import React from 'react';
import {View, StyleSheet} from 'react-native';
import {BannerAd, BannerAdSize} from 'react-native-google-mobile-ads';
import {adsManager} from '../core/AdsManager';
import {useApp} from '../context/AppContext';

export const AdBanner: React.FC = () => {
  const {settings} = useApp();

  // Don't show ads for premium users
  if (settings.isPremium) {
    return null;
  }

  return (
    <View style={styles.container}>
      <BannerAd
        unitId={adsManager.getBannerAdUnitId()}
        size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
        requestOptions={{
          requestNonPersonalizedAdsOnly: true,
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingVertical: 8,
  },
});
