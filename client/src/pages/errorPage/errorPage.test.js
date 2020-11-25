import React from 'react'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'

import ErrorPage from './errorPage'

const goBack = jest.fn()

describe('Error Page', () => {

  it('should render the page', () => {
    render(
      <ErrorPage />,
      { wrapper: MemoryRouter }
    )
    expect(screen.getByText('Uh oh! Looks like there was a problem loading the page...')).toBeInTheDocument();
  })

  it('should render Go Back if props.ctx passed to component', () => {
    render(
      <ErrorPage ctx={{ history: {goBack: goBack}}} />,
      { wrapper: MemoryRouter }
    )
    expect(screen.getByText('Go Back')).toBeInTheDocument();
  })


})