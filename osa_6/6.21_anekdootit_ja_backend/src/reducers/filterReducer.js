export const filter = (filter) => {
  console.log(filter)
  return {
    type: 'FILTER',
    filter
  }
}

const filterReducer = (state = '', action) => {
  if (action.type === 'FILTER') {
   return state = action.filter
  }
  return state
}

export default filterReducer