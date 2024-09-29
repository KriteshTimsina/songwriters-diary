import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {
  createMaterialTopTabNavigator,
  MaterialTopTabBarProps,
} from '@react-navigation/material-top-tabs';
import TabbarTop from './TabbarTop';
import HomeStack from './HomeStack';
import {Home, Todo} from '../screens';

export type TabProps = {
  home: undefined;
  list: undefined;
};

const Tab = createMaterialTopTabNavigator<TabProps>();

const TabNavigation = () => {
  return (
    <Tab.Navigator tabBar={props => <TabbarTop {...props} />}>
      <Tab.Screen name="home" component={Home} />
      <Tab.Screen name="list" component={Todo} />
    </Tab.Navigator>
  );
};

export default TabNavigation;

const styles = StyleSheet.create({});
