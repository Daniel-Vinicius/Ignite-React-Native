import React from 'react';
import { useWindowDimensions, StatusBar } from 'react-native';

import { useNavigation, useRoute } from '@react-navigation/native';
import { ConfirmationParams } from './NavigationProp';

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

export function Confirmation() {
  const { width } = useWindowDimensions();
  const navigation = useNavigation();
  const route = useRoute();

  const { title, message, nextScreenRoute } = route.params as ConfirmationParams;

  function handleConfirm() {
    // @ts-expect-error
    navigation.navigate(nextScreenRoute);
  }

  return (
    <Container>
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />
      <LogoSvg width={width} />

      <Content>
        <DoneSvg width={80} height={80} />
        <Title>{title}</Title>

        <Message>{message}</Message>
      </Content>

      <Footer>  
        <ConfirmButton title="OK" onPress={handleConfirm} />
      </Footer>
    </Container>
  );
};
