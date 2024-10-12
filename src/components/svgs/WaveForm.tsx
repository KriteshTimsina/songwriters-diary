import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

function Waveform(props: any) {
  return (
    <Svg
      width={104}
      height={26}
      viewBox="0 0 104 26"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <Path
        d="M1 10.806v4.203M54 10.806v4.203M9.125 5.903v14.009M62.125 5.903v14.009M13.188 1v23.815M66.188 1v23.815M17.25 5.903v14.009M70.25 5.903v14.009M21.313 8.004v9.806M74.313 8.004v9.806M25.375 3.802v18.21M78.375 3.802v18.21M5.063 8.004v9.806M58.063 8.004v9.806M29.438 8.004v9.806M82.438 8.004v9.806M33.5 5.903v14.009M86.5 5.903v14.009M37.563 1v23.815M90.563 1v23.815M41.625 5.903v14.009M94.625 5.903v14.009M45.688 8.004v9.806M98.688 8.004v9.806M49.75 10.806v4.203M102.75 10.806v4.203"
        stroke={props.strokeColor}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export default Waveform;
