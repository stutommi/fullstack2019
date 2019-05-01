import React, { useState, useImperativeHandle } from 'react'

const Togglable = React.forwardRef(({ buttonLabel, children }, ref) => {
  const [visible, setVisible] = useState(false)

  // Styles
  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  useImperativeHandle(ref, () => {
    return { toggleVisibility }
  })

  return (
    <>
      <div style={hideWhenVisible}>
        <button onClick={toggleVisibility}>
          {buttonLabel}
        </button>
      </div>
      <div style={showWhenVisible}>
        {children}
      </div>
    </>
  )
})

export default Togglable