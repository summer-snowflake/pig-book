context('基本設定', () => {
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
  })

  it('Update base settings successfully.', () => {
    cy.get('.settings-top-component').within(() => {
      cy.get('.fa-edit').click()

      cy.get('.radio-input:not(:checked)').parent().first().within(($span) => {
        $span.children().click()
      })
      cy.get('.btn').should('not.be.disabled')
      cy.get('.btn').click()
    })

    cy.get('.flash-message-component:last').should('have.text', '更新しました')
  })

  it('Cancel base settings.', () => {
    cy.get('.settings-top-component').within(() => {
      cy.get('.fa-edit').click()
      cy.get('.btn').should('be.disabled')

      cy.get('.fa-times').click()
    })

    cy.get('.settings-top-component').within(() => {
      cy.get('.fa-edit').click()
      cy.get('.radio-input:not(:checked)').parent().first().within(($span) => {
        $span.children().click()
      })
      cy.get('.btn').should('be.not.disabled')

      cy.get('.fa-times').click()
    })

    cy.get('.modal-footer').find('.btn-light').click()

    cy.get('.settings-top-component').within(() => {
      cy.get('.btn').should('be.not.disabled')
    })
  })

  it('Update Memo successfully.', () => {
    cy.get('.memo-component').within(() => {
      cy.get('.fa-edit').click()

      cy.get('textarea').type('あいうえお')
      cy.get('.btn').should('not.be.disabled')
      cy.get('.btn').click()
    })

    cy.get('.flash-message-component:last').should('have.text', '更新しました')
  })
})