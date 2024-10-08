import {createStackNavigator} from '@react-navigation/stack';
import {Editor, Home} from '../screens';
import {StyleSheet} from 'react-native';
import TabNavigation from './TabNavigation';
import {Songs} from '../interfaces/songs';

export type HomeStackParamsList = {
  TabNavigation: undefined;
  Editor:
    | {
        song: Songs;
      }
    | undefined;
};

const HomeStackNavigation = createStackNavigator<HomeStackParamsList>();

const HomeStack = () => {
  return (
    <HomeStackNavigation.Navigator>
      <HomeStackNavigation.Screen
        options={{
          headerShown: false,
        }}
        name="TabNavigation"
        component={TabNavigation}
      />
      <HomeStackNavigation.Screen
        options={{
          headerShown: true,
          title: '',
        }}
        name="Editor"
        component={Editor}
      />
    </HomeStackNavigation.Navigator>
  );
};
export default HomeStack;

const styles = StyleSheet.create({});
