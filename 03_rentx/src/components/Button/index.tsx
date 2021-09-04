import React from 'react';
import { ActivityIndicator } from 'react-native';
import { RectButtonProps } from 'react-native-gesture-handler';
import { useTheme } from 'styled-components';

import {
  Container,
  Title,
} from './styles';

interface Props extends RectButtonProps {
  title: string;
  color?: string;
  loading?: boolean;
  light?: boolean;
}

export function Button({
  title,
  color,
  loading = false,
  light = false,
  ...rest
}: Props) {
  const { enabled } = rest;
  const theme = useTheme();

  return (
    <Container
    color={color ? color : theme.colors.main}
    style={{ opacity: (enabled === false || loading === true) ? 0.5 : 1 }}
    enabled={enabled !== undefined ? enabled : true}
    {...rest}
    >
      {
        loading
        ? <ActivityIndicator color={theme.colors.shape} size="large" style={{ flex: 1, margin: 12 }} />
        : <Title light={light}>{title}</Title>
      }
    </Container>
  );
};
