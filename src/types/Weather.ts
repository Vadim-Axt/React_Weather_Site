export interface WeatherInfo {
    id: number;
    main: string;
    description: string;
    icon: string;
}

export interface MainData {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
}

export interface WindData {
    speed: number;
    deg: number;
}

export interface WeatherData {
    weather: WeatherInfo[];
    main: MainData;
    wind: WindData;
    name: string;
    dt: number;
}

export interface WeatherState {
    data: WeatherData | null;
    loading: boolean;
    error: string | null;
}


export type WeatherAction =
    | { type: 'FETCH_START' }
    | { type: 'FETCH_SUCCESS'; payload: WeatherData }
    | { type: 'FETCH_ERROR'; payload: string }
    | { type: 'CLEAR_ERROR' };

export interface WeatherContextType {
    state: WeatherState;
    searchCity: (city: string) => Promise<void>;
    clearError: () => void;
}