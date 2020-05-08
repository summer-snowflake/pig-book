import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'

import 'stylesheets/admin.sass'

class AdminMenu extends Component {
  render(): JSX.Element {
    return (
      <div className='admin-menu-component'>
        <ul className='nav nav-pills mr-auto'>
          <li className='nav-item'>
            <NavLink activeClassName='active' className='nav-link' to='/admin/users'>
              <i className='fas fa-user' />
            </NavLink>
          </li>
        </ul>
      </div>
    )
  }
}

export default AdminMenu
