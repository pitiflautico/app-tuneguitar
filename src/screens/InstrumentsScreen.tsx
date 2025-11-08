import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Modal,
} from 'react-native';
import {useApp} from '../context/AppContext';
import {getTheme} from '../constants/themes';
import {Card} from '../components/Card';
import {Button} from '../components/Button';
import {INSTRUMENTS} from '../constants/instruments';
import {Instrument, Tuning} from '../models/types';

interface InstrumentsScreenProps {
  navigation: any;
}

export const InstrumentsScreen: React.FC<InstrumentsScreenProps> = ({navigation}) => {
  const {settings, currentInstrument, currentTuning, setInstrument, setTuning} = useApp();
  const theme = getTheme(settings.theme);

  const [selectedInstrument, setSelectedInstrument] = useState<Instrument | null>(null);
  const [showTuningsModal, setShowTuningsModal] = useState(false);

  const handleInstrumentPress = (instrument: Instrument) => {
    setSelectedInstrument(instrument);
    setShowTuningsModal(true);
  };

  const handleTuningSelect = (tuning: Tuning) => {
    if (selectedInstrument) {
      setInstrument(selectedInstrument.id);
      setTuning(tuning.id);
      setShowTuningsModal(false);
      navigation.goBack();
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
        <Text style={[styles.title, {color: theme.text}]}>Instruments</Text>
        <Text style={[styles.subtitle, {color: theme.textSecondary}]}>
          Select your instrument and tuning
        </Text>

        <View style={styles.instrumentList}>
          {INSTRUMENTS.map(instrument => {
            const isSelected = currentInstrument.id === instrument.id;

            return (
              <Card
                key={instrument.id}
                onPress={() => handleInstrumentPress(instrument)}
                style={[
                  styles.instrumentCard,
                  isSelected && {
                    borderWidth: 2,
                    borderColor: theme.primary,
                  },
                ]}>
                <View style={styles.instrumentContent}>
                  <Text style={styles.instrumentIcon}>{instrument.icon}</Text>
                  <View style={styles.instrumentInfo}>
                    <Text style={[styles.instrumentName, {color: theme.text}]}>
                      {instrument.name}
                    </Text>
                    <Text style={[styles.tuningCount, {color: theme.textSecondary}]}>
                      {instrument.tunings.length} tuning
                      {instrument.tunings.length > 1 ? 's' : ''} available
                    </Text>
                  </View>
                  {isSelected && (
                    <View style={[styles.selectedBadge, {backgroundColor: theme.primary}]}>
                      <Text style={styles.selectedText}>✓</Text>
                    </View>
                  )}
                </View>
              </Card>
            );
          })}
        </View>
      </ScrollView>

      {/* Tunings Modal */}
      <Modal
        visible={showTuningsModal}
        transparent
        animationType="slide"
        onRequestClose={() => setShowTuningsModal(false)}>
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, {backgroundColor: theme.surface}]}>
            <View style={styles.modalHeader}>
              <Text style={[styles.modalTitle, {color: theme.text}]}>
                {selectedInstrument?.icon} {selectedInstrument?.name}
              </Text>
              <TouchableOpacity onPress={() => setShowTuningsModal(false)}>
                <Text style={[styles.closeButton, {color: theme.textSecondary}]}>✕</Text>
              </TouchableOpacity>
            </View>

            <ScrollView style={styles.tuningsList} showsVerticalScrollIndicator={false}>
              {selectedInstrument?.tunings.map(tuning => {
                const isSelected = currentTuning.id === tuning.id;

                return (
                  <TouchableOpacity
                    key={tuning.id}
                    style={[
                      styles.tuningItem,
                      {
                        backgroundColor: isSelected
                          ? theme.primary + '20'
                          : 'transparent',
                        borderColor: theme.border,
                      },
                    ]}
                    onPress={() => handleTuningSelect(tuning)}
                    activeOpacity={0.7}>
                    <View>
                      <Text
                        style={[
                          styles.tuningName,
                          {color: isSelected ? theme.primary : theme.text},
                        ]}>
                        {tuning.name}
                      </Text>
                      <Text style={[styles.tuningNotes, {color: theme.textSecondary}]}>
                        {tuning.strings.map(s => s.note).join(' - ')}
                      </Text>
                    </View>
                    {isSelected && (
                      <Text style={[styles.checkmark, {color: theme.primary}]}>✓</Text>
                    )}
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
          </View>
        </View>
      </Modal>
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
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    marginBottom: 24,
  },
  instrumentList: {
    gap: 12,
    paddingBottom: 40,
  },
  instrumentCard: {
    padding: 16,
  },
  instrumentContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  instrumentIcon: {
    fontSize: 40,
  },
  instrumentInfo: {
    flex: 1,
  },
  instrumentName: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 4,
  },
  tuningCount: {
    fontSize: 12,
  },
  selectedBadge: {
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectedText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    maxHeight: '70%',
    paddingBottom: 40,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  closeButton: {
    fontSize: 28,
    paddingHorizontal: 8,
  },
  tuningsList: {
    padding: 20,
  },
  tuningItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    marginBottom: 8,
    borderWidth: 1,
  },
  tuningName: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  tuningNotes: {
    fontSize: 12,
  },
  checkmark: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});
