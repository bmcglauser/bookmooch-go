import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import BookshelfItem from './';

const mocks = {
  listing: {
    asin: '0060560983',
    book: {
      asin: '0060560983',
      title: 'Some Enchanted Evening',
      author: 'Christina Dodd',
      cover_art_url: 'http://ecx.images-amazon.com/images/I/51Eq58LPfmL.jpg',
      usernamesWith: [],
      availCount: '0',
      summary: ''
    },
    listed_on: '1560181918000',
    condition: 'Good condition'
  }
};

describe('Bookshelf item', () => {
  it('renders item to send', () => {
    const { getByText } = render(<BookshelfItem listing={mocks.listing} />, {
      wrapper: MemoryRouter
    });
    expect(getByText(/Some Enchanted/)).toBeInTheDocument();
    expect(getByText(/Christina Dodd/)).toBeInTheDocument();
    expect(getByText('remove')).toBeInTheDocument();
  });
});
