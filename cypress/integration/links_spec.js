describe('Menu buttons tests', () => {

    beforeEach(() => {
        cy.visit(Cypress.env('host'))
    });

    it('About me menu button should navigate to homepage site', () => {
        cy.get('#main-navbar > ul > li:nth-child(1) > a')
            .should('have.prop', 'href')
            .and('contains', 'https://dawidkotarba.eu')
    });

    it('LinkedIn menu button should navigate to LinkedIn profile', () => {
        cy.get('#main-navbar > ul > li:nth-child(2) > a')
            .should('have.prop', 'href')
            .and('equal', 'https://www.linkedin.com/in/dawid-kotarba-425306a5')
    });

    it('GitHub menu button should navigate to GitHub page', () => {
        cy.get('#main-navbar > ul > li:nth-child(3) > a')
            .should('have.prop', 'href')
            .and('equal', 'https://github.com/dawidkotarba')
    });

    it('Beautiful jekyll theme shall be referenced', () => {
        cy.get('body > div > footer > div > div > div > p.theme-by.text-muted > a')
            .should('have.prop', 'href')
            .and('equal', 'https://deanattali.com/beautiful-jekyll/')
    });

    it('GitHub pages link shall point to GH page of this site', () => {
        cy.get('body > div > footer > div > div > div > p.copyright.text-muted > a')
            .should('have.prop', 'href')
            .and('equal', 'https://github.com/dawidkotarba/blog')
    });

    it('should show scroll to top after clicking scroll up button', () => {
        // top of the page - button not visible
        cy.get('.progress-wrap').should('not.be.visible');
        // scroll to see button
        cy.scrollTo(0, 500);
        // button appears
        cy.get('.progress-wrap').should('be.visible');
        cy.get('.progress-wrap').click();
        // scrolling - need to wait
        cy.wait(1000);
        cy.window().then(($window) => {
            expect($window.scrollY).to.be.closeTo(0, 0);
        });
        cy.get('.progress-wrap').should('not.be.visible');
    })
});

describe('Input search tests', () => {

    beforeEach(() => {
        cy.visit(Cypress.env('host'))
    });

    it('It should search welcome post', () => {
        cy.get('#search-input')
            .type('welcome');

        cy.get('#results-container')
            .should('be.visible');
    });
});

