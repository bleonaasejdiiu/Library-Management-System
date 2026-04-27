describe('Library Management System - Automated Tests', () => {

  // TEST 1 - Login i saktë si Admin
  it('TC-A01: Login i saktë si Admin', () => {
    cy.visit('http://localhost:3000/login')
    cy.get('input[name="email"]').type('admin@library.com')
    cy.get('input[name="password"]').type('admin123')
    cy.get('button[type="submit"]').click()
    cy.url().should('include', '/admin-dashboard')
  })

  // TEST 2 - Login me password të gabuar
  it('TC-A02: Login me password të gabuar', () => {
    cy.visit('http://localhost:3000/login')
    cy.get('input[name="email"]').type('admin@library.com')
    cy.get('input[name="password"]').type('passwordGabuar')
    cy.get('button[type="submit"]').click()
    cy.url().should('include', '/login')
  })

  // TEST 3 - Shfaqja e librave
  it('TC-A03: Shfaqja e listës së librave', () => {
    cy.visit('http://localhost:3000/books')
    cy.get('.books-grid').should('exist')
    cy.get('.book-card').should('have.length.greaterThan', 0)
  })

})
