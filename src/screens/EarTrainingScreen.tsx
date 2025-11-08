import React, {useState, useRef, useEffect} from 'react';
import {View, Text, StyleSheet, SafeAreaView, TouchableOpacity, Alert} from 'react-native';
import {useApp} from '../context/AppContext';
import {getTheme} from '../constants/themes';
import {Button} from '../components/Button';
import {Card} from '../components/Card';
import {AdBanner} from '../components/AdBanner';
import {SoundGenerator} from '../core/SoundGenerator';
import {NOTE_NAMES, getFrequency} from '../constants/notes';
import {generateId} from '../utils/helpers';
import {adsManager} from '../core/AdsManager';

interface EarTrainingScreenProps {
  navigation: any;
}

export const EarTrainingScreen: React.FC<EarTrainingScreenProps> = ({navigation}) => {
  const {settings, progress, updateProgress} = useApp();
  const theme = getTheme(settings.theme);

  const [currentNote, setCurrentNote] = useState<string | null>(null);
  const [selectedNote, setSelectedNote] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [exerciseCount, setExerciseCount] = useState(0);

  const soundGeneratorRef = useRef<SoundGenerator>(new SoundGenerator());

  const generateNewExercise = () => {
    const randomNote = NOTE_NAMES[Math.floor(Math.random() * NOTE_NAMES.length)];
    setCurrentNote(randomNote);
    setSelectedNote(null);
    setShowResult(false);
    setIsCorrect(false);
  };

  useEffect(() => {
    generateNewExercise();
  }, []);

  const playNote = () => {
    if (currentNote) {
      const frequency = getFrequency(currentNote, 4);
      soundGeneratorRef.current.playTone(frequency, 1000);
    }
  };

  const handleNoteSelect = (note: string) => {
    setSelectedNote(note);
  };

  const checkAnswer = async () => {
    if (!selectedNote || !currentNote) {
      return;
    }

    const correct = selectedNote === currentNote;
    setIsCorrect(correct);
    setShowResult(true);

    // Update progress
    const newProgress = {
      totalAnswers: progress.totalAnswers + 1,
      correctAnswers: progress.correctAnswers + (correct ? 1 : 0),
      exercisesCompleted: progress.exercisesCompleted + 1,
      lastPlayedDate: new Date().toISOString(),
    };

    // Level up every 10 correct answers
    if (newProgress.correctAnswers % 10 === 0 && correct) {
      newProgress.currentLevel = progress.currentLevel + 1;
    }

    await updateProgress(newProgress);

    // Show rewarded ad every 5 exercises for premium features
    const newCount = exerciseCount + 1;
    setExerciseCount(newCount);

    if (newCount % 5 === 0 && !settings.isPremium) {
      setTimeout(() => {
        Alert.alert(
          'Unlock Premium',
          'Watch an ad to unlock advanced exercises and remove ads?',
          [
            {text: 'Not Now', style: 'cancel'},
            {
              text: 'Watch Ad',
              onPress: async () => {
                const rewarded = await adsManager.showRewarded();
                if (rewarded) {
                  Alert.alert('Great!', 'You earned 10 bonus points!');
                }
              },
            },
          ],
        );
      }, 1000);
    }
  };

  const nextExercise = () => {
    generateNewExercise();
  };

  const accuracy =
    progress.totalAnswers > 0
      ? Math.round((progress.correctAnswers / progress.totalAnswers) * 100)
      : 0;

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

      <View style={styles.content}>
        <Text style={[styles.title, {color: theme.text}]}>Ear Training</Text>

        {/* Progress Stats */}
        <View style={styles.statsRow}>
          <Card style={styles.statCard}>
            <Text style={[styles.statValue, {color: theme.primary}]}>
              {progress.currentLevel}
            </Text>
            <Text style={[styles.statLabel, {color: theme.textSecondary}]}>Level</Text>
          </Card>

          <Card style={styles.statCard}>
            <Text style={[styles.statValue, {color: theme.success}]}>{accuracy}%</Text>
            <Text style={[styles.statLabel, {color: theme.textSecondary}]}>
              Accuracy
            </Text>
          </Card>

          <Card style={styles.statCard}>
            <Text style={[styles.statValue, {color: theme.text}]}>
              {progress.exercisesCompleted}
            </Text>
            <Text style={[styles.statLabel, {color: theme.textSecondary}]}>
              Completed
            </Text>
          </Card>
        </View>

        {/* Exercise Card */}
        <Card style={styles.exerciseCard}>
          <Text style={[styles.instruction, {color: theme.textSecondary}]}>
            Listen and identify the note
          </Text>

          <TouchableOpacity
            style={[styles.playButton, {backgroundColor: theme.primary}]}
            onPress={playNote}
            activeOpacity={0.7}>
            <Text style={styles.playIcon}>🔊</Text>
          </TouchableOpacity>

          {showResult && (
            <View
              style={[
                styles.resultBanner,
                {
                  backgroundColor: isCorrect
                    ? theme.success + '20'
                    : theme.error + '20',
                },
              ]}>
              <Text
                style={[
                  styles.resultText,
                  {color: isCorrect ? theme.success : theme.error},
                ]}>
                {isCorrect ? '✓ Correct!' : `✗ Wrong! It was ${currentNote}`}
              </Text>
            </View>
          )}
        </Card>

        {/* Note Selection */}
        <View style={styles.noteGrid}>
          {NOTE_NAMES.map(note => {
            const isSelected = selectedNote === note;
            const isAnswer = showResult && note === currentNote;

            return (
              <TouchableOpacity
                key={note}
                style={[
                  styles.noteButton,
                  {
                    backgroundColor: isSelected
                      ? theme.primary
                      : isAnswer
                      ? theme.success
                      : theme.surface,
                    borderColor: theme.border,
                  },
                ]}
                onPress={() => !showResult && handleNoteSelect(note)}
                disabled={showResult}
                activeOpacity={0.7}>
                <Text
                  style={[
                    styles.noteButtonText,
                    {
                      color:
                        isSelected || isAnswer ? theme.background : theme.text,
                    },
                  ]}>
                  {note}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Action Buttons */}
        <View style={styles.actions}>
          {!showResult ? (
            <Button
              title="Check Answer"
              onPress={checkAnswer}
              variant="primary"
              size="large"
              disabled={!selectedNote}
              style={styles.actionButton}
            />
          ) : (
            <Button
              title="Next Exercise"
              onPress={nextExercise}
              variant="primary"
              size="large"
              style={styles.actionButton}
            />
          )}
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
    marginBottom: 20,
  },
  statsRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 20,
  },
  statCard: {
    flex: 1,
    padding: 16,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
  },
  exerciseCard: {
    padding: 32,
    alignItems: 'center',
    marginBottom: 24,
  },
  instruction: {
    fontSize: 14,
    marginBottom: 24,
    textAlign: 'center',
  },
  playButton: {
    width: 100,
    height: 100,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  playIcon: {
    fontSize: 40,
  },
  resultBanner: {
    marginTop: 20,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 12,
  },
  resultText: {
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  noteGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 24,
  },
  noteButton: {
    width: '23%',
    aspectRatio: 1,
    borderRadius: 12,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  noteButtonText: {
    fontSize: 18,
    fontWeight: '600',
  },
  actions: {
    marginTop: 'auto',
  },
  actionButton: {
    width: '100%',
  },
});
