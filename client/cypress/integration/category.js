context('カテゴリ', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000')
    cy.get('.nav-link').contains('ログイン').click()

    cy.get('form').within(() => {
      cy.get('#user_email').type('rosario_schimmel@ferry.com')
      cy.get('#user_password').type('password')
      cy.get('.btn').click()
    })

    cy.url().should('eq', 'http://localhost:3000/mypage')
    cy.get('.nav-link').contains('各種設定').click()
    cy.reload()
    cy.get('.list-group-item').contains('カテゴリ設定').click()
  })

  it('Add Category successfully.', () => {
    cy.get('.category-form-component').within(() => {
      cy.get('.radio-label').first().click()
      cy.get('input[name=category_name]').type('かてごり')
      cy.get('.btn').should('not.be.disabled')
      cy.get('.btn').click()
    })

    cy.get('.flash-message-component:last').should('have.text', 'カテゴリを追加しました')
  })
})