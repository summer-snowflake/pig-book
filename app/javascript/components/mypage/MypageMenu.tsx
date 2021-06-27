import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import { withTranslation } from 'react-i18next'
import { connect } from 'react-redux'
import { ThunkDispatch } from 'redux-thunk'
import { Action } from 'redux'

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

class MypageMenu extends Component<Props> {
  render(): JSX.Element {
    const { t } = this.props

    return (
      <div className='mypage-menu-component'>
        <div className='list-group'>
          <NavLink activeClassName='active-link-menu' className='list-group-item' to='/mypage'>
            <i className='fa fa-user-shield left-icon' />
            {t('menu.mypageTop')}
          </NavLink>
        </div>
        <div className='menu-card'>
          <ul className='list'>
            <li className='list-item'>
              <label>{t('label.email')}</label>
              <p className='value'>{this.props.userStore.email}</p>
            </li>
            <li className='list-item'>
              <label>{t('label.options')}</label>
              <p className='value'>{this.props.userStore.optionsList}</p>
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
    getUser(): void {
      dispatch(getUser())
    }
  }
}

export default connect(mapState, mapDispatch)(withTranslation()(MypageMenu))
