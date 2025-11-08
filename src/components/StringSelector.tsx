import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {InstrumentString} from '../models/types';
import {getTheme} from '../constants/themes';
import {useApp} from '../context/AppContext';

interface StringSelectorProps {
  strings: InstrumentString[];
  selectedString: InstrumentString | null;
  onSelectString: (string: InstrumentString) => void;
}

export const StringSelector: React.FC<StringSelectorProps> = ({
  strings,
  selectedString,
  onSelectString,
}) => {
  const {settings} = useApp();
  const theme = getTheme(settings.theme);

  return (
    <View style={styles.container}>
      {strings.map((string) => {
        const isSelected = selectedString?.number === string.number;

        return (
          <TouchableOpacity
            key={string.number}
            style={[
              styles.stringButton,
              {
                backgroundColor: isSelected ? theme.primary : theme.surface,
                borderColor: theme.border,
              },
            ]}
            onPress={() => onSelectString(string)}
            activeOpacity={0.7}>
            <Text
              style={[
                styles.stringNumber,
                {color: isSelected ? theme.background : theme.textSecondary},
              ]}>
              {string.number}
            </Text>
            <Text
              style={[
                styles.noteName,
                {color: isSelected ? theme.background : theme.text},
              ]}>
              {string.note}
            </Text>
            <Text
              style={[
                styles.frequency,
                {color: isSelected ? theme.background : theme.textSecondary},
              ]}>
              {string.frequency.toFixed(1)}Hz
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    paddingHorizontal: 20,
    marginVertical: 20,
  },
  stringButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    paddingHorizontal: 20,
    marginVertical: 6,
    borderRadius: 12,
    borderWidth: 1,
  },
  stringNumber: {
    fontSize: 18,
    fontWeight: '600',
    width: 30,
  },
  noteName: {
    fontSize: 24,
    fontWeight: 'bold',
    flex: 1,
    textAlign: 'center',
  },
  frequency: {
    fontSize: 14,
    width: 80,
    textAlign: 'right',
  },
});
