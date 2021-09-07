import { StackNavigationProp } from '@react-navigation/stack';
import { AuthRoutesParams } from '../../../routes/routeTypes';


type User = {
  name: string;
  email: string;
  driverLicense: string;
};

export type SignUpSecondStepParams = {
  user: User;
};
export type SignUpSecondStepNavigationProp = StackNavigationProp<
AuthRoutesParams,
'SignUpSecondStep'
>;
