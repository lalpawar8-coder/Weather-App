async function getWeather() {
  const city = document.getElementById("cityInput").value.trim();
  const result = document.getElementById("weatherResult");

  if (!city) {
    result.innerHTML = " Please enter a city name.";
    return;
  }

  result.innerHTML = " Loading...";

  try {
    const geoURL = `https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1`;
    const geoRes = await fetch(geoURL);
    const geoData = await geoRes.json();

    if (!geoData.results || geoData.results.length === 0) {
      result.innerHTML = " City not found.";
      return;
    }

    const { latitude, longitude, name, country } = geoData.results[0];

    const weatherURL = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`;
    const weatherRes = await fetch(weatherURL);
    const weatherData = await weatherRes.json();

    const weather = weatherData.current_weather;

    result.innerHTML = `
      <h3>${name}, ${country}</h3>
      <p> Temperature: ${weather.temperature}°C</p>
      <p> Wind Speed: ${weather.windspeed} km/h</p>
      <p>Time: ${weather.time}</p>
    `;
  } catch (error) {
    result.innerHTML = " Error fetching weather.";
  }
}
