import * as React from 'react';
import {StyleProp, TouchableOpacity, TouchableOpacityProps} from 'react-native';
import Svg, {Path, SvgProps} from 'react-native-svg';

type CreateButtonProps = {
  onPress: () => void;
  style: StyleProp<TouchableOpacityProps>;
} & SvgProps;

function CreateButton(props: CreateButtonProps) {
  return (
    <TouchableOpacity onPress={props.onPress} style={props.style}>
      <Svg
        width={80}
        height={80}
        viewBox="0 0 50 60"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}>
        <Path
          d="M42.863 3.93C40.69 2.621 38.04 1.625 34.986.966 32.018.326 28.658 0 24.999 0c-3.658 0-7.018.326-9.986.967-3.054.659-5.704 1.655-7.877 2.962C2.466 6.74 0 11 0 16.251c0 5.152 3.552 15.904 8.447 25.565C11.887 48.607 18.615 60 24.999 60c6.385 0 13.112-11.393 16.553-18.184 4.895-9.66 8.447-20.413 8.447-25.565 0-5.252-2.467-9.513-7.136-12.322z"
          fill="#F9751C"
        />
        <Path
          d="M24.5 5C15.402 5 8 12.402 8 21.498 8 30.598 15.402 38 24.5 38 33.597 38 41 30.598 41 21.498 41 12.402 33.597 5 24.5 5z"
          fill="#FFE5A4"
        />
        <Path d="M15.143 21.75H34zM24.57 12v19.5z" fill="#F9751C" />
        <Path
          d="M15.143 21.75H34M24.571 12v19.5"
          stroke="#F9751C"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </Svg>
    </TouchableOpacity>
  );
}

export default CreateButton;
