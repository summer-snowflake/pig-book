import React, { Component} from 'react';
import { NavLink } from 'react-router-dom';
import { withTranslation } from 'react-i18next';

import 'stylesheets/header.sass';
import brandImage from 'images/pig.gif';

class Header extends Component<i18nProps> {
  render() {
    const { t } = this.props;

    return (
      <header className='header-component header'>
        <nav className='navbar navbar-expand-lg'>
          <NavLink className='nav-brand nav-link' to='/'>
            <img alt={t('brand_name')} className='brand-image' src={brandImage} />
            <span className='brand-name'>{t('brand_name')}</span>
          </NavLink>
          <div className='collapse navbar-collapse'>
            <ul className='navbar-nav mr-auto'>
              <li className='nav-item'>
                <NavLink activeClassName='active-link-menu' className='nav-link' to='/'>
                  <i className='fas fa-home left-icon' />
                  {t('menu.home')}
                </NavLink>
              </li>
            </ul>
            <ul className='navbar-nav justify-content-end'>
              <li className='nav-item'>
                <NavLink activeClassName='active-link-menu' className='nav-link' to='/users/sign_in'>
                  <i className='fas fa-leaf left-icon' />
                  {t('menu.login')}
                </NavLink>
              </li>
            </ul>
          </div>
        </nav>
      </header>
    );
  }
}

export default withTranslation()(Header);
