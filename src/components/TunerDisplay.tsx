import React from 'react';
import {View, Text, StyleSheet, Animated} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {TunerReading} from '../models/types';
import {getTheme} from '../constants/themes';
import {useApp} from '../context/AppContext';
import {formatFrequency, formatCents, getTuningColor} from '../utils/helpers';

interface TunerDisplayProps {
  reading: TunerReading | null;
}

export const TunerDisplay: React.FC<TunerDisplayProps> = ({reading}) => {
  const {settings} = useApp();
  const theme = getTheme(settings.theme);
  const needleRotation = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    if (reading) {
      // Map cents (-50 to +50) to rotation (-45 to +45 degrees)
      const rotation = (reading.cents / 50) * 45;
      Animated.spring(needleRotation, {
        toValue: rotation,
        useNativeDriver: true,
        friction: 5,
      }).start();
    }
  }, [reading]);

  const needleStyle = {
    transform: [
      {
        rotate: needleRotation.interpolate({
          inputRange: [-45, 45],
          outputRange: ['-45deg', '45deg'],
        }),
      },
    ],
  };

  return (
    <View style={[styles.container, {backgroundColor: theme.tunerBackground}]}>
      {/* Note display */}
      {reading ? (
        <>
          <Text style={[styles.noteName, {color: theme.text}]}>
            {reading.note}
            <Text style={[styles.octave, {color: theme.textSecondary}]}>{reading.octave}</Text>
          </Text>

          <Text style={[styles.frequency, {color: theme.textSecondary}]}>
            {formatFrequency(reading.frequency)}
          </Text>

          {/* Tuning meter */}
          <View style={styles.meterContainer}>
            {/* Background arc */}
            <View style={styles.arcBackground}>
              <View style={[styles.arcLeft, {backgroundColor: theme.error}]} />
              <View style={[styles.arcCenter, {backgroundColor: theme.success}]} />
              <View style={[styles.arcRight, {backgroundColor: theme.error}]} />
            </View>

            {/* Needle */}
            <Animated.View
              style={[
                styles.needle,
                needleStyle,
                {backgroundColor: getTuningColor(reading.cents, theme)},
              ]}
            />

            {/* Center dot */}
            <View style={[styles.centerDot, {backgroundColor: theme.text}]} />
          </View>

          {/* Cents display */}
          <Text
            style={[
              styles.cents,
              {color: getTuningColor(reading.cents, theme)},
            ]}>
            {formatCents(reading.cents)} ¢
          </Text>

          {/* In-tune indicator */}
          {reading.isInTune && (
            <LinearGradient
              colors={[theme.success + '00', theme.success + '40', theme.success + '00']}
              style={styles.inTuneGlow}
              start={{x: 0, y: 0}}
              end={{x: 1, y: 0}}
            />
          )}
        </>
      ) : (
        <View style={styles.emptyState}>
          <Text style={[styles.emptyText, {color: theme.textSecondary}]}>
            Play a note to start tuning
          </Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 40,
    borderRadius: 20,
    marginHorizontal: 20,
  },
  noteName: {
    fontSize: 80,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  octave: {
    fontSize: 40,
  },
  frequency: {
    fontSize: 18,
    marginBottom: 30,
  },
  meterContainer: {
    width: 250,
    height: 125,
    alignItems: 'center',
    justifyContent: 'flex-end',
    position: 'relative',
    marginVertical: 20,
  },
  arcBackground: {
    width: 250,
    height: 125,
    flexDirection: 'row',
    position: 'absolute',
    bottom: 0,
  },
  arcLeft: {
    flex: 1,
    height: 8,
    borderTopLeftRadius: 125,
    borderBottomLeftRadius: 4,
    opacity: 0.3,
  },
  arcCenter: {
    width: 50,
    height: 8,
    opacity: 0.3,
  },
  arcRight: {
    flex: 1,
    height: 8,
    borderTopRightRadius: 125,
    borderBottomRightRadius: 4,
    opacity: 0.3,
  },
  needle: {
    width: 4,
    height: 100,
    borderRadius: 2,
    position: 'absolute',
    bottom: 0,
  },
  centerDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    position: 'absolute',
    bottom: -6,
    zIndex: 10,
  },
  cents: {
    fontSize: 24,
    fontWeight: '600',
    marginTop: 20,
  },
  inTuneGlow: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: 20,
  },
  emptyState: {
    paddingVertical: 60,
  },
  emptyText: {
    fontSize: 16,
    textAlign: 'center',
  },
});
