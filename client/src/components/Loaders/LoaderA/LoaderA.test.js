import React from 'react';
import { render } from '@testing-library/react';

import LoaderA from './';

describe('LoaderA', () => {
  it('should render', () => {
    const tree = render(<LoaderA />);
    expect(tree).toMatchSnapshot();
  });
});
