import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import SearchResultItem from './';

const book = {
  asin: "0060560983",
  title: "Some Enchanted Evening",
  author: "Christina Dodd",
  cover_art_url: "http://ecx.images-amazon.com/images/I/51Eq58LPfmL.jpg",
  usernamesWith: [],
  availCount: "0",
  summary: ""
};

describe('search result item', () => {
  it('renders search result', () => {
    const { getByText } = render(
      <SearchResultItem book={book} />,
      { wrapper: MemoryRouter }
    );
    expect(getByText(/Some Enchanted Eve/)).toBeInTheDocument();
    expect(getByText(/Christina Dodd/)).toBeInTheDocument();
    expect(getByText(/0 copies available/)).toBeInTheDocument();
  });
});