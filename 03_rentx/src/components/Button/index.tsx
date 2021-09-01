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
}

export function Button({ title, color, loading = false, ...rest }: Props) {
  const { enabled } = rest;
  const theme = useTheme();

  return (
    <Container
      {...rest}
      color={color}
      style={{ opacity: (enabled === false || loading === true) ? 0.5 : 1 }}>
      {loading ? <ActivityIndicator color={theme.colors.shape} size="large" style={{ flex: 1, margin: 12 }} />
      : <Title>{title}</Title>}
    </Container>
  );
};
