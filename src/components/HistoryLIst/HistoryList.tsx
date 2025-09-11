import React from 'react';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { useWeather } from '../../contexts/WeatherContexts';

const HistoryList: React.FC = () => {
    const [searchHistory, setSearchHistory] = useLocalStorage<string[]>('weatherSearchHistory', []);
    const { searchCity } = useWeather();

    const handleHistoryClick = (city: string) => {
        searchCity(city);
    };

    const clearHistory = () => {
        setSearchHistory([]);
    };

    if (searchHistory.length === 0) {
        return null;
    }

    return (
        <div>
            <div>
                <h3>Search History</h3>
                <button onClick={clearHistory}>Clear History</button>
            </div>

            <div>
                {searchHistory.map((city, index) => (
                    <button
                        key={index}
                        onClick={() => handleHistoryClick(city)}
                    >
                        {city}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default HistoryList;