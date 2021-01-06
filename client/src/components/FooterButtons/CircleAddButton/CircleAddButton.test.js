import React from 'react';
import { render } from '@testing-library/react';

import CircleAddButton from './';
import { MemoryRouter } from 'react-router-dom';

describe('CircleAddButton', () => {
  it('should render', () => {
    const tree = render(<CircleAddButton />, { wrapper: MemoryRouter });
    expect(tree).toMatchSnapshot();
  });
});
