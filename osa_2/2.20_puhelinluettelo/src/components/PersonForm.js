import React from '../../node_modules/react'

const PersonForm = ({ handleNameChange, handleNumberChange }) => (
    <>
        <div>
            nimi: <input onChange={handleNameChange} /> <br />
            numero: <input onChange={handleNumberChange} />
        </div>
        <div>
            <button type="submit">lisää</button>
        </div>
    </>
)

export default PersonForm