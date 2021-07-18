import React, { Component } from 'react'

interface Props {
  errors: string[];
}

class ValidationErrorMessages extends Component<Props> {
  render(): JSX.Element {
    return (
      <div className='validation-error-messages-component'>
        {this.props.errors.length > 0 && (
          <div className='validation-error-messages-field'>
            {this.props.errors.map((message, index) => (
              <small className='form-text pink' key={index}>
                <i className='fas fa-exclamation-circle left-icon' />
                {message}
              </small>
            ))}
          </div>
        )}
     </div>
    )
  }
}

export default ValidationErrorMessages
