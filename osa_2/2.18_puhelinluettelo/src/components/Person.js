import React from 'react'

const Person = ({ person, handleClick }) =>
    <p>
        {person.name} {person.number}
        <button onClick={handleClick}>poista</button>
    </p>

export default Person