import React from "react";
import { WeatherData } from "../../types/Weather";

interface WeatherCardProps {
    data: WeatherData;
}
const WeatherCard: React.FC<WeatherCardProps> = ({ data }) => {
    const { name, weather, main, wind } = data;
    const weatherInfo = weather[0];

    return (
        <div>
            <h2>{name}</h2>

            <div>
                <img
                    src={`https://openweathermap.org/img/wn/${weatherInfo.icon}@2x.png`}
                    alt={weatherInfo.description}
                />
                <div>
                    <p>{Math.round(main.temp)}°C</p>
                    <p>{weatherInfo.description}</p>
                </div>
            </div>

            <div>
                <div>
                    <span>Feels like</span>
                    <strong>{Math.round(main.feels_like)}°C</strong>
                </div>
                <div>
                    <span>Humidity</span>
                    <strong>{main.humidity}%</strong>
                </div>
                <div>
                    <span>Wind</span>
                    <strong>{wind.speed} m/s</strong>
                </div>
                <div>
                    <span>Pressure</span>
                    <strong>{main.pressure} hPa</strong>
                </div>
            </div>
        </div>
    );
};

export default WeatherCard;