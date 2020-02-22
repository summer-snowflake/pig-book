import React, { Component } from 'react';
import { withTranslation } from 'react-i18next'

import 'stylesheets/errors.sass';

interface Props {
  message: string,
  messageType: string
}

class FlashMessage extends Component<i18nProps & Props> {
  render() {
    const { t } = this.props;
    let msg = '';
    switch (this.props.message) {
      case 'logout':
        msg = t('message.logout');
        break;
      case 'login_success':
        msg = t('message.loginSuccess');
        break;
      case 'login_failure':
        msg = t('message.loginFailure');
        break;
    }

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

export default withTranslation()(FlashMessage);
