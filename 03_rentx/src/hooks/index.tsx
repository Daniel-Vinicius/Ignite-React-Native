import React, { ReactNode } from 'react';
import { ThemeProvider } from 'styled-components';

import { AuthProvider } from './auth';

import theme from '../styles/theme';

interface AppProviderProps {
  children: ReactNode;
}

function AppProvider({ children }: AppProviderProps) {
  return (
    <ThemeProvider theme={theme}>
      <AuthProvider>
        {children}
      </AuthProvider>
    </ThemeProvider>
  );
}

export { AppProvider };
