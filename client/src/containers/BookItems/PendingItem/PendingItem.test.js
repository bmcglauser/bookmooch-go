import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import PendingItem from './';

const mocks = {
  transaction: {
    giverUsername: 'userA',
    receiverUsername: 'userB',
    transaction_name: 'abc/123',
    created_on: '1560181918000',
    asin: '0060560983',
    status: '',
    book: {
      asin: '0060560983',
      title: 'Some Enchanted Evening',
      author: 'Christina Dodd',
      cover_art_url: 'http://ecx.images-amazon.com/images/I/51Eq58LPfmL.jpg',
      usernamesWith: [],
      availCount: '0',
      summary: ''
    }
  }
};

describe('pending item', () => {
  it('renders item to send', () => {
    const { getByText } = render(
      <PendingItem mooch={mocks.transaction} direction={'to_send'} />,
      { wrapper: MemoryRouter }
    );
    expect(getByText(/send to/)).toBeInTheDocument();
    expect(getByText(/userB/)).toBeInTheDocument();
  });
  it('renders item to receive', () => {
    const { getByText } = render(
      <PendingItem mooch={mocks.transaction} direction={'to_receive'} />,
      { wrapper: MemoryRouter }
    );
    expect(getByText(/get from/)).toBeInTheDocument();
    expect(getByText(/userA/)).toBeInTheDocument();
  });
});
