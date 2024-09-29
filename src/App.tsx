import {NavigationContainer} from '@react-navigation/native';
import {
  Animated,
  Pressable,
  StyleSheet,
  TouchableOpacity,
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

export default function App() {
  return (
    <NavigationContainer>
      <SongProvider>
        <HomeStack />
      </SongProvider>
    </NavigationContainer>
  );
}
