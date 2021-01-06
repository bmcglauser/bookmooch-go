import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import BookDetailsInfo from './';

const mocks = {
  bookWithSummary: {
    asin: '0060560983',
    title: 'Some Enchanted Evening',
    author: 'Christina Dodd',
    cover_art_url: 'http://ecx.images-amazon.com/images/I/51Eq58LPfmL.jpg',
    usernamesWith: ['a', 'b', 'c', 'd'],
    availCount: '0',
    summary: 'This is a descriptive summary of a really good book'
  },
  bookWithoutSummary: {
    asin: '0060560983',
    title: 'Some Enchanted Evening',
    author: 'Christina Dodd',
    cover_art_url: 'http://ecx.images-amazon.com/images/I/51Eq58LPfmL.jpg',
    usernamesWith: ['a', 'b', 'c', 'd'],
    availCount: '0',
    summary: ''
  }
};

describe('BookDetailsInfo', () => {
  it('renders detail information when available', () => {
    const { getByText } = render(
      <BookDetailsInfo book={mocks.bookWithSummary} />,
      { wrapper: MemoryRouter }
    );
    expect(getByText(/Some Enchanted/)).toBeInTheDocument();
    expect(getByText(/Christina Dodd/)).toBeInTheDocument();
    expect(getByText(/Copies available from 4 users/)).toBeInTheDocument();
    expect(getByText(/This is a descriptive summary/)).toBeInTheDocument();
  });
  it('renders default information when not available', () => {
    const { getByText } = render(
      <BookDetailsInfo book={mocks.bookWithoutSummary} />,
      { wrapper: MemoryRouter }
    );
    expect(getByText(/Some Enchanted/)).toBeInTheDocument();
    expect(getByText(/Christina Dodd/)).toBeInTheDocument();
    expect(getByText(/Copies available from 4 users/)).toBeInTheDocument();
    expect(getByText(/No summary found/)).toBeInTheDocument();
  });
});
