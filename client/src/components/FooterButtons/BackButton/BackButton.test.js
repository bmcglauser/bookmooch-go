import React from 'react';
import { render } from '@testing-library/react';

import BackButton from './';
import { MemoryRouter } from 'react-router-dom';

describe('Back Button', () => {
  it('should render', () => {
    const tree = render(<BackButton />, { wrapper: MemoryRouter });
    expect(tree).toMatchSnapshot();
  });
});
