import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import { withTranslation } from 'react-i18next'
import { withRouter } from 'react-router-dom'

import { RouteComponentProps } from 'types/react-router'
import { UserStore } from 'types/store'

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
    const thisYear = (new Date()).getFullYear()

    return (
      <header className='header-component header'>
        <nav className='navbar navbar-expand-lg'>
          <NavLink className='nav-brand nav-link' to='/'>
            <img alt={t('brand_name')} className='brand-image' src={brandImage} />
            <span className='brand-name'>{t('brand_name')}</span>
          </NavLink>
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
                  <NavLink activeClassName='active-link-menu' className='nav-link' to={'/dashboards/' + thisYear}>
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
