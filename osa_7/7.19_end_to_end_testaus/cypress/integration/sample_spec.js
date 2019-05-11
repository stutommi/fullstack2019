/* eslint-disable no-undef */
describe('My First Test', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      username: "test_username",
      name: "test_name",
      password: "salashankku"
    }
    cy.request('POST', 'http://localhost:3003/api/users', user)
  })

  it('Does not do much', function () {
    expect(true).to.equal(true)
  })

  it('Visits site', function () {
    cy.visit('http://localhost:3000')
    cy.contains('Login')
    expect(true).to.equal(true)

  })

  it('Posts a blog and likes it', function () {
    cy.visit('http://localhost:3000')

    cy.get('#username').type('test_username')
    cy.get('#password').type('salashankku{enter}')

    cy.contains('new blog').click()
    cy.get('#title').type('cy-titletest')
    cy.get('#author').type('cy-authortest')
    cy.get('#url').type('cy-urltest')
    cy.contains('create').click()

    cy
    .get('#cy-titletest')
    .contains('cy-titletest')
    .click()

    cy.get('[data-cy=like]').click()
  })


})
