import React from 'react';

import { BackButton } from '../../components/BackButton';
import { ImageSlider } from '../../components/ImageSlider';

import {
  Container,
  Header,
  CarImages,
 } from './styles';

export function CarDetails() {
  return (
    <Container>
      <Header>
        <BackButton />
      </Header>

      <CarImages>
        <ImageSlider imagesUrl={['https://i.ibb.co/6Phg735/Audi.png', 'https://i.ibb.co/GPg13xY/Corvete-Z06.png']} />
      </CarImages>
    </Container>
  );
};
