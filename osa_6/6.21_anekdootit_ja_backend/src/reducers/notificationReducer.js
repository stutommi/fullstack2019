
export const setNotification = (message, seconds) => {
  return dispatch => {
    const toMilliseconds = seconds * 1000
    dispatch({
      type: 'ADD_NOTIFICATION',
      message: message
    })
    setTimeout(() => {
      dispatch({
        type: 'CLEAR_NOTIFICATION'
      })
    }, toMilliseconds);
  }
}

const notificationReducer = (state = '', action) => {
  switch (action.type) {
    case 'ADD_NOTIFICATION':
      return state = action.message
    case 'CLEAR_NOTIFICATION':
      return state = ''
    default:
      return state
  }
}

export default notificationReducer