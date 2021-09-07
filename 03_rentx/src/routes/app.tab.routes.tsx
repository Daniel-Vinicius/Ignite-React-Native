import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { AppStackRoutes } from './app.stack.routes';
import { Home } from '../screens/Home';
import { MyCars } from '../screens/MyCars';

import { AppTabRoutesParams } from './routeTypes';

const { Navigator, Screen } = createBottomTabNavigator<AppTabRoutesParams>();

export function AppTabRoutes() {
  return (
    <Navigator screenOptions={{ headerShown: false }}>
      <Screen name="Home" component={AppStackRoutes} />
      <Screen name="MyCars" component={MyCars} />
      <Screen name="Profile" component={Home} />
    </Navigator>
  );
}
