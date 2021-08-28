import React from 'react';
import { MaterialIcons } from '@expo/vector-icons';
import { BorderlessButtonProps } from 'react-native-gesture-handler';

import { useTheme } from 'styled-components';

import {
  Container,
 } from './styles';

interface Props extends BorderlessButtonProps {
  color?: string;
}

export function BackButton({ color, ...rest }: Props) {
  const theme = useTheme();
  const iconColor = color ? color : theme.colors.text;

  return (
    <Container {...rest}>
      <MaterialIcons
        name="chevron-left"
        size={24}
        color={iconColor}
      />
    </Container>
  );
};
