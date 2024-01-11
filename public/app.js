const form = document.getElementById('weather-form');
const cityInput = document.getElementById('city');
const weatherInfo = document.getElementById('weather-info');

document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');
    const weatherForm = document.getElementById('weather-form');
    const loginSection = document.getElementById('login-section');
    const weatherSection = document.getElementById('weather-section');
    const weatherInfo = document.getElementById('weather-info');

    loginForm.addEventListener('submit', async event => {
        event.preventDefault();
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        const loginResponse = await fetch('http://localhost:3000/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        });

        const loginData = await loginResponse.json();

        if (loginResponse.ok) {
            alert(`Zalogowano poprawnie: ${loginData.message}`);
            loginSection.style.display = 'none';
            weatherSection.style.display = 'block';
        } else {
            alert(`Błąd logowania: ${loginData.message}`);
        }
    });

    weatherForm.addEventListener('submit', async event => {
        event.preventDefault();
        const city = document.getElementById('city').value;

        const response = await fetch('http://localhost:3000/weather', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ city })
        });

        const data = await response.json();

        if (response.ok) {
            weatherInfo.innerHTML = `
                <p>Dzień: ${data.day}</p>
                <p>Godzina: ${data.time}</p>
                <p>Temperatura: ${data.temperature}°C</p>
                <p>Temperatura odczuwalna: ${data.feelsLike}°C</p>
                <p>Wilgotność: ${data.humidity}%</p>
                <p>Prędkość wiatru: ${data.windSpeed} m/s</p>
            `;
            weatherInfo.style.display = 'block';
        } else {
            alert(`Błąd: ${data.message}`);
        }
    });
});