import React, { Component} from 'react';
import { NavLink } from 'react-router-dom';

import 'stylesheets/menu.sass';

class loginMenu extends Component {
  render() {
    return (
      <div className='login-menu-component list-group'>
        <NavLink activeClassName='active-link-menu' className='list-group-item' to='/users/sign_in'>
          <i className='fa fa-leaf left-icon' />
          ログイン
        </NavLink>
        <NavLink activeClassName='active-link-menu' className='list-group-item' to='/users/sign_up'>
          <i className='fa fa-heart left-icon' />
          アカウント登録
        </NavLink>
      </div>
    );
  }
}

export default loginMenu;