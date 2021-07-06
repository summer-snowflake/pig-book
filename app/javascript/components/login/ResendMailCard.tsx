import React, { Component } from 'react'
import { withTranslation } from 'react-i18next'

import SendMailForm from 'components/login/SendMailForm';

type Props = I18nProps

class ResendMailCard extends Component<Props> {
  render (): JSX.Element {
    const { t } = this.props

    return (
      <div className='resend-mail-card-component card'>
        <div className='card-header'>
          <i className='fas fa-envelope left-icon' />
          {t('menu.resendEmail')}
        </div>
        <div className='card-body with-background-image'>
          <SendMailForm />
        </div>
      </div>
    );
  }
}

export default withTranslation()(ResendMailCard)
