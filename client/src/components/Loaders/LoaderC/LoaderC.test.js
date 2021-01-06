import React from 'react';
import { render } from '@testing-library/react';

import LoaderC from './';

describe('LoaderC', () => {
  it('should render', () => {
    const tree = render(<LoaderC />);
    expect(tree).toMatchSnapshot();
  });
});
