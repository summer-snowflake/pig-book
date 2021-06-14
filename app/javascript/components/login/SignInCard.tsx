import React, { Component } from 'react'
import { withTranslation } from 'react-i18next'

import SignInForm from 'components/login/SignInForm';

type Props = I18nProps

class SignInCard extends Component<Props> {
  render (): JSX.Element {
    const { t } = this.props

    return (
      <div className='sign-in-card-component card'>
        <div className='card-header'>
          <i className='fa fa-leaf left-icon' />
          {t('menu.login')}
        </div>
        <div className='card-body with-background-image'>
          <SignInForm />
        </div>
      </div>
    );
  }
}

export default withTranslation()(SignInCard)
