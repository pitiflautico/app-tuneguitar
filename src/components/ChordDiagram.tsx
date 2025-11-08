import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Svg, {Line, Circle, Text as SvgText} from 'react-native-svg';
import {Chord} from '../models/types';
import {getTheme} from '../constants/themes';
import {useApp} from '../context/AppContext';

interface ChordDiagramProps {
  chord: Chord;
  size?: number;
}

export const ChordDiagram: React.FC<ChordDiagramProps> = ({chord, size = 200}) => {
  const {settings} = useApp();
  const theme = getTheme(settings.theme);

  const numStrings = chord.fingers.length > 4 ? 6 : 4;
  const numFrets = 5;
  const stringSpacing = size / (numStrings + 1);
  const fretSpacing = size / (numFrets + 1);
  const padding = 30;

  const minFret = Math.min(...chord.fingers.filter(f => f.fret > 0).map(f => f.fret));
  const startFret = minFret > 3 ? minFret : 0;

  return (
    <View style={[styles.container, {backgroundColor: theme.cardBackground}]}>
      <Text style={[styles.chordName, {color: theme.text}]}>{chord.name}</Text>

      <Svg width={size + padding * 2} height={size + padding * 2}>
        {/* Strings (vertical lines) */}
        {Array.from({length: numStrings}).map((_, i) => (
          <Line
            key={`string-${i}`}
            x1={padding + stringSpacing * (i + 1)}
            y1={padding}
            x2={padding + stringSpacing * (i + 1)}
            y2={padding + size}
            stroke={theme.border}
            strokeWidth="2"
          />
        ))}

        {/* Frets (horizontal lines) */}
        {Array.from({length: numFrets + 1}).map((_, i) => (
          <Line
            key={`fret-${i}`}
            x1={padding}
            y1={padding + fretSpacing * i}
            x2={padding + size}
            y2={padding + fretSpacing * i}
            stroke={theme.border}
            strokeWidth={i === 0 ? '4' : '2'}
          />
        ))}

        {/* Finger positions */}
        {chord.fingers.map((finger, i) => {
          const stringX = padding + stringSpacing * (numStrings - finger.string + 1);

          if (finger.fret === 0) {
            // Open string - circle above nut
            return (
              <Circle
                key={`finger-${i}`}
                cx={stringX}
                cy={padding - 15}
                r="6"
                stroke={theme.primary}
                strokeWidth="2"
                fill="transparent"
              />
            );
          } else {
            // Fretted note
            const fretY =
              padding + fretSpacing * (finger.fret - startFret) - fretSpacing / 2;
            return (
              <React.Fragment key={`finger-${i}`}>
                <Circle
                  cx={stringX}
                  cy={fretY}
                  r="12"
                  fill={theme.primary}
                />
                {finger.finger && (
                  <SvgText
                    x={stringX}
                    y={fretY + 5}
                    fontSize="14"
                    fill={theme.background}
                    textAnchor="middle">
                    {finger.finger}
                  </SvgText>
                )}
              </React.Fragment>
            );
          }
        })}

        {/* Fret numbers */}
        {startFret > 0 && (
          <SvgText
            x={padding - 15}
            y={padding + fretSpacing / 2 + 5}
            fontSize="12"
            fill={theme.textSecondary}>
            {startFret}fr
          </SvgText>
        )}
      </Svg>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    marginVertical: 8,
  },
  chordName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
});
