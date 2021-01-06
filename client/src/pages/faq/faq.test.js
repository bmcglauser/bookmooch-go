import React from 'react';
import { render } from '@testing-library/react';

import FAQPage from './faq';

describe('FAQ page', () => {
  it('FAQ page renders correctly', () => {
    const tree = render(<FAQPage />);
    expect(tree).toMatchSnapshot();
  });
});
