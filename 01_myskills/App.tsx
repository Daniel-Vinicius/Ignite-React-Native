import React, { useEffect } from "react";
import { StatusBar } from "react-native";

import SplashScreen from 'react-native-splash-screen'

import { Home } from "./src/pages/Home";

export default function App() {
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#121015" />
      <Home />
    </>
  );
};
