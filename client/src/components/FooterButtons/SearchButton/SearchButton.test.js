import React from 'react';
import { render } from '@testing-library/react';

import SearchButton from './';
import { MemoryRouter } from 'react-router-dom';

describe('SearchButton', () => {
  it('should render', () => {
    const tree = render(<SearchButton />, { wrapper: MemoryRouter });
    expect(tree).toMatchSnapshot();
  });
});
