import React, { useState } from 'react';
import { KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, Alert } from 'react-native';
import { useTheme } from 'styled-components'

import { useRoute, useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { SignUpSecondStepParams, RootStackParamList } from '../../../routes/stack.routes';

import { Confirmation } from '../../Confirmation';
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

type SignUpSecondStepNavigationProp = StackNavigationProp<
  RootStackParamList,
  'SignUpSecondStep'
>;

export function SignUpSecondStep() {
  const theme = useTheme();
  const route = useRoute();
  const navigation = useNavigation<SignUpSecondStepNavigationProp>();

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

    const confirmationScreenParams = {
      title: 'Conta criada!',
      message: `Agora é só fazer login\ne aproveitar.`,
      nextScreenRoute: 'SignIn'
    };

    navigation.navigate('Confirmation', confirmationScreenParams);
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
