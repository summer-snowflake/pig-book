import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import { withTranslation } from 'react-i18next'

class AccountMenu extends Component<I18nProps> {
  render(): JSX.Element {
    const { t } = this.props

    return (
      <div className='login-menu-component list-group'>
        <NavLink activeClassName='active-link-menu' className='list-group-item' to='/users/sign_in'>
          <i className='fa fa-leaf left-icon' />
          {t('menu.login')}
        </NavLink>
        <NavLink activeClassName='active-link-menu' className='list-group-item' to='/users/sign_up'>
          <i className='fa fa-heart left-icon' />
          {t('menu.signUp')}
        </NavLink>
        <NavLink activeClassName='active-link-menu' className='list-group-item' to='/users/confirmations'>
          <i className='fas fa-envelope left-icon' />
          {t('menu.resendEmail')}
        </NavLink>
      </div>
    )
  }
}

export default withTranslation()(AccountMenu)
