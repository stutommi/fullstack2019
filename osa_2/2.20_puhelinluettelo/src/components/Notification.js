import React from 'react'

const Notification = ({ message, statusColor }) => {
    
    const notificationStyle = {
        margin: "10px 0",
        backgroundColor: `${statusColor}`,
        borderRadius: "10px",
        padding: "10px",
        color: "white",
        fontSize: "18px"
    }

    return (
        <div>
            <p style={notificationStyle}>{message}</p>
        </div>
    )
}

export default Notification