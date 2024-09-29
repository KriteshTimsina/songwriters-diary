import {createStackNavigator} from '@react-navigation/stack';
import {Editor, Home} from '../screens';
import {StyleSheet} from 'react-native';

export type HomeStackParamsList = {
  Home: undefined;
  Editor: undefined;
};

const HomeStackNavigation = createStackNavigator<HomeStackParamsList>();

const HomeStack = () => {
  return (
    <HomeStackNavigation.Navigator>
      <HomeStackNavigation.Screen
        options={{
          headerShown: false,
        }}
        name="Home"
        component={Home}
      />
      <HomeStackNavigation.Screen
        options={{
          headerShown: true,
          title: 'Editor',
        }}
        name="Editor"
        component={Editor}
      />
    </HomeStackNavigation.Navigator>
  );
};
export default HomeStack;

const styles = StyleSheet.create({});
