import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { MockedProvider } from '@apollo/client/testing';
import { gql } from '@apollo/client';

import ChooseMoochPage from './';


const GET_MOOCH_CHOICE = gql`
  query {
    getBookByAsin (asin: "0964729237") {
      asin
      title
      author
      cover_art_url
      summary
      usersWith {
        username
        display_name
        country
        feedback_score
        willsend
        listings(asin: "0964729237") {
          asin
          listed_on
          condition
        }
      }
    }
  }
`;
const mocks = [
  {
    request: {
      query: GET_MOOCH_CHOICE,
    },
    result: {
      "data": {
        "getBookByAsin": {
          "asin": "0964729237",
          "author": "William P. Young",
          "cover_art_url": null,
          "summary": "I agree with other reviewers than an open mind is necessary",
          "title": "The Shack",
          "usersWith": [
            {
              "country": "US",
              "display_name": "Missy (USA: FL)",
              "feedback_score": "41",
              "listings": [{
                "asin": "0964729237",
                "condition": "",
                "listed_on": "1560181918000"
              }],
              "username": "mwilliams",
              "willsend": "mycountry",
            },{
              "country": "US",
              "display_name": "Laura (USA: NY)",
              "feedback_score": "93",
              "listings": [{
                "asin": "0964729237",
                "condition": "paperback",
                "listed_on": "1573938699000"
              }],
              "username": "lauraoathout",
              "willsend": "mycountry",
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
        <MockedProvider mocks={mocks} addTypename={false}>
        <ChooseMoochPage match={{ params: { asin: '0964729237' } }}/>
      </MockedProvider>,
      { wrapper: MemoryRouter}
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