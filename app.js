const express = require('express');
const axios = require('axios');
const { body, validationResult } = require('express-validator');
const cors = require('cors');
const moment = require('moment-timezone');
const tzlookup = require('tz-lookup');

const app = express();
app.use(express.json());
app.use(cors());
app.use(express.static('public'));

const API_KEY = "e57512b63f85f9aef65ca3193b3b7fba";

app.post('/weather',
    body('city').matches(/^[a-zA-Z\s]+$/).withMessage('Nazwa miasta może składać się tylko z liter i spacji'),
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const city = req.body.city;
        const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric&lang=pl`;

        try {
            const response = await axios.get(url);
            const data = response.data;

            const timezone = tzlookup(data.coord.lat, data.coord.lon);
            const currentTime = moment().tz(timezone).format('HH:mm');

            const currentDatePolska = moment().tz('Europe/Warsaw').format('D MMMM YYYY');

            const currentDayCountry = moment().tz(timezone).locale('pl').format('dddd');

            const currentDatePolskaFormatted = moment().tz('Europe/Warsaw').locale('pl').format('D MMMM YYYY');

            res.json({
                day: currentDayCountry,
                time: currentTime,
                temperature: data.main.temp,
                feelsLike: data.main.feels_like,
                humidity: data.main.humidity,
                windSpeed: data.wind.speed,
                polskaTime: `W Polsce jest godzina ${moment().tz('Europe/Warsaw').format('HH:mm')}, dnia ${currentDatePolskaFormatted}`
            });
        } catch (error) {
            res.status(500).json({ message: 'Błąd serwera lub miasto nie istnieje.' });
        }
    });

app.listen(3000, () => console.log('localhost:3000 i wszystko ładniutko widać'));

module.exports = app;