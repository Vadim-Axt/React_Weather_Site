import React from 'react';
import { WeatherProvider, useWeather } from './contexts/WeatherContexts';
import SearchBox from './components/searchBox/SearchBox';
import WeatherCard from './components/WeatherCard/WeatherCard';
import HistoryList from './components/HistoryLIst/HistoryList';
import { useLocalStorage } from './hooks/useLocalStorage';

const AppContent: React.FC = () => {
    const { state } = useWeather();
    const [searchHistory, setSearchHistory] = useLocalStorage<string[]>('weatherSearchHistory', []);

    // Добавляем город в историю при успешном поиске
    React.useEffect(() => {
        if (state.data && state.data.name) {
            const cityName = state.data.name;
            if (!searchHistory.includes(cityName)) {
                setSearchHistory(prev => [cityName, ...prev.slice(0, 4)]); // Сохраняем только 5 последних
            }
        }
    }, [state.data, searchHistory, setSearchHistory]);

    return (
        <div>
            <h1>Погод Сегодня</h1>

            <SearchBox />

            {state.error && (
                <div>
                    <p>Error: {state.error}</p>
                    <button onClick={() => window.location.reload()}>Try Again</button>
                </div>
            )}

            {state.loading && <p>Loading weather data...</p>}

            {state.data && <WeatherCard data={state.data} />}

            <HistoryList />
        </div>
    );
};

const App: React.FC = () => {
    return (
        <WeatherProvider>
            <AppContent />
        </WeatherProvider>
    );
};

export default App;