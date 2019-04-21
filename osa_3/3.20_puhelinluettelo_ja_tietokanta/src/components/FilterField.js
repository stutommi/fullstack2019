import React from '../../node_modules/react'

const FilterField = ({ handleChange }) =>
    <div>
        rajaa näytettäviä: <input onChange={handleChange} />
    </div>

export default FilterField