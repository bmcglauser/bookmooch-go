import React from 'react';
import { render } from '@testing-library/react';

import LoaderB from './';

describe('LoaderB', () => {
  it('should render', () => {
    const tree = render(<LoaderB />);
    expect(tree).toMatchSnapshot();
  });
});
