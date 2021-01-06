import React from 'react';
import { render, screen } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import { MemoryRouter } from 'react-router-dom';
import queryService from '../../services/queryService';
import UserProfilePage from './userProfile';


const mocks = [
  {
    request: {
      query: queryService.GET_USER('mattyboi'),
    },
    result: {
      data: {
        getUserByUsername: {
          display_name: 'mattyboi (United Kingdom)',
          username: 'mattyboi',
          points: '-18',
          listingCount: 12,
          feedback_score: '0'
        }
      }
    }
  }
];

describe('User profile page', () => {
  let page;
  beforeEach(() => {
    page = render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <UserProfilePage match={{ params: { username: 'matttyboi' } }} />
      </MockedProvider>,
      { wrapper: MemoryRouter }
    );
  });

  it('should show loading', () => {
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('should show the user profile info', () => {
    setTimeout(()=> {
      expect(screen.findByText('mattyboi')).toBeInTheDocument();
    },0)
  });
});
