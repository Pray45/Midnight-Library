import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';
import { StyleProp, ViewStyle } from 'react-native';
import React from 'react';

type PageTransitionProps = {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  className?: string;
  duration?: number;
};

export default function PageTransition({
  children,
  style,
  className = 'flex-1',
  duration = 200,
}: PageTransitionProps) {
  return (
    <Animated.View
      entering={FadeIn.duration(duration)}
      exiting={FadeOut.duration(Math.max(duration - 50, 100))}
      style={style}
      className={className}
    >
      {children}
    </Animated.View>
  );
}
