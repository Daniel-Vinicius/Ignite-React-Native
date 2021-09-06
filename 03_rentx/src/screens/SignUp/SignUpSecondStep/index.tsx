import React, { useState } from 'react';
import { KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, Alert } from 'react-native';
import { useTheme } from 'styled-components'

import { useRoute } from '@react-navigation/native';
import { SignUpSecondStepParams } from '../../../routes/stack.routes';

import { BackButton } from '../../../components/BackButton';
import { Bullet } from '../../../components/Bullet';
import { Button } from '../../../components/Button';
import { PasswordInput } from '../../../components/PasswordInput';

import {
  Container,
  Header,
  Steps,
  Title,
  SubTitle,
  Form,
  FormTitle
} from './styles';

export function SignUpSecondStep() {
  const theme = useTheme();
  const route = useRoute();

  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');

  const fieldsIsFilled = Boolean(password) && Boolean(passwordConfirmation);
  const { user } = route.params as SignUpSecondStepParams;

  function handleRegister() {
    if (!password || !passwordConfirmation) {
      return Alert.alert('Informe e confirme a senha');
    }

    if (password !== passwordConfirmation) {
      return Alert.alert('As senhas não são iguais');
    }

    // Send to API and Register
    // Navigate to confirmation register screen
  }

  return (
    <KeyboardAvoidingView behavior="position" enabled>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <Container>
          <Header>
            <BackButton />
            <Steps>
              <Bullet />
              <Bullet active />
            </Steps>
          </Header>

          <Title>Crie sua{'\n'}conta</Title>
          <SubTitle>Faça seu cadastro de{'\n'}forma rápida e fácil.</SubTitle>

          <Form>
            <FormTitle>2. Senha</FormTitle>
            <PasswordInput iconName="lock" placeholder="Senha" value={password} onChangeText={setPassword} />
            <PasswordInput iconName="lock" placeholder="Repetir senha" value={passwordConfirmation} onChangeText={setPasswordConfirmation} />
          </Form>

          <Button
            title="Cadastrar"
            color={theme.colors.success}
            enabled={fieldsIsFilled}
            onPress={handleRegister}
          />
        </Container>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};
