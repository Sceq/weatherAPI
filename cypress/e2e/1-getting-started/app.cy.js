describe('Test Logowania', () => {
    it('Powinien zalogować użytkownika', () => {
        cy.visit('http://localhost:3000');

        cy.get('#login-section').should('be.visible');
        cy.get('#username').type('Filip');
        cy.get('#password').type('Filip');
        cy.get('#login-form').submit();

        cy.get('#weather-section').should('be.visible');
    });
});

describe('Test Sprawdzania Pogody', () => {
    it('Powinien wyświetlić informacje o pogodzie', () => {
        cy.visit('http://localhost:3000');

        // Logowanie
        cy.get('#username').type('Filip');
        cy.get('#password').type('Filip');
        cy.get('#login-form').submit();

        // Sprawdzenie pogody
        cy.get('#weather-form').should('be.visible');
        cy.get('#city').type('Warszawa');
        cy.get('#weather-form').submit();

        cy.get('#weather-info').should('be.visible');
        cy.get('#weather-info').should('contain', 'Temperatura');
    });
});