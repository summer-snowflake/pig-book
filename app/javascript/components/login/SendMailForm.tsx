import React, { Component } from 'react'
import { withTranslation } from 'react-i18next'
import { RouteComponentProps, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { ThunkDispatch } from 'redux-thunk'
import { Action } from 'redux'
import * as H from 'history'

import { ConfirmationParams } from 'types/api'
import { ConfirmationStore } from 'types/store'
import { RootState } from 'reducers/rootReducer'
import { confirmEmail } from 'actions/confirmationActions'
import ValidationErrorMessages from 'components/common/ValidationErrorMessages'

interface StateProps {
  confirmationStore: ConfirmationStore;
}

interface DispatchProps {
  confirmEmail: (params: ConfirmationParams) => void;
}

type Props = I18nProps & StateProps & DispatchProps & RouteComponentProps
type State = ConfirmationParams

class SendMailForm extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = {
      email: '',
    }

    this.handleChangeEmail = this.handleChangeEmail.bind(this)
    this.handleClickSendButton = this.handleClickSendButton.bind(this)
  }

  handleChangeEmail(e: React.ChangeEvent<HTMLInputElement>): void {
    this.setState({
      email: e.target.value
    })
  }

  handleClickSendButton(): void {
    const params = {
      email: this.state.email
    }
    if (this.props.location.pathname === '/users/confirmations') {
      this.props.confirmEmail(params)
    }
  }

  render (): JSX.Element {
    const { t } = this.props

    return (
      <form className='send-mail-form-component'>
        <ValidationErrorMessages errors={this.props.confirmationStore.errors} />
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
        <button
          className='btn btn-primary'
          disabled={this.props.confirmationStore.isLoading}
          onClick={this.handleClickSendButton}
          type='submit'>
          {t('button.send')}
        </button>
      </form>
    );
  }
}

function mapState(state: RootState): StateProps {
  return {
    confirmationStore: state.confirmation
  }
}

function mapDispatch(dispatch: ThunkDispatch<RootState, undefined, Action>): DispatchProps {
  return {
    confirmEmail(params: ConfirmationParams): void {
      dispatch(confirmEmail(params))
    }
  }
}

export default connect(mapState, mapDispatch)(withTranslation()(withRouter(SendMailForm)))
