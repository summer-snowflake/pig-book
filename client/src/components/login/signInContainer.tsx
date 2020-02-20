import React, { Component } from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { withTranslation } from 'react-i18next';
import { connect } from 'react-redux';

import { login } from 'actions/sessionActions';

interface Props {
  login: any,
  session: {
    isLoading: boolean
  }
}

interface State {
  email: string,
  password: string
}

class SignInContainer extends Component<i18nProps & RouteComponentProps & Props, State> {
  constructor(props: i18nProps & RouteComponentProps & Props) {
    super(props)
    this.state = {
      email: '',
      password: ''
    }

    this.handleLogin = this.handleLogin.bind(this);
    this.handleChangeEmail = this.handleChangeEmail.bind(this);
    this.handleChangePassword = this.handleChangePassword.bind(this);
  }

  handleLogin() {
    const params = {
      email: this.state.email,
      password: this.state.password
    }
    this.props.login(params, this.props.history);
  }

  handleChangeEmail(e: React.ChangeEvent<HTMLInputElement>) {
    this.setState({
      email: e.target.value
    })
  }

  handleChangePassword(e: React.ChangeEvent<HTMLInputElement>) {
    this.setState({
      password: e.target.value
    })
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
              <input
                autoFocus
                autoComplete='email'
                className='form-control'
                id='user_email'
                onChange={this.handleChangeEmail}
                type='email'
                value={this.state.email} />
            </div>
            { /* パスワード */ }
            <div className='form-group'>
              <label className='required' htmlFor='user_password'>
                {t('label.password')}
              </label>
              <input
                autoComplete='password'
                className='form-control'
                id='user_password'
                onChange={this.handleChangePassword}
                type='password'
                value={this.state.password} />
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
    login(params: State, history: any) {
      dispatch(login(params)).then(() => {
        history.push('/mypage');
        history.go();
      });
    }
  }
}

export default connect(mapState, mapDispatch)(withTranslation()(withRouter(SignInContainer)));
