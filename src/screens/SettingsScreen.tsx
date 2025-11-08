import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Switch,
  Alert,
} from 'react-native';
import Slider from '@react-native-community/slider';
import {useApp} from '../context/AppContext';
import {getTheme} from '../constants/themes';
import {Button} from '../components/Button';
import {Card} from '../components/Card';
import {Theme} from '../models/types';

interface SettingsScreenProps {
  navigation: any;
}

export const SettingsScreen: React.FC<SettingsScreenProps> = ({navigation}) => {
  const {settings, updateSettings, progress} = useApp();
  const theme = getTheme(settings.theme);

  const [referenceHz, setReferenceHz] = useState(settings.referenceFrequency.toString());

  const handleReferenceChange = (text: string) => {
    setReferenceHz(text);
    const value = parseFloat(text);
    if (!isNaN(value) && value >= 400 && value <= 480) {
      updateSettings({referenceFrequency: value});
    }
  };

  const resetToDefault = () => {
    Alert.alert(
      'Reset to Defaults',
      'Are you sure you want to reset all settings to default values?',
      [
        {text: 'Cancel', style: 'cancel'},
        {
          text: 'Reset',
          style: 'destructive',
          onPress: () => {
            updateSettings({
              referenceFrequency: 440,
              microphoneSensitivity: 50,
              theme: 'dark',
            });
            setReferenceHz('440');
          },
        },
      ],
    );
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
        <Text style={[styles.title, {color: theme.text}]}>Settings</Text>

        {/* Calibration Section */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, {color: theme.text}]}>Calibration</Text>

          <Card style={styles.settingCard}>
            <View style={styles.settingRow}>
              <View style={styles.settingInfo}>
                <Text style={[styles.settingLabel, {color: theme.text}]}>
                  Reference Frequency
                </Text>
                <Text style={[styles.settingDescription, {color: theme.textSecondary}]}>
                  Standard tuning reference (A4)
                </Text>
              </View>

              <View style={styles.inputContainer}>
                <TextInput
                  style={[
                    styles.input,
                    {
                      color: theme.text,
                      backgroundColor: theme.surface,
                      borderColor: theme.border,
                    },
                  ]}
                  value={referenceHz}
                  onChangeText={handleReferenceChange}
                  keyboardType="numeric"
                  placeholder="440"
                  placeholderTextColor={theme.textSecondary}
                />
                <Text style={[styles.unit, {color: theme.textSecondary}]}>Hz</Text>
              </View>
            </View>

            <Text style={[styles.hint, {color: theme.textSecondary}]}>
              Common values: 440Hz (standard), 432Hz (alternative), 442Hz (orchestral)
            </Text>
          </Card>
        </View>

        {/* Microphone Section */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, {color: theme.text}]}>Microphone</Text>

          <Card style={styles.settingCard}>
            <View style={styles.settingInfo}>
              <Text style={[styles.settingLabel, {color: theme.text}]}>Sensitivity</Text>
              <Text style={[styles.settingDescription, {color: theme.textSecondary}]}>
                Adjust how easily the tuner picks up sound
              </Text>
            </View>

            <View style={styles.sliderContainer}>
              <Text style={[styles.sliderValue, {color: theme.primary}]}>
                {settings.microphoneSensitivity}%
              </Text>
              <Slider
                style={styles.slider}
                minimumValue={0}
                maximumValue={100}
                step={5}
                value={settings.microphoneSensitivity}
                onValueChange={value =>
                  updateSettings({microphoneSensitivity: value})
                }
                minimumTrackTintColor={theme.primary}
                maximumTrackTintColor={theme.border}
                thumbTintColor={theme.primary}
              />
              <View style={styles.sliderLabels}>
                <Text style={[styles.sliderLabel, {color: theme.textSecondary}]}>
                  Low
                </Text>
                <Text style={[styles.sliderLabel, {color: theme.textSecondary}]}>
                  High
                </Text>
              </View>
            </View>
          </Card>
        </View>

        {/* Appearance Section */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, {color: theme.text}]}>Appearance</Text>

          <Card style={styles.settingCard}>
            <Text style={[styles.settingLabel, {color: theme.text}]}>Theme</Text>

            <View style={styles.themeButtons}>
              {(['dark', 'light', 'vintage'] as Theme[]).map(themeName => (
                <TouchableOpacity
                  key={themeName}
                  style={[
                    styles.themeButton,
                    {
                      backgroundColor:
                        settings.theme === themeName
                          ? theme.primary
                          : theme.surface,
                      borderColor: theme.border,
                    },
                  ]}
                  onPress={() => updateSettings({theme: themeName})}
                  activeOpacity={0.7}>
                  <Text
                    style={[
                      styles.themeButtonText,
                      {
                        color:
                          settings.theme === themeName
                            ? theme.background
                            : theme.text,
                      },
                    ]}>
                    {themeName.charAt(0).toUpperCase() + themeName.slice(1)}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </Card>
        </View>

        {/* Privacy Section */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, {color: theme.text}]}>Privacy</Text>

          <Card style={styles.settingCard}>
            <Text style={[styles.privacyText, {color: theme.text}]}>
              🔒 Your data is stored locally
            </Text>
            <Text style={[styles.privacyDescription, {color: theme.textSecondary}]}>
              This app works 100% offline. All your settings, progress, and audio
              processing happen on your device. No data is sent to external servers.
            </Text>
          </Card>
        </View>

        {/* About Section */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, {color: theme.text}]}>About</Text>

          <Card style={styles.settingCard}>
            <Text style={[styles.aboutTitle, {color: theme.text}]}>
              Guitar Tuna - Offline Tuner
            </Text>
            <Text style={[styles.version, {color: theme.textSecondary}]}>
              Version 1.0.0
            </Text>

            <View style={styles.stats}>
              <View style={styles.statItem}>
                <Text style={[styles.statValue, {color: theme.primary}]}>
                  {progress.exercisesCompleted}
                </Text>
                <Text style={[styles.statLabel, {color: theme.textSecondary}]}>
                  Exercises
                </Text>
              </View>

              <View style={styles.statItem}>
                <Text style={[styles.statValue, {color: theme.primary}]}>
                  {progress.currentLevel}
                </Text>
                <Text style={[styles.statLabel, {color: theme.textSecondary}]}>
                  Level
                </Text>
              </View>
            </View>
          </Card>
        </View>

        {/* Reset Button */}
        <Button
          title="Reset to Defaults"
          onPress={resetToDefault}
          variant="outline"
          style={styles.resetButton}
        />

        <View style={{height: 40}} />
      </ScrollView>
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
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
  },
  settingCard: {
    padding: 20,
  },
  settingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  settingInfo: {
    flex: 1,
  },
  settingLabel: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  settingDescription: {
    fontSize: 12,
    lineHeight: 16,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  input: {
    width: 80,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    borderWidth: 1,
    fontSize: 16,
    textAlign: 'center',
  },
  unit: {
    fontSize: 14,
  },
  hint: {
    fontSize: 11,
    lineHeight: 14,
  },
  sliderContainer: {
    marginTop: 16,
  },
  sliderValue: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 8,
  },
  slider: {
    width: '100%',
    height: 40,
  },
  sliderLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  sliderLabel: {
    fontSize: 12,
  },
  themeButtons: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 12,
  },
  themeButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: 1,
    alignItems: 'center',
  },
  themeButtonText: {
    fontSize: 14,
    fontWeight: '600',
  },
  privacyText: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  privacyDescription: {
    fontSize: 13,
    lineHeight: 18,
  },
  aboutTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 4,
  },
  version: {
    fontSize: 12,
    textAlign: 'center',
    marginBottom: 20,
  },
  stats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
  },
  resetButton: {
    width: '100%',
  },
});
