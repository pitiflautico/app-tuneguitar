import React, {useState, useEffect, useRef} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, SafeAreaView} from 'react-native';
import {useApp} from '../context/AppContext';
import {getTheme} from '../constants/themes';
import {TunerDisplay} from '../components/TunerDisplay';
import {AdBanner} from '../components/AdBanner';
import {Button} from '../components/Button';
import {PitchDetector} from '../core/PitchDetector';
import {TunerReading} from '../models/types';
import {checkMicrophonePermission, requestMicrophonePermission} from '../utils/permissions';
import {adsManager} from '../core/AdsManager';

interface TunerScreenProps {
  navigation: any;
}

export const TunerScreen: React.FC<TunerScreenProps> = ({navigation}) => {
  const {settings, currentInstrument, currentTuning} = useApp();
  const theme = getTheme(settings.theme);

  const [isListening, setIsListening] = useState(false);
  const [reading, setReading] = useState<TunerReading | null>(null);
  const [hasPermission, setHasPermission] = useState(false);

  const pitchDetectorRef = useRef<PitchDetector | null>(null);
  const wasInTuneRef = useRef(false);

  useEffect(() => {
    checkPermission();
    pitchDetectorRef.current = new PitchDetector();

    return () => {
      if (pitchDetectorRef.current) {
        pitchDetectorRef.current.stop();
      }
    };
  }, []);

  // Track when string gets in tune for ads
  useEffect(() => {
    if (reading?.isInTune && !wasInTuneRef.current) {
      wasInTuneRef.current = true;
      adsManager.onTuneCompleted();
    } else if (!reading?.isInTune) {
      wasInTuneRef.current = false;
    }
  }, [reading?.isInTune]);

  const checkPermission = async () => {
    const granted = await checkMicrophonePermission();
    setHasPermission(granted);
  };

  const toggleListening = async () => {
    if (!hasPermission) {
      const granted = await requestMicrophonePermission();
      setHasPermission(granted);
      if (!granted) {
        return;
      }
    }

    if (isListening) {
      await pitchDetectorRef.current?.stop();
      setIsListening(false);
      setReading(null);
    } else {
      await pitchDetectorRef.current?.start(
        (newReading) => {
          setReading(newReading);
        },
        settings.microphoneSensitivity,
        settings.referenceFrequency,
      );
      setIsListening(true);
    }
  };

  const goToManualMode = () => {
    if (isListening) {
      toggleListening();
    }
    navigation.navigate('ManualTuner');
  };

  return (
    <SafeAreaView style={[styles.container, {backgroundColor: theme.background}]}>
      <View style={styles.header}>
        <TouchableOpacity
          style={[styles.instrumentButton, {backgroundColor: theme.surface}]}
          onPress={() => navigation.navigate('Instruments')}>
          <Text style={[styles.instrumentIcon]}>{currentInstrument.icon}</Text>
          <View>
            <Text style={[styles.instrumentName, {color: theme.text}]}>
              {currentInstrument.name}
            </Text>
            <Text style={[styles.tuningName, {color: theme.textSecondary}]}>
              {currentTuning.name}
            </Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate('Settings')}
          style={[styles.settingsButton, {backgroundColor: theme.surface}]}>
          <Text style={styles.settingsIcon}>⚙️</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        <TunerDisplay reading={reading} />

        <View style={styles.controls}>
          <Button
            title={isListening ? 'Stop' : 'Start Tuning'}
            onPress={toggleListening}
            size="large"
            variant={isListening ? 'secondary' : 'primary'}
            style={styles.mainButton}
          />

          <Button
            title="Manual Mode"
            onPress={goToManualMode}
            variant="outline"
            style={styles.manualButton}
          />
        </View>
      </View>

      <AdBanner />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  instrumentButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    gap: 12,
  },
  instrumentIcon: {
    fontSize: 32,
  },
  instrumentName: {
    fontSize: 16,
    fontWeight: '600',
  },
  tuningName: {
    fontSize: 12,
  },
  settingsButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  settingsIcon: {
    fontSize: 24,
  },
  content: {
    flex: 1,
    justifyContent: 'space-between',
    paddingVertical: 20,
  },
  controls: {
    paddingHorizontal: 20,
    gap: 12,
  },
  mainButton: {
    width: '100%',
  },
  manualButton: {
    width: '100%',
  },
});
