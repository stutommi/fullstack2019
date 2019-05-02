import React from 'react'
import { vote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'
import { connect } from 'react-redux'
import Filter from './Filter'

const AnecdoteList = (props) => {

  const handleVote = (anecdote) => {
    props.vote(anecdote)
    props.setNotification(`you voted "${anecdote.content}"`, 5)
  }

  return (
    <>
      <Filter />
      {props.anecdotesToShow.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </>
  )
}

const anecdotesToShow = ({ anecdotes, filter }) => {
  return anecdotes.filter(a => a.content.includes(filter))
}

const mapStateToProps = (state) => {
  return {
    anecdotesToShow: anecdotesToShow(state),
    notification: state.notification,
  }
}

const mapDispatchToProps = {
  vote, setNotification
}

export default connect(mapStateToProps, mapDispatchToProps)(AnecdoteList)