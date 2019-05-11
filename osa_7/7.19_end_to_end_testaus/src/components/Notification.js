import React from 'react'
import { connect } from 'react-redux'

const Notification = ({ notification }) => {
  const notificationStyle = {
    margin: '10px 0',
    backgroundColor: `${notification.color}`,
    borderRadius: '10px',
    padding: '10px',
    color: 'white',
    fontSize: '18px'
  }

  return (
    <p style={notificationStyle}>
      {notification.notification}
    </p>
  )
}

const mapStateToProps = (state) => ({
  notification: state.notification
})

export default connect(
  mapStateToProps
)(Notification)