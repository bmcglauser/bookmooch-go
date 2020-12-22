import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { MockedProvider } from '@apollo/client/testing';
import { gql } from '@apollo/client';

import FeedbackPage from './';

const GET_TRANSACTION = gql`
  query {
    getPendingById (pending_id: "cassidymaeve/20") {
      transaction_name
      asin
      book {
        title
        author
        cover_art_url
      }
      giverUsername
    }
  }
`;

const mocks = [
  {
    request: {
      query: GET_TRANSACTION,
    },
    result: {
      "data": {
        "getPendingById": {
          "transaction_name": "cassidymaeve/20",
          "asin": "1593083327",
          "book": {
            "title": "A Tale of Two Cities (Barnes & Noble Classics Series) (B&N Classics Hardcover)",
            "author": "Charles Dickens",
            "cover_art_url": "",
          },
          "giverUsername": `xyzxyz`
        }
      }
    }
  }
]

describe('Feedback Page', () => {
  let page;
  beforeEach(() => {
    page = render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <FeedbackPage match={{ params: { user: 'cassidymaeve', number: '20' } }}/>
      </MockedProvider>,
      { wrapper: MemoryRouter}
    );
  });

  it('Shows loading', () => {
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('Shows feedback information', async () => {
    expect(await screen.findByText(/A Tale/)).toBeInTheDocument();
    expect(await screen.findByText(/xyzxyz/)).toBeInTheDocument();
  });
});