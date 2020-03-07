import React, { Component } from 'react'
import { Action } from 'redux'
import { NavLink } from 'react-router-dom'
import { withTranslation } from 'react-i18next'
import SideNav, { Toggle, NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { ThunkDispatch } from 'redux-thunk'

import { RouteComponentProps } from 'types/react-router'
import { UserStatusStore } from 'types/store'
import { getUserStatus } from 'actions/userStatusActions'
import { logout } from 'actions/sessionActions'
import { RootState } from 'reducers/rootReducer'

import '@trendmicro/react-sidenav/dist/react-sidenav.css'
import 'stylesheets/header.sass'
import 'stylesheets/sidenav.sass'
import brandImage from 'images/pig.gif'

interface StateProps {
  userStatus: UserStatusStore;
}

interface DispatchProps {
  getUserStatus: () => void;
  logout: () => void;
}

type Props = I18nProps & RouteComponentProps & StateProps & DispatchProps

class HeaderContainer extends Component<Props> {
  constructor(props: Props) {
    super(props)

    this.handleClickMenu = this.handleClickMenu.bind(this)
    this.handleLogout = this.handleLogout.bind(this)

    this.props.getUserStatus()
  }

  handleClickMenu(arg: string): void {
    if (arg === '/logout') {
      this.handleLogout()
    } else {
      this.props.history.push(arg)
    }
  }

  handleLogout(): void {
    this.props.logout()
    this.props.history.push('/users/sign_in')
  }

  render(): JSX.Element {
    const { t } = this.props

    return (
      <header className='header-component header'>
        <nav className='navbar navbar-expand-lg'>
          <NavLink className='nav-brand nav-link' to='/'>
            <img alt={t('brand_name')} className='brand-image' src={brandImage} />
            <span className='brand-name'>{t('brand_name')}</span>
          </NavLink>
          <SideNav className='navbar-toggler' onSelect={this.handleClickMenu}>
            <Toggle />
            <SideNav.Nav>
              <NavItem eventKey='/'>
                <NavIcon>
                  <i className='fas fa-home' />
                </NavIcon>
                <NavText>
                  {t('menu.home')}
                </NavText>
              </NavItem>
              {this.props.userStatus.isLogged && (
                <NavItem eventKey='/settings'>
                  <NavIcon>
                    <i className='fas fa-cog' />
                  </NavIcon>
                  <NavText>
                    {t('menu.settings')}
                  </NavText>
                </NavItem>
              )}
              {this.props.userStatus.isLogged && (this.props.location.pathname === '/settings' || this.props.location.pathname === '/categories' || this.props.location.pathname === '/breakdowns') && (
                <NavItem eventKey='/categories'>
                  <NavIcon>
                    <i className='fas fa-th-large' />
                  </NavIcon>
                  <NavText>
                    {t('menu.category')}
                  </NavText>
                </NavItem>
              )}
              {this.props.userStatus.isLogged && (this.props.location.pathname === '/settings' || this.props.location.pathname === '/categories' || this.props.location.pathname === '/breakdowns') && (
                <NavItem eventKey='/breakdowns'>
                  <NavIcon>
                    <i className='fas fa-list' />
                  </NavIcon>
                  <NavText>
                    {t('menu.breakdown')}
                  </NavText>
                </NavItem>
              )}
              {this.props.userStatus.isLogged && (
                <NavItem eventKey='/mypage'>
                  <NavIcon>
                    <i className='fas fa-user' />
                  </NavIcon>
                  <NavText>
                    {t('menu.mypage')}
                  </NavText>
                </NavItem>
              )}
              {!this.props.userStatus.isLogged && (
                <NavItem eventKey='/users/sign_in'>
                  <NavIcon>
                    <i className='fas fa-leaf' />
                  </NavIcon>
                  <NavText>
                    {t('menu.login')}
                  </NavText>
                </NavItem>
              )}
              {this.props.userStatus.isLogged && (
                <NavItem eventKey='/logout'>
                  <NavIcon>
                    <i className='fas fa-sign-out-alt' />
                  </NavIcon>
                  <NavText>
                    {t('menu.logout')}
                  </NavText>
                </NavItem>
              )}
              {(this.props.location.pathname === '/users/sign_in' || this.props.location.pathname === '/users/sign_up') && !this.props.userStatus.isLogged && (
                <NavItem eventKey='/users/sign_up'>
                  <NavIcon>
                    <i className='fas fa-heart' />
                  </NavIcon>
                  <NavText>
                    {t('menu.signUp')}
                  </NavText>
                </NavItem>
              )}
            </SideNav.Nav>
          </SideNav>
          <div className='collapse navbar-collapse'>
            <ul className='navbar-nav mr-auto'>
              <li className='nav-item'>
                <NavLink activeClassName='active-link-menu' className='nav-link' to='/'>
                  <i className='fas fa-home left-icon' />
                  {t('menu.home')}
                </NavLink>
              </li>
            </ul>
            <ul className='navbar-nav justify-content-end'>
              {this.props.userStatus.isLogged && (
                <li className='nav-item'>
                  <NavLink activeClassName='active-link-menu' className='nav-link' to='/settings'>
                    <i className='fas fa-cog left-icon' />
                    {t('menu.settings')}
                  </NavLink>
                </li>
              )}
              {this.props.userStatus.isLogged && (
                <li className='nav-item'>
                  <NavLink activeClassName='active-link-menu' className='nav-link' to='/mypage'>
                    <i className='fas fa-user left-icon' />
                    {t('menu.mypage')}
                  </NavLink>
                </li>
              )}
              {!this.props.userStatus.isLogged && (
                <li className='nav-item'>
                  <NavLink activeClassName='active-link-menu' className='nav-link' to='/users/sign_in'>
                    <i className='fas fa-leaf left-icon' />
                    {t('menu.login')}
                  </NavLink>
                </li>
              )}
              {this.props.userStatus.isLogged && (
                <li className='nav-item'>
                  <span className='nav-link' onClick={this.handleLogout}>
                    <i className='fas fa-sign-out-alt left-icon' />
                    {t('menu.logout')}
                  </span>
                </li>
              )}
            </ul>
          </div>
        </nav>
      </header>
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
    logout(): void {
      dispatch(logout())
    }
  }
}

export default connect(mapState, mapDispatch)(withTranslation()(withRouter(HeaderContainer)))
