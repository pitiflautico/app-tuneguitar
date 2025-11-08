export const requestMicrophonePermission = async (): Promise<boolean> => {
  // En Expo usarías expo-av y Audio.requestPermissionsAsync()
  // Para demo, siempre retorna true
  console.log('🎤 Requesting microphone permission (demo mode)');
  return true;
};

export const checkMicrophonePermission = async (): Promise<boolean> => {
  console.log('🎤 Checking microphone permission (demo mode)');
  return true;
};

export const openAppSettings = () => {
  console.log('⚙️ Opening app settings (demo mode)');
};
