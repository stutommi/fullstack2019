import React, { useState, useEffect } from 'react'
import { gql } from 'apollo-boost'
import { useQuery, useMutation, useApolloClient } from 'react-apollo-hooks'
import { Subscription } from 'react-apollo'

// Components
import NewBook from './components/NewBook'
import Authors from './components/Authors'
import Books from './components/Books'
import LoginForm from './components/LoginForm'
import Recommendations from './components/Recommendations'

const BOOK_DETAILS = gql`
fragment BookDetails on Book {
  title
  published
  id
  genres
  author {
    name
    id
    bookCount
    born
    books
  }
}
`

const ALL_BOOKS = gql`
{
  allBooks {
    ...BookDetails
  }
}
${BOOK_DETAILS}
`

const ME = gql`
{
  me {
    favoriteGenre
  }
}
`

const CREATE_BOOK = gql`
mutation createBook(
  $title: String!,
  $author: String!,
  $published: Int!,
  $genres: [String!]!)
{
  addBook(
    title: $title
    author: $author
    published: $published
    genres: $genres
  ) {
    ...BookDetails
  }
}
${BOOK_DETAILS}
`

const LOGIN = gql`
mutation login($username: String!, $password: String!) {
  login(
    username: $username,
    password: $password
  ) {
    value
  }
}
`

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

const BOOK_ADDED = gql`
subscription {
  bookAdded {
    ...BookDetails
  }
}
${BOOK_DETAILS}
`

const App = () => {
  const [page, setPage] = useState('authors')
  const [errorMessage, setErrorMessage] = useState(null)
  const [token, setToken] = useState(null)

  const client = useApolloClient()

  useEffect(() => {
    setToken(localStorage.getItem('library-user-token', token))
  }, [])

  const handleError = (error) => {
    setErrorMessage(error.graphQLErrors[0].message)

    setTimeout(() => {
      setErrorMessage(null)
    }, 5000);
  }

  const login = useMutation(LOGIN)

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }

  const includedIn = (set, object) =>
    set.map(p => p.id).includes(object.id)

  const me = useQuery(ME)
  const allBooks = useQuery(ALL_BOOKS)
  const addBook = useMutation(CREATE_BOOK, {
    // onError doesn't seem to be working right now, it is skipped for some reason.
    onError: handleError,
    update: (store, response) => {

      const bookData = store.readQuery({ query: ALL_BOOKS })
      const authorData = store.readQuery({ query: ALL_AUTHORS })

      const addedBook = response.data.addBook
      const addedAuthor = response.data.addBook.author

      if (!includedIn(bookData.allBooks, addedBook)) {
        authorData.allAuthors.push(addedAuthor)
        bookData.allBooks.push(addedBook)

        client.writeQuery({
          query: ALL_BOOKS,
          data: bookData
        })

        client.writeQuery({
          query: ALL_AUTHORS,
          data: authorData
        })
      }

      store.writeQuery({
        query: ALL_BOOKS, data: bookData
      })

    }
  })

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        {token &&
          <>
            <button onClick={() => setPage('add')}>add book</button>
            <button onClick={() => setPage('recommend')}>recommend</button>
            <button onClick={logout}>logout</button>
          </>
        }
        {!token && <button onClick={() => setPage('login')}>login</button>}
      </div>

      {errorMessage &&
        <p style={{ color: 'red' }}>
          {errorMessage}
        </p>
      }

      <Authors
        show={page === 'authors'}
        handleError={handleError}
      />

      <Books
        show={page === 'books'}
      />

      <NewBook
        show={page === 'add'}
        addBook={addBook}
      />

      <Recommendations
        show={page === 'recommend'}
        me={me.data}
        allBooks={allBooks}
      />

      <LoginForm
        show={page === 'login'}
        login={login}
        setToken={(token) => setToken(token)}
        handleError={handleError}
        setPage={setPage}
      />

      <Subscription
        subscription={BOOK_ADDED}
        onSubscriptionData={({ subscriptionData }) => {
          const { title, published, id, genres, author } = subscriptionData.data.bookAdded
          window.alert(`
            new book added:
            Title: ${title}
            Author: ${author.name}
            Published: ${published}
            Genre: ${genres.join(', ')}
            Id: ${id}
            `)

          const bookData = client.readQuery({ query: ALL_BOOKS })
          const authorData = client.readQuery({ query: ALL_AUTHORS })

          const addedBook = subscriptionData.data.bookAdded
          const addedAuthor = subscriptionData.data.bookAdded.author

          if (!includedIn(bookData.allBooks, addedBook)) {

            authorData.allAuthors
              .map(a => a.name)
              .includes(addedAuthor.name)
              ? authorData.allAuthors
                .map(a => a.name === addedAuthor.name ? addedAuthor : a)
              : authorData.allAuthors.push(addedAuthor)

            bookData.allBooks.push(addedBook)
            client.writeQuery({
              query: ALL_BOOKS,
              data: bookData
            })

            client.writeQuery({
              query: ALL_AUTHORS,
              data: authorData
            })
          }

        }}
      >
        {() => null}
      </Subscription>

    </div>
  )
}

export default App
