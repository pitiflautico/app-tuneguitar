import React from 'react';
import {View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {StatusBar} from 'expo-status-bar';
import {AppProvider, useApp} from './context/AppContext';
import {AppNavigator} from './navigation/AppNavigator';

const AppContent = () => {
  const {settings} = useApp();

  return (
    <View style={{flex: 1}}>
      <StatusBar style={settings.theme === 'light' ? 'dark' : 'light'} />
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    </View>
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
