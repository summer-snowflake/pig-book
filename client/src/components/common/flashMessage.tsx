import React, { Component } from 'react';

import 'stylesheets/errors.sass';

interface Props {
  message: string,
  messageType: string
}

class FlashMessage extends Component<Props> {
  render() {
    return (
      <div className='flash-message-component'>
        {this.props.messageType === 'success' && (
          <i className='fas fa-check-circle left-icon' />
        )}
        {this.props.messageType === 'error' && (
          <i className='fas fa-times-circle left-icon' />
        )}
        {this.props.message}
      </div>
    );
  }
}

export default FlashMessage;