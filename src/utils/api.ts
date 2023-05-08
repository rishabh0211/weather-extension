import { WeatherApiResponse } from './types';

const OPEN_WEATHER_API_KEY = '9fb6eabda99f78348c5ca4cb846bb5fa';

// https://api.openweathermap.org/data/2.5/weather?q=meerut&appid=9fb6eabda99f78348c5ca4cb846bb5fa

const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather'

export async function fetchWeatherData(city: string): Promise<WeatherApiResponse> {
  const res = await fetch(`${BASE_URL}?q=${city}&units=metric&appid=${OPEN_WEATHER_API_KEY}`);
  if (!res.ok) {
    throw new Error('City not found!');
  }
  const data: WeatherApiResponse = await res.json();
  return data;
}