
import posters from '../fixtures/movie_posters.json' 
// import details from '../fixtures/movie_details.json' (you will need to add your own mock data to this file!)

describe('Main Page', () => {
  beforeEach(() => {
    cy.intercept("GET", "https://rancid-tomatillos-api-ce4a3879078e.herokuapp.com/api/v1/movies", {
      statusCode: 200,
      fixture: "movie_posters" 
    })
    cy.visit('http://localhost:3000/')
  })

  it('displays title on page load', () => {
    cy.get('h1')
    cy.contains('rancid tomatillos')
  })

  it('displays all the movie posters on page load', () => {
    cy.get('.MoviesContainer').should('exist')
    cy.get('.MoviePoster').should('exist')
    cy.get('.MoviePosterImg').should('exist')
    cy.get('.VoteButton').should('exist')
    cy.get('.MoviePoster').should('have.length', 4)
    cy.get('.MoviePoster').first().find('button').should('exist')
  })
})
