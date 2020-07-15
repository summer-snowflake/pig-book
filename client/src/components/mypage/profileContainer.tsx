import React, { Component } from 'react'
import { withTranslation } from 'react-i18next'
import { connect } from 'react-redux'

import { UserStore } from 'types/store'
import { RootState } from 'reducers/rootReducer'

interface StateProps {
  userStore: UserStore;
}

type Props = I18nProps & StateProps

class ProfileContainer extends Component<Props> {
  render(): JSX.Element {
    const { t } = this.props

    return (
      <div className='profile-component'>
        <div className='card'>
          <div className='card-body'>
            <ul>
              <li>
                <label>{t('label.email')}</label>
                <p>{this.props.userStore.email}</p>
              </li>
              <li>
                <label>{t('label.options')}</label>
                <p>{this.props.userStore.optionsList}</p>
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

export default connect(mapState)(withTranslation()(ProfileContainer))
