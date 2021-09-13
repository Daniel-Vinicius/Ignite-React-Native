import React, { useState } from 'react';
import { TextInputProps } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useTheme } from 'styled-components';

import {
  Container,
  IconContainer,
  InputText,
} from './styles';

interface InputProps extends TextInputProps {
  iconName: React.ComponentProps<typeof Feather>['name'];
  disabled?: boolean;
}

export function Input({ iconName, disabled = false, ...rest }: InputProps) {
  const theme = useTheme();
  const value = rest.value;

  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);

  function handleInputFocus() {
    setIsFocused(true);
  }
  
  function handleInputBlur() {
    setIsFocused(false);
    setIsFilled(!!value);
  }

  const iconColor = (isFocused || isFilled) ? theme.colors.main : theme.colors.text_detail;

  return (
    <Container>
      <IconContainer isFocused={isFocused} style={{ opacity: disabled ? 0.5 : 1 }}>
        <Feather
          name={iconName}
          size={24}
          color={iconColor}
        />
      </IconContainer>

      <InputText
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        isFocused={isFocused}
        style={{ opacity: disabled ? 0.5 : 1 }}
        {...rest}
      />
    </Container>
  );
};
