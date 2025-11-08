import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {useApp} from '../context/AppContext';
import {getTheme} from '../constants/themes';

export const AdBanner: React.FC = () => {
  const {settings} = useApp();
  const theme = getTheme(settings.theme);

  if (settings.isPremium) {
    return null;
  }

  return (
    <View style={[styles.container, {backgroundColor: theme.surface, borderTopColor: theme.border}]}>
      <Text style={[styles.text, {color: theme.textSecondary}]}>
        📺 Ad Banner (Demo Mode)
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingVertical: 12,
    borderTopWidth: 1,
  },
  text: {
    fontSize: 12,
  },
});
