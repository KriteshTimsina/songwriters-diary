import {StyleProp, StyleSheet, TextStyle, Text, TextProps} from 'react-native';
import React from 'react';
import {Colors} from '../../constants';

type Size = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
type Color = string;
type Weight = '300' | '400' | '500' | '600' | '700';

interface TextWhite extends TextProps {
  children?: React.ReactNode;
  style?: StyleProp<TextStyle>;
  size?: Size;
  color?: Color;
  weight?: Weight;
}

const fontSizeMap: Record<Size, number> = {
  xs: 12,
  sm: 14,
  md: 16,
  lg: 22,
  xl: 36,
};
const fontWeightMap: Record<number, string> = {
  300: 'Roboto-Thin',
  400: 'Roboto-Light',
  500: 'Roboto-Regular',
  600: 'Roboto-Medium',
  700: 'Roboto-Bold',
};
const CText = ({
  children,
  style,
  size = 'md',
  weight = '500',
  color = 'black',
  ...props
}: TextWhite) => {
  const fontSize = fontSizeMap[size];
  const fontweight = fontWeightMap[weight];
  return (
    <Text
      {...props}
      style={[
        {
          color: color,
          fontSize,
          fontFamily: fontweight,
        },
        style,
      ]}>
      {children}
    </Text>
  );
};

export default CText;

const styles = StyleSheet.create({
  baseStyle: {
    fontFamily: 'Poppins-black',
  },
});
