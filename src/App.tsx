import {
  createMaterialTopTabNavigator,
  MaterialTopTabBarProps,
} from '@react-navigation/material-top-tabs';
import {NavigationContainer} from '@react-navigation/native';
import {Animated, StyleSheet, TouchableOpacity, View} from 'react-native';
import {Text} from 'react-native-paper';
import {Feather} from './components/icons';
import {Image} from 'react-native-svg';
import Onboarding from './components/svgs/Onboarding';
import CreateButton from './components/svgs/CreateButton';
import {List, Songs} from './components/svgs/TabBarIcons';
import {Home, Todo} from './screens';

const Tab = createMaterialTopTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator tabBar={props => <MyTabBar {...props} />}>
        <Tab.Screen name="todo" component={Home} />
        <Tab.Screen name="home" component={Todo} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

function MyTabBar({
  state,
  descriptors,
  navigation,
  position,
}: MaterialTopTabBarProps) {
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        alignSelf: 'center',
        backgroundColor: 'white',
      }}>
      {state.routes.map((route, index) => {
        const {options} = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        const inputRange = state.routes.map((_, i) => i);
        const opacity = position.interpolate({
          inputRange,
          outputRange: inputRange.map(i => (i === index ? 1 : 0)),
        });

        return (
          <TouchableOpacity
            key={label}
            accessibilityRole="button"
            accessibilityState={isFocused ? {selected: true} : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={{
              padding: 5,
              margin: 10,
              alignSelf: 'center',
            }}>
            {label === 'Home' ? (
              <Songs isFocused={isFocused} />
            ) : (
              <List isFocused={isFocused} />
            )}
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

export const styles = StyleSheet.create({
  text: {
    fontFamily: 'Roboto-Medium',
    fontSize: 50,
  },
});
