import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { MockedProvider } from '@apollo/client/testing';
import { gql } from '@apollo/client';

import ConfirmAddPage from './';
  

const GET_SIMPLE_BOOK = gql`
  query {
    getBookByAsin (asin: "0066214122") {
      asin
      title
      author
      cover_art_url
    }
  }
`;

const mocks = [
  {
    request: {
      query: GET_SIMPLE_BOOK,
    },
    result: {
      "data": {
        "getBookByAsin": {
          "asin": "0066214122",
          "title": "Prey",
          "author": "Michael Crichton",
          "cover_art_url": null,
        }
      }
    }
  }
]

describe('Confirm Add Page', () => {
  let page;
  beforeEach(() => {
    page = render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <ConfirmAddPage match={{ params: { asin: '0066214122' } }}/>
      </MockedProvider>,
      { wrapper: MemoryRouter}
    );
  });

  it('Shows loading', () => {
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('Shows feedback information', async () => {
    expect(await screen.findByText(/Prey/)).toBeInTheDocument();
    expect(await screen.findByText(/Confirm add/)).toBeInTheDocument();
  });
});