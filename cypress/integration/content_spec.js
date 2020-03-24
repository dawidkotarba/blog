describe('Content tests', () => {

    beforeEach(() => {
        cy.visit(Cypress.env('host'))
    });

    it('The title should include information about the site', () => {
        cy.title().should('contain', 'Thoughts Repository')
    });

    it('Should display main image', () => {
        cy.get('body > div > header > div.big-img.intro-header').scrollIntoView().should('be.visible');
    });

    it('Cookie popup shall be visible', () => {
        cy.get('body > div.cookieconsent').should('be.visible');
    });
});