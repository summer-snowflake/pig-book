import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import { withTranslation } from 'react-i18next'
import SideNav, { Toggle, NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav'
import { withRouter } from 'react-router-dom'

import { RouteComponentProps } from 'types/react-router'
import { UserStore } from 'types/store'

import '@trendmicro/react-sidenav/dist/react-sidenav.css'
import 'stylesheets/header.sass'
import 'stylesheets/sidenav.sass'
import brandImage from 'images/pig.gif'

interface ParentProps {
  user: UserStore;
  handleClickSignOutLink: () => void;
}

type Props = RouteComponentProps & ParentProps & I18nProps

class Header extends Component<Props> {
  constructor(props: Props) {
    super(props)

    this.handleClickMenu = this.handleClickMenu.bind(this)
    this.handleLogout = this.handleLogout.bind(this)
  }

  handleClickMenu(arg: string): void {
    if (arg === '/logout') {
      this.handleLogout()
    } else {
      this.props.history.push(arg)
    }
  }

  handleLogout(): void {
    this.props.handleClickSignOutLink()
    this.props.history.push('/users/sign_in')
  }

  render(): JSX.Element {
    const { t } = this.props

    const isSettingsPath =
      this.props.location.pathname === '/settings' ||
      this.props.location.pathname === '/categories' ||
      this.props.location.pathname === '/breakdowns' ||
      this.props.location.pathname === '/places' ||
      this.props.location.pathname === '/labels'

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
              {this.props.user.isLogged && (
                <NavItem eventKey='/input'>
                  <NavIcon>
                    <i className='fas fa-palette red' />
                  </NavIcon>
                  <NavText>
                    {t('menu.input')}
                  </NavText>
                </NavItem>
              )}
              {this.props.user.isLogged && (
                <NavItem eventKey='/list'>
                  <NavIcon>
                    <i className='fas fa-align-justify' />
                  </NavIcon>
                  <NavText>
                    {t('menu.list')}
                  </NavText>
                </NavItem>
              )}
              {this.props.user.isLogged && (
                <NavItem eventKey='/dashboard'>
                  <NavIcon>
                    <i className='fas fa-chart-bar' />
                  </NavIcon>
                  <NavText>
                    {t('menu.dashboard')}
                  </NavText>
                </NavItem>
              )}
              {this.props.user.isLogged && this.props.user.dailyOption && (
                <NavItem eventKey='/daily'>
                  <NavIcon>
                    <i className='fas fa-chart-line' />
                  </NavIcon>
                  <NavText>
                    {t('menu.daily')}
                  </NavText>
                </NavItem>
              )}
              {this.props.user.isLogged && this.props.user.admin && (
                <NavItem eventKey='/admin/users'>
                  <NavIcon>
                    <i className='fas fa-book' />
                  </NavIcon>
                  <NavText>
                    {t('menu.admin')}
                  </NavText>
                </NavItem>
              )}
              {this.props.user.isLogged && (
                <NavItem eventKey='/settings'>
                  <NavIcon>
                    <i className='fas fa-cog' />
                  </NavIcon>
                  <NavText>
                    {t('menu.settings')}
                  </NavText>
                </NavItem>
              )}
              {this.props.user.isLogged && isSettingsPath && (
                <NavItem eventKey='/categories'>
                  <NavIcon>
                    <i className='fas fa-th-large' />
                  </NavIcon>
                  <NavText>
                    {t('menu.category')}
                  </NavText>
                </NavItem>
              )}
              {this.props.user.isLogged && isSettingsPath && (
                <NavItem eventKey='/breakdowns'>
                  <NavIcon>
                    <i className='fas fa-list' />
                  </NavIcon>
                  <NavText>
                    {t('menu.breakdown')}
                  </NavText>
                </NavItem>
              )}
              {this.props.user.isLogged && isSettingsPath && (
                <NavItem eventKey='/places'>
                  <NavIcon>
                    <i className='fas fa-map-marker-alt' />
                  </NavIcon>
                  <NavText>
                    {t('menu.place')}
                  </NavText>
                </NavItem>
              )}
              {this.props.user.isLogged && isSettingsPath && (
                <NavItem eventKey='/labels'>
                  <NavIcon>
                    <i className='fas fa-bookmark' />
                  </NavIcon>
                  <NavText>
                    {t('menu.tag')}
                  </NavText>
                </NavItem>
              )}
              {this.props.user.isLogged && (
                <NavItem eventKey='/mypage'>
                  <NavIcon>
                    <i className='fas fa-user' />
                  </NavIcon>
                  <NavText>
                    {t('menu.mypage')}
                  </NavText>
                </NavItem>
              )}
              {!this.props.user.isLogged && (
                <NavItem eventKey='/users/sign_in'>
                  <NavIcon>
                    <i className='fas fa-leaf' />
                  </NavIcon>
                  <NavText>
                    {t('menu.login')}
                  </NavText>
                </NavItem>
              )}
              {this.props.user.isLogged && (
                <NavItem eventKey='/logout'>
                  <NavIcon>
                    <i className='fas fa-sign-out-alt' />
                  </NavIcon>
                  <NavText>
                    {t('menu.logout')}
                  </NavText>
                </NavItem>
              )}
              {(this.props.location.pathname === '/users/sign_in' || this.props.location.pathname === '/users/sign_up') && !this.props.user.isLogged && (
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
              {this.props.user.isLogged && (
                <li className='nav-item'>
                  <NavLink activeClassName='active-link-menu' className='nav-link' to='/input'>
                    <i className='fas fa-palette left-icon red' />
                    <span className='red'>
                      {t('menu.input')}
                    </span>
                  </NavLink>
                </li>
              )}
              {this.props.user.isLogged && (
                <li className='nav-item'>
                  <NavLink activeClassName='active-link-menu' className='nav-link' to='/list'>
                    <i className='fas fa-align-justify left-icon' />
                    {t('menu.list')}
                  </NavLink>
                </li>
              )}
              {this.props.user.isLogged && (
                <li className='nav-item'>
                  <NavLink activeClassName='active-link-menu' className='nav-link' to='/dashboard'>
                    <i className='fas fa-chart-bar left-icon' />
                    {t('menu.dashboard')}
                  </NavLink>
                </li>
              )}
              {this.props.user.isLogged && this.props.user.dailyOption && (
                <li className='nav-item'>
                  <NavLink activeClassName='active-link-menu' className='nav-link' to='/daily'>
                    <i className='fas fa-chart-line left-icon' />
                    {t('menu.daily')}
                  </NavLink>
                </li>
              )}
            </ul>
            <ul className='navbar-nav justify-content-end'>
              {this.props.user.isLogged && this.props.user.admin && (
                <li className='nav-item'>
                  <NavLink activeClassName='active-link-menu' className='nav-link' to='/admin/users'>
                    <i className='fas fa-book left-icon' />
                    {t('menu.admin')}
                  </NavLink>
                </li>
              )}
              {this.props.user.isLogged && (
                <li className='nav-item'>
                  <NavLink activeClassName='active-link-menu' className='nav-link' to='/settings'>
                    <i className='fas fa-cog left-icon' />
                    {t('menu.settings')}
                  </NavLink>
                </li>
              )}
              {this.props.user.isLogged && (
                <li className='nav-item'>
                  <NavLink activeClassName='active-link-menu' className='nav-link' to='/mypage'>
                    <i className='fas fa-user left-icon' />
                    {t('menu.mypage')}
                  </NavLink>
                </li>
              )}
              {!this.props.user.isLogged && (
                <li className='nav-item'>
                  <NavLink activeClassName='active-link-menu' className='nav-link' to='/users/sign_in'>
                    <i className='fas fa-leaf left-icon' />
                    {t('menu.login')}
                  </NavLink>
                </li>
              )}
              {this.props.user.isLogged && (
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

export default withTranslation()(withRouter(Header))
