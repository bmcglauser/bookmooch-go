import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import Join from './join';

describe('join page', () => {
  it('renders join page', () => {
    const searchPageDomTree = render(<Join />, { wrapper: MemoryRouter });
    expect(searchPageDomTree).toMatchSnapshot();
  });
});
