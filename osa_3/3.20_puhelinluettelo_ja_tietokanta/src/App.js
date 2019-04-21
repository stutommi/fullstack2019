import React, { useState, useEffect } from '../node_modules/react'
import "./app.css"
import Person from "./components/Person"
import FilterField from "./components/FilterField"
import PersonForm from "./components/PersonForm"
import Persons from './components/Persons'
import Notification from './components/Notification'
import personService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [message, setMessage] = useState('')
  const [statusColor, setStatusColor] = useState("white")

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

            setMessage(`Henkilön ${newName} puhelinnumero vaihdettu: ${updatedPerson.number}`)
            setStatusColor('lightGreen')
            clearNotification()
          }).catch(error => {
            setMessage(`Henkilö ${newName} oli jo poistettu`)
            setStatusColor('red')
            setPersons(persons.filter(p => p.name !== newName))
            clearNotification()
          })
      }
    } else {
      personService.create(newPerson)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))

          setMessage(`Henkilö ${newName} lisättiin`)
          setStatusColor('lightGreen')
          clearNotification()
        })
        .catch(error => {
          console.log(error.response.data)
          setMessage(`${error.response.data.error}`)
          setStatusColor('red')
          clearNotification()
        })
    }

  }

  const removePerson = (id) => () => {
    const name = persons.find(p => p.id === id).name

    const result = window.confirm(`Poistetaanko ${name}`)

    if (result) {
      personService.remove(id)

      const updatedArray = persons.filter(person => person.id !== id)
      setPersons(updatedArray)


      setMessage(`${name} poistettiin`)
      setStatusColor('lightGreen')
      clearNotification()
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

  const clearNotification = () =>
    setTimeout(() => {
      setMessage(null)
      setStatusColor('white')
    }, 5000)

  return (
    <>
      <h2>Puhelinluettelo</h2>
      <Notification
        message={message}
        statusColor={statusColor} />
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