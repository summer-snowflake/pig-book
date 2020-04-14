import React, { Component } from 'react'
import { withTranslation } from 'react-i18next'
import { withRouter, RouteComponentProps } from 'react-router-dom'
import { connect } from 'react-redux'
import { ThunkDispatch } from 'redux-thunk'
import { Action } from 'redux'

import { SignUpParams } from 'types/api'
import { RegistrationStore } from 'types/store'
import { signUp } from 'actions/registrationActions'
import { RootState } from 'reducers/rootReducer'
import ValidationErrorMessages from 'components/common/validationErrorMessages'

interface StateProps {
  registration: RegistrationStore;
}

interface DispatchProps {
  signUp: (params: SignUpParams) => void;
}

type Props = I18nProps & RouteComponentProps & StateProps & DispatchProps
type State = SignUpParams;

class SignUpContainer extends Component<Props, State> {
  constructor(props: Props) {
    super(props)

    this.state = {
      email: '',
      password: '',
      password_confirmation: ''
    }

    this.handleSignUp = this.handleSignUp.bind(this)
    this.handleChangeEmail = this.handleChangeEmail.bind(this)
    this.handleChangePassword = this.handleChangePassword.bind(this)
    this.handleChangePasswordConfirmation = this.handleChangePasswordConfirmation.bind(this)
  }

  handleSignUp(e: React.MouseEvent<HTMLElement>): void {
    e.preventDefault()
    const params = {
      email: this.state.email,
      password: this.state.password,
      password_confirmation: this.state.password_confirmation
    }
    this.props.signUp(params)
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
            {this.props.registration.errors.length > 0 && (
              <div className='validation-errors-field'>
                <ValidationErrorMessages messages={this.props.registration.errors} />
              </div>
            )}
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
            { /* パスワード（確認） */ }
            <div className='form-group'>
              <label className='required' htmlFor='user_password_confirmation'>
                {t('label.passwordConfirmation')}
              </label>
              <input
                autoComplete='password_confirmation'
                className='form-control'
                id='user_password_confirmation'
                onChange={this.handleChangePasswordConfirmation}
                type='password'
                value={this.state.password_confirmation}
              />
            </div>

            <button className='btn btn-primary' disabled={this.props.registration.isLoading} onClick={this.handleSignUp} type='submit'>
              {t('button.create')}
            </button>
          </div>
        </form>
      </div>
    )
  }
}

function mapState(state: RootState): StateProps {
  return {
    registration: state.registration
  }
}

function mapDispatch(dispatch: ThunkDispatch<RootState, undefined, Action>): DispatchProps {
  return {
    signUp(params: SignUpParams): void {
      dispatch(signUp(params))
    }
  }
}

export default connect(mapState, mapDispatch)(withTranslation()(withRouter(SignUpContainer)))
