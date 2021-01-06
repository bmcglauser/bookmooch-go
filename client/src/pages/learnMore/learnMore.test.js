import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import LearnMore from './learnMore';

describe('LearnMore page', () => {
  it('renders LearnMore page', () => {
    const searchPageDomTree = render(<LearnMore />, { wrapper: MemoryRouter });
    expect(searchPageDomTree).toMatchSnapshot();
  });
});
