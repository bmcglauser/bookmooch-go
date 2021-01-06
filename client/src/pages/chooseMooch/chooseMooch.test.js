import React from 'react';
import { render, screen } from '@testing-library/react';

import { MemoryRouter } from 'react-router-dom';
import { MockedProvider } from '@apollo/client/testing';
import queryService from '../../services/queryService';
import UserContext from '../../utils/UserContext';
import ChooseMoochPage from './';

const mocks = [
  {
    request: {
      query: queryService.GET_MOOCH_CHOICE('0964729237', 'mattyboi'),
    },
    result: {
      data: {
        getUserByUsername: {
          username: 'mattyboi',
          display_name: 'Matt H',
          country: 'US',
          points: 123
        },
        getBookByAsin: {
          asin: '0964729237',
          author: 'William P. Young',
          cover_art_url: null,
          summary: 'I agree with other reviewers than an open mind is necessary',
          title: 'The Shack',
          usersWith: [
            {
              country: 'US',
              display_name: 'Missy (USA: FL)',
              feedback_score: '41',
              listings: [{
                asin: '0964729237',
                condition: '',
                listed_on: '1560181918000'
              }],
              username: 'mwilliams',
              willsend: 'mycountry',
            },{
              country: 'US',
              display_name: 'Laura (USA: NY)',
              feedback_score: '93',
              listings: [{
                asin: '0964729237',
                condition: 'paperback',
                listed_on: '1573938699000'
              }],
              username: 'lauraoathout',
              willsend: 'mycountry',
            }
          ]
        }
      }
    }
  }
];

  describe('Choose Mooch Page', () => {
    let page;
    beforeEach(() => {
      page = render(
        <UserContext.Provider value={{username: 'mattyboi'}}>
          <MockedProvider mocks={mocks} addTypename={false}>
            <ChooseMoochPage match={{ params: { asin: '0964729237' } }}/>
          </MockedProvider>
        </UserContext.Provider>,
      { wrapper: MemoryRouter }
    );
  });

  it('Shows loading', () => {
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('Shows mooch choice information', async () => {
    expect(await screen.findByText(/Shack/)).toBeInTheDocument();
    expect(await screen.findByText(/Missy/)).toBeInTheDocument();
    expect(await screen.findByText(/Laura/)).toBeInTheDocument();
  });
});