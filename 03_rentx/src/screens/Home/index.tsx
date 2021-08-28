import React from 'react';
import { StatusBar } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';

import Logo from '../../assets/logo.svg';

import { Car } from '../../components/Car';

import {
  Container,
  Header,
  HeaderContent,
  TotalCars,
  CarList
} from './styles';

const carData = {
  brand: "Audi",
  name: "RS 5 Coupé",
  thumbnail: 'https://i.ibb.co/6Phg735/Audi.png',
  rent: {
    price: 120,
    period: "Ao Dia"
  }
};

export function Home() {
  return (
    <Container>
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />

      <Header>
        <HeaderContent>

          <Logo width={RFValue(108)} height={RFValue(12)} />

          <TotalCars>
            Total de 12 carros
          </TotalCars>

        </HeaderContent>
      </Header>

      <CarList
        data={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]}
        keyExtractor={item => String(item)}
        renderItem={() => <Car data={carData} />} />
    </Container>
  );
};
