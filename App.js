import React from 'react';
import { View, Text } from 'react-native';
import { registerRootComponent } from 'expo';

const App = () => {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#0A0E27'}}>
      <Text style={{color: '#FFFFFF', fontSize: 24}}>Guitar Tuna - Direct</Text>
    </View>
  );
};

registerRootComponent(App);
