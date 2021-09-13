import React, { useEffect, useState } from 'react';
import { StatusBar, Button } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';

import { useNetInfo } from '@react-native-community/netinfo';
import { synchronize } from '@nozbe/watermelondb/sync';
import { database } from '../../database';
import { Car as ModelCar } from '../../database/model/Car';

import { useNavigation } from '@react-navigation/native';
import { HomeNavigationProp } from './NavigationProp';

import { api } from '../../services/api';
import { CarDTO } from '../../dtos/CarDTO';

import Logo from '../../assets/logo.svg';

import { Car } from '../../components/Car';
import { LoadAnimation } from '../../components/LoadAnimation';

import {
  Container,
  Header,
  HeaderContent,
  TotalCars,
  CarList,
} from './styles';

export function Home() {
  const [cars, setCars] = useState<CarDTO[]>([]);
  const [loading, setLoading] = useState(true);

  const netInfo = useNetInfo();
  const navigation = useNavigation<HomeNavigationProp>();

  function handleClickCardCar(car: CarDTO) {
    navigation.navigate('CarDetails', { car });
  }

  async function offlineSynchronize() {
    await synchronize({
      database,
      pullChanges: async ({ lastPulledAt }) => {
        const response = await api.get(`/cars/sync/pull?lastPulledVersion=${lastPulledAt || 0}`);

        const { changes, latestVersion } = response.data;
        return { changes, timestamp: latestVersion }
      },

      pushChanges: async ({ changes }) => {
        const user = changes.users;

        try {
          await api.post(`/users/sync`, user);
        } catch (error) {
          console.log("### ERRO ao sincronizar usuário ###")
          console.log(JSON.stringify(error))
        }
      },
    });
  }

  useEffect(() => {
    let isMounted = true;

    async function fetchCars() {
      try {
        const carCollection = database.get<ModelCar>('cars');
        const carsResponse = await carCollection.query().fetch();
        const cars = carsResponse.map((car) => {
          return {
            id: car.id,
            brand: car.brand,
            name: car.name,
            about: car.about,
            fuel_type: car.fuel_type,
            thumbnail: car.thumbnail,
            period: car.period,
            price: car.price,
            photos: [],
            accessories: [],
          }
        });

        if (isMounted) {
          setCars(cars);
        }

      } catch (error) {
        console.log(error);
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    fetchCars();

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    if (netInfo.isConnected === true) {
      offlineSynchronize()
    }
  }, [netInfo.isConnected]);

  return (
    <Container>
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />

      <Header>
        <HeaderContent>

          <Logo width={RFValue(108)} height={RFValue(12)} />

          <TotalCars>
            {loading ? 'Carregando...' : `Total de ${cars.length} carros`}
          </TotalCars>

        </HeaderContent>
      </Header>

      <Button title="Sincronizar" onPress={offlineSynchronize} />

      {loading ? <LoadAnimation /> :
        <CarList
          data={cars}
          keyExtractor={item => item.id}
          renderItem={({ item }) => <Car data={item} onPress={() => handleClickCardCar(item)} />}
        />
      }
    </Container>
  );
};

