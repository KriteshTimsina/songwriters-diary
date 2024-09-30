import {NavigationContainer} from '@react-navigation/native';
import {
  Alert,
  Animated,
  PermissionsAndroid,
  Platform,
  Pressable,
  StyleSheet,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';
import {Feather} from './components/icons';
import {Image} from 'react-native-svg';
import Onboarding from './components/svgs/Onboarding';
import CreateButton from './components/svgs/CreateButton';
import {List, Songs} from './components/svgs/TabBarIcons';
import {Home, Todo} from './screens';
import {TabbarTop} from './navigation';
import HomeStack from './navigation/HomeStack';
import TabNavigation from './navigation/TabNavigation';
import SongProvider from './context/SongContext';
import {
  check,
  PERMISSIONS,
  request,
  requestMultiple,
  RESULTS,
} from 'react-native-permissions';
import {useEffect} from 'react';

export default function App() {
  useEffect(() => {
    requestAllPermissions();
  }, []);

  const requestAllPermissions = async () => {
    if (Platform.OS === 'android') {
      try {
        const permissionResults = await requestMultiple([
          PERMISSIONS.ANDROID.RECORD_AUDIO,
          PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE,
          PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE,
        ]);
        console.log(permissionResults, 'Permissions');
      } catch (error) {
        console.error('Permission request error:', error);
      }
    } else {
      Alert.alert('Permissions are for Android only.');
    }
  };

  return (
    <NavigationContainer>
      <SongProvider>
        <HomeStack />
      </SongProvider>
    </NavigationContainer>
  );
}
