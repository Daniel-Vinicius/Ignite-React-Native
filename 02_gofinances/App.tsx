import React from 'react';
import { ThemeProvider } from 'styled-components';
import { NavigationContainer } from '@react-navigation/native';

import AppLoading from 'expo-app-loading';
import { StatusBar } from 'expo-status-bar';
import {
  useFonts,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_700Bold,
} from '@expo-google-fonts/poppins';

import theme from './src/global/styles/theme';

// import { AppRoutes } from './src/routes/app.routes';
import { SignIn } from './src/screens/SignIn';

export default function App() {
  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_700Bold
  });

  if (!fontsLoaded) {
    return <AppLoading />
  }

  return (
    <ThemeProvider theme={theme}>
      <NavigationContainer>
        <SignIn />
      </NavigationContainer>
      <StatusBar style="light" translucent />
    </ThemeProvider>
  );
}
