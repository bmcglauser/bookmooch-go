import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { MockedProvider } from '@apollo/client/testing';
import { gql } from '@apollo/client';

import ConfirmMoochPage from './';

const GET_CONFIRM_MOOCH = gql`  
  query {
    self: getUserByUsername (username: "${self}") {
      username
      display_name
      country
      points
    },
    otherUser: getUserByUsername (username: "${otherUsername}") {
      username
      display_name
      country
      willsend
      listings(asin: "${asin}") {
        asin
        listed_on
        condition
      }
    },
    getBookByAsin(asin: "${asin}") {
      asin
      title
      author
    }
  }
`;

const mocks = [
  {
    request: {
      query: GET_CONFIRM_MOOCH,
    },
    result: {
      "data": {
        "self": {
          "username": "joeshmo",
          "display_name": "Joe (USA: IL)",
          "country": "US",
          "points": 123
        },
        "otherUser": {
          "username": "rainroses",
          "display_name": "Ana (USA: CA)",
          "country": "US",
          "willsend": "askme",
          "listings": [{
            "asin": "0066214122", 
            "listed_on": "1485306144000", 
            "condition": ""
          }],
        },
        "getBookByAsin": {
          "asin": "0066214122",
          "author": "Michael Crichton",
          "title": "Prey"
        }
      }
    }
  }
]

describe('Mooch Confirm Page', () => {
  let page;
  beforeEach(() => {
    page = render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <ConfirmMoochPage match={{ params: { user: 'rainroses', asin: '0066214122' } }}/>
      </MockedProvider>,
      { wrapper: MemoryRouter}
    );
  });

  it('Shows loading', () => {
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('Shows mooch to confirm', async () => {
    expect(await screen.findByText(/Prey/)).toBeInTheDocument();
  });
});
