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

class OptionsSettingsCard extends Component<Props> {
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
      <div className='options-settings-component card'>
        <div className='card-header'>
          <i className='fas fa-cogs left-icon' />
          {t('title.optionsSetting')}
        </div>
        <div className='card-body'>
          {this.props.userStore.errors.length > 0 && (
            <div className='validation-errors-field'>
              <ValidationErrorMessages errors={this.props.userStore.errors} />
            </div>
          )}
         <ul>
            {this.props.userStore.options.map((option) => (
              <li className='option-li' key={option.id}>
                <SwitchCheckbox id={option.id} onChangeCheck={this.handleChangeCheck} value={option.value} />
                <span>
                  {option.name}
                </span>
                <Tooltip value={option.description}>
                  <span className='description'>
                    <i className='fas fa-question-circle right-icon' />
                  </span>
                </Tooltip>
              </li>
            ))}
          </ul>
          <ul className='options-info-list'>
            <li>
              {t('label.recordsCount')}
              <span>
                {this.props.userStore.recordsCount}
              </span>
            </li>
          </ul>
        </div>
      </div>
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

export default connect(mapState, mapDispatch)(withTranslation()(OptionsSettingsCard))
