import React, { Component} from 'react';
import { Link } from 'react-router-dom';

import 'stylesheets/header.sass';
import brandImage from 'images/pig.gif';

class Header extends Component {
  render() {
    return (
      <header className='header'>
        <nav className='nav'>
          <Link className='nav-brand nav-link' to='/'>
            <img alt='おこづかいちょうβ' className='brand-image' src={brandImage} />
            <span className='brand-name'>おこづかいちょうβ</span>
          </Link>
          <ul className='nav'>
            <li className='nav-item'><Link className='nav-link' to='/'>HOME</Link></li>
          </ul>
          <ul className='nav justify-content-end'>
            <li className='nav-item'><Link className='nav-link' to='/users/sign_in'>ログイン</Link></li>
          </ul>
        </nav>
      </header>
    );
  }
}

export default Header;