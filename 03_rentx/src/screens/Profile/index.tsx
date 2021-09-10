import React, { useState } from 'react';
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
  Content,
  Options,
  Option,
  OptionTitle,
} from './styles';

type Option = 'dataEdit' | 'passwordEdit';

export function Profile() {
  const theme = useTheme();

  const [option, setOption] = useState<Option>('dataEdit');

  function handleSignOut() { }

  function handleOptionChange(optionSelected: Option) {
    setOption(optionSelected)
  }

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

      <Content>
        <Options>
          <Option
            active={option === 'dataEdit'}
            onPress={() => handleOptionChange('dataEdit')}
          >
            <OptionTitle active={option === 'dataEdit'}>Dados</OptionTitle>
          </Option>

          <Option
            active={option === 'passwordEdit'}
            onPress={() => handleOptionChange('passwordEdit')}
          >
            <OptionTitle active={option === 'passwordEdit'}>Trocar senha</OptionTitle>
          </Option>
        </Options>
      </Content>
    </Container>
  );
};
