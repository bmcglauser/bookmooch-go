import React from 'react';
import { render } from '@testing-library/react';

import Footer from './';
import { MemoryRouter } from 'react-router-dom';

describe('Welcome Text', () => {
  describe('should render based on props passed', () => {
    it('should render with two corner buttons', () => {
      const tree = render(
      <Footer 
        leftBut={'userHome'}
        centerBut={null}
        rightBut={'search'} />, {wrapper: MemoryRouter});
      expect(tree).toMatchSnapshot();
    });
    it('should render with only center button', () => {
      const tree = render(
      <Footer 
        leftBut={null}
        centerBut={'circleAdd'}
        rightBut={null} />, {wrapper: MemoryRouter});
      expect(tree).toMatchSnapshot();
    });
    it('should render with one left button', () => {
      const tree = render(
      <Footer 
        leftBut={'userHome'}
        centerBut={null}
        rightBut={null} />, {wrapper: MemoryRouter});
      expect(tree).toMatchSnapshot();
    });
    it('should render with one right button', () => {
      const tree = render(
      <Footer 
        leftBut={null}
        centerBut={null}
        rightBut={'search'} />, {wrapper: MemoryRouter});
      expect(tree).toMatchSnapshot();
    });
    it('should render with one left button and center button', () => {
      const tree = render(
      <Footer 
        leftBut={'userHome'}
        centerBut={'circleAdd'}
        rightBut={null} />, {wrapper: MemoryRouter});
      expect(tree).toMatchSnapshot();
    });
  });
});
