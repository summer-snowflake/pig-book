/// <reference types="cypress" />

export const login = () => {
  cy.visit('http://localhost:3000')
  cy.get('.nav-link').contains('ログイン').click()
}

context('Login', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000')
    cy.get('.nav-link').contains('ログイン').click()
  })

  it('Login successfully.', () => {
    cy.url().should('eq', 'http://localhost:3000/users/sign_in')

    cy.get('form').within(() => {
      cy.get('#user_email').type('rosario_schimmel@ferry.com')
      cy.get('#user_password').type('password')
      cy.get('.btn').click()
    })

    cy.url().should('eq', 'http://localhost:3000/mypage')

    cy.get('.flash-message-component').should(($div) => {
      expect($div).to.have.text('ログインしました')
    })
  })

  it('Login Failed.', () => {
    cy.url().should('eq', 'http://localhost:3000/users/sign_in')

    cy.get('form').within(() => {
      cy.get('#user_email').type('dummy@example.com')
      cy.get('#user_password').type('password')
      cy.get('.btn').click()
    })

    cy.url().should('eq', 'http://localhost:3000/users/sign_in')

    cy.get('.flash-message-component').should(($div) => {
      expect($div).to.have.text('ログインに失敗しました')
    })
  })
})
