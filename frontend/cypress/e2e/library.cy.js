describe('Library Management System - Automated Tests', () => {

  // TEST 1 - Faqja e Login shfaqet saktë
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

  // TEST 4 - Fusha email pranon të dhëna
  it('TC-A04: Fusha email pranon të dhëna', () => {
    cy.visit('http://localhost:3000/login')
    cy.get('input[name="email"]').type('test@test.com')
    cy.get('input[name="email"]').should('have.value', 'test@test.com')
  })

  // TEST 5 - Fusha password është e fshehur
  it('TC-A05: Fusha password është e tipit password (e fshehur)', () => {
    cy.visit('http://localhost:3000/login')
    cy.get('input[name="password"]').should('have.attr', 'type', 'password')
  })

  // TEST 6 - Titulli i faqes Login ekziston
  it('TC-A06: Faqja e login ka titull', () => {
    cy.visit('http://localhost:3000/login')
    cy.title().should('not.be.empty')
  })

  // TEST 7 - Faqja Register ngarkohet
  it('TC-A07: Faqja e Regjistrimit ngarkohet', () => {
    cy.visit('http://localhost:3000/register')
    cy.get('body').should('exist')
  })

  // TEST 8 - Butoni Submit është i aktivizuar
  it('TC-A08: Butoni Submit është i aktivizuar në Login', () => {
    cy.visit('http://localhost:3000/login')
    cy.get('button[type="submit"]').should('not.be.disabled')
  })

  // TEST 9 - Login me email bosh nuk kalon
  it('TC-A09: Login me fushat bosh mbetet në /login', () => {
    cy.visit('http://localhost:3000/login')
    cy.get('button[type="submit"]').click()
    cy.url().should('include', '/login')
  })

  // TEST 10 - Faqja Books ngarkohet
  it('TC-A10: Faqja e librave ngarkohet', () => {
    cy.visit('http://localhost:3000/books')
    cy.get('body').should('exist')
  })

})
