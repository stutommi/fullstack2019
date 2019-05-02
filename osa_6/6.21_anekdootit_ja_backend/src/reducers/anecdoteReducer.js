import anecdoteService from '../services/anecdotes'

export const vote = id => {
  return async dispatch => {
    const updatedAnecdote = await anecdoteService.updateVotes(id)
    dispatch({
      type: 'VOTE',
      data: updatedAnecdote
    })
  }
}

export const createAnecdote = content => {
  return async dispatch => {
    const anecdote = await anecdoteService.createNew(content)
    dispatch({
      type: 'NEW_ANECDOTE',
      data: anecdote
    })
  }
}

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INIT_ANECDOTES',
      anecdotes
    })
  }
}

const reducer = (state = [], action) => {
  console.log('state now: ', state)
  console.log('action', action)
  switch (action.type) {
    case 'VOTE':
      const updatedState = state.map( a => a.id !== action.data.id ? a : action.data)
      return updatedState.sort((a, b) => b.votes - a.votes)
    case 'NEW_ANECDOTE':
      state = [...state, action.data]
      console.log(state)

      return state
    case 'INIT_ANECDOTES':
      return state = action.anecdotes
    default:
      return state
  }
}

export default reducer