import React, { Component } from 'react'
import { Action } from 'redux'
import { withTranslation } from 'react-i18next'
import { connect } from 'react-redux'
import { ThunkDispatch } from 'redux-thunk'

import SwitchCheckbox from 'components/common/switchCheckbox'
import { UserStatusStore } from 'types/store'
import { getUserStatus } from 'actions/userStatusActions'
import { RootState } from 'reducers/rootReducer'

interface StateProps {
  userStatus: UserStatusStore;
}

interface DispatchProps {
  getUserStatus: () => void;
}

type Props = I18nProps & StateProps & DispatchProps

class OptionsSettingsContainer extends Component<Props> {
  constructor(props: Props) {
    super(props)

    this.handleChangeCheck = this.handleChangeCheck.bind(this)
  }

  handleChangeCheck() {
    console.log('a')
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
            <ul>
              {this.props.userStatus.options.map((option) => (
                <li className='option-li' key={option.id}>
                  <SwitchCheckbox id={option.id} onChangeCheck={this.handleChangeCheck} />
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
    }
  }
}

export default connect(mapState, mapDispatch)(withTranslation()(OptionsSettingsContainer))
