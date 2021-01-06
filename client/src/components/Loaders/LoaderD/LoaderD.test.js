import React from 'react';
import { render } from '@testing-library/react';

import LoaderD from './';

describe('LoaderD', () => {
  it('should render', () => {
    const tree = render(<LoaderD />);
    expect(tree).toMatchSnapshot();
  });
});
