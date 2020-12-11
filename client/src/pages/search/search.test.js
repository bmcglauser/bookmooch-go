import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import Search from './search';

describe('seach page', () => {
  it('renders search page', () => {
    const searchPageDomTree = render(
        <Search />,
        { wrapper: MemoryRouter }
    );
    expect(searchPageDomTree).toMatchSnapshot();
  })
})