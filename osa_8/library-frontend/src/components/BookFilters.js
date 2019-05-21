import React from 'react'

const BookFilters = ({ setFilter, books }) => {

  let genres = []

  books
    .forEach(book => book.genres
      .forEach(genre => {
        if (!genres.includes(genre)) {
          genres = genres.concat(genre)
        }
      })
    )

  const buttons = genres
    .map(genre =>
      <button
        onClick={() => setFilter(genre)}
        key={genre}
      >
        {genre}
      </button>
    )

  return (
    <>
      <button onClick={() => setFilter(null)}>
        all
      </button>
      {buttons}
    </>
  )
}

export default BookFilters