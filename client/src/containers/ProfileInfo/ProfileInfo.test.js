import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import ProfileInfo from './';

const mocks = {
  selfUser: {
    display_name: 'Adam L',
    username: 'user123',
    points: '100',
    listingCount: 2,
    feedback_score: '26'
  }
};

describe('UserWithItem', () => {
  it('Shows user profile information', async () => {
    let page;
    page = render(<ProfileInfo user={mocks.selfUser} />, {
      wrapper: MemoryRouter
    });
    expect(await screen.findByText(/Bookshelf/)).toBeInTheDocument();
    expect(await screen.findByText(/Adam L/)).toBeInTheDocument();
    expect(
      await screen.findByText(`Books listed: ${mocks.selfUser.listingCount}`)
    ).toBeInTheDocument();
  });
});
