import { StackNavigationProp } from '@react-navigation/stack';
import { AuthRoutesParams } from '../../routes/routeTypes';

export type SignInNavigationProp = StackNavigationProp<
AuthRoutesParams,
'SignIn'
>;
