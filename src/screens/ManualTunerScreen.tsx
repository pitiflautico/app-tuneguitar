import React, {useState, useRef} from 'react';
import {View, Text, StyleSheet, SafeAreaView} from 'react-native';
import {useApp} from '../context/AppContext';
import {getTheme} from '../constants/themes';
import {StringSelector} from '../components/StringSelector';
import {AdBanner} from '../components/AdBanner';
import {Button} from '../components/Button';
import {InstrumentString} from '../models/types';
import {SoundGenerator} from '../core/SoundGenerator';

interface ManualTunerScreenProps {
  navigation: any;
}

export const ManualTunerScreen: React.FC<ManualTunerScreenProps> = ({navigation}) => {
  const {settings, currentTuning} = useApp();
  const theme = getTheme(settings.theme);

  const [selectedString, setSelectedString] = useState<InstrumentString | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const soundGeneratorRef = useRef<SoundGenerator>(new SoundGenerator());

  const handleSelectString = (string: InstrumentString) => {
    setSelectedString(string);
  };

  const playReferenceTone = async () => {
    if (!selectedString) {
      return;
    }

    setIsPlaying(true);
    await soundGeneratorRef.current.playTone(selectedString.frequency, 2000);
    setTimeout(() => setIsPlaying(false), 2000);
  };

  const stopTone = () => {
    soundGeneratorRef.current.stop();
    setIsPlaying(false);
  };

  return (
    <SafeAreaView style={[styles.container, {backgroundColor: theme.background}]}>
      <View style={styles.header}>
        <Button
          title="← Auto Mode"
          onPress={() => navigation.goBack()}
          variant="outline"
          size="small"
        />
      </View>

      <View style={styles.content}>
        <View style={styles.titleContainer}>
          <Text style={[styles.title, {color: theme.text}]}>Manual Tuner</Text>
          <Text style={[styles.subtitle, {color: theme.textSecondary}]}>
            Select a string to hear its reference tone
          </Text>
        </View>

        <StringSelector
          strings={currentTuning.strings}
          selectedString={selectedString}
          onSelectString={handleSelectString}
        />

        {selectedString && (
          <View style={styles.selectedInfo}>
            <View
              style={[
                styles.selectedCard,
                {backgroundColor: theme.surface, borderColor: theme.primary},
              ]}>
              <Text style={[styles.selectedLabel, {color: theme.textSecondary}]}>
                Selected String
              </Text>
              <Text style={[styles.selectedNote, {color: theme.text}]}>
                {selectedString.note}
                <Text style={[styles.selectedOctave, {color: theme.textSecondary}]}>
                  {selectedString.octave}
                </Text>
              </Text>
              <Text style={[styles.selectedFreq, {color: theme.textSecondary}]}>
                {selectedString.frequency.toFixed(1)} Hz
              </Text>

              <Button
                title={isPlaying ? 'Stop' : 'Play Reference Tone'}
                onPress={isPlaying ? stopTone : playReferenceTone}
                variant={isPlaying ? 'secondary' : 'primary'}
                size="large"
                style={styles.playButton}
              />
            </View>

            <Text style={[styles.instructions, {color: theme.textSecondary}]}>
              Play your instrument's string and match it to the reference tone. Tune
              until both sounds blend perfectly.
            </Text>
          </View>
        )}
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
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  content: {
    flex: 1,
  },
  titleContainer: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
  },
  selectedInfo: {
    paddingHorizontal: 20,
    marginTop: 20,
  },
  selectedCard: {
    padding: 24,
    borderRadius: 16,
    alignItems: 'center',
    borderWidth: 2,
  },
  selectedLabel: {
    fontSize: 12,
    textTransform: 'uppercase',
    marginBottom: 8,
  },
  selectedNote: {
    fontSize: 48,
    fontWeight: 'bold',
  },
  selectedOctave: {
    fontSize: 24,
  },
  selectedFreq: {
    fontSize: 16,
    marginBottom: 20,
  },
  playButton: {
    width: '100%',
  },
  instructions: {
    fontSize: 14,
    lineHeight: 20,
    textAlign: 'center',
    marginTop: 16,
    paddingHorizontal: 20,
  },
});
