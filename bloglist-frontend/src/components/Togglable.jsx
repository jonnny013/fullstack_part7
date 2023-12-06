/* eslint-disable react/display-name */
import { useState, forwardRef, useImperativeHandle } from 'react'
import PropTypes from 'prop-types'

const Togglable = forwardRef((props, refs) => {
  const [visible, setVisible] =useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const stylesDiv = {
    marginTop: 10,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 'auto'
  }
  const button = {
    margin: 10
  }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  useImperativeHandle(refs, () => {
    return {
      toggleVisibility
    }
  })
  return (
    <div style={stylesDiv}>
      <div style={hideWhenVisible}>
        <button onClick={toggleVisibility} style={button}>{props.buttonLabel}</button>
      </div>
      <div style={showWhenVisible} className='centerButton'>
        <div>
          {props.children}
        </div>
        <button className='cancelButton' onClick={toggleVisibility}>Cancel</button>
      </div>
    </div>
  )
})

Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired
}

export default Togglable