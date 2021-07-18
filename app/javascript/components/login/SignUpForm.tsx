import React, { Component } from 'react'
import { withTranslation } from 'react-i18next'
import { connect } from 'react-redux'
import { ThunkDispatch } from 'redux-thunk'
import { Action } from 'redux'
import { withRouter, RouteComponentProps } from 'react-router-dom'
import * as H from 'history'

import { SignUpParams } from 'types/api'
import { RegistrationStore } from 'types/store'
import { RootState } from 'reducers/rootReducer'
import { signUp } from 'actions/registrationActions'
import ValidationErrorMessages from 'components/common/ValidationErrorMessages'

interface StateProps {
  registrationStore: RegistrationStore;
}

interface DispatchProps {
  signUp: (params: SignUpParams, history: H.History) => void;
}

type Props = I18nProps & StateProps & DispatchProps & RouteComponentProps
type State = SignUpParams

class SignInForm extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = {
      email: '',
      password: '',
      password_confirmation: ''
    }

    this.handleChangeEmail = this.handleChangeEmail.bind(this)
    this.handleChangePassword = this.handleChangePassword.bind(this)
    this.handleChangePasswordConfirmation = this.handleChangePasswordConfirmation.bind(this)
    this.handleSignUp = this.handleSignUp.bind(this)
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

  handleChangePasswordConfirmation(e: React.ChangeEvent<HTMLInputElement>): void {
    this.setState({
      password_confirmation: e.target.value
    })
  }

  handleSignUp(e: React.MouseEvent<HTMLElement>): void {
    e.preventDefault()
    const params = {
      email: this.state.email,
      password: this.state.password,
      password_confirmation: this.state.password_confirmation
    }
    this.props.signUp(params, this.props.history)
  }

  render (): JSX.Element {
    const { t } = this.props

    return (
      <form className='login-card-component'>
        <ValidationErrorMessages errors={this.props.registrationStore.errors} />
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
        <div className='form-group'>
          <label className='form-label required' htmlFor='user_password_confirmation'>
            {t('label.passwordConfirmation')}
          </label>
          <input
            autoComplete='password'
            className='form-control'
            id='user_password_confirmation'
            onChange={this.handleChangePasswordConfirmation}
            type='password'
            value={this.state.password_confirmation}
          />
        </div>
        <button
          className='btn btn-primary'
          disabled={this.props.registrationStore.isLoading}
          onClick={this.handleSignUp}
          type='submit'>
          {t('button.create')}
        </button>
      </form>
    );
  }
}

function mapState(state: RootState): StateProps {
  return {
    registrationStore: state.registration
  }
}

function mapDispatch(dispatch: ThunkDispatch<RootState, undefined, Action>): DispatchProps {
  return {
    signUp(params: SignUpParams, history: H.History): void {
      dispatch(signUp(params, history))
    }
  }
}

export default connect(mapState, mapDispatch)(withTranslation()(withRouter(SignInForm)))
