describe('Library Management System - Automated Tests', () => {

  // TEST 1 - Login page loads correctly
  it('TC-A01: Faqja e Login shfaqet saktë', () => {
    cy.visit('http://localhost:3000/login')
    cy.get('input[name="email"]').should('exist')
    cy.get('input[name="password"]').should('exist')
    cy.get('button[type="submit"]').should('exist')
  })

  // TEST 2 - Login me password të gabuar
  it('TC-A02: Login me password të gabuar mbetet në /login', () => {
    cy.visit('http://localhost:3000/login')
    cy.get('input[name="email"]').type('admin@library.com')
    cy.get('input[name="password"]').type('passwordGabuar')
    cy.get('button[type="submit"]').click()
    cy.url().should('include', '/login')
  })

  // TEST 3 - Faqja kryesore ngarkohet
  it('TC-A03: Faqja kryesore ngarkohet me sukses', () => {
    cy.visit('http://localhost:3000')
    cy.get('body').should('exist')
  })

})
