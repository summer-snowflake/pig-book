import React, { Component } from 'react';

import 'stylesheets/errors.sass';

interface Props {
  message: string,
  messageType: string
}

class FlashMessage extends Component<Props> {
  render() {
    let msg = '';
    switch (this.props.message) {
      case 'logout':
        msg = 'ログアウトしました'
        break;
      case 'login_success':
        msg = 'ログインしました'
        break;
      case 'login_failure':
        msg = 'ログインに失敗しました'
        break;
    }
    console.log(msg);
    return (
      <div className='flash-message-component'>
        {this.props.messageType === 'success' && (
          <i className='fas fa-check-circle left-icon' />
        )}
        {this.props.messageType === 'error' && (
          <i className='fas fa-times-circle left-icon' />
        )}
        {msg}
      </div>
    );
  }
}

export default FlashMessage;