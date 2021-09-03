import React, { useEffect } from 'react';

import BrandSvg from '../../assets/brand.svg';
import LogoSvg from '../../assets/logo.svg';

import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  interpolate,
  Extrapolate
} from 'react-native-reanimated';

import {
  Container,
 } from './styles';

export function Splash() {
  const splashAnimation = useSharedValue(0);

  const brandStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(splashAnimation.value, [0, 50], [1, 0]),
      transform: [
        {
          translateY: interpolate(splashAnimation.value, [0, 50], [ 0, -100], Extrapolate.CLAMP),
        }
      ],
    };
  });

  const logoStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(splashAnimation.value, [0, 25, 50], [0, 0.3, 1]),
      transform: [
        {
          translateY: interpolate(splashAnimation.value,
            [0, 50],
            [-100, 0],
            Extrapolate.CLAMP
          ),
        }
      ],
    };
  });

  useEffect(() => {
    splashAnimation.value = withTiming(50, { duration: 1000 });
  }, []);

  return (
    <Container>
      <Animated.View style={[brandStyle, { position: 'absolute' }]}>
        <BrandSvg width={142.5} height={82.5} />
      </Animated.View>

      <Animated.View style={[logoStyle, { position: 'absolute' }]}>
        <LogoSvg width={180} height={20} />
      </Animated.View>
    </Container>
  );
};
