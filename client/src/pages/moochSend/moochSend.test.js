import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { MockedProvider } from '@apollo/client/testing';
import queryService from '../../services/queryService';

import MoochSendPage from './';

const mocks = [
  {
    request: {
      query: queryService.GET_CONF_PENDING_GIVE('cassidymaeve/20')
    },
    result: {
      data: {
        getConfidentialPendingById: {
          transaction_name: 'cassidymaeve/20',
          asin: '1593083327',
          book: {
            title:
              'A Tale of Two Cities (Barnes & Noble Classics Series) (B&N Classics Hardcover)',
            author: 'Charles Dickens'
          },
          receiver_address: null,
          points_to_giver: '10',
          points_from_receiver: '10',
          created_on: '1605886949000',
          sent_on: null,
          condition: null,
          status: 'requested'
        }
      }
    }
  }
];

describe('Mooch Send Page', () => {
  let page;
  beforeEach(() => {
    page = render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <MoochSendPage
          match={{ params: { user: 'cassidymaeve', number: '20' } }}
        />
      </MockedProvider>,
      { wrapper: MemoryRouter }
    );
  });

  it('Shows loading', () => {
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('Shows pending requsts', async () => {
    expect(await screen.findByText(/A Tale/)).toBeInTheDocument();
  });
});
