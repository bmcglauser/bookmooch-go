import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import LoginPage from './';

describe('Login page', () => {
  it('should render the login form correctly', () => {
    const loginPage = render(<LoginPage />, { wrapper: MemoryRouter });
    expect(loginPage).toMatchSnapshot();
  });
});
