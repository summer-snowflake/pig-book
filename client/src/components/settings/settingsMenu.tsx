import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import { withTranslation } from 'react-i18next'

import 'stylesheets/menu.sass'

class SettingsMenu extends Component<I18nProps> {
  render(): JSX.Element {
    const { t } = this.props

    return (
      <div className='settings-menu-component list-group'>
        <NavLink activeClassName='active-link-menu' className='list-group-item' to='/settings'>
          <i className='fas fa-user-cog left-icon' />
          {t('menu.settingsTop')}
        </NavLink>
        <NavLink activeClassName='active-link-menu' className='list-group-item' to='/categories'>
          <i className='fas fa-th-large left-icon' />
          {t('menu.category')}
        </NavLink>
      </div>
    )
  }
}

export default withTranslation()(SettingsMenu)
