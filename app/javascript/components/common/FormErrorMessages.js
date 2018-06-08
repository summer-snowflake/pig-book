import React from 'react'
import PropTypes from 'prop-types'

class FormErrorMessages extends React.Component {
  constructor(props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick() {
    this.props.handleClick(this.props.item)
  }

  render() {
    if (this.props.errorMessages[this.props.column]) {
      return (
        <span className='form-error-messages-component'>
          {this.props.errorMessages[this.props.column].map((message, index) =>
            <small className='form-text pink' key={index}>
              <i className='fas fa-exclamation-circle left-icon' />
              {message}
            </small>
          )}
        </span>
      )
    } else {
      return null
    }
  }
}

FormErrorMessages.propTypes = {
  errorMessages: PropTypes.object.isRequired,
  column: PropTypes.string.isRequired
}

export default FormErrorMessages
