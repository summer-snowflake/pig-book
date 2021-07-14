import React, { Component } from 'react'
import { Action } from 'redux'
import { withTranslation } from 'react-i18next'
import { connect } from 'react-redux'
import { ThunkDispatch } from 'redux-thunk'

import { UserParams } from 'types/api'
import { UserStore } from 'types/store'
import { patchUser } from 'actions/userActions'
import { RootState } from 'reducers/rootReducer'
import SwitchCheckbox from 'components/common/SwitchCheckbox'
import ValidationErrorMessages from 'components/common/ValidationErrorMessages'
import Tooltip from 'components/common/Tooltip'

interface StateProps {
  userStore: UserStore;
}

interface DispatchProps {
  patchUser: (params: UserParams) => void;
}

type Props = I18nProps & StateProps & DispatchProps

class OptionsSettingsForm extends Component<Props> {
  constructor(props: Props) {
    super(props)

    this.handleChangeCheck = this.handleChangeCheck.bind(this)
  }

  handleChangeCheck(id: number) {
    const targetOption = this.props.userStore.options.find((option) => option.id === id)
    if (targetOption === undefined) {
      return
    }
    const column = targetOption.column
    const params = {
      [column]: !targetOption?.value
    }
    this.props.patchUser(params)
  }

  render(): JSX.Element {
    const { t } = this.props

    return (
      <form className='options-settings-form-component'>
        {this.props.userStore.errors.length > 0 && (
          <div className='validation-errors-field'>
            <ValidationErrorMessages errors={this.props.userStore.errors} />
          </div>
        )}
        {this.props.userStore.options.map((option) => (
          <div className='form-group' key={option.id}>
            <label className='form-label'>
              {option.name}
              <Tooltip value={option.description}>
                <span className='description'>
                  <i className='fas fa-question-circle right-icon' />
                </span>
              </Tooltip>
            </label>
            <SwitchCheckbox id={option.id} onChangeCheck={this.handleChangeCheck} value={option.value} />
          </div>
        ))}
        <div className='records-count'>
          <span className='label'>
            {t('label.recordsCount') + ' : ' + this.props.userStore.recordsCount}
          </span>
        </div>
      </form>
    )
  }
}

function mapState(state: RootState): StateProps {
  return {
    userStore: state.user
  }
}

function mapDispatch(dispatch: ThunkDispatch<RootState, undefined, Action>): DispatchProps {
  return {
    patchUser(params: UserParams): void {
      dispatch(patchUser(params))
    }
  }
}

export default connect(mapState, mapDispatch)(withTranslation()(OptionsSettingsForm))
