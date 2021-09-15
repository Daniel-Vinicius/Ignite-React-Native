import React from 'react';
import { render } from '@testing-library/react-native';

import { ThemeProvider } from 'styled-components/native';
import theme from '../../../global/styles/theme';

import { Input } from '.';

const Providers: React.FC = ({ children }) => {
  return (
    <ThemeProvider theme={theme}>
      {children}
    </ThemeProvider>
  )
};

describe('Input Component', () => {
  it('must have specific border when active', () => {
    const { getByTestId } = render(
      <Input
        testID="input-email"
        placeholder="email"
        keyboardType="email-address"
        autoCorrect={false}
        active
      />, { wrapper: Providers });

    const inputComponent = getByTestId('input-email');

    expect(inputComponent.props.style[0].borderColor).toEqual(theme.colors.primary);
    expect(inputComponent.props.style[0].borderWidth).toEqual(3);
  });
});
