import React from 'react'

const Weather = ({ weather }) => {
    return (
        <>
            <p>
                <strong>temperature:</strong> {weather.temp_c} Celsius
            </p>
            <img src={weather.condition.icon} alt={weather.condition.text} />
            <p>
                <strong>wind:</strong> {weather.wind_kph} kph direction {weather.wind_dir}
            </p>
        </>
    )
}

export default Weather