import React, { useEffect, useState } from 'react';
import { StatusBar, StyleSheet } from 'react-native';
import { useTheme } from 'styled-components';
import { RFValue } from 'react-native-responsive-fontsize';

import { RectButton, PanGestureHandler } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';

import Animated, {
  useSharedValue,
  useAnimatedStyle,
  useAnimatedGestureHandler,
  withSpring
} from 'react-native-reanimated';

const ButtonAnimated = Animated.createAnimatedComponent(RectButton);

import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../routes/stack.routes';

import { api } from '../../services/api';
import { CarDTO } from '../../dtos/CarDTO';

import Logo from '../../assets/logo.svg';

import { Car } from '../../components/Car';
import { Load } from '../../components/Load';

import {
  Container,
  Header,
  HeaderContent,
  TotalCars,
  CarList,
} from './styles';

type HomeNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Home'
>;

export function Home() {
  const [cars, setCars] = useState<CarDTO[]>([]);
  const [loading, setLoading] = useState(true);

  const myCarsButtonPositionY = useSharedValue(0);
  const myCarsButtonPositionX = useSharedValue(0);

  const myCarsButtonAnimationStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: myCarsButtonPositionX.value },
        { translateY: myCarsButtonPositionY.value },
      ]
    };
  });

  const myCarsButtonOnGestureEvent = useAnimatedGestureHandler({
    onStart(_, ctx: any) {
      ctx.positionX = myCarsButtonPositionX.value;
      ctx.positionY = myCarsButtonPositionY.value;
    },

    onActive(event, ctx: any) {
      myCarsButtonPositionX.value = (ctx.positionX + event.translationX);
      myCarsButtonPositionY.value = (ctx.positionY + event.translationY);
    },

    onEnd() {
      myCarsButtonPositionX.value = withSpring(myCarsButtonPositionX.value + 10);
      myCarsButtonPositionY.value = withSpring(myCarsButtonPositionY.value + 10);
    }
  });

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
            {loading ? 'Carregando...' : `Total de ${cars.length} carros`}
          </TotalCars>

        </HeaderContent>
      </Header>

      {loading ? <Load /> :
        <CarList
          data={cars}
          keyExtractor={item => item.id}
          renderItem={({ item }) => <Car data={item} onPress={() => handleClickCardCar(item)} />}
        />
      }

      <PanGestureHandler onGestureEvent={myCarsButtonOnGestureEvent}>
        <Animated.View
          style={[
            myCarsButtonAnimationStyle,
            {
              position: 'absolute',
              bottom: 13,
              right: 22,
            }
          ]}
        >
          <ButtonAnimated
            onPress={handleClickMyCarsButton}
            style={[styles.button, { backgroundColor: theme.colors.main }]}
          >
            <Ionicons
              name="ios-car-sport"
              size={32}
              color={theme.colors.shape}
            />
          </ButtonAnimated>
        </Animated.View>
      </PanGestureHandler>
    </Container>
  );
};

const styles = StyleSheet.create({
  button: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center'
  }
});
