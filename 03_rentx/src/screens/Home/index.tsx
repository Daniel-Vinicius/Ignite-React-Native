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
} from './styles';

const carData = {
  brand: "Audi",
  name: "RS 5 Coupé",
  thumbnail: 'https://s3.us-west-2.amazonaws.com/secure.notion-static.com/daeba9d9-d36d-4fd6-b993-fa433138b1c3/Audi.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAT73L2G45O3KS52Y5%2F20210826%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20210826T211423Z&X-Amz-Expires=86400&X-Amz-Signature=acaf7148c1839ec0e87790ecf629ad0c04e898e70174fbc72c8e8d93a1afad0d&X-Amz-SignedHeaders=host&response-content-disposition=filename%20%3D%22Audi.png%22',
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
      <Car data={carData} />
      <Car data={carData} />
    </Container>
  );
};
