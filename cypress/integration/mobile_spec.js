describe('Mobile tests', () => {

    let menuButtonSlector = 'body > div > nav > div > div.navbar-header > button';
    let aboutMeLinkSelector = '#main-navbar > ul > li:nth-child(1) > a';
    let blogSelector = '#main-navbar > ul > li:nth-child(2) > a';
    let linkedInSelector = '#main-navbar > ul > li:nth-child(3) > a';
    let gitHubSelector = '#main-navbar > ul > li:nth-child(4) > a';

    beforeEach(() => {
        cy.viewport('iphone-6');
        cy.visit(Cypress.env('host'))
    });

    it('Menu should toggle on and off', () => {
        cy.get(aboutMeLinkSelector).should('not.be.visible');
        cy.get(blogSelector).should('not.be.visible');
        cy.get(linkedInSelector).should('not.be.visible');
        cy.get(gitHubSelector).should('not.be.visible');

        cy.get(menuButtonSlector).click();

        cy.get(aboutMeLinkSelector).should('be.visible');
        cy.get(blogSelector).should('be.visible');
        cy.get(linkedInSelector).should('be.visible');
        cy.get(gitHubSelector).should('be.visible');
    });

    it('About me menu button should navigate to blog site', () => {
        cy.get(menuButtonSlector).click();
        cy.get(aboutMeLinkSelector).should('be.visible');
        cy.get(aboutMeLinkSelector)
            .should('have.prop', 'href')
            .and('contains', 'https://dawidkotarba.github.io')
    });

    it('About me menu button should navigate to main github page', () => {
        cy.get(menuButtonSlector).click();
        cy.get(blogSelector).should('be.visible');
        cy.get(blogSelector)
            .should('have.prop', 'href')
            .and('contains', 'https://dawidkotarba.github.io/blog')
    });

    it('LinkedIn menu button should navigate to LinkedIn profile', () => {
        cy.get(menuButtonSlector).click();
        cy.get(linkedInSelector).should('be.visible');
        cy.get(linkedInSelector)
            .should('have.prop', 'href')
            .and('equal', 'https://www.linkedin.com/in/dawid-kotarba-425306a5')
    });

    it('GitHub menu button should navigate to GitHub page', () => {
        cy.get(menuButtonSlector).click();
        cy.get(gitHubSelector).should('be.visible');
        cy.get(gitHubSelector)
            .should('have.prop', 'href')
            .and('equal', 'https://github.com/dawidkotarba')
    });
});

