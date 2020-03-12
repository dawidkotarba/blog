describe('Menu buttons tests', () => {

    beforeEach(() => {
        cy.visit('http://localhost:4000')
    });

    it('Homepage menu button should navigate to blog site', () => {
        cy.get('#main-navbar > ul > li:nth-child(1) > a')
            .should('have.prop', 'href')
            .and('contains', 'https://dawidkotarba.github.io/blog')
    });

    it('About me menu button should navigate to main github page', () => {
        cy.get('#main-navbar > ul > li:nth-child(2) > a')
            .should('have.prop', 'href')
            .and('contains', 'https://dawidkotarba.github.io')
    });

    it('LinkedIn menu button should navigate to LinkedIn profile', () => {
        cy.get('#main-navbar > ul > li:nth-child(3) > a')
            .should('have.prop', 'href')
            .and('equal', 'https://www.linkedin.com/in/dawid-kotarba-425306a5')
    });

    it('GitHub menu button should navigate to GitHub page', () => {
        cy.get('#main-navbar > ul > li:nth-child(4) > a')
            .should('have.prop', 'href')
            .and('equal', 'https://github.com/dawidkotarba')
    });

    it('Beautiful jekyll theme shall be referenced', () => {
        cy.get('body > div > footer > div > div > div > p.theme-by.text-muted > a')
            .should('have.prop', 'href')
            .and('equal', 'https://deanattali.com/beautiful-jekyll/')
    });
});