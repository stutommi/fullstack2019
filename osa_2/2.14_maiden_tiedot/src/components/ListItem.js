import React from 'react'

const ListItem = ({ country, handleClick }) => (
    <>
      <li>{country.name}</li>
      <button onClick={handleClick}>show</button>
    </>
  )

  export default ListItem