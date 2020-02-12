import React, { Component } from 'react';
import { withTranslation } from 'react-i18next';

class SignIn extends Component<i18nProps> {
  render() {
    const { t } = this.props;

    return (
      <div className='sign-in-component card'>
        <div className='card-header'>
          <i className='fa fa-leaf left-icon' />
          {t('title.login')}
        </div>
        <div className='card-body'>
          <form>
            { /* メールアドレス */ }
            <div className='form-group'>
              <label className='required' htmlFor='user_email'>
                {t('label.email')}
              </label>
              <input autoFocus autoComplete='email' className='form-control' id='user_email' type='email' />
            </div>
            { /* パスワード */ }
            <div className='form-group'>
              <label className='required' htmlFor='user_password'>
                {t('label.password')}
              </label>
              <input autoComplete='password' className='form-control' id='user_password' type='password' />
            </div>

            <input className='btn btn-warning' type='submit' value={t('button.login')} />
          </form>
        </div>
      </div>
    );
  }
}

export default withTranslation()(SignIn);
