import React from 'react'

const FilterField = ({ handleChange }) =>
    <div>
        rajaa näytettäviä: <input onChange={handleChange} />
    </div>

export default FilterField