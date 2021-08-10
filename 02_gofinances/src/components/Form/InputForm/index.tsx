import React from 'react';
import { TextInputProps } from 'react-native';
import { Control, Controller } from 'react-hook-form';

import { Input } from '../Input';
import { Container } from './styles';

interface InputFormProps extends TextInputProps {
  control: Control;
  name: string;
}

export function InputForm({ control, name, ...rest }: InputFormProps) {
  return (
    <Container>
      <Controller
        control={control}
        name={name}
        render={({ field: { onChange, value }}) => (
          <Input onChangeText={onChange} value={value} {...rest} />
        )}
      />
    </Container>
  );
};
