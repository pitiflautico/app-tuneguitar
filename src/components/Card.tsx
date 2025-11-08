import React from 'react';
import {View, TouchableOpacity, StyleSheet, ViewStyle} from 'react-native';
import {getTheme} from '../constants/themes';
import {useApp} from '../context/AppContext';

interface CardProps {
  children: React.ReactNode;
  onPress?: () => void;
  style?: ViewStyle;
}

export const Card: React.FC<CardProps> = ({children, onPress, style}) => {
  const {settings} = useApp();
  const theme = getTheme(settings.theme);

  const cardStyle: ViewStyle = {
    backgroundColor: theme.cardBackground,
    borderRadius: 16,
    padding: 16,
    shadowColor: theme.shadow,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  };

  if (onPress) {
    return (
      <TouchableOpacity
        style={[cardStyle, style]}
        onPress={onPress}
        activeOpacity={0.7}>
        {children}
      </TouchableOpacity>
    );
  }

  return <View style={[cardStyle, style]}>{children}</View>;
};

const styles = StyleSheet.create({});
