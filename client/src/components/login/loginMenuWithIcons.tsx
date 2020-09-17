import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'

import 'stylesheets/menu.sass'

class LoginMenuWithIcons extends Component {
  render(): JSX.Element {
    return (
      <ul className='login-menu-with-icons-component nav flex-column side-menu'>
        <li className='nav-item'>
          <NavLink activeClassName='active-link-menu' className='nav-link' to='/'>
            <i className='fas fa-home' />
          </NavLink>
        </li>
        <li className='nav-item'>
          <NavLink activeClassName='active-link-menu' className='nav-link' to='/users/sign_in'>
            <i className='fa fa-leaf' />
          </NavLink>
        </li>
        <li className='nav-item'>
        <NavLink activeClassName='active-link-menu' className='nav-link' to='/users/sign_up'>
          <i className='fa fa-heart' />
        </NavLink>
        </li>
      </ul>
    )
  }
}

export default LoginMenuWithIcons
