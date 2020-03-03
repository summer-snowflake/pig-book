import React, { Component } from 'react'
import { Action } from 'redux'
import { withRouter, RouteComponentProps } from 'react-router-dom'
import { withTranslation } from 'react-i18next'
import { ThunkDispatch } from 'redux-thunk'
import { connect } from 'react-redux'
import * as H from 'history'

import { LoginParams } from 'types/api'
import { SessionStore } from 'types/store'
import { login } from 'actions/sessionActions'
import { RootState } from 'reducers/rootReducer'

interface StateProps {
  session: SessionStore;
}

interface DispatchProps {
  login: (params: LoginParams, history: H.History) => void;
}

type Props = I18nProps & RouteComponentProps & StateProps & DispatchProps
type State = LoginParams

class SignInContainer extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = {
      email: '',
      password: ''
    }

    this.handleLogin = this.handleLogin.bind(this)
    this.handleChangeEmail = this.handleChangeEmail.bind(this)
    this.handleChangePassword = this.handleChangePassword.bind(this)
  }

  handleLogin(): void {
    const params = {
      email: this.state.email,
      password: this.state.password
    }
    this.props.login(params, this.props.history)
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

  render(): JSX.Element {
    const { t } = this.props

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
                autoComplete='email'
                autoFocus
                className='form-control'
                id='user_email'
                onChange={this.handleChangeEmail}
                type='email'
                value={this.state.email}
              />
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
                value={this.state.password}
              />
            </div>

            <button className='btn btn-primary' disabled={this.props.session.isLoading} onClick={this.handleLogin} type='submit'>
              {t('button.login')}
            </button>
          </form>
        </div>
      </div>
    )
  }
}

function mapState(state: RootState): StateProps {
  return {
    session: state.session
  }
}

function mapDispatch(dispatch: ThunkDispatch<RootState, undefined, Action>): DispatchProps {
  return {
    login(params: LoginParams, history: H.History): void {
      dispatch(login(params, history))
    }
  }
}

export default connect(mapState, mapDispatch)(withTranslation()(withRouter(SignInContainer)))
