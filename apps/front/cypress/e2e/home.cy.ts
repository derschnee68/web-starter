describe('Hello world', () => {
  it('as a user I can log in through the login page', () => {
    cy.visit('/');
    cy.location('pathname').should('eq', '/');
  });
});
