import React, { useState, useEffect } from 'react'
import BookFilters from './BookFilters'
import { gql } from 'apollo-boost'
import { useApolloClient } from 'react-apollo-hooks'

const BOOKS_BY_GENRE = gql`
query findBooksByGenre($genreToSearch: String!) {
  allBooks(genre: $genreToSearch) {
    title
    published
    genres
    author {
      name
    }
  }
}
`

const ALL_BOOKS = gql`
{
  allBooks {
    title
    published
    id
    genres
    author {
      name
      id
      bookCount
      born
    }
  }
}
`

const Books = ({ show }) => {
  const client = useApolloClient()
  const [books, setBooks] = useState(null)
  const [filteredBooks, setFilteredBooks] = useState(null)
  const [filter, setFilter] = useState(null)

  useEffect(() => {
    if (filter) {
      client.query({
        query: BOOKS_BY_GENRE,
        variables: { genreToSearch: filter },
        fetchPolicy: 'no-cache'
      }).then(result => setFilteredBooks(result.data.allBooks))
    } else {
      client.query({
        query: ALL_BOOKS
      }).then(result => {
        setBooks(result.data.allBooks)
        setFilteredBooks(result.data.allBooks)
      })
    }
  }, [filter])

  if (!show) {
    return null
  }

  return (
    <div>
      <h2>books</h2>
      {filter && <p>in genre <strong>{filter}</strong></p>}
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              author
            </th>
            <th>
              published
            </th>
          </tr>
          {filteredBooks.map(b =>
            <tr key={b.title}>
              <td>{b.title}</td>
              <td>{b.author.name}</td>
              <td>{b.published}</td>
            </tr>
          )}
        </tbody>
      </table>
      <BookFilters
        setFilter={setFilter}
        books={books}
      />
    </div>
  )
}

export default Books