import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import LoginForm from './';

describe('LoginForm', () => {  
  it('should render the form', async () => {
    let page;
    page = render(
      <LoginForm />,
      { wrapper: MemoryRouter }
    );
    expect(await screen.getByLabelText(/Username/)).toBeInTheDocument();
    expect(await screen.getByLabelText(/Password/)).toBeInTheDocument();
  });  
});