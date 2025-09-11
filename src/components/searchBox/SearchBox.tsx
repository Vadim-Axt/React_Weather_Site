import React, {useState} from "react";
import {useWeather} from "../../contexts/WeatherContexts";
import styles from './SearchBox.module.css';


const SearchBox: React.FC = () => {
    const [inputValue, setInputValue] = React.useState('');
    const {searchCity, state} = useWeather()

    const handleSubmit = (e: React.FormEvent)=> {
        e.preventDefault()
        searchCity(inputValue)
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value)
    };

    return (
        <form onSubmit={handleSubmit} className={styles.searchBox}>
                <input
                    className={styles.input}
                    type="text"
                    value={inputValue}
                    onChange={handleInputChange}
                    placeholder="Введите город"
                    disabled={state.loading}
                />
                <button className={styles.button} type='submit' disabled={state.loading || !inputValue.trim()}>
                    {state.loading ? 'Поиск...' : 'Найти'}
                </button>
        </form>
    )
}

export default SearchBox;