import React, { Component} from 'react';
import { Link } from 'react-router-dom';

import 'stylesheets/header.sass';
import brandImage from 'images/pig.gif';

class Header extends Component {
  render() {
    return (
      <header className='header'>
        <nav className='navbar navbar-expand'>
          <Link className='nav-brand nav-link' to='/'>
            <img alt='おこづかいちょうβ' className='brand-image' src={brandImage} />
            <span className='brand-name'>おこづかいちょうβ</span>
          </Link>
          <div className='navbar-collapse'>
            <ul className='navbar-nav mr-auto'>
              <li className='nav-item'>
                <Link className='nav-link' to='/'>
                  <i className='fas fa-home left-icon' />
                  HOME
                </Link>
              </li>
            </ul>
            <ul className='navbar-nav justify-content-end'>
              <li className='nav-item'>
                <Link className='nav-link' to='/users/sign_in'>
                  <i className='fas fa-leaf left-icon' />
                  ログイン
                </Link>
              </li>
            </ul>
          </div>
        </nav>
      </header>
    );
  }
}

export default Header;