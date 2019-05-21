import React, { useState } from 'react'
import Select from 'react-select/lib'

const BirthForm = ({ editAuthor, authors }) => {
  const [author, setAuthor] = useState('')
  const [born, setBorn] = useState('')

  const editBirth = async (e) => {
    e.preventDefault()

    await editAuthor({
      variables: { name: author.value, setBornTo: born }
    })

    setAuthor('')
    setBorn('')
  }

  const options = authors.map(a => {
    return {
      value: a.name,
      label: a.name
    }
  }
  )

  return (
    <>
      <h2>set birthyear</h2>
      <form onSubmit={editBirth}>
        <Select
          value={author}
          onChange={(author) => setAuthor(author)}
          options={options}
        />
        <div>
          born
          <input
            type="text"
            onChange={({ target }) => setBorn(Number(target.value))}
            value={born}
          />
        </div>

        <button type='submit'>update author</button>
      </form>
    </>
  )
}

export default BirthForm