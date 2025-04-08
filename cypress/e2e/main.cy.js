
import posters from '../fixtures/movie_posters.json' 
// import details from '../fixtures/movie_details.json' (you will need to add your own mock data to this file!)

describe('Main Page', () => {
  it('displays title on page load', () => {
    // hint: you'll want to add an intercept here if you are making a network request on page load!
    cy.visit('http://localhost:3000/')
    .get('h1')
    .contains('rancid tomatillos')
  })
})