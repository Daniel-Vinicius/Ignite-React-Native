import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';

import { ThemeProvider } from 'styled-components/native';
import { NavigationContainer } from '@react-navigation/native';
import theme from '../../global/styles/theme';

import { Register } from '.';

const Providers: React.FC = ({ children }) => {
  return (
    <ThemeProvider theme={theme}>
      <NavigationContainer>
        {children}
      </NavigationContainer>
    </ThemeProvider>
  )
};

describe('Register Screen', () => {
  it('should be able open category modal when user click on button', async () => {
    const { getByTestId } = render(<Register />, { wrapper: Providers });

    const categoryModal = getByTestId('modal-category');
    const categoryButton = getByTestId('button-category');

    expect(categoryModal.props.visible).toBeFalsy();

    fireEvent.press(categoryButton);

    await waitFor(() => {
      expect(categoryModal.props.visible).toBeTruthy();
    });
  });
});

