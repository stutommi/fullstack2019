const initialState = {
  notification: '',
  color: 'white'
}

// Reducer
const notificationReducer = (state = initialState, action) => {
  switch (action.type) {
  case 'SET_NOTIFICATION':
    return state = {
      notification: action.data.notification,
      color: action.data.color
    }
  case 'CLEAR_NOTIFICATION':
    return state = { notification: '', color: 'white' }
  default:
    return state
  }
}

// Action creators
export const setNotification = (notification, seconds, color) => {
  return (dispatch) => {
    dispatch({
      type: 'SET_NOTIFICATION',
      data: {
        color,
        notification
      }
    })
    setTimeout(() => {
      dispatch({
        type: 'CLEAR_NOTIFICATION'
      })
    }, seconds * 1000)

  }
}
export default notificationReducer