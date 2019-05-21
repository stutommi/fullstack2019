import React, { useState, useEffect } from 'react'
import { useMutation, useApolloClient } from 'react-apollo-hooks'
import { gql } from 'apollo-boost'

import BirthForm from './BirthForm'

const ALL_AUTHORS = gql`
{
  allAuthors {
    id
    born
    bookCount
    name
  }
}
`

const EDIT_AUTHOR = gql`
mutation editAuthor(
$name: String!,
$setBornTo: Int!)
{
editAuthor(
  name: $name
  setBornTo: $setBornTo
) {
  name
  id
  born
  bookCount
  }
}
`

const Authors = ({ show, handleError }) => {
  if (!show) {
    return null
  }

  const client = useApolloClient()
  const [authors, setAuthors] = useState([])

  useEffect(() => {
    client.query({
      query: ALL_AUTHORS
    }).then(result => {console.log('result', result)
      setAuthors(result.data.allAuthors)})
  }, [])

  const editAuthor = useMutation(EDIT_AUTHOR, {
    // onError doesn't seem to be working right now, it is skipped for some reason.
    onError: handleError,
    update: (store, result) => {
      const data = result.data.editAuthor

      const updatedAuthors = authors.map(a =>
        a.id === data.id ? data : a)

      setAuthors(updatedAuthors)
    }
  })

  return (
    <>

      <div>
        <h2>authors</h2>
        <table>
          <tbody>
            <tr>
              <th></th>
              <th>
                born
            </th>
              <th>
                books
            </th>
            </tr>
            {authors && authors.map(a =>
              <tr key={a.id}>
                <td>{a.name}</td>
                <td>{a.born}</td>
                <td>{a.bookCount}</td>
              </tr>
            )}
          </tbody>
        </table>
        <BirthForm
          authors={authors}
          editAuthor={editAuthor}
        />
      </div>
    </>
  )
}

export default Authors