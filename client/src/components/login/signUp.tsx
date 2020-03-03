import React, { Component } from 'react'
import { withTranslation } from 'react-i18next'

class SignUp extends Component<I18nProps> {
  render(): JSX.Element {
    const { t } = this.props

    return (
      <div className='sign-up-component card'>
        <div className='card-header'>
          <i className='fa fa-heart left-icon' />
          {t('title.signUp')}
        </div>
        <form>
          <div className='card-body with-background-image'>
            { /* メールアドレス */ }
            <div className='form-group'>
              <label className='required' htmlFor='user_email'>
                {t('label.email')}
              </label>
              <input autoComplete='email' autoFocus className='form-control' id='user_email' type='email' />
            </div>
            { /* パスワード */ }
            <div className='form-group'>
              <label className='required' htmlFor='user_password'>
                {t('label.password')}
              </label>
              <input autoComplete='password' className='form-control' id='user_password' type='password' />
            </div>
            { /* パスワード（確認） */ }
            <div className='form-group'>
              <label className='required' htmlFor='user_password_confirmation'>
                {t('label.passwordConfirmation')}
              </label>
              <input autoComplete='password_confirmation' className='form-control' id='user_password_confirmation' type='password' />
            </div>

            <button className='btn btn-primary' type='submit'>
              {t('button.create')}
            </button>
          </div>
        </form>
      </div>
    )
  }
}

export default withTranslation()(SignUp)
