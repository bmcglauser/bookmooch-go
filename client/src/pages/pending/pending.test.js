import React from 'react';
import { render, screen } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing'
import { MemoryRouter } from 'react-router-dom'
import { gql } from '@apollo/client'

import PendingPage from './pending';

const GET_ALL_PENDING = gql`
  query {
    getUserByUsername (username: "mattyboi") {
      username
      pending_give {
        transaction_name
        asin
        book {
          title
          author
        }
        status
        receiverUsername
        created_on
      }
      pending_receive {
        transaction_name
        asin
        book {
          title
          author
        }
        status
        giverUsername
        created_on
      }
    }
  }
`

const mocks = [
  {
    request: {
      query: GET_ALL_PENDING,
    },
    result: {
      data: {
        "getUserByUsername": {
          "username": "mattyboi",
          "pending_give": [
            {
              "transaction_name": "cassidymaeve/20",
              "asin": "1593083327",
              "book": {
                "title": "A Tale of Two Cities (Barnes & Noble Classics Series) (B&N Classics Hardcover)",
                "author": "Charles Dickens"
              },
              "status": "requested",
              "receiverUsername": "cassidymaeve",
              "created_on": "1605886949000"
            }
          ],
          "pending_receive": []
        }
      }
    }
  }
]

describe('Pending page', () => {
  it('should show loading', () => {
    const { getByText } = render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <PendingPage match={{ params: { username: 'mattyboi' }}}/>
      </MockedProvider>
    )
    expect(getByText('Loading...')).toBeInTheDocument();
  });

  it('should show pending mooches', async () => {
    render (
      <MockedProvider mocks={mocks} addTypename={false}>  
        <PendingPage match={{ params: { username: 'mattyboi' }}}/>
      </MockedProvider>,
      { wrapper: MemoryRouter}
    );

    expect(await screen.findByText('Your pending mooches')).toBeInTheDocument();
    expect(await screen.findByText('Your books to send:')).toBeInTheDocument();
    expect(await screen.findByText('Your books to receive:')).toBeInTheDocument();
    expect(await screen.findByText('A Tale of Two Cities ...')).toBeInTheDocument();
  });
});