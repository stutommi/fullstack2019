const initialState = {
  good: 0,
  ok: 0,
  bad: 0
}

const counterReducer = (state = initialState, action) => {
  console.log(action)
  switch (action.type) {
    case 'GOOD':
      state = {
        ...state,
        good: state.good + 1
      }
      return state
    case 'OK':
      state = {
        ...state,
        ok: state.ok + 1
      }
      return state
    case 'BAD':
      state = {
        ...state,
        bad: state.bad + 1
      }
      return state
    case 'ZERO':
      state = { ...initialState }
      return state
    default: return state
  }

}

export default counterReducer