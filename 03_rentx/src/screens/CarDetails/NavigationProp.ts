import { StackNavigationProp } from '@react-navigation/stack';

import { AppStackRoutesParams } from '../../routes/routeTypes';
import { CarDTO } from '../../dtos/CarDTO';

export type CarDetailsParams = {
  car: CarDTO;
}

export type CarDetailsNavigationProp = StackNavigationProp<
AppStackRoutesParams,
'CarDetails'
>;
