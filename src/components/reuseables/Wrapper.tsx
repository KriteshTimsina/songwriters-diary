import {
  SafeAreaView,
  StyleProp,
  StyleSheet,
  Text,
  View,
  ViewProps,
  ViewStyle,
} from 'react-native';
import React, {Children} from 'react';
import {Colors} from '../../constants';

type WrapperProps = {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
};

const Wrapper: React.FC<WrapperProps> = ({children, style}) => {
  return (
    <SafeAreaView style={[styles.container, style]}>{children}</SafeAreaView>
  );
};

export default Wrapper;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    padding: 10,
  },
});
