import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { MockedProvider } from '@apollo/client/testing';
import queryService from '../../services/queryService';
import BookDetailsPage from './';

const mocks = [
  {
    request: {
      query: queryService.GET_BOOK_DETAILS('0964729237')
    },
    result: {
      data: {
        getBookByAsin: {
          asin: '0964729237',
          author: 'William P. Young',
          availCount: '10',
          cover_art_url: null,
          summary: 'I agree with other reviewers than an open mind is necessary.  Once I got through the first few chapters, I realized I was enjoying the story and hooked.',
          title: 'The Shack',
          usernamesWith: ['mwilliams', 'lauraoathout', 'susie425', 'pchisolm', 'b1rdyb1rdy', 'giraffegirl', 'jmsmith15', 'bsu', 'vjconnor', 'christycapps'],
        }
      }
    }
  }
];

describe('Book Detail Page', () => {
  let page;
  beforeEach(() => {
    page = render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <BookDetailsPage match={{ params: { asin: '0964729237' } }}/>
      </MockedProvider>,
      { wrapper: MemoryRouter }
    );
  });

  it('Shows loading', () => {
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('Shows Book Detail information', async () => {
    expect(await screen.findByText(/Shack/)).toBeInTheDocument();
    expect(await screen.findByText(/William/)).toBeInTheDocument();
    expect(await screen.findByText(/Add this book/)).toBeInTheDocument();
  });
});