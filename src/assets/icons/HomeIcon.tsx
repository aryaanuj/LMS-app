import React from 'react';
import Svg, { Path } from 'react-native-svg';

export default function HomeIcon({ color = '#B5B8C0', size = 22 }: { color?: string; size?: number }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path d="M3 10.5L12 3l9 7.5V20a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1v-9.5Z" fill={color} />
    </Svg>
  );
}


