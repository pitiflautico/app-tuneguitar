import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import {useApp} from '../context/AppContext';
import {getTheme} from '../constants/themes';
import {Button} from '../components/Button';
import {INSTRUMENTS} from '../constants/instruments';
import {requestMicrophonePermission} from '../utils/permissions';

const {width} = Dimensions.get('window');

interface OnboardingScreenProps {
  navigation: any;
}

export const OnboardingScreen: React.FC<OnboardingScreenProps> = ({navigation}) => {
  const {settings, updateSettings, setInstrument} = useApp();
  const theme = getTheme(settings.theme);
  const [step, setStep] = useState(0);
  const [selectedInstrumentId, setSelectedInstrumentId] = useState('guitar');

  const handleInstrumentSelect = (instrumentId: string) => {
    setSelectedInstrumentId(instrumentId);
  };

  const handleContinue = async () => {
    if (step === 0) {
      // Step 1: Instrument selection
      setInstrument(selectedInstrumentId);
      setStep(1);
    } else if (step === 1) {
      // Step 2: Microphone permission
      const granted = await requestMicrophonePermission();
      if (granted) {
        setStep(2);
      } else {
        // Show error or guide to settings
        alert('Microphone permission is required to use the tuner');
      }
    } else if (step === 2) {
      // Step 3: Complete onboarding
      await updateSettings({hasCompletedOnboarding: true});
      navigation.replace('Main');
    }
  };

  const renderStep = () => {
    switch (step) {
      case 0:
        return (
          <View style={styles.stepContainer}>
            <Text style={[styles.title, {color: theme.text}]}>
              Select Your Instrument
            </Text>
            <Text style={[styles.subtitle, {color: theme.textSecondary}]}>
              Choose your primary instrument to get started
            </Text>

            <View style={styles.instrumentGrid}>
              {INSTRUMENTS.map(instrument => (
                <TouchableOpacity
                  key={instrument.id}
                  style={[
                    styles.instrumentCard,
                    {
                      backgroundColor:
                        selectedInstrumentId === instrument.id
                          ? theme.primary
                          : theme.surface,
                      borderColor: theme.border,
                    },
                  ]}
                  onPress={() => handleInstrumentSelect(instrument.id)}
                  activeOpacity={0.7}>
                  <Text style={styles.instrumentIcon}>{instrument.icon}</Text>
                  <Text
                    style={[
                      styles.instrumentName,
                      {
                        color:
                          selectedInstrumentId === instrument.id
                            ? theme.background
                            : theme.text,
                      },
                    ]}>
                    {instrument.name}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        );

      case 1:
        return (
          <View style={styles.stepContainer}>
            <Text style={[styles.title, {color: theme.text}]}>
              Microphone Access
            </Text>
            <Text style={[styles.subtitle, {color: theme.textSecondary}]}>
              We need access to your microphone to detect the pitch of your instrument
            </Text>

            <View style={styles.permissionIcon}>
              <Text style={styles.microphoneIcon}>🎤</Text>
            </View>

            <Text style={[styles.description, {color: theme.textSecondary}]}>
              Your audio is processed locally on your device and never sent to any server
            </Text>
          </View>
        );

      case 2:
        return (
          <View style={styles.stepContainer}>
            <Text style={[styles.title, {color: theme.text}]}>All Set!</Text>
            <Text style={[styles.subtitle, {color: theme.textSecondary}]}>
              You're ready to start tuning
            </Text>

            <View style={styles.readyIcon}>
              <Text style={styles.checkIcon}>✅</Text>
            </View>

            <Text style={[styles.description, {color: theme.textSecondary}]}>
              Play a note on your instrument and watch the tuner detect the pitch in
              real-time
            </Text>
          </View>
        );

      default:
        return null;
    }
  };

  return (
    <View style={[styles.container, {backgroundColor: theme.background}]}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}>
        {renderStep()}

        <View style={styles.footer}>
          <View style={styles.stepIndicator}>
            {[0, 1, 2].map(i => (
              <View
                key={i}
                style={[
                  styles.stepDot,
                  {
                    backgroundColor: i === step ? theme.primary : theme.border,
                  },
                ]}
              />
            ))}
          </View>

          <Button
            title={step === 2 ? 'Start Tuning' : 'Continue'}
            onPress={handleContinue}
            size="large"
            style={styles.continueButton}
          />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'space-between',
    paddingVertical: 40,
  },
  stepContainer: {
    flex: 1,
    paddingHorizontal: 24,
    justifyContent: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 40,
  },
  description: {
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 20,
    paddingHorizontal: 20,
  },
  instrumentGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 16,
  },
  instrumentCard: {
    width: (width - 80) / 2,
    aspectRatio: 1,
    borderRadius: 16,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  instrumentIcon: {
    fontSize: 48,
    marginBottom: 12,
  },
  instrumentName: {
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  permissionIcon: {
    alignItems: 'center',
    marginVertical: 40,
  },
  microphoneIcon: {
    fontSize: 100,
  },
  readyIcon: {
    alignItems: 'center',
    marginVertical: 40,
  },
  checkIcon: {
    fontSize: 100,
  },
  footer: {
    paddingHorizontal: 24,
    paddingTop: 20,
  },
  stepIndicator: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 24,
    gap: 8,
  },
  stepDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  continueButton: {
    width: '100%',
  },
});
