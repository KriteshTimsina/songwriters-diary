import * as React from 'react';
import Svg, {Path} from 'react-native-svg';
import Colors from '../../constants/color';

type IconProps = {
  isFocused: boolean;
};

export const Songs = (props: IconProps) => {
  return (
    <Svg
      width={39}
      height={39}
      viewBox="0 0 39 39"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <Path
        d="M14.75 30a5.75 5.75 0 11-11.5 0 5.75 5.75 0 0111.5 0z"
        stroke="#F9751C"
        strokeWidth={2.5}
      />
      <Path
        d="M23 25.37h14M23 33h14M35.52 5.495c.152.145.273.318.356.508a1.503 1.503 0 010 1.197c-.083.19-.204.362-.356.508l-.66.629L33 10.111l-1.88-1.793-.66-.649a1.562 1.562 0 01-.356-.507 1.503 1.503 0 010-1.198 1.627 1.627 0 01.883-.846 1.689 1.689 0 011.246 0c.197.08.376.194.527.339l.24.229.22-.23a1.685 1.685 0 011.158-.43c.43.008.84.176 1.142.469zM9 37a7 7 0 100-14 7 7 0 000 14z"
        stroke={props.isFocused ? Colors.primary.main : Colors.text.base}
        strokeWidth={props.isFocused ? 4 : 3}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M23.212 16c.37-.652.615-1.38.724-2.141a6.328 6.328 0 00-.09-2.285 6.006 6.006 0 00-.89-2.063A5.368 5.368 0 0021.41 8 44.396 44.396 0 0116 2v29"
        stroke="#F9751C"
        strokeWidth={2.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};

export const List = (props: any) => {
  return (
    <Svg
      width={34}
      height={34}
      viewBox="0 0 34 34"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <Path
        d="M24.5 5.53v22.94m0 0c0 1.95-2.518 3.53-5.625 3.53s-5.625-1.58-5.625-3.53c0-1.949 2.518-3.529 5.625-3.529s5.625 1.58 5.625 3.53zM2 5.53h15M2 12.587h15m-15 7.06h7.5m15-15.883L32 2v7.059l-7.5 1.764V3.765z"
        stroke={props.isFocused ? Colors.primary.main : Colors.text.base}
        strokeWidth={props.isFocused ? 4 : 3}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};
