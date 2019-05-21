import React, { useState, useEffect } from 'react'
import { useApolloClient } from 'react-apollo-hooks'
import { gql } from 'apollo-boost'

const ALL_BOOKS = gql`
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

const Recommendations = ({ show, allBooks, me }) => {
  const [books, setBooks] = useState(null)
  const client = useApolloClient()

  let favoriteGenre

  if (me.me) {
    favoriteGenre = me.me.favoriteGenre
  }


  useEffect(() => {
    if (favoriteGenre) {
      client.query({
        query: ALL_BOOKS,
        variables: { genreToSearch: favoriteGenre },
        fetchPolicy: 'no-cache'
      })
        .then(({ data }) => setBooks(data.allBooks))
        .catch(error => console.error(error))
    }
  }, [me.me])

  if (!show) {
    return null
  }

  return (
    <>
      <h2>Recommendations</h2>
      {!favoriteGenre
        ? <p>no books for now</p>
        :
        <>
          <p>Books in your favorite genre {}</p>
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
              {books &&
                books.map(a =>
                  <tr key={a.title}>
                    <td>{a.title}</td>
                    <td>{a.author.name}</td>
                    <td>{a.published}</td>
                  </tr>
                )}
            </tbody>
          </table>
        </>
      }

    </>
  )
}

export default Recommendations