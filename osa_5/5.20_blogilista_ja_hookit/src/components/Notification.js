import React from 'react'

const Notification = ({ message }) => {
  const notificationStyle = {
    margin: "10px 0",
    backgroundColor: `${message.status}`,
    borderRadius: "10px",
    padding: "10px",
    color: "white",
    fontSize: "18px"
  }

  return (
    <p style={notificationStyle}>
      {message.text}
    </p>
  )
}

export default Notification