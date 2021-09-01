import React, { useState } from 'react';
import { StatusBar } from 'react-native';
import { useTheme } from 'styled-components';
import { format, addDays } from 'date-fns';

import { useNavigation, useRoute } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList, SchedulingParams } from '../../routes/stack.routes';

import { BackButton } from '../../components/BackButton';
import { Button } from '../../components/Button';

import {
  Calendar,
  generateInterval,
  DayProps,
  MarkedDateProps
} from '../../components/Calendar';

import ArrowSvg from '../../assets/arrow.svg';

import {
  Container,
  Header,
  Title,
  RentalPeriod,
  DateInfo,
  DateTitle,
  DateValue,
  Content,
  Footer,
} from './styles';

type SchedulingNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Scheduling'
>;

interface RentalPeriod {
  startFormatted: string;
  endFormatted: string;
}

export function Scheduling() {
  const [lastSelectedDate, setLastSelectedDate] = useState<DayProps>({} as DayProps);
  const [markedDates, setMarkedDates] = useState<MarkedDateProps>({} as MarkedDateProps);
  const [rentalPeriod, setRentalPeriod] = useState<RentalPeriod>({} as RentalPeriod);

  const theme = useTheme();
  const navigation = useNavigation<SchedulingNavigationProp>();

  const route = useRoute();
  const { car } = route.params as SchedulingParams;

  function handleConfirmRental() {
    return navigation.navigate('SchedulingDetails', {
      car,
      dates: Object.keys(markedDates),
    });
  }

  function handleChangeDate(date: DayProps) {
    let start = !lastSelectedDate.timestamp ? date : lastSelectedDate;
    let end = date;

    if (start.timestamp > end.timestamp) {
      start = end;
      end = start;
    }

    setLastSelectedDate(end);

    const interval = generateInterval(start, end);
    setMarkedDates(interval);

    const firstDate = Object.keys(interval)[0];
    const endDate = Object.keys(interval)[Object.keys(interval).length - 1];

    const startFormatted = format(addDays(new Date(firstDate), 1), 'dd/MM/yyyy');
    const endFormatted = format(addDays(new Date(endDate), 1), 'dd/MM/yyyy');

    setRentalPeriod({
      startFormatted,
      endFormatted,
    });
  }

  return (
    <Container>
      <Header>
        <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />
        <BackButton color={theme.colors.shape} />

        <Title>
          Escolha uma {'\n'}
          data de início e {'\n'}
          fim do aluguel
        </Title>

        <RentalPeriod>
          <DateInfo>
            <DateTitle>DE</DateTitle>
            <DateValue filled={!!rentalPeriod.startFormatted}>
              {rentalPeriod.startFormatted}
            </DateValue>
          </DateInfo>

          <ArrowSvg />

          <DateInfo>
            <DateTitle>ATÉ</DateTitle>
            <DateValue filled={!!rentalPeriod.endFormatted}>
              {rentalPeriod.endFormatted}
            </DateValue>
          </DateInfo>
        </RentalPeriod>
      </Header>

      <Content>
        <Calendar
          markedDates={markedDates}
          onDayPress={handleChangeDate}
        />
      </Content>

      <Footer>
        <Button
          title="Confirmar"
          onPress={handleConfirmRental}
          enabled={!!rentalPeriod.endFormatted}
        />
      </Footer>
    </Container>
  );
};
