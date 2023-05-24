describe('e2e', () => {
  it('passes', () => {
    cy.visit('http://localhost:3000');

    const email = 'testuser37@galvanize.com';
    const password = 'password123';
    cy.get('#email').type(email);
    cy.get('#pass').type(password);
    cy.get('#reg').click();

    cy.get('.leftColumnArrow').each(($arrow) => {
      cy.wrap($arrow).click();
      cy.get('.leftColumnNames').should('be.visible');

      cy.wrap($arrow).click();
      cy.get('.leftColumnNames').should('not.exist');
    });

    cy.get('.LcCohort').each(($cohort) => {
      const cohortText = $cohort.text().trim();

      cy.wrap($cohort).click();

      cy.get('.cohortInfoContainer')
        .should('be.visible')
        .find('.cohortInfoName')
        .should('have.text', `${cohortText}X`);

      cy.get('.cohortStudent').each(($student) => {
        cy.wrap($student).click();

        cy.get('.studentDetails').should('be.visible');


        cy.get('.exit').click();
        cy.get('.studentDetails').should('not.exist');
        cy.get('.Appointments').should('be.visible');

      });

      cy.get('.cohortClose').click().should('not.exist');
    });
  });
});








