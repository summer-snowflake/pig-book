import React, { Component } from 'react'

interface Props {
  messages: string[];
}

class ValidationErrorMessages extends Component<Props> {
  render(): JSX.Element {
    return (
      <div className='validation-error-messages-component validation-errors-field'>
        {this.props.messages.map((message, index) => (
          <small className='form-text pink' key={index}>
            <i className='fas fa-exclamation-circle left-icon' />
            {message}
          </small>
        ))}
      </div>
    )
  }
}

export default ValidationErrorMessages
