import React from 'react'

function Alert(props) {
  return (
    <div>
      {props.alert && <div className={`alert alert-primary ${props.alert.type}`} role='alert'>
        <strong>{cprops.alert.type}</strong>:
        {props.alert.message}
        </div>}
    </div>
  )
}

export default Alert
