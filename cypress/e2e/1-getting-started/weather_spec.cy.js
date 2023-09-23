describe('Weather App Integration Tests', () => {
    it('should display weather information when a city is entered', () => {
        cy.visit('http://localhost:3000');

        cy.get('#city').type('Warsaw');
        cy.get('button').click();

        cy.get('#weather-info').should('be.visible');
        cy.get('#weather-info').contains('Temperatura');
    });
});