import React, {useState, useRef} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {useApp} from '../context/AppContext';
import {getTheme} from '../constants/themes';
import {Button} from '../components/Button';
import {ChordDiagram} from '../components/ChordDiagram';
import {AdBanner} from '../components/AdBanner';
import {ALL_CHORDS} from '../constants/chords';
import {NOTE_NAMES, CHORD_TYPES} from '../constants/notes';
import {Chord, ChordType} from '../models/types';
import {SoundGenerator} from '../core/SoundGenerator';

interface ChordsScreenProps {
  navigation: any;
}

export const ChordsScreen: React.FC<ChordsScreenProps> = ({navigation}) => {
  const {settings, currentInstrument} = useApp();
  const theme = getTheme(settings.theme);

  const [selectedRoot, setSelectedRoot] = useState('C');
  const [selectedType, setSelectedType] = useState<ChordType>('major');

  const soundGeneratorRef = useRef<SoundGenerator>(new SoundGenerator());

  // Filter chords based on current instrument and selection
  const filteredChords = ALL_CHORDS.filter(
    chord =>
      chord.instrument === currentInstrument.id &&
      chord.root === selectedRoot &&
      chord.type === selectedType,
  );

  const currentChord = filteredChords[0];

  const playChord = () => {
    if (currentChord) {
      // Play each note in the chord sequentially (arpeggiated)
      currentChord.fingers.forEach((finger, index) => {
        const stringInfo = currentInstrument.strings.find(
          s => s.number === finger.string,
        );
        if (stringInfo) {
          const frequency =
            finger.fret === 0
              ? stringInfo.frequency
              : stringInfo.frequency * Math.pow(2, finger.fret / 12);

          setTimeout(() => {
            soundGeneratorRef.current.playTone(frequency, 500);
          }, index * 100);
        }
      });
    }
  };

  return (
    <SafeAreaView style={[styles.container, {backgroundColor: theme.background}]}>
      <View style={styles.header}>
        <Button
          title="← Back"
          onPress={() => navigation.goBack()}
          variant="outline"
          size="small"
        />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={[styles.title, {color: theme.text}]}>Chord Library</Text>
        <Text style={[styles.subtitle, {color: theme.textSecondary}]}>
          {currentInstrument.icon} {currentInstrument.name}
        </Text>

        {/* Root Note Selector */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, {color: theme.textSecondary}]}>
            Root Note
          </Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.noteScroll}>
            {NOTE_NAMES.map(note => (
              <TouchableOpacity
                key={note}
                style={[
                  styles.noteButton,
                  {
                    backgroundColor:
                      selectedRoot === note ? theme.primary : theme.surface,
                    borderColor: theme.border,
                  },
                ]}
                onPress={() => setSelectedRoot(note)}
                activeOpacity={0.7}>
                <Text
                  style={[
                    styles.noteText,
                    {
                      color:
                        selectedRoot === note ? theme.background : theme.text,
                    },
                  ]}>
                  {note}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Chord Type Selector */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, {color: theme.textSecondary}]}>
            Chord Type
          </Text>
          <View style={styles.typeGrid}>
            {CHORD_TYPES.map(type => (
              <TouchableOpacity
                key={type.id}
                style={[
                  styles.typeButton,
                  {
                    backgroundColor:
                      selectedType === type.id ? theme.primary : theme.surface,
                    borderColor: theme.border,
                  },
                ]}
                onPress={() => setSelectedType(type.id as ChordType)}
                activeOpacity={0.7}>
                <Text
                  style={[
                    styles.typeText,
                    {
                      color:
                        selectedType === type.id ? theme.background : theme.text,
                    },
                  ]}>
                  {type.name}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Chord Diagram */}
        {currentChord ? (
          <View style={styles.diagramSection}>
            <ChordDiagram chord={currentChord} size={220} />

            <Button
              title="Play Chord"
              onPress={playChord}
              variant="primary"
              size="large"
              style={styles.playButton}
            />

            <Text style={[styles.fingeringNote, {color: theme.textSecondary}]}>
              Numbers indicate which finger to use (1-4)
            </Text>
          </View>
        ) : (
          <View
            style={[
              styles.noChordContainer,
              {backgroundColor: theme.surface, borderColor: theme.border},
            ]}>
            <Text style={[styles.noChordText, {color: theme.textSecondary}]}>
              No chord diagram available for this combination
            </Text>
            <Text style={[styles.noChordHint, {color: theme.textSecondary}]}>
              Try selecting a different chord type or root note
            </Text>
          </View>
        )}

        <View style={{height: 40}} />
      </ScrollView>

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
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 4,
    paddingHorizontal: 20,
  },
  subtitle: {
    fontSize: 14,
    marginBottom: 24,
    paddingHorizontal: 20,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 12,
    textTransform: 'uppercase',
    marginBottom: 12,
    paddingHorizontal: 20,
  },
  noteScroll: {
    paddingLeft: 20,
  },
  noteButton: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 12,
    marginRight: 8,
    borderWidth: 1,
    minWidth: 60,
    alignItems: 'center',
  },
  noteText: {
    fontSize: 16,
    fontWeight: '600',
  },
  typeGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 20,
    gap: 8,
  },
  typeButton: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 12,
    borderWidth: 1,
  },
  typeText: {
    fontSize: 14,
    fontWeight: '500',
  },
  diagramSection: {
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  playButton: {
    width: '100%',
    marginTop: 16,
  },
  fingeringNote: {
    fontSize: 12,
    marginTop: 12,
    textAlign: 'center',
  },
  noChordContainer: {
    marginHorizontal: 20,
    padding: 40,
    borderRadius: 16,
    borderWidth: 1,
    alignItems: 'center',
  },
  noChordText: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 8,
  },
  noChordHint: {
    fontSize: 12,
    textAlign: 'center',
  },
});
