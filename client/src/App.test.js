import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';


describe('App', () => {
  it('The App component renders correctly', () => {
    const tree = render(<App />);
    expect(tree).toMatchSnapshot();
  });
});