import React from 'react';
import { Button, StyleSheet, Dimensions } from 'react-native';

import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing
} from 'react-native-reanimated';

import {
  Container,
 } from './styles';

const WIDTH = Dimensions.get('window').width;

export function Splash() {
  const animation = useSharedValue(0);

  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [{
        translateX: withTiming(animation.value, {
          duration: 200,
          easing: Easing.bounce
        })
      }],
    }
  });

  function handleAnimationPosition() {
    const boxWidth = 100;
    animation.value = Math.random() * (WIDTH - boxWidth);
  }

  return (
    <Container>
      <Animated.View style={[styles.box, animatedStyles]} />
        <Button title="Mover" onPress={handleAnimationPosition} />
    </Container>
  );
};

const styles = StyleSheet.create({
  box: {
    width: 100,
    height: 100,
    backgroundColor: 'red'
  }
});
