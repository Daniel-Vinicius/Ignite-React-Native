import React, { useState } from 'react';
import { TextInputProps } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useTheme } from 'styled-components';
import { BorderlessButton } from 'react-native-gesture-handler';

import {
  Container,
  IconContainer,
  InputText,
} from './styles';

interface InputProps extends TextInputProps {
  iconName: React.ComponentProps<typeof Feather>['name']
}

export function PasswordInput({ iconName, ...rest }: InputProps) {
  const theme = useTheme();
  const value = rest.value;

  const [isPasswordInvisible, setIsPasswordInvisible] = useState(true);
  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);

  function handlePasswordVisibilityChange() {
    setIsPasswordInvisible(prevState => !prevState);
  }

  function handleInputFocus() {
    setIsFocused(true);
  }
  
  function handleInputBlur() {
    setIsFocused(false);
    setIsFilled(!!value);
  }

  const iconColor = (isFocused || isFilled) ? theme.colors.main : theme.colors.text_detail;

  return (
    <Container isFocused={isFocused}>
      <IconContainer>
        <Feather
          name={iconName}
          size={24}
          color={iconColor}
        />
      </IconContainer>

      <InputText
        {...rest}
        secureTextEntry={isPasswordInvisible}
        autoCompleteType="password"
        textContentType="password"
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
      />

      <BorderlessButton onPress={handlePasswordVisibilityChange}>
        <IconContainer>
          <Feather
            name={isPasswordInvisible ? "eye" : "eye-off"}
            size={24}
            color={theme.colors.text_detail}
          />
        </IconContainer>
      </BorderlessButton>
    </Container>
  );
};
