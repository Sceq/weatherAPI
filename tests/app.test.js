const request = require('supertest');
const app = require('../app');
const axios = require('axios');

describe('POST /weather', () => {
    it('should respond with json', async () => {
        const res = await request(app)
            .post('/weather')
            .send({ city: 'Warsaw' })
            .expect('Content-Type', /json/)
            .expect(200);
    });
});

describe('POST Validation of city name', () => {
    it('There is a wrong name of a city', async () => {
        const response = await request(app)
            .post('/weather')
            .send({ city: '1234' });  //
        expect(response.statusCode).toBe(400);
        expect(response.body.errors).toBeDefined();
    });
});


describe('POST CorrectAnswer', () => {
    it('warsaw', async () => {
        const response = await request(app)
            .post('/weather')
            .send({ city: 'Warszawa' });
        expect(response.statusCode).toBe(200);
        expect(response.body.temperature).toBeDefined();
        expect(response.body.feelsLike).toBeDefined();
    });
});


describe('POST /weather - błąd serwera', () => {
    it('powinien zwrócić błąd 500 gdy serwer API pogody jest wyłączony', async () => {
        const originalAxiosGet = axios.get;
        axios.get = jest.fn(() => Promise.reject(new Error('Błąd serwera')));

        const response = await request(app)
            .post('/weather')
            .send({ city: 'Warszawa' });
        expect(response.statusCode).toBe(500);
        expect(response.body.message).toBe('Błąd serwera lub miasto nie istnieje.');

        axios.get = originalAxiosGet;  // przywrócenie oryginalnej funkcji
    });
});
