import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import ActiveItem from './';

const mocks = {
  book: {
    asin: "0060560983",
    title: "Some Enchanted Evening",
    author: "Christina Dodd",
    cover_art_url: "http://ecx.images-amazon.com/images/I/51Eq58LPfmL.jpg",
    usernamesWith: [],
    availCount: "0",
    summary: ""
  }
};

describe('Active item', () => {
  it('renders active item ', () => {
    const { getByText } = render(
      <ActiveItem book={mocks.book} />,
      { wrapper: MemoryRouter }
    );
    expect(getByText(/Some Enchanted/)).toBeInTheDocument();
    expect(getByText(/Christina Dodd/)).toBeInTheDocument();
  });
});