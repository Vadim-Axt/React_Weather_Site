import { WeatherData } from "../types/Weather";


const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;
const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather'

if (!API_KEY) {
    throw new Error("No API key found.");
}

export const fetchWeather = async (city: string): Promise<WeatherData> => {
    const response = await fetch(
        `${BASE_URL}?q=${encodeURIComponent(city)}&units=metric&appid=${API_KEY}`
    );

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed')
    }

    const data: WeatherData = await response.json();
    return data;
}