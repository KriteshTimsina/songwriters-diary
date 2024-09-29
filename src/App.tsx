import {
  createMaterialTopTabNavigator,
  MaterialTopTabBarProps,
} from '@react-navigation/material-top-tabs';
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
import {Tabbar} from './navigation';
import HomeStack from './navigation/HomeStack';

export type TabProps = {
  home: undefined;
  list: undefined;
};

const Tab = createMaterialTopTabNavigator<TabProps>();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator tabBar={props => <Tabbar {...props} />}>
        <Tab.Screen name="home" component={HomeStack} />
        <Tab.Screen name="list" component={Todo} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
