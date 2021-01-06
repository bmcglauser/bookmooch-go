import React from 'react';
import { render, screen } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import { MemoryRouter } from 'react-router-dom';
import UserContext from '../../utils/UserContext';
import queryService from '../../services/queryService';

import PendingPage from './pending';

const mocks = [
  {
    request: {
      query: queryService.GET_ALL_PENDING('mattyboi')
    },
    result: {
      data: {
        getUserByUsername: {
          username: 'mattyboi',
          pending_give: [
            {
              transaction_name: 'cassidymaeve/20',
              asin: '1593083327',
              book: {
                title:
                  'A Tale of Two Cities (Barnes & Noble Classics Series) (B&N Classics Hardcover)',
                author: 'Charles Dickens'
              },
              status: 'requested',
              receiverUsername: 'cassidymaeve',
              created_on: '1605886949000'
            }
          ],
          pending_receive: []
        }
      }
    }
  }
];

describe('Pending page', () => {
  it('should show loading', () => {
    const { getByText } = render(
      <UserContext.Provider value={{ username: 'mattyboi' }}>
        <MockedProvider mocks={mocks} addTypename={false}>
          <PendingPage />
        </MockedProvider>
      </UserContext.Provider>
    );
    expect(getByText('Loading...')).toBeInTheDocument();
  });

  it('should show pending mooches', async () => {
    render(
      <UserContext.Provider value={{ username: 'mattyboi' }}>
        <MockedProvider mocks={mocks} addTypename={false}>
          <PendingPage />
        </MockedProvider>
      </UserContext.Provider>,
      { wrapper: MemoryRouter }
    );

    expect(await screen.findByText('Your pending mooches')).toBeInTheDocument();
    expect(await screen.findByText('Your books to send:')).toBeInTheDocument();
    expect(
      await screen.findByText('Your books to receive:')
    ).toBeInTheDocument();
    expect(
      await screen.findByText('A Tale of Two Cities ...')
    ).toBeInTheDocument();
  });
});
