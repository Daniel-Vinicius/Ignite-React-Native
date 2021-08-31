import React from 'react';
import { useWindowDimensions, StatusBar } from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../routes/stack.routes';

import LogoSvg from '../../assets/logo_background_gray.svg';
import DoneSvg from '../../assets/done.svg';

import { ConfirmButton } from '../../components/ConfirmButton';

import {
  Container,
  Content,
  Title,
  Message,
  Footer,
 } from './styles';

 type SchedulingCompleteNavigationProp = StackNavigationProp<
 RootStackParamList,
 'SchedulingComplete'
>;

export function SchedulingComplete() {
  const { width } = useWindowDimensions();
  const navigation = useNavigation<SchedulingCompleteNavigationProp>();

  function handleConfirm() {
    navigation.navigate('Home');
  }

  return (
    <Container>
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />
      <LogoSvg width={width} />

      <Content>
        <DoneSvg width={80} height={80} />
        <Title>Carro alugado!</Title>

        <Message>
          Agora você só precisa ir {'\n'}
          até uma concessionaria da RENTX {'\n'}
          pegar o seu automóvel.
        </Message>
      </Content>

      <Footer>  
        <ConfirmButton title="OK" onPress={handleConfirm} />
      </Footer>
    </Container>
  );
};
