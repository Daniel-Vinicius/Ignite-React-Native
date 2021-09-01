import React, { useEffect, useState } from 'react';
import { StatusBar } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { useTheme } from 'styled-components';
import { RFValue } from 'react-native-responsive-fontsize';
import Logo from '../../assets/logo.svg';

import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../routes/stack.routes';

import { api } from '../../services/api';
import { CarDTO } from '../../dtos/CarDTO';

import { Car } from '../../components/Car';
import { Load } from '../../components/Load';

import {
  Container,
  Header,
  HeaderContent,
  TotalCars,
  CarList,
  MyCarsButton
} from './styles';

type HomeNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Home'
>;

export function Home() {
  const [cars, setCars] = useState<CarDTO[]>([]);
  const [loading, setLoading] = useState(true);

  const theme = useTheme();
  const navigation = useNavigation<HomeNavigationProp>();

  function handleClickCardCar(car: CarDTO) {
    navigation.navigate('CarDetails', { car });
  }

  function handleClickMyCarsButton() {
    navigation.navigate('MyCars');
  }

  async function fetchCars() {
    try {
      const response = await api.get<CarDTO[]>('/cars');
      setCars(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchCars();
  }, []);

  return (
    <Container>
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />

      <Header>
        <HeaderContent>

          <Logo width={RFValue(108)} height={RFValue(12)} />

          <TotalCars>
            { loading ? 'Carregando...' : `Total de ${cars.length} carros`}
          </TotalCars>

        </HeaderContent>
      </Header>

      { loading ? <Load /> :
        <CarList
          data={cars}
          keyExtractor={item => item.id}
          renderItem={({ item }) => <Car data={item} onPress={() => handleClickCardCar(item)} />}
        />
      }

      <MyCarsButton onPress={handleClickMyCarsButton}>
        <Ionicons
          name="ios-car-sport"
          size={32}
          color={theme.colors.shape}
        />
      </MyCarsButton>
    </Container>
  );
};
