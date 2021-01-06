import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import JoinForm from './';

describe('LoginForm', () => {
  it('should render the form', async () => {
    let page;
    page = render(<JoinForm />, { wrapper: MemoryRouter });
    expect(await screen.getByLabelText(/Username/)).toBeInTheDocument();
    expect(await screen.getByLabelText(/E-mail address/)).toBeInTheDocument();
    expect(await screen.getByLabelText(/Zip code/)).toBeInTheDocument();
    expect(await screen.getByLabelText(/Secret answer/)).toBeInTheDocument();
  });
});
