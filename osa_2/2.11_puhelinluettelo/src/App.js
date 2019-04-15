import React, { useState, useEffect } from 'react'
import axios from "axios"
import "./app.css"
import Person from "./components/Person"
import FilterField from "./components/FilterField"
import PersonForm from "./components/PersonForm"
import Persons from "./components/Persons"

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then( response => setPersons(response.data
      ))
  }, [])

  const addPerson = (event) => {
    event.preventDefault()

    if (persons.map(person => person.name).includes(newName)) {
      return alert(`${newName} on jo luettelossa`)
    }

    const newPerson = {
      name: newName,
      number: newNumber
    }

    setPersons(persons.concat(newPerson))
  }

  const handleNameChange = (event) => setNewName(event.target.value)
  const handleNumberChange = (event) => setNewNumber(event.target.value)
  const handleFilterChange = (event) => setFilter(event.target.value)

  const personsToShow = persons.filter(person =>
    person.name.toUpperCase().includes(filter.toUpperCase()))

  const showPersons = () => personsToShow.map(person =>
    <Person
      key={person.name.toString()}
      person={person}
    />)

  return (
    <>
      <h2>Puhelinluettelo</h2>
      <form onSubmit={addPerson}>
        <FilterField handleChange={handleFilterChange} />
        <h3>Lisää uusi</h3>
        <PersonForm
          handleNameChange={handleNameChange}
          handleNumberChange={handleNumberChange}
        />
      </form>
      <h3>Numerot</h3>
      <Persons persons={showPersons()} />
    </>
  )

}

export default App