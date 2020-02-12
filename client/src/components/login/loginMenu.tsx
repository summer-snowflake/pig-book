import React, { Component} from 'react';
import { NavLink } from 'react-router-dom';
import { withTranslation } from 'react-i18next'

import 'stylesheets/menu.sass';

class loginMenu extends Component<i18nProps> {
  render() {
    const { t } = this.props;

    return (
      <div className='login-menu-component list-group'>
        <NavLink activeClassName='active-link-menu' className='list-group-item' to='/users/sign_in'>
          <i className='fa fa-leaf left-icon' />
          {t('menu.login')}
        </NavLink>
        <NavLink activeClassName='active-link-menu' className='list-group-item' to='/users/sign_up'>
          <i className='fa fa-heart left-icon' />
          {t('menu.sign_up')}
        </NavLink>
      </div>
    );
  }
}

export default withTranslation()(loginMenu);
