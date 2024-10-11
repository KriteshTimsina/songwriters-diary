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
import {useEffect, useState} from 'react';

export default function App() {
  // const [loading,setLoading] = useState(true)
  useEffect(() => {
    requestAllPermissions();
  }, []);

  const requestAllPermissions = async () => {
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
          const x = await requestMultiple([
            PERMISSIONS.ANDROID.RECORD_AUDIO,
            PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE,
            PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE,
          ]);
          console.log(x, '<MIU');
        }
      } catch (error) {
        console.error('Permission request error:', error);
      }
    } else {
      Alert.alert('Permissions are for Android only.');
    }
  };

  // useEffect(()=>{
  //   const timeout = setTimeout(()=>{
  //     setLoading(false)
  //   },5000)
  //   return () => clearTimeout(timeout)
  // })

  // if(loading){
  //   return <SplashScreen/>
  // }

  return (
    <NavigationContainer>
      <SongProvider>
        <HomeStack />
      </SongProvider>
    </NavigationContainer>
  );
}
