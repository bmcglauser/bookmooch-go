import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { MockedProvider } from '@apollo/client/testing';
import queryService from '../../services/queryService';

import FeedbackPage from './';

const mocks = [
  {
    request: {
      query: queryService.GET_TRANSACTION('cassidymaeve/20')
    },
    result: {
      data: {
        getPendingById: {
          transaction_name: 'cassidymaeve/20',
          asin: '1593083327',
          book: {
            title:
              'A Tale of Two Cities (Barnes & Noble Classics Series) (B&N Classics Hardcover)',
            author: 'Charles Dickens',
            cover_art_url: ''
          },
          giverUsername: `xyzxyz`
        }
      }
    }
  }
];

describe('Feedback Page', () => {
  let page;
  beforeEach(() => {
    page = render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <FeedbackPage
          match={{ params: { user: 'cassidymaeve', number: '20' } }}
        />
      </MockedProvider>,
      { wrapper: MemoryRouter }
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
