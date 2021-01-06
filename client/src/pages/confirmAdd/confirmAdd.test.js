import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { MockedProvider } from '@apollo/client/testing';
import queryService from '../../services/queryService';

import ConfirmAddPage from './';
  

const mocks = [
  {
    request: {
      query: queryService.GET_SIMPLE_BOOK("0066214122"),
    },
    result: {
      "data": {
        "getBookByAsin": {
          "asin": "0066214122",
          "title": "Prey",
          "author": "Michael Crichton",
          "cover_art_url": null,
        }
      }
    }
  }
]

describe('Confirm Add Page', () => {
  let page;
  beforeEach(() => {
    page = render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <ConfirmAddPage match={{ params: { asin: '0066214122' } }}/>
      </MockedProvider>,
      { wrapper: MemoryRouter}
    );
  });

  it('Shows loading', () => {
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('Shows feedback information', async () => {
    expect(await screen.findByText(/Prey/)).toBeInTheDocument();
    expect(await screen.findByText(/Confirm add/)).toBeInTheDocument();
  });
});