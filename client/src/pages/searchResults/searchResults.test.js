import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { MockedProvider } from '@apollo/client/testing'
import { gql } from '@apollo/client'

import SearchResults from './searchResults';

const GET_RECENT = gql`
  query {
    getSearchRecent {
      asin
      title
      author
      cover_art_url
      usernamesWith
      availCount
      summary
    }
  }
`;
const GET_SEARCH = gql`
  query {
    getSearch (text: String) {
      asin
      title
      author
      cover_art_url
      usernamesWith
      availCount
      summary
    }
  }
`;

const mocks = [
  {
    request: {
      query: GET_RECENT,
      variables: {}
    },
    result: {
      data: {
        getSearchRecent: [
          {
            asin: "0060560983",
            title: "Some Enchanted Evening",
            author: "Christina Dodd",
            cover_art_url: "http://ecx.images-amazon.com/images/I/51Eq58LPfmL.jpg",
            usernamesWith: [],
            availCount: "0",
            summary: ""
          }
        ]
      }
    }
  },
  {
    request: {
      query: GET_SEARCH,
      variables: {
        text: 'some'
      }
    },
    result: {
      data: {
        getSearch: [
          {
            asin: "0060560983",
            title: "Some Enchanted Evening",
            author: "Christina Dodd",
            cover_art_url: "http://ecx.images-amazon.com/images/I/51Eq58LPfmL.jpg",
            usernamesWith: [],
            availCount: "0",
            summary: ""
          }
        ]
      }
    }
  }
]

describe('search results page', () => {
  it('renders Search Results page', async () => {
   const { getByText } = render (
      <MockedProvider mocks={mocks} addTypename={false}>
        <SearchResults match={{ params: { string: '~~~recent' } }} />
      </MockedProvider>,
      { wrapper: MemoryRouter }
    );
    expect(getByText('Loading...')).toBeInTheDocument();
    // const book = await findByText(/Some/);
    // expect(book).toBeInTheDocument(); 
  });
});