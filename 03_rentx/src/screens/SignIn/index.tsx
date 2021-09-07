import React, { useState } from 'react';
import {
  StatusBar,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Alert
} from 'react-native';
import { useTheme } from 'styled-components';
import { useAuth } from '../../hooks/auth';

import * as Yup from 'yup';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { AuthRoutesParams } from '../../routes/routeTypes';

import { Button } from '../../components/Button';
import { Input } from '../../components/Input';
import { PasswordInput } from '../../components/PasswordInput';

import {
  Container,
  Header,
  Title,
  SubTitle,
  Form,
  Footer
} from './styles';

type SignInNavigationProp = StackNavigationProp<
  AuthRoutesParams,
  'SignIn'
>;

export function SignIn() {
  const theme = useTheme();
  const { signIn } = useAuth();
  const navigation = useNavigation<SignInNavigationProp>();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function handleSignIn() {
    try {
      const schema = Yup.object().shape({
        email: Yup.string()
          .required('E-mail obrigatório')
          .email('Digite um email válido'),
        password: Yup.string()
          .required('A Senha é obrigatória')
      });
  
      await schema.validate({ email, password });
      signIn({ email, password });
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        return Alert.alert('Opa', error.message);
      }

      return Alert.alert('Erro na autenticação', 'Ocorreu um erro ao fazer login, verifique as credenciais')
    }
  }

  function handleNewAccount() {
    navigation.navigate('SignUpFirstStep');
  }

  return (
    <KeyboardAvoidingView behavior="position" enabled>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <Container>
          <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />
          <Header>
            <Title>Estamos {'\n'}quase lá.</Title>
            <SubTitle>Faça seu login para começar{'\n'}uma experiência incrível.</SubTitle>
          </Header>

          <Form>
            <Input
              iconName="mail"
              placeholder="E-mail"
              autoCapitalize="none"
              autoCorrect={false}
              keyboardType="email-address"
              autoCompleteType="email"
              textContentType="emailAddress"
              onChangeText={setEmail}
              value={email}
            />

            <PasswordInput
              iconName="lock"
              placeholder="Senha"
              onChangeText={setPassword}
              value={password}
            />
          </Form>

          <Footer>
            <Button
              title="Login"
              onPress={handleSignIn}
              enabled={Boolean(email) && Boolean(password)}
            />

            <Button
              title="Criar conta gratuita"
              onPress={handleNewAccount}
              color={theme.colors.background_secondary}
              light
            />
          </Footer>
        </Container>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};
