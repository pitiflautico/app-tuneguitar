import React from 'react';
import {Text} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {OnboardingScreen} from '../screens/OnboardingScreen';
import {TunerScreen} from '../screens/TunerScreen';
import {ManualTunerScreen} from '../screens/ManualTunerScreen';
import {InstrumentsScreen} from '../screens/InstrumentsScreen';
import {MetronomeScreen} from '../screens/MetronomeScreen';
import {ChordsScreen} from '../screens/ChordsScreen';
import {EarTrainingScreen} from '../screens/EarTrainingScreen';
import {SettingsScreen} from '../screens/SettingsScreen';
import {useApp} from '../context/AppContext';
import {getTheme} from '../constants/themes';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const MainTabs = () => {
  const {settings} = useApp();
  const theme = getTheme(settings.theme);

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: theme.surface,
          borderTopColor: theme.border,
          borderTopWidth: 1,
          paddingBottom: 8,
          paddingTop: 8,
          height: 70,
        },
        tabBarActiveTintColor: theme.primary,
        tabBarInactiveTintColor: theme.textSecondary,
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: '600',
        },
      }}>
      <Tab.Screen
        name="Tuner"
        component={TunerScreen}
        options={{
          tabBarLabel: 'Tuner',
          tabBarIcon: ({color}) => <TabIcon icon="🎸" color={color} />,
        }}
      />
      <Tab.Screen
        name="Metronome"
        component={MetronomeScreen}
        options={{
          tabBarLabel: 'Metronome',
          tabBarIcon: ({color}) => <TabIcon icon="⏱️" color={color} />,
        }}
      />
      <Tab.Screen
        name="Chords"
        component={ChordsScreen}
        options={{
          tabBarLabel: 'Chords',
          tabBarIcon: ({color}) => <TabIcon icon="🎵" color={color} />,
        }}
      />
      <Tab.Screen
        name="Training"
        component={EarTrainingScreen}
        options={{
          tabBarLabel: 'Training',
          tabBarIcon: ({color}) => <TabIcon icon="🎓" color={color} />,
        }}
      />
    </Tab.Navigator>
  );
};

const TabIcon: React.FC<{icon: string; color: string}> = ({icon}) => {
  return <Text style={{fontSize: 24}}>{icon}</Text>;
};

export const AppNavigator = () => {
  const {settings, isLoading} = useApp();

  if (isLoading) {
    return null; // Or a loading screen
  }

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: {backgroundColor: 'transparent'},
      }}>
      {!settings.hasCompletedOnboarding ? (
        <Stack.Screen name="Onboarding" component={OnboardingScreen} />
      ) : (
        <>
          <Stack.Screen name="Main" component={MainTabs} />
          <Stack.Screen name="ManualTuner" component={ManualTunerScreen} />
          <Stack.Screen name="Instruments" component={InstrumentsScreen} />
          <Stack.Screen name="Settings" component={SettingsScreen} />
        </>
      )}
    </Stack.Navigator>
  );
};
