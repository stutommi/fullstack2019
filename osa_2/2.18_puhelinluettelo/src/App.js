import React, { useState, useEffect } from 'react'
import "./app.css"
import Person from "./components/Person"
import FilterField from "./components/FilterField"
import PersonForm from "./components/PersonForm"
import Persons from './components/Persons'
import personService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  useEffect(() => {
    personService
      .getAll()
      .then(persons => setPersons(persons))
  }, [])

  const addPerson = (event) => {
    event.preventDefault()

    const newPerson = {
      name: newName,
      number: newNumber
    }

    if (persons.map(person => person.name).includes(newName)) {
      const result = window.confirm(`${newName} on jo luettelossa, korvataanko vanhan numero uudella?`)

      if (result) {
        personService.update(persons.find(p => p.name === newName).id, newPerson)
          .then(updatedPerson => {
            setPersons(persons.map(person =>
              person.name !== newName
                ? person
                : updatedPerson
            ))
          })
      }
    } else {
      personService.create(newPerson)
        .then(returnedPerson => setPersons(persons.concat(returnedPerson)))
    }

  }

  const removePerson = (id) => () => {
    const result = window.confirm(`Poistetaanko ${persons.find(p => p.id).name}`)

    if (result) {
      personService.remove(id)

      const updatedArray = persons.filter(person => person.id !== id)
      setPersons(updatedArray)
    }
  }

  const handleNameChange = (event) => setNewName(event.target.value)
  const handleNumberChange = (event) => setNewNumber(event.target.value)
  const handleFilterChange = (event) => setFilter(event.target.value)

  const personsToShow = persons.filter(person =>
    person.name.toUpperCase().includes(filter.toUpperCase()))

  const showPersons = () => personsToShow.map(person =>
    <Person
      key={person.id}
      person={person}
      handleClick={removePerson(person.id)}
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