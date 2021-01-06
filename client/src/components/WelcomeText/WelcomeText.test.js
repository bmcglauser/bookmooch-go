import React from 'react';
import { render } from '@testing-library/react';

import WelcomeText from './';

describe('Welcome Text', () => {
  it('should render without "back" prop', () => {
    const tree = render(<WelcomeText back={false} />);
    expect(tree).toMatchSnapshot();
  });
  it('should render with "back" prop', () => {
    const tree = render(<WelcomeText back={true} />);
    expect(tree).toMatchSnapshot();
  });
});
