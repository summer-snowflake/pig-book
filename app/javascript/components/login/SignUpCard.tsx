import React, { Component } from 'react'
import { withTranslation } from 'react-i18next'

import SignUpForm from 'components/login/SignUpForm';

type Props = I18nProps

class SignUpCard extends Component<Props> {
  render (): JSX.Element {
    const { t } = this.props

    return (
      <div className='sign-up-card-component card'>
        <div className='card-header'>
          <i className='fa fa-heart left-icon' />
          {t('menu.signUp')}
        </div>
        <div className='card-body with-background-image'>
          <SignUpForm />
        </div>
      </div>
    );
  }
}

export default withTranslation()(SignUpCard)
