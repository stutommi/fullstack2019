import React, { useState, useImperativeHandle } from 'react'
import { Button, Icon } from 'semantic-ui-react'

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
        <Button primary icon size='mini' labelPosition='right' onClick={toggleVisibility}>
          {buttonLabel}
          <Icon name='plus'/>
        </Button>
      </div>
      <div style={showWhenVisible}>
        {children}
      </div>
    </>
  )
})

export default Togglable