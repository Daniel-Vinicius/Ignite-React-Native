import React, { useState, useEffect } from 'react';
import { StatusBar } from 'react-native';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';

import Animated, {
  useSharedValue,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  interpolate,
  Extrapolate
} from 'react-native-reanimated';

import { useNavigation, useRoute } from '@react-navigation/native';
import { CarDetailsNavigationProp, CarDetailsParams } from './NavigationProp';

import { CarDTO } from '../../dtos/CarDTO';
import { api } from '../../services/api';
import { useNetInfo } from '@react-native-community/netinfo';

import { BackButton } from '../../components/BackButton';
import { ImageSlider } from '../../components/ImageSlider';
import { Accessory } from '../../components/Accessory';
import { Button } from '../../components/Button';

import { getAccessoryIcon } from '../../utils/getAccessoryIcon';

import {
  Container,
  Header,
  Details,
  Description,
  Brand,
  Name,
  Rent,
  Period,
  Price,
  About,
  Accessories,
  Footer,
  OfflineInfo,
} from './styles';

export function CarDetails() {
  const navigation = useNavigation<CarDetailsNavigationProp>();
  const route = useRoute();
  const netInfo = useNetInfo();
  const scrollY = useSharedValue(0);

  const [carUpdated, setCarUpdated] = useState<CarDTO>({} as CarDTO);
  const { car } = route.params as CarDetailsParams;
  const carShown = carUpdated.name ? carUpdated : car;

  const scrollHandler = useAnimatedScrollHandler(event => {
    scrollY.value = event.contentOffset.y;
  });

  const headerStyleAnimation = useAnimatedStyle(() => {
    return {
      height: interpolate(scrollY.value, [0, 200], [200, 90], Extrapolate.CLAMP)
    };
  });

  const sliderCarsStyleAnimation = useAnimatedStyle(() => {
    return {
      opacity: interpolate(scrollY.value, [0, 150], [1, 0], Extrapolate.CLAMP),
    };
  });

  function handleConfirmRental() {
    navigation.navigate('Scheduling', { car });
  }

  useEffect(() => {
    async function fetchCarUpdated() {
      try {
        const response = await api.get(`/cars/${car.id}`);
        setCarUpdated(response.data)
      } catch (error) {
        console.log(error)
      }
    }

    if (netInfo.isConnected === true) {
      fetchCarUpdated();
    }
  }, [netInfo.isConnected]);

  return (
    <Container>
      <StatusBar translucent barStyle="dark-content" backgroundColor="transparent" />

      <Animated.View style={[headerStyleAnimation]}>
        <Header>
          <BackButton />
        </Header>

        <Animated.View style={[
          sliderCarsStyleAnimation,
          { marginTop: getStatusBarHeight() + 32 }
        ]}>
          <ImageSlider imagesUrl={
            !!carUpdated.photos ? carUpdated.photos :
              [{ id: car.thumbnail, photo: car.thumbnail, car_id: car.id }]
          } />
        </Animated.View>
      </Animated.View>

      <Animated.ScrollView
        contentContainerStyle={{ padding: 24, alignItems: 'center' }}
        showsVerticalScrollIndicator={false}
        onScroll={scrollHandler}
        scrollEventThrottle={16}
      >
        <Details>
          <Description>
            <Brand>{carShown.brand}</Brand>
            <Name>{carShown.name}</Name>
          </Description>

          <Rent>
            <Period>{carShown.period}</Period>
            <Price>R$ {netInfo.isConnected === true ? carUpdated.price : '...'}</Price>
          </Rent>
        </Details>

        {carUpdated.accessories && <Accessories>
          {carUpdated.accessories.map(accessory => (
            <Accessory
              key={accessory.type}
              name={accessory.name}
              icon={getAccessoryIcon(accessory.type)}
            />
          ))}
        </Accessories>}

        <About>{carShown.about}</About>
      </Animated.ScrollView>

      <Footer>
        <Button
          title="Escolher período do aluguel"
          onPress={handleConfirmRental}
          enabled={netInfo.isConnected === true}
        />

        {netInfo.isConnected === false &&
          <OfflineInfo>
            Conecte-se a internet para ver mais detalhes e agendar seu carro.
          </OfflineInfo>
        }
      </Footer>
    </Container>
  );
};
