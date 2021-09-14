import React, { useState, useEffect } from 'react';
import { Alert } from 'react-native';

import { useTheme } from 'styled-components';

import { format, addDays } from 'date-fns';
import { RFValue } from 'react-native-responsive-fontsize';
import { Feather } from '@expo/vector-icons';

import { useNavigation, useRoute } from '@react-navigation/native';
import { SchedulingDetailsNavigationProp, SchedulingDetailsParams } from './NavigationProp';

import { BackButton } from '../../components/BackButton';
import { ImageSlider } from '../../components/ImageSlider';
import { Accessory } from '../../components/Accessory';
import { Button } from '../../components/Button';

import { getAccessoryIcon } from '../../utils/getAccessoryIcon';
import { api } from '../../services/api';

import {
  Container,
  Header,
  CarImages,
  Content,
  Details,
  Description,
  Brand,
  Name,
  Rent,
  Period,
  Price,
  Accessories,
  Footer,
  RentalPeriod,
  CalendarIcon,
  DateInfo,
  DateTitle,
  DateValue,
  RentalPrice,
  RentalPriceLabel,
  RentalPriceDetails,
  RentalPriceQuota,
  RentalPriceTotal,
} from './styles';

interface RentalPeriod {
  start: Date;
  startFormatted: string;
  end: Date;
  endFormatted: string;
}

export function SchedulingDetails() {
  const [rentalPeriod, setRentalPeriod] = useState<RentalPeriod>({} as RentalPeriod);
  const [loading, setLoading] = useState(false);

  const theme = useTheme();
  const navigation = useNavigation<SchedulingDetailsNavigationProp>();

  const route = useRoute();
  const { car, dates } = route.params as SchedulingDetailsParams;

  const numberDaily = dates.length;
  const rentTotal = car.price * numberDaily;

  async function handleConfirmRental() {
    setLoading(true);

    try {
      await api.post('/rentals', {
        car_id: car.id,
        start_date: rentalPeriod.start,
        end_date: rentalPeriod.end,
        total: rentTotal
      });

      const confirmationScreenParams = {
        title: 'Carro alugado!',
        message: `Agora você só precisa ir\naté uma concessionaria da RENTX\npegar o seu automóvel.`,
        nextScreenRoute: 'Home'
      };

      navigation.navigate('Confirmation', confirmationScreenParams);
    } catch (error) {
      console.log(error);
      setLoading(false);
      return Alert.alert('Houve um erro ao tentar alugar este carro.');
    }
  }

  useEffect(() => {
    const start = addDays(new Date(dates[0]), 1);
    const startFormatted = format(start, 'dd/MM/yyyy');

    const end = addDays(new Date(dates[dates.length - 1]), 1);
    const endFormatted = format(end, 'dd/MM/yyyy');

    setRentalPeriod({
      startFormatted,
      endFormatted,
      start,
      end,
    });
  }, []);

  return (
    <Container>
      <Header>
        <BackButton />
      </Header>

      <CarImages>
        <ImageSlider imagesUrl={car.photos!} />
      </CarImages>

      <Content>
        <Details>
          <Description>
            <Brand>{car.brand}</Brand>
            <Name>{car.name}</Name>
          </Description>

          <Rent>
            <Period>{car.period}</Period>
            <Price>R$ {car.price}</Price>
          </Rent>
        </Details>

        <Accessories>
          {car.accessories!.map(accessory => (
            <Accessory
              key={accessory.type}
              name={accessory.name}
              icon={getAccessoryIcon(accessory.type)}
            />
          ))}
        </Accessories>

        <RentalPeriod>
          <CalendarIcon>
            <Feather name="calendar" size={RFValue(24)} color={theme.colors.shape} />
          </CalendarIcon>

          <DateInfo>
            <DateTitle>DE</DateTitle>
            <DateValue>{rentalPeriod.startFormatted}</DateValue>
          </DateInfo>

          <Feather name="chevron-right" size={RFValue(24)} color={theme.colors.shape} />

          <DateInfo>
            <DateTitle>ATÉ</DateTitle>
            <DateValue>{rentalPeriod.endFormatted}</DateValue>
          </DateInfo>
        </RentalPeriod>

        <RentalPrice>
          <RentalPriceLabel>TOTAL</RentalPriceLabel>
          <RentalPriceDetails>
            <RentalPriceQuota>R$ {car.price} x{numberDaily} diárias</RentalPriceQuota>
            <RentalPriceTotal>R$ {rentTotal}</RentalPriceTotal>
          </RentalPriceDetails>
        </RentalPrice>
      </Content>

      <Footer>
        <Button
          title="Alugar agora"
          onPress={handleConfirmRental}
          color={theme.colors.success}
          enabled={!loading}
          loading={loading}
        />
      </Footer>
    </Container>
  );
};
