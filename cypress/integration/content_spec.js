describe('Content tests', () => {

    beforeEach(() => {
        cy.visit(Cypress.env('host'))
    });

    it('The title should include information about the site', () => {
        cy.title().should('include', 'blog')
    });

    it('Should display main image', () => {
        cy.get('body > div > header > div.big-img.intro-header.img-transform').scrollIntoView().should('be.visible');
    });

});