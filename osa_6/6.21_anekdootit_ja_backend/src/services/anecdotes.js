import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  try {
    const response = await axios.get(baseUrl)
    return response.data
  } catch (exception) {
    console.error(exception.message)
  }
}

const createNew = async (content) => {
  try {
    const response = await axios.post(baseUrl, { content, votes: 0 })
    console.log(response.data, 'tää')
    
    return response.data
  } catch (exception) {
    console.error(exception.message)
  }
}

const updateVotes = async (anecdote) => {
  const anecdoteToUpdate = {
    ...anecdote,
    votes: anecdote.votes + 1
  }
  try {
    const updatedAnecdote = await axios.put(`${baseUrl}/${anecdote.id}`, anecdoteToUpdate)
    return updatedAnecdote.data
  } catch (exception) {
    console.error(exception.message)
  }
}

export default { getAll, createNew, updateVotes }