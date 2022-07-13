/* eslint-disable prettier/prettier */
export async function fetchWeather(query) {
  const myKey = "04f6a908c9da616160e811faafe8d8db";
  const urlBase = "https://api.openweathermap.org/data/2.5/";
  const res = await fetch(
    `${urlBase}weather?q=${query}&units=metric&lang=ru&appid=${myKey}`
  );
  return res.json();
}
