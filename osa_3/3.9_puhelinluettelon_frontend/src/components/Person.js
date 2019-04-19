import React from '../../node_modules/react'

const Person = ({ person, handleClick }) =>
    <p>
        {person.name} {person.number}
        <button onClick={handleClick}>poista</button>
    </p>

export default Person