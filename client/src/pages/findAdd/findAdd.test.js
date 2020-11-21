import React from 'react'
import { render, fireEvent, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import FindAddPage from './';

describe('Find add page', () => {
  let page;
  beforeEach(() => {
    page = render(
      <MemoryRouter>
        <FindAddPage />
      </MemoryRouter>
    )
  })
  
  it('successfully renders the page', () => {
    expect(page).toMatchSnapshot();
  });

  it('seach should be captured', async () => {
    const input = screen.getByRole('textbox');
    fireEvent.change(input, {
      target: { value: 'norris' }
    })
    expect(input.value).toBe('norris');
  });
});