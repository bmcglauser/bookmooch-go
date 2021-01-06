import React from 'react';
import { render } from '@testing-library/react';

import Header from './';

describe('Welcome Text', () => {
  it('should render with title prop', () => {
    const tree = render(<Header title={'Any page!'} />);
    expect(tree).toMatchSnapshot();
  });
});
