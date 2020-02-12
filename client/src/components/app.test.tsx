import React from 'react';
import { render } from '@testing-library/react';
import 'plugins/i18n'

import App from 'components/app';

it('renders content.', () => {
  const { getByText } = render(<App />);

  const welcomeText = getByText(/welcome/i);
  expect(welcomeText).toBeInTheDocument();
});

it('renders header menu.', () => {
  const { getByText } = render(<App />);

  const homeMenu = getByText(/HOME/i);
  expect(homeMenu).toBeInTheDocument();

  const loginMenu = getByText(/ログイン/i);
  expect(loginMenu).toBeInTheDocument();
});
