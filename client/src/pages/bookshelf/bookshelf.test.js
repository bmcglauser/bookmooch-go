import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { MockedProvider } from '@apollo/client/testing';
import BookshelfPage from './';
import queryService from '../../services/queryService';
import UserContext from '../../utils/UserContext';

const mocks = [
  {
    request: {
      query: queryService.GET_BOOKSHELF('mattyboi')
    },
    result: {
      data: {
        getUserByUsername: {
          username: 'mattyboi',
          listings: [
            {
              asin: 'BM1287025487221026419',
              book: {
                title: 'Shogun',
                author: 'James Clavell'
              },
              listed_on: '1605869096000'
            },
            {
              asin: '0091927900',
              book: {
                title: 'Yes Man',
                author: 'Danny Wallace'
              },
              listed_on: '1605869205000'
            },
            {
              asin: 'BM1604225786521273516',
              book: {
                title: 'Angles and Demons',
                author: 'Dan Brown'
              },
              listed_on: '1605869241000'
            }
          ]
        }
      }
    }
  }
];

describe('Bookshelf Page', () => {
  let page;
  beforeEach(() => {
    page = render(
      <UserContext.Provider value={{ username: 'mattyboi' }}>
        <MockedProvider mocks={mocks} addTypename={false}>
          <BookshelfPage />
        </MockedProvider>
      </UserContext.Provider>,
      { wrapper: MemoryRouter }
    );
  });

  it('Shows loading', () => {
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('Should load books', async () => {
    expect(await screen.findByText('Shogun')).toBeInTheDocument();
    expect(await screen.findByText('by James Clavell')).toBeInTheDocument();
    const books = await screen.findAllByTestId('bookshelf-item');
    expect(books.length).toBe(3);
  });
});
