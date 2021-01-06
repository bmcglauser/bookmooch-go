import React from 'react';
import { render } from '@testing-library/react';

import UserHomeButton from './';
import { MemoryRouter } from 'react-router-dom';
import UserContext from '../../../utils/UserContext';

describe('UserHomeButton', () => {
  it('should render with UserContext', () => {
    const tree = render(
      <UserContext.Provider value={{ username: 'mattyboi' }}>
        <UserHomeButton />
      </UserContext.Provider>,
      { wrapper: MemoryRouter }
    );
    expect(tree).toMatchSnapshot();
  });
});
