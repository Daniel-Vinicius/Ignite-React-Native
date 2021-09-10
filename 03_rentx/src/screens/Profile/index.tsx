import React from 'react';
import { useTheme } from 'styled-components';
import { Feather } from '@expo/vector-icons';

import { BackButton } from '../../components/BackButton';

import {
  Container,
  Header,
  HeaderTop,
  HeaderTitle,
  LogoutButton,
  PhotoContainer,
  Photo,
  PhotoButton,
} from './styles';

export function Profile() {
  const theme = useTheme();

  function handleSignOut() { }

  return (
    <Container>
      <Header>
        <HeaderTop>
          <BackButton color={theme.colors.shape} />
          <HeaderTitle>Editar Perfil</HeaderTitle>
          <LogoutButton onPress={handleSignOut}>
            <Feather
              name="power"
              size={24}
              color={theme.colors.shape}
            />
          </LogoutButton>
        </HeaderTop>

        <PhotoContainer>
          <Photo source={{ uri: 'https://avatars.githubusercontent.com/u/66279500?v=4' }} />
          <PhotoButton onPress={() => { }}>
            <Feather
              name="camera"
              size={24}
              color={theme.colors.shape}
            />
          </PhotoButton>
        </PhotoContainer>
      </Header>
    </Container>
  );
};
