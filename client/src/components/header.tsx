import React, { Component} from 'react';
import { NavLink } from 'react-router-dom';

import 'stylesheets/header.sass';
import brandImage from 'images/pig.gif';

class Header extends Component {
  render() {
    return (
      <header className='header-component header'>
        <nav className='navbar navbar-expand'>
          <NavLink className='nav-brand nav-link' to='/'>
            <img alt='おこづかいちょうβ' className='brand-image' src={brandImage} />
            <span className='brand-name'>おこづかいちょうβ</span>
          </NavLink>
          <div className='navbar-collapse'>
            <ul className='navbar-nav mr-auto'>
              <li className='nav-item'>
                <NavLink activeClassName='active-link-menu' className='nav-link' to='/'>
                  <i className='fas fa-home left-icon' />
                  HOME
                </NavLink>
              </li>
            </ul>
            <ul className='navbar-nav justify-content-end'>
              <li className='nav-item'>
                <NavLink activeClassName='active-link-menu' className='nav-link' to='/users/sign_in'>
                  <i className='fas fa-leaf left-icon' />
                  ログイン
                </NavLink>
              </li>
            </ul>
          </div>
        </nav>
      </header>
    );
  }
}

export default Header;
