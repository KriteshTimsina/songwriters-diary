import {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {requestAllPermissions} from './utils/requestPermission';
import HomeStack from './navigation/HomeStack';
import SongProvider from './context/SongContext';

export default function App() {
  useEffect(() => {
    requestAllPermissions();
  }, []);

  return (
    <NavigationContainer>
      <SongProvider>
        <HomeStack />
      </SongProvider>
    </NavigationContainer>
  );
}
