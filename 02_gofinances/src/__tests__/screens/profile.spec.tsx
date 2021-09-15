import React from 'react';
import { render } from '@testing-library/react-native';

import { Profile } from '../../screens/Profile';

test('Check if show correctly user input name placeholder', () => {
  const { getByPlaceholderText, debug } = render(<Profile />);

  debug();

  const inputName = getByPlaceholderText('Nome');
  console.log("### INPUT ###", inputName);
  
  expect(inputName).toBeDefined();
});
