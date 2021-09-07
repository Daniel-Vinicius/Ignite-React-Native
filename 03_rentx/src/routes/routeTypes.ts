import { CarDetailsParams } from "../screens/CarDetails/NavigationProp";
import { SchedulingParams } from "../screens/Scheduling/NavigationProp";
import { SchedulingDetailsParams } from "../screens/SchedulingDetails/NavigationProp";
import { ConfirmationParams } from "../screens/Confirmation/NavigationProp";

import { SignUpSecondStepParams } from "../screens/SignUp/SignUpSecondStep/NavigationProp";

export type AppStackRoutesParams = {
  Home: undefined;
  CarDetails: CarDetailsParams;
  Scheduling: SchedulingParams;
  SchedulingDetails: SchedulingDetailsParams;
  Confirmation: ConfirmationParams;
};

export type AppTabRoutesParams = {
  AppHome: undefined;
  MyCars: undefined;
  Profile: undefined;
};

export type AuthRoutesParams = {
  Splash: undefined;
  SignIn: undefined;
  SignUpFirstStep: undefined;
  SignUpSecondStep: SignUpSecondStepParams;
  Confirmation: ConfirmationParams;
};

