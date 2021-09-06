import React, { useState, useEffect } from 'react';
import { Alert } from 'react-native';

import { useTheme } from 'styled-components';
import { format, addDays } from 'date-fns';
import { RFValue } from 'react-native-responsive-fontsize';
import { Feather } from '@expo/vector-icons';

import { useNavigation, useRoute } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList, SchedulingDetailsParams } from '../../routes/stack.routes';

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

type SchedulingDetailsNavigationProp = StackNavigationProp<
  RootStackParamList,
  'SchedulingDetails'
>;

interface RentalPeriod {
  start: string;
  end: string;
}

export function SchedulingDetails() {
  const [rentalPeriod, setRentalPeriod] = useState<RentalPeriod>({} as RentalPeriod);
  const [loading, setLoading] = useState(false);

  const theme = useTheme();
  const navigation = useNavigation<SchedulingDetailsNavigationProp>();

  const route = useRoute();
  const { car, dates } = route.params as SchedulingDetailsParams;

  const numberDaily = dates.length;
  const rentTotal = car.rent.price * numberDaily;

  async function handleConfirmRental() {
    setLoading(true);

    const schedulesByCar = await api.get(`/schedules_bycars/${car.id}`);
    const unavailable_dates_car_API = schedulesByCar.data.unavailable_dates as string[];
    let canDoRent = true;

    const unavailable_dates = [
      ...unavailable_dates_car_API,
      ...dates,
    ];

    dates.map(date => {
      if (unavailable_dates_car_API.includes(date)) {
        if (canDoRent) {
          canDoRent = false;
          setLoading(false);
        }

        const formattedDate = format(addDays(new Date(date), 1), 'dd/MM/yyyy');
        return Alert.alert(`Já houve um aluguel na data: ${formattedDate}.`);
      }
    });

    if (canDoRent) {
      try {
        await api.post('/schedules_byuser', {
          user_id: 1,
          car,
          startDate: rentalPeriod.start,
          endDate: rentalPeriod.end
        });

        await api.put(`/schedules_bycars/${car.id}`, {
          id: car.id,
          unavailable_dates,
        });

        const confirmationScreenParams = {
          title: 'Carro alugado!',
          message: `Agora você só precisa ir \n
          até uma concessionaria da RENTX \n
          pegar o seu automóvel.`,
          nextScreenRoute: 'Home'
        };
    
        navigation.navigate('Confirmation', confirmationScreenParams);
      } catch (error) {
        console.log(error);
        setLoading(false);
        return Alert.alert('Houve um erro ao tentar alugar este carro.');
      }
    }
  }

  useEffect(() => {
    const start = format(addDays(new Date(dates[0]), 1), 'dd/MM/yyyy');
    const end = format(addDays(new Date(dates[dates.length - 1]), 1), 'dd/MM/yyyy');

    setRentalPeriod({
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
        <ImageSlider imagesUrl={car.photos} />
      </CarImages>

      <Content>
        <Details>
          <Description>
            <Brand>{car.brand}</Brand>
            <Name>{car.name}</Name>
          </Description>

          <Rent>
            <Period>{car.rent.period}</Period>
            <Price>R$ {car.rent.price}</Price>
          </Rent>
        </Details>

        <Accessories>
          {car.accessories.map(accessory => (
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
            <DateValue>{rentalPeriod.start}</DateValue>
          </DateInfo>

          <Feather name="chevron-right" size={RFValue(24)} color={theme.colors.shape} />

          <DateInfo>
            <DateTitle>ATÉ</DateTitle>
            <DateValue>{rentalPeriod.end}</DateValue>
          </DateInfo>
        </RentalPeriod>

        <RentalPrice>
          <RentalPriceLabel>TOTAL</RentalPriceLabel>
          <RentalPriceDetails>
            <RentalPriceQuota>R$ {car.rent.price} x{numberDaily} diárias</RentalPriceQuota>
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
