import React, {useEffect} from 'react';
import {StatusBar} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import mobileAds from 'react-native-google-mobile-ads';
import {AppProvider, useApp} from './context/AppContext';
import {AppNavigator} from './navigation/AppNavigator';
import {getTheme} from './constants/themes';

// Initialize AdMob
mobileAds()
  .initialize()
  .then(adapterStatuses => {
    console.log('AdMob initialized:', adapterStatuses);
  })
  .catch(error => {
    console.error('AdMob initialization error:', error);
  });

const AppContent = () => {
  const {settings} = useApp();
  const theme = getTheme(settings.theme);

  return (
    <>
      <StatusBar
        barStyle={settings.theme === 'light' ? 'dark-content' : 'light-content'}
        backgroundColor={theme.background}
      />
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    </>
  );
};

const App = () => {
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <SafeAreaProvider>
        <AppProvider>
          <AppContent />
        </AppProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
};

export default App;
