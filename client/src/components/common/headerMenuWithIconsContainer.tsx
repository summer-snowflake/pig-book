import React, { Component } from 'react'
import { Action } from 'redux'
import { ThunkDispatch } from 'redux-thunk'
import { NavLink, withRouter, RouteComponentProps } from 'react-router-dom'
import { connect } from 'react-redux'

import { UserStore } from 'types/store'
import { signOut } from 'actions/sessionActions'
import { RootState } from 'reducers/rootReducer'

interface StateProps {
  userStore: UserStore;
}

interface DispatchProps {
  signOut: () => void;
}

type Props = StateProps & DispatchProps & RouteComponentProps

class HeaderMenuWithIconsContainer extends Component<Props> {
  constructor(props: Props) {
    super(props)

    this.handleLogout = this.handleLogout.bind(this)
  }

  handleLogout(): void {
    this.props.signOut()
    this.props.history.push('/users/sign_in')
  }

  render(): JSX.Element {
    const thisYear = (new Date()).getFullYear()

    return (
      <template className='header-menu-with-icons-component nav flex-column side-menu'>
        <li className='nav-item'>
          <NavLink activeClassName='active-link-menu' className='nav-link' to='/'>
            <i className='fas fa-home' />
          </NavLink>
        </li>
        {this.props.userStore.isLogged && (
          <li className='nav-item'>
            <NavLink activeClassName='active-link-menu' className='nav-link' to='/input'>
              <i className='fas fa-palette red' />
            </NavLink>
          </li>
        )}
        {this.props.userStore.isLogged && (
          <li className='nav-item'>
            <NavLink activeClassName='active-link-menu' className='nav-link' to='/list'>
              <i className='fas fa-align-justify' />
            </NavLink>
          </li>
        )}
        {this.props.userStore.isLogged && (
          <li className='nav-item'>
            <NavLink activeClassName='active-link-menu' className='nav-link' to={'/dashboards/' + thisYear}>
              <i className='fas fa-chart-bar' />
            </NavLink>
          </li>
        )}
        {this.props.userStore.isLogged && this.props.userStore.dailyOption && (
          <li className='nav-item'>
            <NavLink activeClassName='active-link-menu' className='nav-link' to='/daily'>
              <i className='fas fa-chart-line' />
            </NavLink>
          </li>
        )}
        {this.props.userStore.isLogged && this.props.userStore.admin && (
          <li className='nav-item'>
            <NavLink activeClassName='active-link-menu' className='nav-link' to='/admin/users'>
              <i className='fas fa-book' />
            </NavLink>
          </li>
        )}
        {this.props.userStore.isLogged && (
          <li className='nav-item'>
            <NavLink activeClassName='active-link-menu' className='nav-link' to='/settings'>
              <i className='fas fa-cog' />
            </NavLink>
          </li>
        )}
        {this.props.userStore.isLogged && (
          <li className='nav-item'>
            <NavLink activeClassName='active-link-menu' className='nav-link' to='/mypage'>
              <i className='fas fa-user' />
            </NavLink>
          </li>
        )}
        {!this.props.userStore.isLogged && (
          <li className='nav-item'>
            <NavLink activeClassName='active-link-menu' className='nav-link' to='/users/sign_in'>
              <i className='fas fa-leaf' />
            </NavLink>
          </li>
        )}
        {this.props.userStore.isLogged && (
          <li className='nav-item'>
            <span className='nav-link' onClick={this.handleLogout}>
              <i className='fas fa-sign-out-alt' />
            </span>
          </li>
        )}
      </template>
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
    signOut(): void {
      dispatch(signOut())
    }
  }
}

export default connect(mapState, mapDispatch)(withRouter(HeaderMenuWithIconsContainer))
