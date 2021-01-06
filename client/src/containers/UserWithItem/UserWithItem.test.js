import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import UserWithItem from './';

const mocks = {
  selfUser: {
    display_name: 'A',
    username: 'user123',
    points: '100',
    country: 'US'
  },
  domesticUser: {
    display_name: 'Jake D',
    username: 'jdawg21',
    points: '217',
    listings: [
      {
        asin: '0964729237',
        listed_on: '1560181918000',
        condition: 'Light scuff'
      }
    ],
    listingCount: 1,
    feedback_score: '23',
    country: 'US',
    willsend: 'anywhere'
  },
  foreignUser: {
    display_name: 'Jake D',
    username: 'jdawg21',
    points: '217',
    listings: [
      {
        asin: '0964729237',
        listed_on: '1560181918000',
        condition: 'Light scuff'
      }
    ],
    listingCount: 1,
    feedback_score: '23',
    country: 'FR',
    willsend: 'mycountry'
  },
  asin: '0964729237'
};

describe('UserWithItem', () => {
  describe('Shows information properly depending on country', () => {
    it('allows mooching from compatible users', async () => {
      let page;
      page = render(
        <UserWithItem
          self={mocks.selfUser}
          other={mocks.domesticUser}
          asin={mocks.asin}
        />,
        { wrapper: MemoryRouter }
      );
      expect(await screen.findByText(/request/)).toBeInTheDocument();
      expect(await screen.findByText(/Jake D/)).toBeInTheDocument();
      expect(await screen.findByText(/will send/)).toBeInTheDocument();
    });
    it('restricts mooching from incompatible users', async () => {
      let page;
      page = render(
        <UserWithItem
          self={mocks.selfUser}
          other={mocks.foreignUser}
          asin={mocks.asin}
        />,
        { wrapper: MemoryRouter }
      );
      expect(await screen.findByText(/Jake D/)).toBeInTheDocument();
      expect(await screen.findByText(/will not send/)).toBeInTheDocument();
    });
  });
});
