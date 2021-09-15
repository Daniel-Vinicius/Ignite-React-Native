import React from 'react';
import { RectButtonProps } from 'react-native-gesture-handler';

import {
  Container,
  Category,
  Icon,
} from './styles';

interface CategorySelectButtonProps extends RectButtonProps {
  title: string;
}

export function CategorySelectButton({ title, onPress, testID }: CategorySelectButtonProps) {
  return (
    <Container onPress={onPress} testID={testID}>
      <Category>{title}</Category>
      <Icon name="chevron-down" />
    </Container>
  );
};
