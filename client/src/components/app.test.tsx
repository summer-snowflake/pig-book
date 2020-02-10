import React from 'react';
import { render } from '@testing-library/react';
import App from 'components/app';

test('renders learn react link', () => {
  const { getByText } = render(<App />);
  const linkElement = getByText(/welcome/i);
  expect(linkElement).toBeInTheDocument();
});
