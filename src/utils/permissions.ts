import {Platform} from 'react-native';
import {
  PERMISSIONS,
  request,
  check,
  RESULTS,
  openSettings,
  Permission,
} from 'react-native-permissions';

export const requestMicrophonePermission = async (): Promise<boolean> => {
  const permission: Permission = Platform.select({
    ios: PERMISSIONS.IOS.MICROPHONE,
    android: PERMISSIONS.ANDROID.RECORD_AUDIO,
  })!;

  try {
    const result = await request(permission);

    switch (result) {
      case RESULTS.GRANTED:
        return true;
      case RESULTS.DENIED:
        return false;
      case RESULTS.BLOCKED:
        // Permission permanently denied, guide user to settings
        return false;
      case RESULTS.UNAVAILABLE:
        return false;
      default:
        return false;
    }
  } catch (error) {
    console.error('Error requesting microphone permission:', error);
    return false;
  }
};

export const checkMicrophonePermission = async (): Promise<boolean> => {
  const permission: Permission = Platform.select({
    ios: PERMISSIONS.IOS.MICROPHONE,
    android: PERMISSIONS.ANDROID.RECORD_AUDIO,
  })!;

  try {
    const result = await check(permission);
    return result === RESULTS.GRANTED;
  } catch (error) {
    console.error('Error checking microphone permission:', error);
    return false;
  }
};

export const openAppSettings = () => {
  openSettings();
};
