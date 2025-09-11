import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { WeatherState, WeatherAction, WeatherContextType } from '../types/Weather';
import { fetchWeather } from '../services/WeatherApi';

const initialState: WeatherState = {
    data: null,
    loading: false,
    error: null,
};

const weatherReducer = (state: WeatherState, action: WeatherAction): WeatherState => {
    switch (action.type) {
        case 'FETCH_START':
            return { ...state, loading: true, error: null };
        case 'FETCH_SUCCESS':
            return { ...state, loading: false, data: action.payload, error: null };
        case 'FETCH_ERROR':
            return { ...state, loading: false, error: action.payload, data: null };
        case 'CLEAR_ERROR':
            return { ...state, error: null };
        default:
            return state;
    }
};

const WeatherContext = createContext<WeatherContextType | undefined>(undefined);

export const WeatherProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [state, dispatch] = useReducer(weatherReducer, initialState);

    const searchCity = async (city: string) => {
        if (!city.trim()) {
            dispatch({ type: 'FETCH_ERROR', payload: 'Please enter a city name' });
            return;
        }

        try {
            dispatch({ type: 'FETCH_START' });
            const data = await fetchWeather(city);
            dispatch({ type: 'FETCH_SUCCESS', payload: data });
        } catch (error) {
            dispatch({
                type: 'FETCH_ERROR',
                payload: error instanceof Error ? error.message : 'Unknown error occurred'
            });
        }
    };

    const clearError = () => {
        dispatch({ type: 'CLEAR_ERROR' });
    };

    return (
        <WeatherContext.Provider value={{ state, searchCity, clearError }}>
            {children}
        </WeatherContext.Provider>
    );
};

export const useWeather = (): WeatherContextType => {
    const context = useContext(WeatherContext);
    if (context === undefined) {
        throw new Error('useWeather must be used within a WeatherProvider');
    }
    return context;
};