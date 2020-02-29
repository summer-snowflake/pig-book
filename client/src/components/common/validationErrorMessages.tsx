import React, { Component } from 'react';

interface Props {
  messages: string[]
}

class ValidationErrorMessages extends Component<Props> {
  render() {
    return (
      <div className='validation-error-messages-component'>
        {this.props.messages.map((message, index) => (
          <small className='form-text pink' key={index}>
            <i className='fas fa-exclamation-circle left-icon' />
            {message}
          </small>
        ))}
      </div>
    );
  }
}

export default ValidationErrorMessages;
