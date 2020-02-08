import React, { Component} from 'react';
import { Link } from 'react-router-dom';

class Header extends Component {
  render() {
    return (
      <header>
        <ul>
          <li><Link to='/'>HOME</Link></li>
          <li><Link to='/users/sign_in'>ログイン</Link></li>
        </ul>
      </header>
    );
  }
}

export default Header;