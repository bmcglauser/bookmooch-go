import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { MockedProvider } from '@apollo/client/testing';
import queryService from '../../services/queryService';
import SearchResults from './searchResults';

const mocks = [
  {
    request: {
      query: queryService.GET_RECENT()
    },
    result: {
      data: {
        getSearchRecent: [
          {
            asin: '0060560983',
            title: 'Some Enchanted Evening',
            author: 'Christina Dodd',
            cover_art_url:
              'http://ecx.images-amazon.com/images/I/51Eq58LPfmL.jpg',
            usernamesWith: [],
            availCount: '0',
            summary: ''
          }
        ]
      }
    }
  },
  {
    request: {
      query: queryService.GET_SEARCH('some')
    },
    result: {
      data: {
        getSearch: [
          {
            asin: '0060560983',
            title: 'Some Enchanted Evening',
            author: 'Christina Dodd',
            cover_art_url:
              'http://ecx.images-amazon.com/images/I/51Eq58LPfmL.jpg',
            usernamesWith: [],
            availCount: '0',
            summary: ''
          }
        ]
      }
    }
  }
];

describe('search results page', () => {
  it('renders Search Results page', () => {
    const { getByText } = render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <SearchResults match={{ params: { string: '~~~recent' } }} />
      </MockedProvider>,
      { wrapper: MemoryRouter }
    );
    expect(getByText('Loading...')).toBeInTheDocument();
    setTimeout(() => {
      const book = findByText('Some Enchanted Evening');
      expect(book).toBeInTheDocument();
    }, 0);
  });
});
