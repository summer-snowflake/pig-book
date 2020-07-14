import React, { Component } from 'react'
import { Action } from 'redux'
import { withTranslation } from 'react-i18next'
import { connect } from 'react-redux'
import { ThunkDispatch } from 'redux-thunk'

import { UserStore } from 'types/store'
import { getUser } from 'actions/userActions'
import { RootState } from 'reducers/rootReducer'

interface StateProps {
  userStore: UserStore;
}

interface DispatchProps {
  getUser: () => void;
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
                <label>
                  {t('label.email')}
                </label>
                <p>
                  {this.props.userStore.email}
                </p>
              </li>
              <li>
                <label>
                  {t('label.options')}
                </label>
                <p>
                  {this.props.userStore.optionsList}
                </p>
              </li>
            </ul>
          </div>
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
    getUser(): void {
      dispatch(getUser())
    }
  }
}

export default connect(mapState, mapDispatch)(withTranslation()(ProfileContainer))
