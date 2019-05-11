import axios from 'axios'

const baseUrl = '/api/users'

const getAll = async () => {
  try {
    const response = await axios.get(baseUrl)
    return response.data
  } catch (exception) {
    console.error(exception)
  }
}


export default { getAll }