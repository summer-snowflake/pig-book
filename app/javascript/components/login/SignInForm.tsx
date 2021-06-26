import React, { Component } from 'react'
import { withTranslation } from 'react-i18next'
import { RouteComponentProps, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { ThunkDispatch } from 'redux-thunk'
import { Action } from 'redux'
import * as H from 'history'

import { LoginParams } from 'types/api'
import { SessionStore } from 'types/store'
import { login } from 'actions/sessionActions'
import { RootState } from 'reducers/rootReducer'

interface StateProps {
  sessionStore: SessionStore;
}

interface DispatchProps {
  login: (params: LoginParams, history: H.History) => void;
}

type Props = I18nProps & StateProps & DispatchProps & RouteComponentProps
type State = LoginParams

class SignInForm extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = {
      email: '',
      password: ''
    }

    this.handleChangeEmail = this.handleChangeEmail.bind(this)
    this.handleChangePassword = this.handleChangePassword.bind(this)
    this.handleLogin = this.handleLogin.bind(this)
  }

  handleChangeEmail(e: React.ChangeEvent<HTMLInputElement>): void {
    this.setState({
      email: e.target.value
    })
  }

  handleChangePassword(e: React.ChangeEvent<HTMLInputElement>): void {
    this.setState({
      password: e.target.value
    })
  }

  handleLogin(): void {
    const params = {
      email: this.state.email,
      password: this.state.password
    }
    this.props.login(params, this.props.history)
  }

  render (): JSX.Element {
    const { t } = this.props

    return (
      <form className='login-card-component'>
        <div className='form-group'>
          <label className='form-label required' htmlFor='user_email'>
            {t('label.email')}
          </label>
          <input
            autoComplete='email'
            autoFocus
            className='form-control'
            id='user_email'
            onChange={this.handleChangeEmail}
            type='email'
            value={this.state.email}
          />
        </div>
        <div className='form-group'>
          <label className='form-label required' htmlFor='user_password'>
            {t('label.password')}
          </label>
          <input
            autoComplete='password'
            className='form-control'
            id='user_password'
            onChange={this.handleChangePassword}
            type='password'
            value={this.state.password}
          />
        </div>
        <button
          className='btn btn-primary'
          disabled={this.props.sessionStore.isLoading}
          onClick={this.handleLogin}
          type='submit'>
          {t('button.login')}
        </button>
      </form>
    );
  }
}

function mapState(state: RootState): StateProps {
  return {
    sessionStore: state.session
  }
}

function mapDispatch(dispatch: ThunkDispatch<RootState, undefined, Action>): DispatchProps {
  return {
    login(params: LoginParams, history: H.History): void {
      dispatch(login(params, history))
    }
  }
}

export default connect(mapState, mapDispatch)(withTranslation()(withRouter(SignInForm)))
