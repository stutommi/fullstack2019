import React, { useState, useEffect } from 'react'
import axios from 'axios'
import './App.css'
import Country from './components/Country'
import ListItem from './components/ListItem'
import FilterForm from './components/FilterForm'

const App = () => {
  const [countries, setCountries] = useState([])
  const [filter, setFilter] = useState("")

  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response =>
        setCountries(response.data)
      )

  }, [])

  const handleFilterChange = (event) => { setFilter(event.target.value) }

  const handleShowClick = (country) => () => setFilter(country)

  const showCountries = () => {
    const countriesToShow = countries
      .filter(country => country.name.toUpperCase().includes(filter.toUpperCase()))

    if (countriesToShow.length > 10) {
      return <p>Too many matches, specify another filter</p>
    } else if (countriesToShow.length === 1) {
      return <Country country={countriesToShow[0]} />
    } else {
      return countriesToShow
        .map(country =>
          <ListItem
            key={country.name}
            handleClick={handleShowClick(country.name)}
            country={country}
          />
        )
    }
  }

  return (
    <>
      <form>
        <FilterForm handleChange={handleFilterChange} />
      </form>
      <ul>
        {showCountries()}
      </ul>
    </>
  )
}

export default App