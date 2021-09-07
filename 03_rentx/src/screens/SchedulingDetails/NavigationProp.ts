import { StackNavigationProp } from '@react-navigation/stack';

import { AppStackRoutesParams } from '../../routes/routeTypes';
import { CarDTO } from '../../dtos/CarDTO';


export interface SchedulingDetailsParams {
  car: CarDTO;
  dates: string[];
}

export type SchedulingDetailsNavigationProp = StackNavigationProp<
AppStackRoutesParams,
'SchedulingDetails'
>;
