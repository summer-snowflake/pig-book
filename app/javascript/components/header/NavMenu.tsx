import React, { Component} from 'react'
import { withTranslation } from 'react-i18next'
import { connect } from 'react-redux'
import { ThunkDispatch } from 'redux-thunk'
import { Action } from 'redux'

import { UserStore } from 'types/store'
import { getUser } from 'actions/userActions'
import { RootState } from 'reducers/rootReducer'
import { signOut } from 'actions/sessionActions'

interface StateProps {
  userStore: UserStore;
}

interface DispatchProps {
  getUser: () => void;
  signOut: () => void;
}

type Props = I18nProps & StateProps & DispatchProps

class NavMenu extends Component<Props> {
  constructor(props: Props) {
    super(props)

    this.props.getUser()
  }

  render(): JSX.Element {
    const { t } = this.props

    return (
      <nav className='nav-menu-component nav-menu'>
        <ul className='menu'>
          <li>
            <a className='menu-link' href='/'>
              <i className='fas fa-home left-icon' />
              {t('menu.home')}
            </a>
          </li>
        </ul>
        <ul className='right-menu'>
          {this.props.userStore.isLogged && (
            <li>
              <a className='menu-link' href='/mypage'>
                <i className='fas fa-user left-icon' />
                {t('menu.mypage')}
              </a>
            </li>
          )}
          {this.props.userStore.isLogged ? (
            <li>
              <a className='menu-link' onClick={this.props.signOut}>
                <i className='fas fa-sign-out-alt left-icon' />
                {t('menu.logout')}
              </a>
            </li>
          ) : (
            <li>
              <a className='menu-link' href='/users/sign_in'>
                <i className='fas fa-leaf left-icon' />
                {t('menu.login')}
              </a>
            </li>
          )}
        </ul>
      </nav>
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
    },
    signOut(): void {
      dispatch(signOut())
    }
  }
}

export default connect(mapState, mapDispatch)(withTranslation()(NavMenu))
