import React from 'react'
import ReservationDetails from './page'

describe('<ReservationDetails />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<ReservationDetails />)
  })
})