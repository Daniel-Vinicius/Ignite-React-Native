import { StackNavigationProp } from '@react-navigation/stack';

import { AppStackRoutesParams } from '../../routes/routeTypes';
import { CarDTO } from '../../dtos/CarDTO';


export type SchedulingParams = {
  car: CarDTO;
};

export type SchedulingNavigationProp = StackNavigationProp<
AppStackRoutesParams,
'Scheduling'
>;
