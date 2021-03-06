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
        <NavLink activeClassName='active-link-menu' className='list-group-item' to='/breakdowns'>
          <i className='fas fa-list left-icon' />
          {t('menu.breakdown')}
        </NavLink>
        <NavLink activeClassName='active-link-menu' className='list-group-item' to='/places'>
          <i className='fas fa-map-marker-alt left-icon' />
          {t('menu.place')}
        </NavLink>
        <NavLink activeClassName='active-link-menu' className='list-group-item' to='/labels'>
          <i className='fas fa-bookmark left-icon' />
          {t('menu.tag')}
        </NavLink>
      </div>
    )
  }
}

export default withTranslation()(SettingsMenu)
