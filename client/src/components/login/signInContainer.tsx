import React, { Component } from 'react';
import { withTranslation } from 'react-i18next';
import { connect } from 'react-redux';

import { loginRequest } from 'actions/sessionActions';

interface Props {
  login: any,
  session: {
    isLoading: boolean
  }
}

class SignInContainer extends Component<i18nProps & Props> {
  constructor(props: i18nProps & Props) {
    super(props)

    this.handleLogin = this.handleLogin.bind(this);
  }

  handleLogin() {
    this.props.login();
  }

  render() {
    const { t } = this.props;

    return (
      <div className='sign-in-component card'>
        <div className='card-header'>
          <i className='fa fa-leaf left-icon' />
          {t('title.login')}
        </div>
        <div className='card-body with-background-image'>
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

            <button className='btn btn-primary' disabled={this.props.session.isLoading}onClick={this.handleLogin} type='submit'>
              {t('button.login')}
            </button>
          </form>
        </div>
      </div>
    );
  }
}

function mapState(state: any) {
  return {
    session: state.session
  };
}

function mapDispatch(dispatch: any) {
  return {
    login() {
      dispatch(loginRequest());
    }
  }
}

export default connect(mapState, mapDispatch)(withTranslation()(SignInContainer));
