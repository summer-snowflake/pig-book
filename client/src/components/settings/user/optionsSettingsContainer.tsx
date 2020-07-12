import React, { Component } from 'react'
import { Action } from 'redux'
import { withTranslation } from 'react-i18next'
import { connect } from 'react-redux'
import { ThunkDispatch } from 'redux-thunk'

import SwitchCheckbox from 'components/common/switchCheckbox'
import { UserParams } from 'types/api'
import { UserStatusStore } from 'types/store'
import { getUserStatus, patchUser } from 'actions/userStatusActions'
import { RootState } from 'reducers/rootReducer'
import ValidationErrorMessages from 'components/common/validationErrorMessages'

interface StateProps {
  userStatus: UserStatusStore;
}

interface DispatchProps {
  getUserStatus: () => void;
  patchUser: (params: UserParams) => void;
}

type Props = I18nProps & StateProps & DispatchProps

class OptionsSettingsContainer extends Component<Props> {
  constructor(props: Props) {
    super(props)

    this.handleChangeCheck = this.handleChangeCheck.bind(this)
  }

  handleChangeCheck(id: number) {
    const targetOption = this.props.userStatus.options.find((option) => option.id === id)
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
      <div className='options-settings-component'>
        <div className='card'>
          <div className='card-header'>
            <i className='fas fa-cogs left-icon' />
            {t('title.optionsSetting')}
          </div>
          <div className='card-body'>
            {this.props.userStatus.errors.length > 0 && (
              <div className='validation-errors-field'>
                <ValidationErrorMessages messages={this.props.userStatus.errors} />
              </div>
            )}
           <ul>
              {this.props.userStatus.options.map((option) => (
                <li className='option-li' key={option.id}>
                  <SwitchCheckbox id={option.id} onChangeCheck={this.handleChangeCheck} value={option.value} />
                  <span>
                    {option.name}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

function mapState(state: RootState): StateProps {
  return {
    userStatus: state.userStatus
  }
}

function mapDispatch(dispatch: ThunkDispatch<RootState, undefined, Action>): DispatchProps {
  return {
    getUserStatus(): void {
      dispatch(getUserStatus())
    },
    patchUser(params: UserParams): void {
      dispatch(patchUser(params))
    }
  }
}

export default connect(mapState, mapDispatch)(withTranslation()(OptionsSettingsContainer))
