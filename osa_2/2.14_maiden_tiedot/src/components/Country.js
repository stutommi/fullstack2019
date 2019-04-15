import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Weather from './Weather'

const apixuApiKey = '6a5baa559e904af3bf9143233180811'
const apixuUrl = `http://api.apixu.com/v1/current.json?key=${apixuApiKey}`

const Country = ({ country }) => {
    const [weather, setWeather] = useState({})

    useEffect(() => {
        axios
            .get(apixuUrl + `&q=${country.capital}`)
            .then(response => setWeather(response.data))
    }, [])

    const showWeather = () =>

        Object.keys(weather).length === 0
            ? <p>loading...</p>
            : <Weather weather={weather.current} />

    const showLang = () => country
        .languages
        .map(language => <li key={language.name}>{language.name}</li>)

    return (
        <>
            <h2>{country.name}</h2>
            <p>capital {country.capital}</p>
            <p>population {country.population}</p>
            <h3>Languages</h3>
            <ul>
                {showLang()}
            </ul>
            <img src={country.flag} alt={`Flag of ${country.name}`} />
            <h3>Weather in {country.capital}</h3>
            {showWeather()}
        </>
    )
}

export default Country