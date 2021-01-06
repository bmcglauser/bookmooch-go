import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import Landing from './landing';

describe('landing page', () => {
  it('renders landing page', () => {
    const searchPageDomTree = render(<Landing />, { wrapper: MemoryRouter });
    expect(searchPageDomTree).toMatchSnapshot();
  });
});
