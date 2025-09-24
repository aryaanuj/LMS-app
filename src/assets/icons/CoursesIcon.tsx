import React from 'react';
import Svg, { Path } from 'react-native-svg';

export default function CoursesIcon({ color = '#B5B8C0', size = 22 }: { color?: string; size?: number }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path d="M4 6a2 2 0 0 1 2-2h9l5 5v9a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6Z" stroke={color} strokeWidth={2} />
      <Path d="M9 14h6M9 10h3" stroke={color} strokeWidth={2} strokeLinecap="round" />
    </Svg>
  );
}


