
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
    cy.get('.MoviePoster').should('have.length', 4)
  })

  it('displays the upvote and downvote button properly on each poster', () => {
    cy.get('.UpVoteButton').should('exist')
    cy.get('.DownVoteButton').should('exist')
    cy.get('.MoviePoster').first().find('button').should('exist')
  })

  it('increases vote count when clicked and persists on refresh', () => {
    cy.intercept('PATCH', "https://rancid-tomatillos-api-ce4a3879078e.herokuapp.com/api/v1/movies/155", {
      statusCode: 201,
      body: {
        id: 155,
        poster_path: "https://image.tmdb.org/t/p/original//qJ2tW6WMUDux911r6m7haRef0WH.jpg",
        title: "The Dark Knight",
        vote_count: 32545
      }
    })
    cy.get('.MoviePoster').first().get('.UpVoteButton').first().click()
    cy.get('.MoviePoster').first().find('h3').should('have.text', '32545')

    cy.intercept("GET", "https://rancid-tomatillos-api-ce4a3879078e.herokuapp.com/api/v1/movies", {
      statusCode: 200,
      fixture: "upvoted_movie_posters" 
    })
    cy.visit('http://localhost:3000/')
    cy.reload()
    cy.get('.MoviePoster').first().find('h3').should('have.text', '32545')
  })

  it('decreases vote count when clicked and persists on refresh', () => {
    cy.intercept("GET", "https://rancid-tomatillos-api-ce4a3879078e.herokuapp.com/api/v1/movies", {
      statusCode: 200,
      fixture: "upvoted_movie_posters" 
    })

    cy.intercept('PATCH', "https://rancid-tomatillos-api-ce4a3879078e.herokuapp.com/api/v1/movies/155", {
      statusCode: 201,
      body: {
        id: 155,
        poster_path: "https://image.tmdb.org/t/p/original//qJ2tW6WMUDux911r6m7haRef0WH.jpg",
        title: "The Dark Knight",
        vote_count: 32544
      }
    })
    cy.get('.MoviePoster').first().get('.DownVoteButton').first().click()
    cy.get('.MoviePoster').first().find('h3').should('have.text', '32544')
    cy.intercept("GET", "https://rancid-tomatillos-api-ce4a3879078e.herokuapp.com/api/v1/movies", {
      statusCode: 200,
      fixture: "downvoted_movie_posters" 
    })
    cy.visit('http://localhost:3000/')
    cy.reload()
    cy.get('.MoviePoster').first().find('h3').should('have.text', '32544')
  })
})

describe('Movie Details Page', () => {
  beforeEach(() => {
    cy.intercept("GET", "https://rancid-tomatillos-api-ce4a3879078e.herokuapp.com/api/v1/movies/155", {
      statusCode: 200,
      fixture: "movie_details" 
    })
    cy.visit('http://localhost:3000')

    cy.intercept("GET", "https://rancid-tomatillos-api-ce4a3879078e.herokuapp.com/api/v1/movies", {
      statusCode: 200,
      fixture: "movie_posters" 
    })
    cy.visit('http://localhost:3000/')
  })

  it('displays poster details when the poster image is clicked', () => {
    cy.get('.MoviePosterImg').first().click()
    cy.get('.MovieDetailImg').should('exist')
    cy.get('.home-button').should('exist')
    cy.get('h2').should('have.text', ' The Dark Knight ')
    cy.get('h3').should('have.text', ' Drama, Action, Crime, Thriller ')
    cy.get('p').should('have.text', ' Batman raises the stakes in his war on crime. With the help of Lt. Jim Gordon and District Attorney Harvey Dent, Batman sets out to dismantle the remaining criminal organizations that plague the streets. The partnership proves to be effective, but they soon find themselves prey to a reign of chaos unleashed by a rising criminal mastermind known to the terrified citizens of Gotham as the Joker. ')
  })

  it('takes user to home page when home button is clicked', () => {
    cy.get('.MoviePosterImg').first().click()
    cy.get('.home-button').click()
    cy.get('.MoviesContainer').should('exist')
    cy.get('.MoviePoster').should('exist')
    cy.get('.MoviePosterImg').should('exist')
    cy.get('.UpVoteButton').should('exist')
    cy.get('.DownVoteButton').should('exist')
    cy.get('.MoviePoster').should('have.length', 4)
    cy.get('.MoviePoster').first().find('button').should('exist')
  })

  describe('Sad path', () => (
   
    it('displays all the movie posters on page load', () => {
      cy.intercept("GET", "https://rancid-tomatillos-api-ce4a3879078e.herokuapp.com/api/v1/movies", {
        statusCode: 400
      })
      cy.visit('http://localhost:3000/')
  
      cy.get('.MoviesContainer').should('exist')
      cy.get('div').should('have.text', "rancid tomatillosFailed to execute 'json' on 'Response': Unexpected end of JSON inputFailed to execute 'json' on 'Response': Unexpected end of JSON input")
    })
  ))
})

