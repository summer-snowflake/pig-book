import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import { withTranslation } from 'react-i18next'

import 'stylesheets/menu.sass'

class MypageMenu extends Component<I18nProps> {
  render(): JSX.Element {
    const { t } = this.props

    return (
      <div className='mypage-menu-component'>
        <div className='list-group'>
          <NavLink activeClassName='active-link-menu' className='list-group-item' to='/mypage'>
            <i className='fas fa-piggy-bank left-icon' />
            {t('menu.mypageTop')}
          </NavLink>
        </div>
      </div>
    )
  }
}

export default withTranslation()(MypageMenu)
