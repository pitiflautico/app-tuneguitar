import React, {useState, useEffect, useRef} from 'react';
import {View, Text, StyleSheet, SafeAreaView, Animated} from 'react-native';
import Slider from '@react-native-community/slider';
import {useApp} from '../context/AppContext';
import {getTheme} from '../constants/themes';
import {Button} from '../components/Button';
import {Card} from '../components/Card';
import {AdBanner} from '../components/AdBanner';
import {SoundGenerator} from '../core/SoundGenerator';
import {TimeSignature} from '../models/types';
import {calculateBeatInterval} from '../utils/helpers';

const TIME_SIGNATURES: TimeSignature[] = ['4/4', '3/4', '6/8', '2/4', '5/4', '7/8'];

interface MetronomeScreenProps {
  navigation: any;
}

export const MetronomeScreen: React.FC<MetronomeScreenProps> = ({navigation}) => {
  const {settings} = useApp();
  const theme = getTheme(settings.theme);

  const [bpm, setBpm] = useState(120);
  const [timeSignature, setTimeSignature] = useState<TimeSignature>('4/4');
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentBeat, setCurrentBeat] = useState(0);

  const soundGeneratorRef = useRef<SoundGenerator>(new SoundGenerator());
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const pulseAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    return () => {
      stopMetronome();
    };
  }, []);

  useEffect(() => {
    if (isPlaying) {
      stopMetronome();
      startMetronome();
    }
  }, [bpm, timeSignature]);

  const startMetronome = () => {
    const beats = parseInt(timeSignature.split('/')[0]);
    let beat = 0;

    const interval = calculateBeatInterval(bpm);

    intervalRef.current = setInterval(() => {
      const isAccent = beat === 0;
      soundGeneratorRef.current.playClick(isAccent);

      setCurrentBeat(beat + 1);
      animatePulse();

      beat = (beat + 1) % beats;
    }, interval);

    setIsPlaying(true);
  };

  const stopMetronome = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    setIsPlaying(false);
    setCurrentBeat(0);
  };

  const toggleMetronome = () => {
    if (isPlaying) {
      stopMetronome();
    } else {
      startMetronome();
    }
  };

  const animatePulse = () => {
    pulseAnim.setValue(1.2);
    Animated.spring(pulseAnim, {
      toValue: 1,
      useNativeDriver: true,
      friction: 3,
    }).start();
  };

  const cycleTimeSignature = () => {
    const currentIndex = TIME_SIGNATURES.indexOf(timeSignature);
    const nextIndex = (currentIndex + 1) % TIME_SIGNATURES.length;
    setTimeSignature(TIME_SIGNATURES[nextIndex]);
  };

  const beats = parseInt(timeSignature.split('/')[0]);

  return (
    <SafeAreaView style={[styles.container, {backgroundColor: theme.background}]}>
      <View style={styles.header}>
        <Button
          title="← Back"
          onPress={() => {
            stopMetronome();
            navigation.goBack();
          }}
          variant="outline"
          size="small"
        />
      </View>

      <View style={styles.content}>
        <Text style={[styles.title, {color: theme.text}]}>Metronome</Text>

        {/* Visual Beat Indicator */}
        <View style={styles.beatContainer}>
          <Animated.View
            style={[
              styles.beatCircle,
              {
                backgroundColor: theme.primary,
                transform: [{scale: pulseAnim}],
              },
            ]}>
            <Text style={[styles.beatNumber, {color: theme.background}]}>
              {currentBeat || '-'}
            </Text>
          </Animated.View>

          <View style={styles.beatDots}>
            {Array.from({length: beats}).map((_, i) => (
              <View
                key={i}
                style={[
                  styles.beatDot,
                  {
                    backgroundColor:
                      currentBeat === i + 1 ? theme.primary : theme.border,
                  },
                ]}
              />
            ))}
          </View>
        </View>

        {/* BPM Control */}
        <Card style={styles.bpmCard}>
          <Text style={[styles.label, {color: theme.textSecondary}]}>Tempo</Text>
          <Text style={[styles.bpmValue, {color: theme.text}]}>
            {bpm}
            <Text style={[styles.bpmLabel, {color: theme.textSecondary}]}> BPM</Text>
          </Text>

          <Slider
            style={styles.slider}
            minimumValue={20}
            maximumValue={300}
            step={1}
            value={bpm}
            onValueChange={setBpm}
            minimumTrackTintColor={theme.primary}
            maximumTrackTintColor={theme.border}
            thumbTintColor={theme.primary}
          />

          <View style={styles.bpmRange}>
            <Text style={[styles.rangeText, {color: theme.textSecondary}]}>20</Text>
            <Text style={[styles.rangeText, {color: theme.textSecondary}]}>300</Text>
          </View>

          {/* Preset buttons */}
          <View style={styles.presets}>
            {[60, 80, 100, 120, 140, 160].map(preset => (
              <Button
                key={preset}
                title={`${preset}`}
                onPress={() => setBpm(preset)}
                variant={bpm === preset ? 'primary' : 'outline'}
                size="small"
                style={styles.presetButton}
              />
            ))}
          </View>
        </Card>

        {/* Time Signature */}
        <Card style={styles.timeSignatureCard}>
          <Text style={[styles.label, {color: theme.textSecondary}]}>
            Time Signature
          </Text>
          <Button
            title={timeSignature}
            onPress={cycleTimeSignature}
            variant="outline"
            size="large"
            textStyle={styles.timeSignatureText}
          />
        </Card>

        {/* Play/Stop Button */}
        <Button
          title={isPlaying ? 'Stop' : 'Start'}
          onPress={toggleMetronome}
          variant={isPlaying ? 'secondary' : 'primary'}
          size="large"
          style={styles.playButton}
        />
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
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 24,
  },
  beatContainer: {
    alignItems: 'center',
    marginVertical: 40,
  },
  beatCircle: {
    width: 150,
    height: 150,
    borderRadius: 75,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  beatNumber: {
    fontSize: 48,
    fontWeight: 'bold',
  },
  beatDots: {
    flexDirection: 'row',
    gap: 8,
  },
  beatDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  bpmCard: {
    padding: 20,
    marginBottom: 16,
  },
  label: {
    fontSize: 12,
    textTransform: 'uppercase',
    marginBottom: 8,
  },
  bpmValue: {
    fontSize: 48,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  bpmLabel: {
    fontSize: 24,
  },
  slider: {
    width: '100%',
    height: 40,
    marginVertical: 8,
  },
  bpmRange: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  rangeText: {
    fontSize: 12,
  },
  presets: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  presetButton: {
    flex: 1,
    minWidth: 60,
  },
  timeSignatureCard: {
    padding: 20,
    marginBottom: 16,
  },
  timeSignatureText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  playButton: {
    width: '100%',
    marginTop: 8,
  },
});
