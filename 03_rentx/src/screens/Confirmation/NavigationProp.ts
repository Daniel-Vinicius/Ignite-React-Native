import { StackNavigationProp } from '@react-navigation/stack';
import { AppStackRoutesParams } from '../../routes/routeTypes';


export type ConfirmationParams = {
  title: string;
  message: string;
  nextScreenRoute: string;
};

export type ConfirmationNavigationProp = StackNavigationProp<
AppStackRoutesParams,
'Confirmation'
>;
