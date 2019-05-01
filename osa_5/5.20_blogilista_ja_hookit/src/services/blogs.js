
import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null


const setToken = (newToken) => {
  token = `bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = async (blog) => {
  try {
    const config = {
      headers: { Authorization: token }
    }
    const response = await axios.post(baseUrl, blog, config)
    return response.data
  } catch (exception) {
    console.log(exception.message)
  }
}

const remove = async (id) => {
  try {
    const config = {
      headers: { Authorization: token }
    }
    const response = await axios.delete(`${baseUrl}/${id}`, config)
    return response.status
    
  } catch (exception) {
    console.log(exception.message)
  }
}

const update = async (id, newObject) => {
  try {
    const response = await axios.put(`${baseUrl}/${id}`, newObject)
    return response.data
  } catch (exception) {
    console.log(exception.message)
  }
}

export default { getAll, setToken, create, update, remove } 