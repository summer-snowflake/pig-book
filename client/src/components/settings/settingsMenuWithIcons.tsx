import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'

import HeaderMenuWithIcons from 'components/common/headerMenuWithIconsContainer'

import 'stylesheets/menu.sass'

class SettingsMenuWithIcons extends Component {
  render(): JSX.Element {
    return (
      <ul className='settings-menu-with-icons-component nav flex-column side-menu'>
        <HeaderMenuWithIcons />
        <li className='nav-item'>
          <NavLink activeClassName='active-link-menu' className='nav-link' to='/categories'>
            <i className='fa fa-th-large' />
          </NavLink>
        </li>
        <li className='nav-item'>
          <NavLink activeClassName='active-link-menu' className='nav-link' to='/breakdowns'>
            <i className='fa fa-list' />
          </NavLink>
        </li>
        <li className='nav-item'>
          <NavLink activeClassName='active-link-menu' className='nav-link' to='/places'>
            <i className='fa fa-map-marker-alt' />
          </NavLink>
        </li>
        <li className='nav-item'>
          <NavLink activeClassName='active-link-menu' className='nav-link' to='/labels'>
            <i className='fa fa-bookmark' />
          </NavLink>
        </li>
      </ul>
    )
  }
}

export default SettingsMenuWithIcons
