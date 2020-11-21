import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import LoginPage from './';

describe(() => {
  it('should render the login form correctly', () => {
    const loginPage = render(<LoginPage />, { wrapper: LoginPage });
    expect(loginPage).toMatchSnapshot();
  });
});
