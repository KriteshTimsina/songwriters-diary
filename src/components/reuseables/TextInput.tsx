import {
  StyleSheet,
  TextInput as Input,
  TextInputProps,
  StyleProp,
} from 'react-native';
import React from 'react';
import {Text} from '.';
import {Colors} from '../../constants';

type InputProps = {
  value: string | undefined;
  style?: StyleProp<TextInputProps>;
} & TextInputProps;

const TextInput = ({value, style, ...props}: InputProps) => {
  return <Input {...props} value={value} style={[styles.input, style]} />;
};

export default TextInput;

const styles = StyleSheet.create({
  input: {
    fontFamily: 'Roboto-Regular',
    fontSize: 22,
    color: Colors.text.base,
    backgroundColor: 'transparent',
  },
});
