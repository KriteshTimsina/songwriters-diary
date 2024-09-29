import {MaterialTopTabBarProps} from '@react-navigation/material-top-tabs';
import {Pressable, StyleSheet, TouchableOpacity, View} from 'react-native';
import {List, Songs} from '../components/svgs/TabBarIcons';
import Feather from 'react-native-vector-icons/Feather';

function Tabbar({
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
            key={label as string}
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

      <Pressable style={styles.setting}>
        <Feather name="settings" size={30} />
      </Pressable>
    </View>
  );
}
export default Tabbar;

export const styles = StyleSheet.create({
  setting: {
    position: 'absolute',
    right: 0,
    marginRight: 20,
  },
});
