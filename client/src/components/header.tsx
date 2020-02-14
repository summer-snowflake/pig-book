import React, { Component} from 'react';
import { NavLink } from 'react-router-dom';
import { withTranslation } from 'react-i18next';

import 'stylesheets/header.sass';
import brandImage from 'images/pig.gif';

import bsn from 'bootstrap.native';
import { Collapse } from 'bootstrap.native';

class Header extends Component<i18nProps> {
  constructor(props: i18nProps) {
    super(props)

    this.handleClickMenu = this.handleClickMenu.bind(this);
  }

  handleClickMenu() {
    var collapseLink = document.getElementById('collapseLink');
    console.log(collapseLink);
    var  a = new Collapse(collapseLink);
    a.show();


    var collapseButton: HTMLElement | null = document.getElementById('NavberLink');
    new Collapse(collapseButton);
  }

  render() {
    const { t } = this.props;

    return (
      <header className='header-component header'>
        <nav className='navbar navbar-expand-lg navbar-light'>
          <NavLink className='nav-brand nav-link' to='/'>
            <img alt={t('brand_name')} className='brand-image' src={brandImage} />
            <span className='brand-name'>{t('brand_name')}</span>
          </NavLink>

          <a id='NavberLink' onClick={this.handleClickMenu} type="button" className="navbar-toggler" data-toggle="collapse" data-target="#NavberLink" aria-controls="NavberLink" aria-expanded="false" aria-label="ナビゲーションの切替">
            <span className="navbar-toggler-icon"></span>
          </a>
          <div className='collapse navbar-collapse' id='Navber'>
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
