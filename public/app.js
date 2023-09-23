const form = document.getElementById('weather-form');
const cityInput = document.getElementById('city');
const weatherInfo = document.getElementById('weather-info');

form.addEventListener('submit', async event => {
    event.preventDefault();

    const city = cityInput.value;

    const response = await fetch('http://localhost:3000/weather', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ city })
    });

    const data = await response.json();

    if (response.ok) {
        const { day, time, temperature, feelsLike, humidity, windSpeed } = data;

        weatherInfo.innerHTML = `
      <p>Dzień: ${day}</p>
      <p>Godzina: ${time}</p>
      <p>Temperatura: ${temperature}°C</p>
      <p>Temperatura odczuwalna: ${feelsLike}°C</p>
      <p>Wilgotność: ${humidity}%</p>
      <p>Prędkość wiatru: ${windSpeed} m/s</p>
    `;
        weatherInfo.style.display = 'block';
    } else {
        alert(`Błąd: ${data.message}`);
    }
});