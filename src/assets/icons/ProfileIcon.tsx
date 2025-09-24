import React from 'react';
import Svg, { Path, Circle } from 'react-native-svg';

export default function ProfileIcon({ color = '#B5B8C0', size = 22 }: { color?: string; size?: number }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Circle cx={12} cy={8} r={4} stroke={color} strokeWidth={2} />
      <Path d="M4 20c0-4 4-6 8-6s8 2 8 6" stroke={color} strokeWidth={2} strokeLinecap="round" />
    </Svg>
  );
}


