import {Platform} from 'react-native';
import {check, PERMISSIONS, requestMultiple} from 'react-native-permissions';

export const requestAllPermissions = async () => {
  if (Platform.OS === 'android') {
    try {
      const micGranted = await check(PERMISSIONS.ANDROID.RECORD_AUDIO);
      const storageGranted = await check(
        PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE,
      );
      const storageReadGranted = await check(
        PERMISSIONS.ANDROID.READ_MEDIA_AUDIO,
      );

      if (
        micGranted !== 'granted' ||
        storageGranted !== 'granted' ||
        storageReadGranted !== 'granted'
      ) {
        await requestMultiple([
          PERMISSIONS.ANDROID.RECORD_AUDIO,
          PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE,
          PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE,
        ]);
      }
    } catch (error) {
      console.error('Permission request error:', error);
    }
  } else {
    //handle permissison for ios
  }
};
