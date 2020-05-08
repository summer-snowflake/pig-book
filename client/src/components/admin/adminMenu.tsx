import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'

import 'stylesheets/admin.sass'

class AdminMenu extends Component {

  render(): JSX.Element {
    const sendgridUrl = 'https://addons-sso.heroku.com/apps/8ce425c2-9bcb-4ec9-b082-792f0e6596f9/addons/9bad1620-6984-4f37-83bc-f24f5c6e3246'
    return (
      <div className='admin-menu-component'>
        <ul className='nav nav-pills mr-auto'>
          <li className='nav-item'>
            <NavLink activeClassName='active' className='nav-link' to='/admin/users'>
              <i className='fas fa-user' />
            </NavLink>
          </li>
          <li>
            <a className='nav-link' href={sendgridUrl} rel='noopener noreferrer' target='_blank'>
              <i className='fas fa-mail-bulk' />
            </a>
          </li>
        </ul>
      </div>
    )
  }
}

export default AdminMenu
