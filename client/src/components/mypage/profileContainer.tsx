import React, { Component } from 'react'
import { Action } from 'redux'
import { withTranslation } from 'react-i18next'
import { connect } from 'react-redux'
import { ThunkDispatch } from 'redux-thunk'

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

class ProfileContainer extends Component<Props> {
  render(): JSX.Element {
    const { t } = this.props

    return (
      <div className='profile-component'>
        <div className='card'>
          <div className='card-body'>
            <ul>
              <li>
                {t('label.email')}
              </li>
              {this.props.userStatus.email}
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

export default connect(mapState, mapDispatch)(withTranslation()(ProfileContainer))
